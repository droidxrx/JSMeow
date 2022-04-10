/* eslint-disable @typescript-eslint/unbound-method */
import Memory from './memory';
import path from 'path';
import fs from 'fs';
import structron from 'structron-v2';
import worldToScreen from './worldToScreen';

const distAddon = path.join(__dirname, 'JSMeow.node');
const isPrebuild = fs.existsSync(distAddon);
const addon: Record<string, any> = (function () {
	if (isPrebuild) return require(distAddon);
	else return require('../build/Release/JSMeow.node');
})();

export default {
	Struct: structron,
	colors: addon.colors,
	overlay: addon.overlay,
	draws: {
		...addon.draws,
		dashLine(x1: number, y1: number, x2: number, y2: number, lineWidth: number, factor: number, pattern: null | number, color: number[], alpha: number) {
			addon.draws.dashLine(x1, y1, x2, y2, lineWidth, factor, pattern ?? 3855, color, alpha);
		},
	},
	vector2: addon.vector2,
	vector3: addon.vector3,
	isKeyPressed: addon.isKeyPressed,
	pressKey: addon.pressKey,
	mouseMove: addon.mouseMove,
	mouseClick: addon.mouseClick,
	setForeground: addon.setForeground,
	async waitsLoop(ms = 0) {
		return new Promise<void>((resolve) => {
			setTimeout(resolve, ms);
		});
	},
	memory: new Memory(<Record<string, any>>addon.memory),
	WorldToScreenOpenGL: worldToScreen.WorldToScreenOpenGL,
	WorldToScreenDirectX: worldToScreen.WorldToScreenDirectX,
};
