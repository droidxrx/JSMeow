import EventEmitter from 'events';
import structron from 'structron-v2';

declare interface Colors {
	aliceblue: RGB;
	antiquewhite: RGB;
	aqua: RGB;
	aquamarine: RGB;
	azure: RGB;
	beige: RGB;
	bisque: RGB;
	black: RGB;
	blanchedalmond: RGB;
	blue: RGB;
	blueviolet: RGB;
	brown: RGB;
	burlywood: RGB;
	cadetblue: RGB;
	chartreuse: RGB;
	chocolate: RGB;
	coral: RGB;
	cornflowerblue: RGB;
	cornsilk: RGB;
	crimson: RGB;
	cyan: RGB;
	darkblue: RGB;
	darkcyan: RGB;
	darkgoldenrod: RGB;
	darkgray: RGB;
	darkgreen: RGB;
	darkgrey: RGB;
	darkkhaki: RGB;
	darkmagenta: RGB;
	darkolivegreen: RGB;
	darkorange: RGB;
	darkorchid: RGB;
	darkred: RGB;
	darksalmon: RGB;
	darkseagreen: RGB;
	darkslateblue: RGB;
	darkslategray: RGB;
	darkslategrey: RGB;
	darkturquoise: RGB;
	darkviolet: RGB;
	deeppink: RGB;
	deepskyblue: RGB;
	dimgray: RGB;
	dimgrey: RGB;
	dodgerblue: RGB;
	firebrick: RGB;
	floralwhite: RGB;
	forestgreen: RGB;
	fuchsia: RGB;
	gainsboro: RGB;
	ghostwhite: RGB;
	gold: RGB;
	goldenrod: RGB;
	gray: RGB;
	green: RGB;
	greenyellow: RGB;
	grey: RGB;
	honeydew: RGB;
	hotpink: RGB;
	indianred: RGB;
	indigo: RGB;
	ivory: RGB;
	khaki: RGB;
	lavender: RGB;
	lavenderblush: RGB;
	lawngreen: RGB;
	lemonchiffon: RGB;
	lightblue: RGB;
	lightcoral: RGB;
	lightcyan: RGB;
	lightgoldenrodyellow: RGB;
	lightgray: RGB;
	lightgreen: RGB;
	lightgrey: RGB;
	lightpink: RGB;
	lightsalmon: RGB;
	lightseagreen: RGB;
	lightskyblue: RGB;
	lightslategray: RGB;
	lightslategrey: RGB;
	lightsteelblue: RGB;
	lightyellow: RGB;
	lime: RGB;
	limegreen: RGB;
	linen: RGB;
	magenta: RGB;
	maroon: RGB;
	mediumaquamarine: RGB;
	mediumblue: RGB;
	mediumorchid: RGB;
	mediumpurple: RGB;
	mediumseagreen: RGB;
	mediumslateblue: RGB;
	mediumspringgreen: RGB;
	mediumturquoise: RGB;
	mediumvioletred: RGB;
	midnightblue: RGB;
	mintcream: RGB;
	mistyrose: RGB;
	moccasin: RGB;
	navajowhite: RGB;
	navy: RGB;
	oldlace: RGB;
	olive: RGB;
	olivedrab: RGB;
	orange: RGB;
	orangered: RGB;
	orchid: RGB;
	palegoldenrod: RGB;
	palegreen: RGB;
	paleturquoise: RGB;
	palevioletred: RGB;
	papayawhip: RGB;
	peachpuff: RGB;
	peru: RGB;
	pink: RGB;
	plum: RGB;
	powderblue: RGB;
	purple: RGB;
	rebeccapurple: RGB;
	red: RGB;
	rosybrown: RGB;
	royalblue: RGB;
	saddlebrown: RGB;
	salmon: RGB;
	sandybrown: RGB;
	seagreen: RGB;
	seashell: RGB;
	sienna: RGB;
	silver: RGB;
	skyblue: RGB;
	slateblue: RGB;
	slategray: RGB;
	slategrey: RGB;
	snow: RGB;
	springgreen: RGB;
	steelblue: RGB;
	tan: RGB;
	teal: RGB;
	thistle: RGB;
	tomato: RGB;
	turquoise: RGB;
	violet: RGB;
	wheat: RGB;
	white: RGB;
	whitesmoke: RGB;
	yellow: RGB;
	yellowgreen: RGB;
}

declare interface Vector2 {
	x: number;
	y: number;
}

declare interface Vector3 extends Vector2 {
	z: number;
}

declare interface Vector4 extends Vector3 {
	w: number;
}

declare interface overlayScreen {
	width: number;
	height: number;
	center: Vector2;
}

declare interface Font {
	fontHDC: number;
	font: number;
	height: number;
}

declare type RGB = number[];

declare interface Overlay {
	/**
	 * overlayInit
	 * @param targetTitle String
	 * @param windowedFullScreen Boolean
	 * @param exitKey Number
	 * @return Object
	 */
	init(targetTitle: string, windowedFullScreen: boolean, exitKey: number): overlayScreen;
	deInit(): void;
	update(): void;
	close(): void;
	/**
	 * overlayLoop
	 * @param update Boolean
	 * @returns Boolean
	 */
	loop(update: boolean): boolean;
	/**
	 * overlaySetPosition
	 * @param x Number
	 * @param y Number
	 * @returns Boolean
	 */
	setPosition(x?: number, y?: number): boolean;
	/**
	 * overlayFontInit
	 * @param height Number
	 * @param fontName Name font
	 * @return Object
	 */
	fontInit(height: number, fontName: string): Font;
	/**
	 * overlayFontDeInit
	 * @param font Object get from function overlayFontInit
	 */
	fontDeInit(font: Font): void;
}

declare interface Draws {
	/**
	 * Draw Text
	 * @param font Object get from function overlayFontInit
	 * @param x Number
	 * @param y Number
	 * @param text String
	 * @param color Array like [255, 255, 255]
	 */
	text(font: Font, x: number, y: number, text: string, color: RGB): void;

	/**
	 * Draw Text
	 * @param font Object get from function overlayFontInit
	 * @param x Number
	 * @param y Number
	 * @param lines Array string
	 * @param color Array like [255, 255, 255]
	 * @param offset Number
	 */
	textLines(font: Font, x: number, y: number, lines: string[], color: RGB, offset: number): void;

	/**
	 * Draw pixel
	 * @param x Number
	 * @param y Number
	 * @param color Array like [255, 255, 255]
	 */
	pixel(x: number, y: number, color: RGB): void;

	/**
	 * Draw Box
	 * @param x Number
	 * @param y Number
	 * @param width Number
	 * @param height Number
	 * @param lineWidth Number
	 * @param color Array like [255, 255, 255]
	 */
	box(x: number, y: number, width: number, height: number, lineWidth: number, color: RGB): void;

	/**
	 * Draw alpha box
	 * @param x Number
	 * @param y Number
	 * @param width Number
	 * @param height Number
	 * @param color Array like [255, 255, 255]
	 * @param outlineColor Array like [255, 255, 255]
	 * @param alpha Number
	 */
	alphaBox(x: number, y: number, width: number, height: number, color: RGB, outlineColor: RGB, alpha: number): void;

	/**
	 * Draw corner box
	 * @param x Number
	 * @param y Number
	 * @param width Number
	 * @param height Number
	 * @param color Array like [255, 255, 255]
	 * @param outlineColor Array like [255, 255, 255]
	 * @param lineWidth Number
	 */
	cornerBox(x: number, y: number, width: number, height: number, color: RGB, outlineColor: RGB, lineWidth: number): void;

	/**
	 * Draw line
	 * @param x1 Number
	 * @param y1 Number
	 * @param x2 Number
	 * @param y2 Number
	 * @param lineWidth Number
	 * @param color Array like [255, 255, 255]
	 */
	line(x1: number, y1: number, x2: number, y2: number, lineWidth: number, color: RGB): void;

	/**
	 * Draw dash line
	 * @param x1 Number
	 * @param y1 Number
	 * @param x2 Number
	 * @param y2 Number
	 * @param lineWidth Number
	 * @param factor Number
	 * @param pattern Number optional default 3855
	 * @param color Array like [255, 255, 255]
	 * @param alpha Number
	 */
	dashLine(x1: number, y1: number, x2: number, y2: number, lineWidth: number, factor: number, pattern: number | null, color: RGB, alpha: number): void;

	/**
	 * Draw circle
	 * @param x Number
	 * @param y Number
	 * @param radius Number
	 * @param color Array like [255, 255, 255]
	 * @param filled Boolean
	 */
	circle(x: number, y: number, radius: number, color: RGB, filled: boolean): void;

	/**
	 *
	 * @param x Number
	 * @param y Number
	 * @param radius Number
	 * @param startValue Number
	 * @param endValue Number
	 * @param color Array like [255, 255, 255]
	 */
	radCircle(x: number, y: number, radius: number, startValue: number, endValue: number, color: RGB): void;

	/**
	 *
	 * @param x1 Number
	 * @param y1 Number
	 * @param x2 Number
	 * @param y2 Number
	 * @param width Number
	 * @param maxValue Number
	 * @param value Number
	 * @param vertical Boolean
	 */
	valueBar(x1: number, y1: number, x2: number, y2: number, width: number, maxValue: number, value: number, vertical: boolean): void;

	/**
	 *
	 * @param x Number
	 * @param y Number
	 * @param radius Number
	 * @param rotation Number
	 * @param sides Number
	 * @param color Array like [255, 255, 255]
	 */
	poly(x: number, y: number, radius: number, rotation: number, sides: number, color: RGB): void;

	/**
	 *
	 * @param points Array vector2
	 * @param color Array like [255, 255, 255]
	 * @param filled Boolean
	 * @param alpha Number
	 */
	customShape(points: Vector2[], color: RGB, filled: boolean, alpha: number): void;
}

declare interface Vectors2 {
	create(x?: number, y?: number): Vector2;
	addition(a: Vector2, b: Vector2): Vector2;
	subtraction(a: Vector2, b: Vector2): Vector2;
	multiplication(a: Vector2, b: Vector2): Vector2;
	division(a: Vector2, b: Vector2): Vector2;
	magnitude(a: Vector2): number;
	distance(a: Vector2, b: Vector2): number;
	/**
	 * Get vector2 closest
	 * @param a Vector2
	 * @param b Array vector2
	 * @param returnType Boolean true:vector2 | false:index
	 */
	closest<T extends boolean>(a: Vector2, b: Vector2[], returnType: T): T extends false ? number : Vector2;
}

declare interface Vectors3 {
	create(x?: number, y?: number, z?: number): Vector3;
	addition(a: Vector3, b: Vector3): Vector3;
	subtraction(a: Vector3, b: Vector3): Vector3;
	multiplication(a: Vector3, b: Vector3): Vector3;
	division(a: Vector3, b: Vector3): Vector3;
	magnitude(a: Vector3): number;
	distance(a: Vector3, b: Vector3): number;
	/**
	 * Get vector3 closest
	 * @param a Vector3
	 * @param b Array vector3
	 * @param returnType Boolean true:vector3 | false:index
	 */
	closest<T extends boolean>(a: Vector3, b: Vector3[], returnType: T): T extends false ? number : Vector3;
}

declare type dataTypeNum = 'byte' | 'int' | 'int32' | 'uint32' | 'int64' | 'uint64' | 'dword' | 'short' | 'long' | 'float' | 'double' | 'ptr' | 'pointer';
declare type dataTypeBool = 'bool' | 'boolean';
declare type dataTypeStr = 'string' | 'str';
declare type dataTypeVec2 = 'vector2' | 'vec2';
declare type dataTypeVec3 = 'vector3' | 'vec3';
declare type dataTypeVec4 = 'vector4' | 'vec4';
declare type dataType = dataTypeNum | dataTypeBool | dataTypeStr | dataTypeVec2 | dataTypeVec3 | dataTypeVec4;
declare type getReturnType<T extends dataType> = T extends dataTypeNum ? number : T extends dataTypeBool ? boolean : T extends dataTypeStr ? string : T extends dataTypeVec2 ? Vector2 : T extends dataTypeVec3 ? Vector3 : T extends dataTypeVec4 ? Vector4: unknown; // prettier-ignore
declare type writeValue = number | boolean | string | Vector2 | Vector3 | Vector4;
declare type flagsTypes = 'NORMAL' | 'READ' | 'SUBTRACT';

declare interface processInfo {
	dwSize: number;
	th32ProcessID: number;
	cntThreads: number;
	th32ParentProcessID: number;
	pcPriClassBase: number;
	szExeFile: string;
	modBaseAddr: number;
	handle: number;
}

declare type processInfos = processInfo[];

declare interface moduleInfo {
	modBaseAddr: number;
	modBaseSize: number;
	szExePath: string;
	szModule: string;
	th32ProcessID: number;
	GlblcntUsage: number;
}

declare type moduleInfos = moduleInfo[];

declare interface regionInfo {
	BaseAddress: number;
	AllocationBase: number;
	AllocationProtect: number;
	RegionSize: number;
	State: number;
	Protect: number;
	Type: number;
}

declare interface regionInfos {
	BaseAddress: number;
	AllocationBase: number;
	AllocationProtect: number;
	RegionSize: number;
	State: number;
	Protect: number;
	Type: number;
	szExeFile: null | string;
}

declare interface debugEventInfo {
	processId: number;
	threadId: number;
	exceptionCode: number;
	exceptionFlags: number;
	exceptionAddress: number;
	hardwareRegister: number;
}

/** see: https://docs.microsoft.com/en-gb/windows/desktop/Memory/memory-protection-constants */
declare type protectionType = "PAGE_NOACCESS" | "PAGE_READONLY" | "PAGE_READWRITE" | "PAGE_WRITECOPY" | "PAGE_EXECUTE" | "PAGE_EXECUTE_READ" | "PAGE_EXECUTE_READWRITE" | "PAGE_EXECUTE_WRITECOPY" | "PAGE_GUARD" | "PAGE_NOCACHE" | "PAGE_WRITECOMBINE" | "PAGE_ENCLAVE_UNVALIDATED" | "PAGE_TARGETS_NO_UPDATE" | "PAGE_TARGETS_INVALID" | "PAGE_ENCLAVE_THREAD_CONTROL"; // prettier-ignore
/** see: https://docs.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-virtualallocex#parameters */
declare type allocationType = 'MEM_COMMIT' | 'MEM_RESERVE' | 'MEM_RESET' | 'MEM_TOP_DOWN' | 'MEM_RESET_UNDO' | 'MEM_LARGE_PAGES' | 'MEM_PHYSICAL';
/** 1=T_STRING | 4=T_INT | 6=T_FLOAT */
declare type aTypes = 1 | 4 | 6;
/** 0=T_VOID | 1=T_STRING | 2=T_CHAR | 3=T_BOOL | 4=T_INT | 5=T_DOUBLE | 6=T_FLOAT */
declare type rTypes = 0 | 1 | 2 | 3 | 4 | 5 | 6;
declare type argsFun<T> = { type: T; value: T extends 0x1 ? string : number }[];
declare type callFunctionReturn<T> = { returnValue: T extends 0 | 4 | 5 | 6 ? number : T extends 1 | 2 ? string : T extends 3 ? boolean : unknown; exitCode: number };

declare class Registers {
	registers: Readonly<{
		DR0: number;
		DR1: number;
		DR2: number;
		DR3: number;
	}>;
	used: number[];
	getRegister(): number;
	busy(register: number): void;
	unbusy(register: number): void;
}

declare type lengthType = 'string' | 'boolean' | 'byte' | 'int' | 'int32' | 'uint32' | 'int64' | 'uint64' | 'dword' | 'short' | 'long' | 'float' | 'double' | 'ptr' | 'pointer' | 'bool';
declare class Debugger extends EventEmitter {
	registers: Registers;
	attached: boolean;
	intervals: {
		register: number;
		id: NodeJS.Timer;
	}[];
	attach(processId: number, killOnDetatch?: boolean): boolean;
	detatch(processId: number): boolean;
	removeHardwareBreakpoint(processId: number, register: number): boolean;
	setHardwareBreakpoint(processId: number, address: number, trigger: number, lengthType: lengthType): number;
	monitor(register: number, timeout?: number): void;
}
declare class Memory {
	signatureTypes: {
		NORMAL: number;
		READ: number;
		SUBTRACT: number;
	};
	Debugger: Debugger;
	openProcess(processNameOrProcessId: string | number): processInfo;
	closeProcess(handle: number): void;
	getProcesses(): processInfos;
	findModule(moduleName: string, processId: number): moduleInfo;
	getModules(processId: number): moduleInfos;
	readMemory<T extends dataType>(address: number, dataType: T): getReturnType<T>;
	readBuffer(address: number, size: number): Buffer;
	writeMemory(address: number, value: writeValue, dataType: dataType): void;
	writeBuffer(address: number, buffer: Buffer): void;
	findPattern(pattern: string, flags: flagsTypes, patternOffset: number): number;
	findPatternByModule(moduleName: string, pattern: string, flags: flagsTypes, patternOffset: number): number;
	findPatternByAddress(baseAddress: number, pattern: string, flags: flagsTypes, patternOffset: number): number;
	callFunction<T extends aTypes, E extends rTypes>(args: argsFun<T>, returnType: E, address: number): callFunctionReturn<E>;
	virtualAllocEx(address: number, size: number, allocation: allocationType, protection: protectionType): number;
	virtualProtectEx(address: number, size: number, protection: protectionType): number;
	getRegions(): regionInfos[];
	virtualQueryEx(address: number): regionInfo;
	attachDebugger(processId: number, killOnExit: boolean): boolean;
	detatchDebugger(processId: number): boolean;
	awaitDebugEvent(hardwareRegister: number, millisTimeout: number): debugEventInfo | null;
	handleDebugEvent(processId: number, threadId: number): boolean;
	setHardwareBreakpoint(processId: number, address: number, hardwareRegister: number, trigger: number, length: number): boolean;
	removeHardwareBreakpoint(processId: number, hardwareRegister: number): boolean;
	injectDll(dllPath: string): boolean;
	unloadDll(moduleBaseAddressOrName: string | number): boolean;
	STRUCTRON_TYPE_STRING(
		structAddress: number,
		platform: string,
		encoding?: BufferEncoding
	): {
		read(buffer: Buffer, offset: number): string;
		write(value: string, context: ReturnType<structron['write']>, offset: number): void;
		SIZE: number;
	};
}

declare namespace JSMeow {
	export const Struct: typeof structron;
	export const overlay: Overlay;
	export const draws: Draws;
	export const vector2: Vectors2;
	export const vector3: Vectors3;
	/**
	 * isKeyPressed
	 * @param vKey Number
	 * @returns Boolean
	 */
	export function isKeyPressed(vKey: number): boolean;
	/**
	 * pressKey
	 * @param vKey Number
	 */
	export function pressKey(vKey: number): void;

	/**
	 * mouseMove
	 * @param x Number
	 * @param y Number
	 * @returns Boolean
	 */
	export function mouseMove(x: number, y: number): boolean;
	/**
	 * mouseClick
	 * @param leftOrRight true:left | false:right
	 */
	export function mouseClick(leftOrRight: boolean): void;
	/**
	 * setForeground
	 * @param windowTitle String
	 * @returns Boolean
	 */
	export function setForeground(windowTitle: string): boolean;
	/**
	 * waitsLoop
	 * @param miliSeond Optional default is 0
	 */
	export function waitsLoop(miliSeond?: number): Promise<void>;
	export const memory: Memory;
	export const colors: Colors;
	export function WorldToScreenOpenGL(centerWindow: Vector2, matrix: number[], pos: Vector3): false | Vector2;
	export function WorldToScreenDirectX(centerWindow: Vector2, matrix: number[], pos: Vector3): false | Vector2;
}

export = JSMeow;
