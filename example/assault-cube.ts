import { drawCircle, drawTextLines, Memory, overlayFontInit, overlayInit, overlayLoop, vector2, vector3Distance, waits, WorldToScreenOpenGL } from '../'; // prettier-ignore
const mem = new Memory();

function getMatrix(address: number) {
	const result: number[] = [];
	for (let i = 0; i < 16; i++) result.push(mem.readFloat(address + 0x4 * i));
	return result;
}

function Entity(address: number, offset: Record<string, number>, localPlayer = false) {
	return {
		name: mem.readString(address + offset.name),
		health: mem.readInt(address + offset.health),
		team: mem.readInt(address + offset.team),
		armor: mem.readInt(address + offset.armor),
		pos3d: mem.readVector3(address + offset.pos),
		pos2d: localPlayer ? false : vector2(),
	};
}

void (async function () {
	const { modBaseAddr } = mem.openProcess('ac_client.exe');
	const overlay = overlayInit('AssaultCube');
	const font = overlayFontInit(10, 'Tahoma');

	const lsAddress = {
		playerCount: modBaseAddr + 0x187c18,
		entityList: modBaseAddr + 0x187c10,
		localPlayer: modBaseAddr + 0x187c0c,
		viewMatrix: modBaseAddr + 0x17afe0,
	};

	const offset = {
		name: 0x205,
		health: 0xec,
		armor: 0xf0,
		team: 0x30c,
		pos: 0x4,
	};

	const color = {
		red: [255, 0, 0],
		blue: [0, 0, 255],
		white: [255, 255, 255],
	};

	while (overlayLoop(overlay)) {
		const playerCount = mem.readInt(lsAddress.playerCount);

		if (playerCount > 1) {
			const localEnt = Entity(mem.readInt(lsAddress.localPlayer), offset, true);
			const viewMatrix = getMatrix(lsAddress.viewMatrix);

			// Start from 1 skip localplayer
			for (let i = 1; i < playerCount; i++) {
				const entityList = Entity(mem.pointer32(lsAddress.entityList, [0x4 * i]), offset);
				entityList.pos2d = WorldToScreenOpenGL(overlay, viewMatrix, entityList.pos3d);

				if (entityList.pos2d !== false && entityList.health > 0) {
					drawCircle(
						entityList.pos2d.x - 10,
						entityList.pos2d.y,
						3,
						entityList.team === 1 ? color.blue : color.red
					);
					drawTextLines(
						font,
						entityList.pos2d.x,
						entityList.pos2d.y,
						[
							entityList.name,
							`Team: ${entityList.team}`,
							`Health: ${entityList.health}`,
							`Armor: ${entityList.armor}`,
							`Distance: ${vector3Distance(entityList.pos3d, localEnt.pos3d).toFixed(3)}`,
						],
						color.white,
						2
					);
				}
			}
		}

		await waits(1);
	}
})();
