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
export function isKeyPressed(vKey: number) {
	return addon.isKeyPressed(vKey);
}
export function pressKey(vKey: number) {
	return addon.pressKey(vKey);
}
export function mouseMove(x: number, y: number) {
	return addon.mouseMove(x, y);
}
export function mouseClick(leftOrRight: boolean) {
	return addon.mouseClick(leftOrRight);
}
export function setForeground(windowTitle: string) {
	return addon.setForeground(windowTitle);
}
export async function waitsLoop(ms = 0) {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, ms);
	});
}
export const memory = new Memory(<Record<string, any>>addon.memory);

export function WorldToScreenOpenGL(centerWindow: { x: number; y: number }, matrix: number[], pos: { x: number; y: number; z: number }) {
	return worldToScreen.WorldToScreenOpenGL(centerWindow, matrix, pos);
}
export function WorldToScreenDirectX(centerWindow: { x: number; y: number }, matrix: number[], pos: { x: number; y: number; z: number }) {
	return worldToScreen.WorldToScreenDirectX(centerWindow, matrix, pos);
}
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
