/* eslint-disable @typescript-eslint/no-explicit-any, no-prototype-builtins */
import { Vector2, Vector3 } from './addon';

export function isArray(arr: any) {
	return Array.isArray(arr);
}
export function isObject(obj: any) {
	return obj !== null && typeof obj === 'object' && !isArray(obj);
}
export function isBoolean(bool: boolean) {
	return typeof bool === 'boolean';
}
export function isString(str: string) {
	return typeof str === 'string';
}
export function isNumber(num: number) {
	return typeof num === 'number';
}
export function isVector2(vec2: Vector2) {
	let result: string | boolean;

	if (!isObject(vec2)) result = 'Vector2 must be object';
	else if (!vec2.hasOwnProperty('x')) result = 'Vector2 must be have property x';
	else if (!isNumber(vec2.x)) result = 'Vector2 property x must be number';
	else if (!vec2.hasOwnProperty('y')) result = 'Vector2 must be have property y';
	else if (!isNumber(vec2.y)) result = 'Vector2 property y must be number';
	else result = true;

	return result;
}
export function isVector3(vec3: Vector3) {
	let result: string | boolean;

	if (!isObject(vec3)) result = 'Vector3 must be object';
	else if (!vec3.hasOwnProperty('x')) result = 'Vector3 must be have property x';
	else if (!isNumber(vec3.x)) result = 'Vector3 property x must be number';
	else if (!vec3.hasOwnProperty('y')) result = 'Vector3 must be have property y';
	else if (!isNumber(vec3.y)) result = 'Vector3 property y must be number';
	else if (!vec3.hasOwnProperty('z')) result = 'Vector3 must be have property z';
	else if (!isNumber(vec3.z)) result = 'Vector3 property z must be number';
	else result = true;

	return result;
}

export const errorMessage = {
	x: new TypeError('Parameter x must be number'),
	x1: new TypeError('Parameter x1 must be number'),
	x2: new TypeError('Parameter x2 must be number'),
	y: new TypeError('Parameter y must be number'),
	y1: new TypeError('Parameter y1 must be number'),
	y2: new TypeError('Parameter y2 must be number'),
	width: new TypeError('Parameter width must be number'),
	height: new TypeError('Parameter height must be number'),
	maxValue: new TypeError('Parameter maxValue must be number'),
	value: new TypeError('Parameter value must be number'),
	factor: new TypeError('Parameter factor must be number'),
	pattern: new TypeError('Parameter pattern must be number'),
	color: new TypeError('Parameter color must be array rgb [255, 255, 255]'),
	outlineColor: new TypeError('Parameter outlineColor must be array rgb [255, 255, 255]'),
	alpha: new TypeError('Parameter alpha must be number'),
	lineWidth: new TypeError('Parameter lineWidth must be number'),
	rotation: new TypeError('Parameter rotation must be number'),
	sides: new TypeError('Parameter sides must be number'),
	startValue: new TypeError('Parameter startValue must be number'),
	endValue: new TypeError('Parameter endValue must be number'),
	radius: new TypeError('Parameter radius must be number'),
	offset: new TypeError('Parameter offset must be number'),
	filled: new TypeError('Parameter filled must be boolean'),
	vertical: new TypeError('Parameter vertical must be boolean'),
	points: new TypeError('Parameter points must be array vector2'),
	text: new TypeError('Parameter text must be string'),
	colorIndex1: new TypeError('Color index 0 must be number'),
	colorIndex2: new TypeError('Color index 1 must be number'),
	colorIndex3: new TypeError('Color index 2 must be number'),
	outlineColorIndex1: new TypeError('Outline color index 0 must be number'),
	outlineColorIndex2: new TypeError('Outline color index 1 must be number'),
	outlineColorIndex3: new TypeError('Outline color index 2 must be number'),
};
