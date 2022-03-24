import { draws, Font, RGB, Vector2 } from './addon';
import {
	errorMessage,
	isArray,
	isBoolean,
	isNumber,
	isObject,
	isString,
	isVector2,
} from './checking-params';

export function drawAlphaBox(
	x: number,
	y: number,
	width: number,
	height: number,
	color: RGB,
	outlineColor: RGB,
	alpha: number
) {
	if (!isNumber(x)) throw errorMessage.x;
	if (!isNumber(y)) throw errorMessage.y;
	if (!isNumber(width)) throw errorMessage.width;
	if (!isNumber(height)) throw errorMessage.height;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	if (!isArray(outlineColor)) throw errorMessage.outlineColor;
	if (!isNumber(outlineColor[0])) throw errorMessage.outlineColorIndex1;
	if (!isNumber(outlineColor[1])) throw errorMessage.outlineColorIndex2;
	if (!isNumber(outlineColor[2])) throw errorMessage.outlineColorIndex3;
	if (!isNumber(alpha)) throw errorMessage.alpha;
	draws.drawAlphaBox(x, y, width, height, color, outlineColor, alpha);
}
export function drawAlphaBoxV(
	pos: Vector2,
	width: number,
	height: number,
	color: RGB,
	outlineColor: RGB,
	alpha: number
) {
	const isVec2 = isVector2(pos);
	if (isVec2 !== true) throw new TypeError(isVec2);
	if (!isNumber(width)) throw errorMessage.width;
	if (!isNumber(height)) throw errorMessage.height;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	if (!isArray(outlineColor)) throw errorMessage.outlineColor;
	if (!isNumber(outlineColor[0])) throw errorMessage.outlineColorIndex1;
	if (!isNumber(outlineColor[1])) throw errorMessage.outlineColorIndex2;
	if (!isNumber(outlineColor[2])) throw errorMessage.outlineColorIndex3;
	if (!isNumber(alpha)) throw errorMessage.alpha;
	draws.drawAlphaBoxV(pos, width, height, color, outlineColor, alpha);
}
export function drawBox(
	x: number,
	y: number,
	width: number,
	height: number,
	lineWidth: number,
	color: RGB
) {
	if (!isNumber(x)) throw errorMessage.x;
	if (!isNumber(y)) throw errorMessage.y;
	if (!isNumber(width)) throw errorMessage.width;
	if (!isNumber(height)) throw errorMessage.height;
	if (!isNumber(lineWidth)) throw errorMessage.lineWidth;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	draws.drawBox(x, y, width, height, lineWidth, color);
}
export function drawBoxV(
	pos: Vector2,
	width: number,
	height: number,
	lineWidth: number,
	color: RGB
) {
	const isVec2 = isVector2(pos);
	if (isVec2 !== true) throw new TypeError(isVec2);
	if (!isNumber(width)) throw errorMessage.width;
	if (!isNumber(height)) throw errorMessage.height;
	if (!isNumber(lineWidth)) throw errorMessage.lineWidth;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	draws.drawBoxV(pos, width, height, lineWidth, color);
}
export function drawCircle(
	x: number,
	y: number,
	radius: number,
	color: RGB,
	filled = true
) {
	if (!isNumber(x)) throw errorMessage.x;
	if (!isNumber(y)) throw errorMessage.y;
	if (!isNumber(radius)) throw errorMessage.radius;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	if (!isBoolean(filled)) throw errorMessage.filled;
	draws.drawCircle(x, y, radius, color, filled);
}
export function drawCircleV(pos: Vector2, radius: number, color: RGB, filled = true) {
	const isVec2 = isVector2(pos);
	if (isVec2 !== true) throw new TypeError(isVec2);
	if (!isNumber(radius)) throw errorMessage.radius;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	if (!isBoolean(filled)) throw errorMessage.filled;
	draws.drawCircleV(pos, radius, color, filled);
}
export function drawCornerBox(
	x: number,
	y: number,
	width: number,
	height: number,
	color: RGB,
	outlineColor: RGB,
	lineWidth = 1
) {
	if (!isNumber(x)) throw errorMessage.x;
	if (!isNumber(y)) throw errorMessage.y;
	if (!isNumber(width)) throw errorMessage.width;
	if (!isNumber(height)) throw errorMessage.height;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	if (!isArray(outlineColor)) throw errorMessage.outlineColor;
	if (!isNumber(outlineColor[0])) throw errorMessage.outlineColorIndex1;
	if (!isNumber(outlineColor[1])) throw errorMessage.outlineColorIndex2;
	if (!isNumber(outlineColor[2])) throw errorMessage.outlineColorIndex3;
	if (!isNumber(lineWidth)) throw errorMessage.lineWidth;
	draws.drawCornerBox(x, y, width, height, color, outlineColor, lineWidth);
}
export function drawCornerBoxV(
	pos: Vector2,
	width: number,
	height: number,
	color: RGB,
	outlineColor: RGB,
	lineWidth = 1
) {
	const isVec2 = isVector2(pos);
	if (isVec2 !== true) throw new TypeError(isVec2);
	if (!isNumber(width)) throw errorMessage.width;
	if (!isNumber(height)) throw errorMessage.height;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	if (!isArray(outlineColor)) throw errorMessage.outlineColor;
	if (!isNumber(outlineColor[0])) throw errorMessage.outlineColorIndex1;
	if (!isNumber(outlineColor[1])) throw errorMessage.outlineColorIndex2;
	if (!isNumber(outlineColor[2])) throw errorMessage.outlineColorIndex3;
	if (!isNumber(lineWidth)) throw errorMessage.lineWidth;
	draws.drawCornerBoxV(pos, width, height, color, outlineColor, lineWidth);
}
export function drawCustomShape(
	points: Vector2[],
	color: RGB,
	filled = true,
	alpha = 1.0
) {
	if (!isArray(points) || isVector2(points[0]) !== true) throw errorMessage.points;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	if (!isBoolean(filled)) throw errorMessage.filled;
	if (!isNumber(alpha)) throw errorMessage.alpha;
	draws.drawCustomShape(points, color, filled, alpha);
}
export function drawDashedLine(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	lineWidth: number,
	color: RGB,
	factor = 2,
	pattern = 3855,
	alpha = 0.5
) {
	if (!isNumber(x1)) throw errorMessage.x1;
	if (!isNumber(y1)) throw errorMessage.y1;
	if (!isNumber(x2)) throw errorMessage.x2;
	if (!isNumber(y2)) throw errorMessage.y2;
	if (!isNumber(lineWidth)) throw errorMessage.lineWidth;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	if (!isNumber(factor)) throw errorMessage.factor;
	if (!isNumber(pattern)) throw errorMessage.pattern;
	if (!isNumber(alpha)) throw errorMessage.alpha;
	draws.drawDashedLine(x1, y1, x2, y2, lineWidth, factor, pattern, color, alpha);
}
export function drawDashedLineV(
	pos1: Vector2,
	pos2: Vector2,
	lineWidth: number,
	color: RGB,
	factor = 2,
	pattern = 3855,
	alpha = 0.5
) {
	const isVec21 = isVector2(pos1);
	const isVec22 = isVector2(pos2);
	if (isVec21 !== true) throw new TypeError(isVec21);
	if (isVec22 !== true) throw new TypeError(isVec22);
	if (!isNumber(lineWidth)) throw errorMessage.lineWidth;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	if (!isNumber(factor)) throw errorMessage.factor;
	if (!isNumber(pattern)) throw errorMessage.pattern;
	if (!isNumber(alpha)) throw errorMessage.alpha;
	draws.drawDashedLineV(pos1, pos2, lineWidth, factor, pattern, color, alpha);
}
export function drawLine(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	lineWidth: number,
	color: RGB
) {
	if (!isNumber(x1)) throw errorMessage.x1;
	if (!isNumber(y1)) throw errorMessage.y1;
	if (!isNumber(x2)) throw errorMessage.x2;
	if (!isNumber(y2)) throw errorMessage.y2;
	if (!isNumber(lineWidth)) throw errorMessage.lineWidth;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	draws.drawLine(x1, y1, x2, y2, lineWidth, color);
}
export function drawLineV(pos1: Vector2, pos2: Vector2, lineWidth: number, color: RGB) {
	const isVec21 = isVector2(pos1);
	const isVec22 = isVector2(pos2);
	if (isVec21 !== true) throw new TypeError(isVec21);
	if (isVec22 !== true) throw new TypeError(isVec22);
	if (!isNumber(lineWidth)) throw errorMessage.lineWidth;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	draws.drawLineV(pos1, pos2, lineWidth, color);
}
export function drawPixel(x: number, y: number, color: RGB) {
	if (!isNumber(x)) throw errorMessage.x;
	if (!isNumber(y)) throw errorMessage.y;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	draws.drawPixel(x, y, color);
}
export function drawPixelV(pos: Vector2, color: RGB) {
	const isVec2 = isVector2(pos);
	if (isVec2 !== true) throw new TypeError(isVec2);
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	draws.drawPixelV(pos, color);
}
export function drawPoly(
	x: number,
	y: number,
	radius: number,
	rotation: number,
	sides: number,
	color: RGB
) {
	if (!isNumber(x)) throw errorMessage.x;
	if (!isNumber(y)) throw errorMessage.y;
	if (!isNumber(radius)) throw errorMessage.radius;
	if (!isNumber(rotation)) throw errorMessage.rotation;
	if (!isNumber(sides)) throw errorMessage.sides;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	draws.drawPoly(x, y, radius, rotation, sides, color);
}
export function drawPolyV(
	pos: Vector2,
	radius: number,
	rotation: number,
	sides: number,
	color: RGB
) {
	const isVec2 = isVector2(pos);
	if (isVec2 !== true) throw new TypeError(isVec2);
	if (!isNumber(radius)) throw errorMessage.radius;
	if (!isNumber(rotation)) throw errorMessage.rotation;
	if (!isNumber(sides)) throw errorMessage.sides;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	draws.drawPolyV(pos, radius, rotation, sides, color);
}
export function drawRadCircle(
	x: number,
	y: number,
	radius: number,
	startValue: number,
	endValue: number,
	color: RGB
) {
	if (!isNumber(x)) throw errorMessage.x;
	if (!isNumber(y)) throw errorMessage.y;
	if (!isNumber(radius)) throw errorMessage.radius;
	if (!isNumber(startValue)) throw errorMessage.startValue;
	if (!isNumber(endValue)) throw errorMessage.endValue;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	draws.drawRadCircle(x, y, radius, startValue, endValue, color);
}
export function drawRadCircleV(
	pos: Vector2,
	radius: number,
	startValue: number,
	endValue: number,
	color: RGB
) {
	const isVec2 = isVector2(pos);
	if (isVec2 !== true) throw new TypeError(isVec2);
	if (!isNumber(radius)) throw errorMessage.radius;
	if (!isNumber(startValue)) throw errorMessage.startValue;
	if (!isNumber(endValue)) throw errorMessage.endValue;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	draws.drawRadCircleV(pos, radius, startValue, endValue, color);
}
export function drawTextLines(
	font: Font,
	x: number,
	y: number,
	lines: string[],
	color: RGB,
	offset: number
) {
	if (!isObject(font))
		throw new TypeError(
			'Parameter font must be object get from Function overlayFontInit'
		);
	if (!isNumber(x)) throw errorMessage.x;
	if (!isNumber(y)) throw errorMessage.y;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	if (!isArray(lines) && !isString(lines[0]))
		throw new TypeError('Parameter lines must be array string');
	if (!isNumber(offset)) throw errorMessage.offset;
	draws.drawTextLines(font, x, y, lines, color, offset);
}
export function drawValueBar(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	width: number,
	maxValue: number,
	value: number,
	vertical = true
) {
	if (!isNumber(x1)) throw errorMessage.x1;
	if (!isNumber(y1)) throw errorMessage.y1;
	if (!isNumber(x2)) throw errorMessage.x2;
	if (!isNumber(y2)) throw errorMessage.y2;
	if (!isNumber(width)) throw errorMessage.width;
	if (!isNumber(maxValue)) throw errorMessage.maxValue;
	if (!isNumber(value)) throw errorMessage.value;
	if (!isBoolean(vertical)) throw errorMessage.vertical;
	draws.drawValueBar(x1, y1, x2, y2, width, maxValue, value, vertical);
}
export function drawValueBarV(
	pos1: Vector2,
	pos2: Vector2,
	width: number,
	maxValue: number,
	value: number,
	vertical = true
) {
	const isVec21 = isVector2(pos1);
	const isVec22 = isVector2(pos2);
	if (isVec21 !== true) throw new TypeError(isVec21);
	if (isVec22 !== true) throw new TypeError(isVec22);
	if (!isNumber(width)) throw errorMessage.width;
	if (!isNumber(maxValue)) throw errorMessage.maxValue;
	if (!isNumber(value)) throw errorMessage.value;
	if (!isBoolean(vertical)) throw errorMessage.vertical;
	draws.drawValueBarV(pos1, pos2, width, maxValue, value, vertical);
}
export function drawText(font: Font, x: number, y: number, text: string, color: RGB) {
	if (!isObject(font))
		throw new TypeError(
			'Parameter font must be object get from Function overlayFontInit'
		);
	if (!isNumber(x)) throw errorMessage.x;
	if (!isNumber(y)) throw errorMessage.y;
	if (!isString(text)) throw errorMessage.text;
	if (!isArray(color)) throw errorMessage.color;
	if (!isNumber(color[0])) throw errorMessage.colorIndex1;
	if (!isNumber(color[1])) throw errorMessage.colorIndex2;
	if (!isNumber(color[2])) throw errorMessage.colorIndex3;
	draws.drawText(font, x, y, text, color);
}

export default {
	drawAlphaBox,
	drawAlphaBoxV,
	drawBox,
	drawBoxV,
	drawCircle,
	drawCircleV,
	drawCornerBox,
	drawCornerBoxV,
	drawCustomShape,
	drawDashedLine,
	drawDashedLineV,
	drawLine,
	drawLineV,
	drawPixel,
	drawPixelV,
	drawPoly,
	drawPolyV,
	drawRadCircle,
	drawRadCircleV,
	drawTextLines,
	drawValueBar,
	drawValueBarV,
	drawText,
};
