/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */
import {  drawCornerBox, drawDashedLine, drawText, drawValueBar, JSMemory as mem, overlayFontInit, overlayInit, overlayLoop,vector2, Vector2, vector3, Vector3, vector3Distance, waits, WorldToScreenDirectX } from '../'; // prettier-ignore
import { get as fetch } from 'superagent';

interface Offset {
	m_iHealth: number;
	m_bDormant: number;
	m_iTeamNum: number;
	m_dwBoneMatrix: number;
	m_vecOrigin: number;
	dwRadarBase: number;
	dwGlowObjectManager: number;
	m_iGlowIndex: number;
	m_iCrosshairId: number;
	dwLocalPlayer: number;
	dwEntityList: number;
	dwViewMatrix: number;
}

async function getcsgojson(): Promise<Offset> {
	try {
		/**
		 * Credits to https://github.com/frk1/hazedumper
		 * Offset Counter-Strike: Global Offensive Patch 1.38.2.2 (version 1443)
		 */
		const url = 'https://cdn.jsdelivr.net/gh/frk1/hazedumper@d03933a/csgo.json';
		const { body } = await fetch(url);
		return { ...body.signatures, ...body.netvars };
	} catch (error) {
		const msg: string = error.response.text;
		throw new Error(msg);
	}
}

function getMatrix(address: number): number[] {
	const result: number[] = [];
	for (let i = 0; i < 16; i++) result.push(mem.readFloat(address + 0x4 * i));
	return result;
}

function getEntityAddr(address: number, localPlayerAddr: number): number[] {
	const result: number[] = [];
	for (let i = 0; i < 10; i++) {
		const tempAddr = mem.readDword(address + 0x10 * i);
		localPlayerAddr !== tempAddr && result.push(tempAddr);
	}
	return result;
}

const colors = {
	orange: [255, 165, 0],
	cyan: [0, 255, 255],
	black: [0, 0, 0],
	white: [255, 255, 255],
	red: [255, 0, 0],
	silver: [192, 192, 192],
};

class Entity {
	address: number;
	gameModule: number;
	dwRadarBase: number;
	wts: Vector2 | false;

	id: number;
	name: string | null;
	health: number;
	dormant: number;
	team: number;
	bone_base: number;
	pos: Vector3;

	constructor(address: number, gameModule: number, offset: Offset) {
		this.wts = vector2();
		this.address = address;
		this.gameModule = gameModule;
		this.dwRadarBase = offset.dwRadarBase;

		this.id = mem.readDword(this.address + 0x64);
		this.name = null;
		this.health = mem.readDword(this.address + offset.m_iHealth);
		this.dormant = mem.readDword(this.address + offset.m_bDormant);
		this.team = mem.readDword(this.address + offset.m_iTeamNum);
		this.bone_base = mem.readDword(this.address + offset.m_dwBoneMatrix);
		this.pos = mem.readVector3(this.address + offset.m_vecOrigin);
	}

	getName() {
		const radar_base = mem.readDword(this.gameModule + this.dwRadarBase);
		const hud_radar = mem.readDword(radar_base + 0x78);
		return mem.readString(hud_radar + 0x300 + 0x174 * (this.id - 1));
	}

	bonePos(bone_id: number) {
		return vector3(
			mem.readFloat(this.bone_base + 0x30 * bone_id + 0x0c),
			mem.readFloat(this.bone_base + 0x30 * bone_id + 0x1c),
			mem.readFloat(this.bone_base + 0x30 * bone_id + 0x2c)
		);
	}
}

void (async function () {
	const offset = await getcsgojson();
	const { th32ProcessID: processId } = mem.openProcess('csgo.exe');
	const { modBaseAddr: gameModule } = mem.findModule('client.dll', processId);

	// const overlay = overlayInit(); // windowed fullscreen
	const overlay = overlayInit('Counter-Strike: Global Offensive - Direct3D 9');
	const font = overlayFontInit(10, 'Tahoma');
	// setForeground('Counter-Strike: Global Offensive - Direct3D 9'); // windowed fullscreen need to call function setForeground

	while (overlayLoop(overlay)) {
		const localPlayerAddr = mem.readDword(gameModule + offset.dwLocalPlayer);
		if (localPlayerAddr === 0) continue; // no localplayer

		const localEntity = new Entity(localPlayerAddr, gameModule, offset);
		const viewMatrix = getMatrix(gameModule + offset.dwViewMatrix);

		const entityAddr = getEntityAddr(gameModule + offset.dwEntityList, localPlayerAddr);
		for (const entAddr of entityAddr) {
			if (entAddr === 0) continue;

			const ent = new Entity(entAddr, gameModule, offset);
			if (ent.team === localEntity.team || (ent.dormant && ent.health === 0)) continue;

			ent.wts = WorldToScreenDirectX(overlay, viewMatrix, ent.pos);
			if (ent.wts === false) continue;

			const headPos = WorldToScreenDirectX(overlay, viewMatrix, ent.bonePos(8));
			if (headPos === false) continue;

			ent.name = ent.getName();
			const head = headPos.y - ent.wts.y;
			const width = head / 2;
			const center = width / -2;

			drawCornerBox(
				ent.wts.x + center,
				ent.wts.y,
				width,
				head + 5,
				ent.team !== 2 ? colors.cyan : colors.orange,
				colors.black,
				0.3
			);

			drawValueBar(
				ent.wts.x + center - 5,
				ent.wts.y,
				ent.wts.x + center - 5,
				headPos.y + 5,
				2,
				100,
				ent.health
			);

			drawDashedLine(overlay.midX, 0, ent.wts.x, ent.wts.y, 1, colors.red);

			drawText(
				font,
				ent.wts.x - ent.name.length * 1.5,
				ent.wts.y - 10,
				ent.name,
				colors.silver
			);

			const entDist = (vector3Distance(ent.pos, localEntity.pos) / 20).toFixed() + 'm';
			drawText(
				font,
				ent.wts.x - entDist.length * 1.5,
				headPos.y + 10,
				entDist,
				colors.white
			);
		}

		await waits(5); // recommended value less then 20
	}
})();
