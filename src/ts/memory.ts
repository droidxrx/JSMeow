import { dataType, memory, ReturnType, Vector3, Vector4, writeValue } from './addon';

export class Memory {
	#handle: number;

	openProcess(processName: string) {
		try {
			const processObject = memory.openProcess(processName);
			this.#handle = processObject.handle;
			return processObject;
		} catch (error) {
			// eslint-disable-next-line
			throw new Error(error.message);
		}
	}

	closeProcess() {
		memory.closeProcess(this.#handle);
	}

	getProcesses() {
		return memory.getProcesses();
	}

	getModules(processId: number) {
		return memory.getModules(processId);
	}

	findModule(moduleName: string, processId: number) {
		return memory.findModule(moduleName, processId);
	}

	readMemory<T extends dataType>(address: number, dataType: T): ReturnType<T> {
		return memory.readMemory(this.#handle, address, dataType);
	}

	readBuffer(address: number, size: number) {
		return memory.readBuffer(this.#handle, address, size);
	}

	writeMemory(address: number, value: writeValue, dataType: dataType) {
		memory.writeMemory(this.#handle, address, value, dataType);
	}

	writeBuffer(address: number, buffer: Buffer) {
		memory.writeBuffer(this.#handle, address, buffer);
	}

	findPattern(pattern: string, flags = 0x0, patternOffset = 0x0) {
		return memory.findPattern(this.#handle, pattern, flags, patternOffset);
	}

	findPatternByModule(
		moduleName: string,
		pattern: string,
		flags = 0x0,
		patternOffset = 0x0
	) {
		return memory.findPatternByModule(
			this.#handle,
			moduleName,
			pattern,
			flags,
			patternOffset
		);
	}

	findPatternByAddress(
		baseAddress: number,
		pattern: string,
		flags = 0x0,
		patternOffset = 0x0
	) {
		return memory.findPatternByAddress(
			this.#handle,
			baseAddress,
			pattern,
			flags,
			patternOffset
		);
	}

	injectDll(dllPath: string) {
		memory.injectDll(this.#handle, dllPath);
	}

	unloadDll(moduleNameOrModuleBaseAddress: string | number) {
		memory.unloadDll(this.#handle, moduleNameOrModuleBaseAddress);
	}

	pointer32(baseAddress: number, offset: number[]): number {
		let address = this.readDword(baseAddress);
		if (offset.length === 1) address = this.readDword(address + offset[0]);
		else {
			for (let i = 0; i < offset.length - 1; i++)
				address = this.readDword(address + offset[i]);
			address += offset[offset.length - 1];
		}
		return address;
	}

	pointer64(baseAddress: number, offset: number[]): number {
		let address = this.readPointer(baseAddress);
		if (offset.length === 1) address = this.readPointer(address + offset[0]);
		else {
			for (let i = 0; i < offset.length - 1; i++)
				address = this.readPointer(address + offset[i]);
			address += offset[offset.length - 1];
		}
		return address;
	}

	// Add Function Read
	readByte(address: number) {
		return memory.readMemory(this.#handle, address, 'byte');
	}

	readInt(address: number) {
		return memory.readMemory(this.#handle, address, 'int');
	}

	readInt32(address: number) {
		return memory.readMemory(this.#handle, address, 'int32');
	}

	readUint32(address: number) {
		return memory.readMemory(this.#handle, address, 'uint32');
	}

	readInt64(address: number) {
		return memory.readMemory(this.#handle, address, 'int64');
	}

	readUint64(address: number) {
		return memory.readMemory(this.#handle, address, 'uint64');
	}

	readDword(address: number) {
		return memory.readMemory(this.#handle, address, 'dword');
	}

	readShort(address: number) {
		return memory.readMemory(this.#handle, address, 'short');
	}

	readLong(address: number) {
		return memory.readMemory(this.#handle, address, 'long');
	}

	readFloat(address: number) {
		return memory.readMemory(this.#handle, address, 'float');
	}

	readDouble(address: number) {
		return memory.readMemory(this.#handle, address, 'double');
	}

	readBoolean(address: number) {
		return memory.readMemory(this.#handle, address, 'boolean');
	}

	readPointer(address: number) {
		return memory.readMemory(this.#handle, address, 'pointer');
	}

	readString(address: number) {
		return memory.readMemory(this.#handle, address, 'string');
	}

	readVector3(address: number) {
		return memory.readMemory(this.#handle, address, 'vector3');
	}
	readVector4(address: number) {
		return memory.readMemory(this.#handle, address, 'vector4');
	}

	// Add Function Write
	writeByte(address: number, value: number) {
		return memory.writeMemory(this.#handle, address, value, 'byte');
	}

	writeInt(address: number, value: number) {
		return memory.writeMemory(this.#handle, address, value, 'int');
	}

	writeInt32(address: number, value: number) {
		return memory.writeMemory(this.#handle, address, value, 'int32');
	}

	writeUint32(address: number, value: number) {
		return memory.writeMemory(this.#handle, address, value, 'uint32');
	}

	writeInt64(address: number, value: number) {
		return memory.writeMemory(this.#handle, address, value, 'int64');
	}

	writeUint64(address: number, value: number) {
		return memory.writeMemory(this.#handle, address, value, 'uint64');
	}

	writeDword(address: number, value: number) {
		return memory.writeMemory(this.#handle, address, value, 'dword');
	}

	writeShort(address: number, value: number) {
		return memory.writeMemory(this.#handle, address, value, 'short');
	}

	writeLong(address: number, value: number) {
		return memory.writeMemory(this.#handle, address, value, 'long');
	}

	writeFloat(address: number, value: number) {
		return memory.writeMemory(this.#handle, address, value, 'float');
	}

	writeDouble(address: number, value: number) {
		return memory.writeMemory(this.#handle, address, value, 'double');
	}

	writeBoolean(address: number, value: boolean) {
		return memory.writeMemory(this.#handle, address, value, 'boolean');
	}

	writeString(address: number, value: string) {
		return memory.writeMemory(this.#handle, address, value, 'string');
	}

	writeVector3(address: number, value: Vector3) {
		return memory.writeMemory(this.#handle, address, value, 'vector3');
	}
	writeVector4(address: number, value: Vector4) {
		return memory.writeMemory(this.#handle, address, value, 'vector4');
	}
}

export const JSMemory = new Memory();

export default {
	Memory,
	JSMemory,
};
