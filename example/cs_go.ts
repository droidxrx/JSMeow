import { memory, waitsLoop, vector3, overlay, WorldToScreenDirectX, draws, colors } from '..';

const Offsets = {
	dwClientState: 5820356,
	dwClientState_State: 264,
	dwClientState_ViewAngles: 19856,
	dwLocalPlayer: 14378460,
	dwEntityList: 81601628,
	dwViewMatrix: 81542516,
	dwRadarBase: 86012372,
	m_bDormant: 237,
	m_aimPunchAngle: 12348,
	m_dwBoneMatrix: 9896,
	m_iHealth: 256,
	m_iTeamNum: 244,
	m_lifeState: 607,
	m_vecOrigin: 312,
	m_vecVelocity: 276,
	m_vecViewOffset: 264,
	perMatrix: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60],
	// eslint-disable-next-line max-len
	perEntity: [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256, 272, 288, 304, 320, 336, 352, 368, 384, 400, 416, 432, 448, 464, 480, 496, 512, 528, 544, 560, 576, 592, 608, 624, 640, 656, 672, 688, 704, 720, 736, 752, 768, 784, 800, 816, 832, 848, 864, 880, 896, 912, 928, 944, 960, 976, 992, 1008 ], // prettier-ignore
};

function getLocalPlayer(address: number) {
	const baseAddress = memory.readMemory(address, 'dword');

	if (baseAddress === 0) return false;

	return {
		address: baseAddress,
		team: memory.readMemory(baseAddress + Offsets.m_iTeamNum, 'int'),
		pos: memory.readMemory(baseAddress + Offsets.m_vecOrigin, 'vector3'),
	};
}

function EntityList(address: number) {
	const boneBase = memory.readMemory(address + Offsets.m_dwBoneMatrix, 'dword');
	const id = memory.readMemory(address + 0x64, 'int');
	return {
		id,
		boneBase,
		team: memory.readMemory(address + Offsets.m_iTeamNum, 'int'),
		health: memory.readMemory(address + Offsets.m_iHealth, 'int'),
		pos: memory.readMemory(address + Offsets.m_vecOrigin, 'vector3'),
		name: <string | null>null,
		bonePos(boneID: number) {
			return vector3.create(
				memory.readMemory(boneBase + 0x30 * boneID + 0x0c, 'float'),
				memory.readMemory(boneBase + 0x30 * boneID + 0x1c, 'float'),
				memory.readMemory(boneBase + 0x30 * boneID + 0x2c, 'float')
			);
		},
		getName(clientBase: number) {
			const radar_base = memory.readMemory(clientBase + Offsets.dwRadarBase, 'dword');
			const hud_radar = memory.readMemory(radar_base + 0x78, 'dword');
			return memory.readMemory(hud_radar + 0x300 + 0x174 * (id - 1), 'string');
		},
	};
}

async function main() {
	const { th32ProcessID } = memory.openProcess('csgo.exe');
	const clientBase = memory.findModule('client.dll', th32ProcessID).modBaseAddr;
	const engineBase = memory.findModule('engine.dll', th32ProcessID).modBaseAddr;
	const { center: centerOV, height: ovHeight } = overlay.init('Counter-Strike: Global Offensive - Direct3D 9', false, 0x23);
	const font = overlay.fontInit(10, 'Tahoma');

	while (overlay.loop(true)) {
		await waitsLoop(1);

		const clientState = memory.readMemory(engineBase + Offsets.dwClientState, 'dword');
		const isNotInGame = memory.readMemory(clientState + Offsets.dwClientState_State, 'int') !== 6;

		if (isNotInGame) continue;

		const localLPlayer = getLocalPlayer(clientBase + Offsets.dwLocalPlayer);

		if (!localLPlayer) continue;

		const viewMatrix = Offsets.perMatrix.map((offset) => memory.readMemory(clientBase + Offsets.dwViewMatrix + offset, 'float'));

		draws.circle(centerOV.x, centerOV.y, 90, colors.blue, false);
		for await (const entityIndex of Offsets.perEntity) {
			const entityAddress = memory.readMemory(clientBase + Offsets.dwEntityList + entityIndex, 'dword');
			if (entityAddress !== localLPlayer.address && entityAddress !== 0) {
				const entity = EntityList(entityAddress);
				if (entity.team !== localLPlayer.team && entity.health > 0 && entity.health <= 100) {
					const pos2d = WorldToScreenDirectX(centerOV, viewMatrix, entity.pos);
					const headPos = WorldToScreenDirectX(centerOV, viewMatrix, entity.bonePos(8));

					if (pos2d && headPos) {
						entity.name = entity.getName(clientBase);
						const head = headPos.y - pos2d.y;
						const width = head / 2;
						const center = width / -2;

						draws.cornerBox(pos2d.x + center, pos2d.y, width, head + 5, colors.orange, colors.black, 0.3);
						draws.valueBar(pos2d.x + center - 5, pos2d.y, pos2d.x + center - 5, headPos.y + 5, 2, 100, entity.health, true);
						draws.dashLine(centerOV.x, ovHeight, pos2d.x, headPos.y + 10, 0.5, 2, null, colors.red, 1);
						draws.text(font, pos2d.x - entity.name.length * 1.5, pos2d.y - 10, entity.name, colors.silver);

						const entDist = (vector3.distance(entity.pos, localLPlayer.pos) / 20).toFixed() + 'm';
						draws.text(font, pos2d.x - entDist.length * 1.5, headPos.y + 10, entDist, colors.white);
					}
				}
			}
		}
	}
}

void main();
