import EventEmitter from 'events';

const lengths = {
	byte: 1,
	int: 4,
	int32: 4,
	uint32: 4,
	int64: 8,
	uint64: 8,
	dword: 4,
	short: 2,
	long: 8,
	float: 4,
	double: 8,
	bool: 1,
	boolean: 1,
	ptr: 4,
	pointer: 4,
	// str: 0,
	string: 0,
	// vec3: 0,
	// vector3: 0,
	// vec4: 0,
	// vector4: 0,
};
type lengthType = keyof typeof lengths;

// Tracks used and unused registers
class Registers {
	registers: Readonly<{ DR0: number; DR1: number; DR2: number; DR3: number }>;
	used: number[];
	constructor() {
		this.registers = Object.freeze({
			DR0: 0x0,
			DR1: 0x1,
			DR2: 0x2,
			DR3: 0x3,
		});

		this.used = [];
	}
	getRegister() {
		const unused = Object.values(this.registers).filter((r) => !this.used.includes(r));
		return unused[0];
	}

	busy(register: number) {
		this.used.push(register);
	}

	unbusy(register: number) {
		this.used.splice(this.used.indexOf(register), 1);
	}
}

export default class Debugger extends EventEmitter {
	#memoryjs: Record<string, any>;
	registers: Registers;
	attached: boolean;
	intervals: { register: number; id: NodeJS.Timer }[];

	constructor(memoryjs: Record<string, any>) {
		super();
		this.#memoryjs = memoryjs;
		this.registers = new Registers();
		this.attached = false;
		this.intervals = [];
	}

	attach(processId: number, killOnDetatch = false) {
		const success = this.#memoryjs.attachDebugger(processId, killOnDetatch);
		if (success) this.attached = true;
		return success;
	}

	detatch(processId: number) {
		this.intervals.map(({ id }) => clearInterval(id));
		return this.#memoryjs.detatchDebugger(processId);
	}

	removeHardwareBreakpoint(processId: number, register: number) {
		const success = this.#memoryjs.removeHardwareBreakpoint(processId, register);

		if (success) this.registers.unbusy(register);

		// Find the register's corresponding interval and delete it
		this.intervals.forEach(({ register: r, id }) => {
			if (r === register) clearInterval(id);
		});

		return success;
	}

	setHardwareBreakpoint(processId: number, address: number, trigger: number, lengthType: lengthType) {
		// eslint-disable-next-line no-prototype-builtins
		if (!lengths.hasOwnProperty(lengthType))
			throw new Error('dataType must be string | boolean | byte | int | int32 | uint32 | int64 | uint64 | dword | short | long | float | double | bool | ptr | pointer');
		let size: number;

		// If we are breakpointing a string, we need to determine the length of it
		if (lengthType === 'string') {
			const { handle } = this.#memoryjs.openProcess(processId);
			const value = this.#memoryjs.readMemory(handle, address, 'string');

			size = value.length;

			this.#memoryjs.closeProcess(handle);
		} else size = lengths[lengthType];

		// Obtain an available register
		const register = this.registers.getRegister();
		const success = this.#memoryjs.setHardwareBreakpoint(processId, address, register, trigger, size);

		// If the breakpoint was set, mark this register as busy
		if (success) {
			this.registers.busy(register);
			this.monitor(register);
		}

		return register;
	}

	monitor(register: number, timeout = 100) {
		const id = setInterval(() => {
			const debugEvent = this.#memoryjs.awaitDebugEvent(register, timeout);

			if (debugEvent) {
				this.#memoryjs.handleDebugEvent(debugEvent.processId, debugEvent.threadId);

				// Global event for all registers
				this.emit('debugEvent', {
					register,
					event: debugEvent,
				});

				// Event per register
				this.emit(`${register}`, debugEvent);
			}
		}, 100);
		this.intervals.push({ register, id });
	}
}
