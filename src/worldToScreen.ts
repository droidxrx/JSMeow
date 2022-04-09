export default {
	WorldToScreenOpenGL(centerWindow: { x: number; y: number }, matrix: number[], pos: { x: number; y: number; z: number }) {
		try {
			const clip = { x: 0, y: 0, z: 0 };
			const ndc = { x: 0, y: 0 };
			const result = { x: 0, y: 0 };

			clip.z = pos.x * matrix[3] + pos.y * matrix[7] + pos.z * matrix[11] + matrix[15];
			if (clip.z < 0.1) return false;

			clip.x = pos.x * matrix[0] + pos.y * matrix[4] + pos.z * matrix[8] + matrix[12];
			clip.y = pos.x * matrix[1] + pos.y * matrix[5] + pos.z * matrix[9] + matrix[13];

			ndc.x = clip.x / clip.z;
			ndc.y = clip.y / clip.z;

			result.x = centerWindow.x * ndc.x + (ndc.x + centerWindow.x);
			result.y = centerWindow.y * ndc.y + (ndc.y + centerWindow.y);

			return result;
		} catch {
			return false;
		}
	},
	WorldToScreenDirectX(centerWindow: { x: number; y: number }, matrix: number[], pos: { x: number; y: number; z: number }) {
		try {
			const clip = { x: 0, y: 0, z: 0 };
			const ndc = { x: 0, y: 0 };
			const result = { x: 0, y: 0 };

			clip.z = pos.x * matrix[12] + pos.y * matrix[13] + pos.z * matrix[14] + matrix[15];
			if (clip.z < 0.1) return false;

			clip.x = pos.x * matrix[0] + pos.y * matrix[1] + pos.z * matrix[2] + matrix[3];
			clip.y = pos.x * matrix[4] + pos.y * matrix[5] + pos.z * matrix[6] + matrix[7];

			ndc.x = clip.x / clip.z;
			ndc.y = clip.y / clip.z;

			result.x = centerWindow.x * ndc.x + (ndc.x + centerWindow.x);
			result.y = centerWindow.y * ndc.y + (ndc.y + centerWindow.y);

			return result;
		} catch {
			return false;
		}
	},
};
