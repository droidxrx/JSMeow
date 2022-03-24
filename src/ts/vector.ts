import { Vector2, Vector3 } from './addon';

export function vector2(x = 0, y = 0): Vector2 {
	return { x, y };
}
export function vector3(x = 0, y = 0, z = 0): Vector3 {
	return { x, y, z };
}

export function vector2Add(a: Vector2, b: Vector2): Vector2 {
	return { x: a.x + b.x, y: a.y + b.y };
}
export function vector3Add(a: Vector3, b: Vector3): Vector3 {
	return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

export function vector2Sub(a: Vector2, b: Vector2): Vector2 {
	return { x: a.x - b.x, y: a.y - b.y };
}
export function vector3Sub(a: Vector3, b: Vector3): Vector3 {
	return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

export function vector2Mult(a: Vector2, b: Vector2): Vector2 {
	return { x: a.x * b.x, y: a.y * b.y };
}
export function vector3Mult(a: Vector3, b: Vector3): Vector3 {
	return { x: a.x * b.x, y: a.y * b.y, z: a.z * b.z };
}

export function vector2Div(a: Vector2, b: Vector2): Vector2 {
	return { x: a.x / b.x, y: a.y / b.y };
}
export function vector3Div(a: Vector3, b: Vector3): Vector3 {
	return { x: a.x / b.x, y: a.y / b.y, z: a.z / b.z };
}

export function vector2MagSq(a: Vector2): number {
	return (a.x * a.x) + (a.y * a.y); //prettier-ignore
}
export function vector3MagSq(a: Vector3): number {
	return (a.x * a.x) + (a.y * a.y) + (a.z * a.z); //prettier-ignore
}

export function vector2Mag(a: Vector2): number {
	return Math.sqrt(vector2MagSq(a));
}
export function vector3Mag(a: Vector3): number {
	return Math.sqrt(vector3MagSq(a));
}

export function vector2Distance(a: Vector2, b: Vector2): number {
	return vector2Mag(vector2Sub(a, b));
}
export function vector3Distance(a: Vector3, b: Vector3): number {
	return vector3Mag(vector3Sub(a, b));
}

export function vector2Closest(a: Vector2, b: Vector2[]): Vector2 {
	let closest_value = Infinity;
	let result = vector2();

	for (const vec2 of b) {
		const dist: number = vector2Distance(a, vec2);
		if (dist < closest_value) {
			result = vec2;
			closest_value = dist;
		}
	}

	return result;
}

export function vector3Closest(a: Vector3, b: Vector3[]): Vector3 {
	let closest_value = Infinity;
	let result = vector3();

	for (const vec3 of b) {
		const dist: number = vector3Distance(a, vec3);
		if (dist < closest_value) {
			result = vec3;
			closest_value = dist;
		}
	}

	return result;
}

export default {
	vector2,
	vector3,
	vector2Add,
	vector3Add,
	vector2Sub,
	vector3Sub,
	vector2Mult,
	vector3Mult,
	vector2Div,
	vector3Div,
	vector2MagSq,
	vector3MagSq,
	vector2Mag,
	vector3Mag,
	vector2Distance,
	vector3Distance,
	vector2Closest,
	vector3Closest,
};
