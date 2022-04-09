import fs from 'fs';
import Debugger from './debugger';

const SIZEOF_STDSTRING_32BIT = 24;
const SIZEOF_STDSTRING_64BIT = 32;
const STDSTRING_LENGTH_OFFSET = 0x10;

const memoryFlags = {
	// see: https://docs.microsoft.com/en-gb/windows/desktop/Memory/memory-protection-constants
	access: {
		PAGE_NOACCESS: 0x01,
		PAGE_READONLY: 0x02,
		PAGE_READWRITE: 0x04,
		PAGE_WRITECOPY: 0x08,
		PAGE_EXECUTE: 0x10,
		PAGE_EXECUTE_READ: 0x20,
		PAGE_EXECUTE_READWRITE: 0x40,
		PAGE_EXECUTE_WRITECOPY: 0x80,
		PAGE_GUARD: 0x100,
		PAGE_NOCACHE: 0x200,
		PAGE_WRITECOMBINE: 0x400,
		PAGE_ENCLAVE_UNVALIDATED: 0x20000000,
		PAGE_TARGETS_NO_UPDATE: 0x40000000,
		PAGE_TARGETS_INVALID: 0x40000000,
		PAGE_ENCLAVE_THREAD_CONTROL: 0x80000000,
	},

	// see: https://docs.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-virtualallocex#parameters
	allocation: {
		MEM_COMMIT: 0x00001000,
		MEM_RESERVE: 0x00002000,
		MEM_RESET: 0x00080000,
		MEM_TOP_DOWN: 0x00100000,
		MEM_RESET_UNDO: 0x1000000,
		MEM_LARGE_PAGES: 0x20000000,
		MEM_PHYSICAL: 0x00400000,
	},

	// see: https://docs.microsoft.com/en-us/windows/desktop/api/winnt/ns-winnt-_memory_basic_information
	page: {
		MEM_PRIVATE: 0x20000,
		MEM_MAPPED: 0x40000,
		MEM_IMAGE: 0x1000000,
	},
};

export default class Memory {
	#mem: Record<string, any>;
	#handle: number;
	signatureTypes = {
		NORMAL: 0x0,
		READ: 0x1,
		SUBTRACT: 0x2,
	};
	Debugger: Debugger;

	constructor(mem: Record<string, any>) {
		this.#mem = mem;
		this.Debugger = new Debugger(mem);
	}

	openProcess(processNameOrProcessId: string | number) {
		const processInfo = this.#mem.openProcess(processNameOrProcessId);
		this.#handle = processInfo.handle;
		return processInfo;
	}

	closeProcess(handle: number) {
		this.#mem.closeProcess(handle);
	}

	getProcesses() {
		return this.#mem.getProcesses();
	}

	findModule(moduleName: string, processId: number) {
		return this.#mem.findModule(moduleName, processId);
	}

	getModules(processId: number) {
		return this.#mem.getModules(processId);
	}

	readMemory(address: number, dataType: any) {
		return this.#mem.readMemory(this.#handle, address, dataType);
	}

	readBuffer(address: number, size: number) {
		return this.#mem.readBuffer(this.#handle, address, size);
	}

	writeMemory(address: number, value: any, dataType: any) {
		if (dataType === 'str' || dataType === 'string') value += '\0';
		this.#mem.writeMemory(this.#handle, address, value, dataType);
	}

	writeBuffer(address: number, buffer: Buffer) {
		this.#mem.writeBuffer(this.#handle, address, buffer);
	}

	findPattern(pattern: string, flags: any, patternOffset: number) {
		return this.#mem.findPattern(this.#handle, pattern, this.signatureTypes[flags], patternOffset);
	}

	findPatternByModule(moduleName: string, pattern: string, flags: any, patternOffset: number) {
		return this.#mem.findPatternByModule(this.#handle, moduleName, pattern, this.signatureTypes[flags], patternOffset);
	}

	findPatternByAddress(baseAddress: number, pattern: string, flags: any, patternOffset: number) {
		return this.#mem.findPatternByAddress(this.#handle, baseAddress, pattern, this.signatureTypes[flags], patternOffset);
	}

	callFunction(args: any, returnType: any, address: number) {
		return this.#mem.callFunction(this.#handle, args, returnType, address);
	}

	virtualAllocEx(address: number, size: number, allocation: any, protection: any) {
		return this.#mem.virtualAllocEx(this.#handle, address, size, memoryFlags.allocation[allocation], memoryFlags.access[protection]);
	}

	virtualProtectEx(address: number, size: number, protection: any) {
		return this.#mem.virtualProtectEx(this.#handle, address, size, memoryFlags.access[protection]);
	}

	getRegions() {
		return this.#mem.getRegions(this.#handle);
	}

	virtualQueryEx(address: number) {
		return this.#mem.virtualQueryEx(this.#handle, address);
	}

	attachDebugger(processId: number, killOnExit: boolean) {
		return this.#mem.attachDebugger(processId, killOnExit);
	}

	detatchDebugger(processId: number) {
		return this.#mem.detatchDebugger(processId);
	}

	awaitDebugEvent(hardwareRegister: number, millisTimeout: number) {
		return this.#mem.awaitDebugEvent(hardwareRegister, millisTimeout);
	}

	handleDebugEvent(processId: number, threadId: number) {
		return this.#mem.handleDebugEvent(processId, threadId);
	}

	setHardwareBreakpoint(processId: number, address: number, hardwareRegister: number, trigger: number, length: number) {
		return this.#mem.setHardwareBreakpoint(processId, address, hardwareRegister, trigger, length);
	}

	removeHardwareBreakpoint(processId: number, hardwareRegister: number) {
		return this.#mem.removeHardwareBreakpoint(processId, hardwareRegister);
	}

	injectDll(dllPath: string) {
		if (!dllPath.endsWith('.dll')) throw new Error("Given path is invalid: file is not of type 'dll'.");
		if (!fs.existsSync(dllPath)) throw new Error('Given path is invaild: file does not exist.');
		return this.#mem.injectDll(this.#handle, dllPath);
	}

	unloadDll(moduleBaseAddressOrName: string | number) {
		return this.#mem.unloadDll(this.#handle, moduleBaseAddressOrName);
	}

	STRUCTRON_TYPE_STRING(structAddress: number, platform: string, encoding?: BufferEncoding) {
		return {
			read: (buffer: Buffer, offset: number) => {
				// get string length from `std::string` container
				const length = buffer.readUInt32LE(offset + STDSTRING_LENGTH_OFFSET);

				// if length > 15, `std::string` has a pointer to the string
				if (length > 15) {
					const pointer = platform === '64' ? buffer.readBigInt64LE(offset) : buffer.readUInt32LE(offset);
					return this.readMemory(Number(pointer), 'string');
				}

				// if length <= 15, `std::string` directly contains the string
				return buffer.toString(encoding ?? 'utf8', offset, offset + length);
			},
			write: (value: string, context: any, offset: number) => {
				// address containing the length of the string
				const lengthAddress = structAddress + offset + STDSTRING_LENGTH_OFFSET;

				// get existing `std::string` buffer
				const bufferSize = platform === '64' ? SIZEOF_STDSTRING_64BIT : SIZEOF_STDSTRING_32BIT;
				const existingBuffer = this.readBuffer(structAddress + offset, bufferSize);

				// fetch length of string in memory (to determine if it's pointer based)
				const length = this.readMemory(lengthAddress, 'int');

				if ((length > 15 && value.length <= 15) || (length <= 15 && value.length > 15)) {
					// write existing buffer without changes
					existingBuffer.copy(context.buffer, offset);
					return;
				}

				// write new length
				this.writeMemory(lengthAddress, value.length, 'uint32');
				existingBuffer.writeUInt32LE(value.length, STDSTRING_LENGTH_OFFSET);

				if (length > 15 && value.length > 15) {
					// write new string in memory
					const pointer: number = this.readMemory(structAddress + offset, 'pointer');
					this.writeMemory(pointer, value, 'string');
				} else if (length <= 15 && value.length <= 15) {
					// write new string directly into buffer
					existingBuffer.write(value, encoding ?? 'utf8');
				}
				existingBuffer.copy(context.buffer, offset);
			},
			SIZE: platform === '64' ? SIZEOF_STDSTRING_64BIT : SIZEOF_STDSTRING_32BIT,
		};
	}
}
