import { isArray, isBoolean, isNumber, isObject, isString, isVector3 } from './checking-params';
import { miscs, Overlay, Vector3 } from './addon';
import vector from './vector';

export async function waits(ms: number) {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, ms);
	});
}

export function isKeyPressed(vkey: number) {
	if (!isNumber(vkey)) throw new TypeError('Parameter vkey must be number');
	return miscs.isKeyPressed(vkey);
}

export function pressKey(vkey: number) {
	if (!isNumber(vkey)) throw new TypeError('Parameter vkey must be number');
	miscs.pressKey(vkey);
}
/**
 * @param leftOrRight true=left | false=right
 */
export function mouseClick(leftOrRight = true) {
	if (!isBoolean(leftOrRight)) throw new TypeError('Parameter leftOrRight must be boolean');
	miscs.mouseClick(leftOrRight);
}
export async function mouseMove(x: number, y: number) {
	if (!isNumber(x)) throw new TypeError('Parameter x must be number');
	if (!isNumber(y)) throw new TypeError('Parameter y must be number');

	return new Promise<number>(function (resolve) {
		resolve(miscs.mouseMove(x, y));
	});
}

export function setForeground(winTitle: string) {
	if (!isString(winTitle)) throw new TypeError('Parameter winTitle must be string');
	miscs.setForeground(winTitle);
}

export function WorldToScreenOpenGL(overlay: Overlay, matrix: number[], pos: Vector3) {
	if (!isObject(overlay)) throw new TypeError('Parameter overlay must be object get from Function overlayInit');
	if (!isArray(matrix)) throw new TypeError('Parameter matrix must be array float');
	const isVec3 = isVector3(pos);
	if (isVec3 !== true) throw new TypeError(isVec3);

	const clip = vector.vector3();
	const ndc = vector.vector2();
	const result = vector.vector2();

	clip.z = pos.x * matrix[3] + pos.y * matrix[7] + pos.z * matrix[11] + matrix[15];
	if (clip.z < 0.2) return false;

	clip.x = pos.x * matrix[0] + pos.y * matrix[4] + pos.z * matrix[8] + matrix[12];
	clip.y = pos.x * matrix[1] + pos.y * matrix[5] + pos.z * matrix[9] + matrix[13];

	ndc.x = clip.x / clip.z;
	ndc.y = clip.y / clip.z;

	result.x = (overlay.width / 2) * ndc.x + (ndc.x + overlay.width / 2);
	result.y = (overlay.height / 2) * ndc.y + (ndc.y + overlay.height / 2);

	return result;
}

export function WorldToScreenDirectX(overlay: Overlay, matrix: number[], pos: Vector3) {
	if (!isObject(overlay)) throw new TypeError('Parameter overlay must be object get from Function overlayInit');
	if (!isArray(matrix)) throw new TypeError('Parameter matrix must be array float');
	const isVec3 = isVector3(pos);
	if (isVec3 !== true) throw new TypeError(isVec3);

	const clip = vector.vector3();
	const ndc = vector.vector2();
	const result = vector.vector2();

	clip.z = pos.x * matrix[12] + pos.y * matrix[13] + pos.z * matrix[14] + matrix[15];
	if (clip.z < 0.2) return false;

	clip.x = pos.x * matrix[0] + pos.y * matrix[1] + pos.z * matrix[2] + matrix[3];
	clip.y = pos.x * matrix[4] + pos.y * matrix[5] + pos.z * matrix[6] + matrix[7];

	ndc.x = clip.x / clip.z;
	ndc.y = clip.y / clip.z;

	result.x = (overlay.width / 2) * ndc.x + (ndc.x + overlay.width / 2);
	result.y = (overlay.height / 2) * ndc.y + (ndc.y + overlay.height / 2);

	return result;
}

export default {
	waits,
	isKeyPressed,
	pressKey,
	mouseClick,
	mouseMove,
	setForeground,
	WorldToScreenOpenGL,
	WorldToScreenDirectX,
};
