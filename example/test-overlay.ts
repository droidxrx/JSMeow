import { colors, overlay, vector2, waitsLoop, draws } from '..';

const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
const getTime = () => Math.floor(Date.now() / 1000);
const fmod = (a: number, b: number) => +(a - Math.floor(a / b) * b).toPrecision(8);

async function main() {
	const { center, width, height } = overlay.init('Untitled - Notepad', true, 0x23);
	const font = overlay.fontInit(12, 'Impact');

	const radius = 50;
	let x = center.x;
	let y = center.y;
	const speed = 5;
	let ballLeft = false;
	let ballDown = false;
	let frames = 0;
	let fps = 0;
	const randomColor = [0, 0.3, 0.6];

	let prevTime = getTime();
	const stars = [vector2.create(1, 2)];

	for (let i = 0; i < 299; i++) stars.push(vector2.create(randomNumber(0, width), randomNumber(0, height)));

	while (overlay.loop(true)) {
		await waitsLoop(1);
		const currTime = getTime();
		frames += 1;

		if (currTime - prevTime > 1) {
			fps = frames;
			frames = 0;
			prevTime = currTime;
		}

		for (let i = 0; i < stars.length; i++) draws.pixel(stars[i].x, stars[i].y, colors.white);
		draws.poly(center.x, center.y, 100, 0, 6, colors.aqua);
		draws.text(font, center.x - 20, center.y, `FPS: ${fps}`, [randomColor[2], randomColor[0], randomColor[1]]);

		if (ballLeft) {
			if (x > width - radius) ballLeft = false;
			else x += speed;
		} else if (x < -1 + radius) ballLeft = true;
		else x -= speed;

		if (ballDown) {
			if (y > height - radius) ballDown = false;
			else y += speed;
		} else if (y < -1 + radius) ballDown = true;
		else y -= speed;

		randomColor[0] = fmod(randomColor[0] + 0.001, 1);
		randomColor[1] = fmod(randomColor[1] + 0.002, 1);
		randomColor[2] = fmod(randomColor[2] + 0.003, 1);

		draws.circle(x, y, radius - 15, randomColor, false);
		draws.circle(x, y, radius - 15, [randomColor[1], randomColor[2], randomColor[0]], true);
	}
}

void main();
