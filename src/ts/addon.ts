/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any, max-len */
export interface Overlay {
	width: number;
	height: number;
	midX: number;
	midY: number;
	target: string;
	targetHwnd: number;
	exitKey: number;
	window: number;
	hwnd: number;
}

export interface Font {
	fontHDC: number;
	font: number;
	height: number;
}

export type RGB = number[];

export interface Vector2 {
	x: number;
	y: number;
}

export interface Vector3 {
	x: number;
	y: number;
	z: number;
}

export interface Vector4 {
	w: number;
	x: number;
	y: number;
	z: number;
}

export type dataType = "byte" | "int" | "int32" | "uint32" | "int64" | "uint64" | "dword" | "short" | "long" | "float" | "double" | "boolean" | "pointer" | "string" |  "vector3" | "vector4"; // prettier-ignore
export type ReturnType <T extends dataType> = T extends "float" ? number : T extends "double" ? number : T extends "byte" ? number : T extends "int" ? number : T extends "int32" ? number : T extends "uint32" ? number : T extends "int64" ? number : T extends "uint64" ? number : T extends "dword" ? number : T extends "short" ? number : T extends "long" ? number : T extends "boolean" ? boolean : T extends "pointer" ? number : T extends "string" ? string : T extends "vector3" ? Vector3 : T extends "vector4" ? Vector4 : void; // prettier-ignore
export type writeValue = number | string | boolean | Vector3 | Vector4;

export interface ProcessObject {
	dwSize: number;
	th32ProcessID: number;
	cntThreads: number;
	th32ParentProcessID: number;
	pcPriClassBase: number;
	modBaseAddr: number;
	handle: number;
	szExeFile: string;
}

export interface ModuleObject {
	modBaseAddr: number;
	modBaseSize: number;
	szExePath: string;
	szModule: string;
	th32ProcessID: number;
	GlblcntUsage: number;
}

interface Addons {
	overlay: {
		overlayClose: (overlay: Overlay) => void;
		overlayDeinit: (overlay: Overlay) => void;
		overlayFontDeInit: (font: Font) => void;
		overlayFontInit: (height: number, fontName: string) => Font;
		overlayLoop: (overlay: Overlay, update: boolean) => boolean;
		overlaySetPos: (overlay: Overlay) => boolean;
		overlayUpdate: (overlay: Overlay) => void;
		overlayInit: (target: string, exitkey: number, borderOffset: number) => Overlay;
	};
	draws: {
		drawAlphaBox: (
			x: number,
			y: number,
			width: number,
			height: number,
			color: RGB,
			outlineColor: RGB,
			alpha: number
		) => void;
		drawAlphaBoxV: (
			pos: Vector2,
			width: number,
			height: number,
			color: RGB,
			outlineColor: RGB,
			alpha: number
		) => void;
		drawBox: (
			x: number,
			y: number,
			width: number,
			height: number,
			lineWidth: number,
			color: RGB
		) => void;
		drawBoxV: (
			pos: Vector2,
			width: number,
			height: number,
			lineWidth: number,
			color: RGB
		) => void;
		drawCircle: (
			x: number,
			y: number,
			radius: number,
			color: RGB,
			filled: boolean
		) => void;
		drawCircleV: (pos: Vector2, radius: number, color: RGB, filled: boolean) => void;
		drawCornerBox: (
			x: number,
			y: number,
			width: number,
			height: number,
			color: RGB,
			outlineColor: RGB,
			lineWidth: number
		) => void;
		drawCornerBoxV: (
			pos: Vector2,
			width: number,
			height: number,
			color: RGB,
			outlineColor: RGB,
			lineWidth: number
		) => void;
		drawCustomShape: (
			points: Vector2[],
			color: RGB,
			filled: boolean,
			alpha: number
		) => void;
		drawDashedLine: (
			x1: number,
			y1: number,
			x2: number,
			y2: number,
			lineWidth: number,
			factor: number,
			pattern: number,
			color: RGB,
			alpha: number
		) => void;
		drawDashedLineV: (
			pos1: Vector2,
			pos2: Vector2,
			lineWidth: number,
			factor: number,
			pattern: number,
			color: RGB,
			alpha: number
		) => void;
		drawLine: (
			x1: number,
			y1: number,
			x2: number,
			y2: number,
			lineWidth: number,
			color: RGB
		) => void;
		drawLineV: (pos1: Vector2, pos2: Vector2, lineWidth: number, color: RGB) => void;
		drawPixel: (x: number, y: number, color: RGB) => void;
		drawPixelV: (pos: Vector2, color: RGB) => void;
		drawPoly: (
			x: number,
			y: number,
			radius: number,
			rotation: number,
			sides: number,
			color: RGB
		) => void;
		drawPolyV: (
			pos: Vector2,
			radius: number,
			rotation: number,
			sides: number,
			color: RGB
		) => void;
		drawRadCircle: (
			x: number,
			y: number,
			radius: number,
			startValue: number,
			endValue: number,
			color: RGB
		) => void;
		drawRadCircleV: (
			pos: Vector2,
			radius: number,
			startValue: number,
			endValue: number,
			color: RGB
		) => void;
		drawTextLines: (
			font: Font,
			x: number,
			y: number,
			lines: string[],
			color: RGB,
			offset: number
		) => void;
		drawValueBar: (
			x1: number,
			y1: number,
			x2: number,
			y2: number,
			width: number,
			maxValue: number,
			value: number,
			vertical: boolean
		) => void;
		drawValueBarV: (
			pos1: Vector2,
			pos2: Vector2,
			width: number,
			maxValue: number,
			value: number,
			vertical: boolean
		) => void;
		drawText: (font: Font, x: number, y: number, text: string, color: RGB) => void;
	};
	misc: {
		isKeyPressed: (vkey: number) => boolean;
		mouseClick: (leftOrRight: boolean) => void;
		mouseMove: (overlay: Overlay, x: number, y: number) => void;
		pressKey: (vkey: number) => void;
		setForeground: (winTitle: string) => boolean;
	};
	memory: {
		openProcess: (processName: string) => ProcessObject;
		closeProcess: (handle: number) => void;
		getProcesses: () => ProcessObject[];
		getModules: (processId: number) => ModuleObject[];
		findModule: (moduleName: string, processId: number) => ModuleObject;
		readMemory: <T extends dataType>(
			handle: number,
			address: number,
			dataType: T
		) => ReturnType<T>;
		readBuffer: (handle: number, address: number, size: number) => Buffer;
		writeMemory: (
			handle: number,
			address: number,
			value: writeValue,
			dataType: dataType
		) => void;
		writeBuffer: (handle: number, address: number, buffer: Buffer) => void;
		findPattern: (
			handle: number,
			pattern: string,
			flags: number,
			patternOffset: number
		) => number;
		findPatternByModule: (
			handle: number,
			moduleName: string,
			pattern: string,
			flags: number,
			patternOffset: number
		) => number;
		findPatternByAddress: (
			handle: number,
			baseAddress: number,
			pattern: string,
			flags: number,
			patternOffset: number
		) => number;
		injectDll: (handle: number, dllPath: string) => void;
		unloadDll: (handle: number, moduleNameOrModuleBaseAddress: string | number) => void;
	};
}

const addons: Addons = require('./JSMeow.node');
export const overlays = addons.overlay;
export const draws = addons.draws;
export const miscs = addons.misc;
export const memory = addons.memory;
