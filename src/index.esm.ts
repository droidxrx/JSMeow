/* eslint-disable @typescript-eslint/unbound-method */
import Memory from './memory';
import structron from 'structron-v2';
import { dlopen } from 'process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import worldToScreen from './worldToScreen';

const distPath = path.dirname(fileURLToPath(import.meta.url));
const distAddon = path.join(distPath, 'JSMeow.node');
const buildAddon = path.join(distPath, '../build/Release/JSMeow.node');
const isPrebuild = fs.existsSync(distAddon);

let addon: any = { exports: {} };
addon = (function () {
	if (isPrebuild) dlopen(addon, distAddon);
	else dlopen(addon, buildAddon);
	return addon.exports;
})();

export const colors = addon.colors;
export const Struct = structron;
export const overlay = addon.overlay;

export const draws = {
	...addon.draws,
	dashLine(x1: number, y1: number, x2: number, y2: number, lineWidth: number, factor: number, pattern: null | number, color: number[], alpha: number) {
		addon.draws.dashLine(x1, y1, x2, y2, lineWidth, factor, pattern ?? 3855, color, alpha);
	},
};

export const vector2 = addon.vector2;
export const vector3 = addon.vector3;
export const isKeyPressed = addon.isKeyPressed;
export const pressKey = addon.pressKey;
export const mouseMove = addon.mouseMove;
export const mouseClick = addon.mouseClick;
export const setForeground = addon.setForeground;

export async function waitsLoop(ms = 0) {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, ms);
	});
}
export const memory = new Memory(<Record<string, any>>addon.memory);

export const WorldToScreenOpenGL = worldToScreen.WorldToScreenOpenGL;
export const WorldToScreenDirectX = worldToScreen.WorldToScreenDirectX;

export default {
	Struct,
	colors,
	overlay,
	draws,
	vector2,
	vector3,
	isKeyPressed,
	pressKey,
	mouseMove,
	mouseClick,
	setForeground,
	waitsLoop,
	memory,
	WorldToScreenOpenGL,
	WorldToScreenDirectX,
};
