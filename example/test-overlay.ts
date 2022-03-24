import JSMeow from '../';

const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
const getTime = () => Math.floor(Date.now() / 1000);
const fmod = (a: number, b: number) => +(a - Math.floor(a / b) * b).toPrecision(8);

const color = {
	red: [255, 0, 0],
	green: [0, 128, 0],
	blue: [0, 0, 255],
	white: [255, 255, 255],
	aqua: [0, 255, 255],
	random: [0, 0.3, 0.6],
};

void (async function () {
	const overlay = JSMeow.overlayInit('FullScreen', 35, 25);
	const font = JSMeow.overlayFontInit(12, 'Impact');

	const radius = 50;
	let x = overlay.midX;
	let y = overlay.midY;
	const speed = 5;
	let ballLeft = false;
	let ballDown = false;
	let frames = 0;
	let fps = 0;

	let prevTime = getTime();
	const stars = [JSMeow.vector2(1, 2)];

	for (let i = 0; i < 299; i++) stars.push(JSMeow.vector2(randomNumber(0, overlay.width), randomNumber(0, overlay.height)));

	while (JSMeow.overlayLoop(overlay)) {
		const currTime = getTime();
		frames += 1;

		if (currTime - prevTime > 1) {
			fps = frames;
			frames = 0;
			prevTime = currTime;
		}

		for (let i = 0; i < stars.length; i++) JSMeow.drawPixelV(stars[i], color.white);
		JSMeow.drawPoly(overlay.midX, overlay.midY, 100, 0, 6, color.aqua);
		JSMeow.drawText(font, overlay.midX - 20, overlay.midY, `FPS: ${fps}`, [color.random[2], color.random[0], color.random[1]]);

		if (ballLeft) {
			if (x > overlay.width - radius) ballLeft = false;
			else x += speed;
		} else if (x < -1 + radius) ballLeft = true;
		else x -= speed;

		if (ballDown) {
			if (y > overlay.height - radius) ballDown = false;
			else y += speed;
		} else if (y < -1 + radius) ballDown = true;
		else y -= speed;

		color.random[0] = fmod(color.random[0] + 0.001, 1);
		color.random[1] = fmod(color.random[1] + 0.002, 1);
		color.random[2] = fmod(color.random[2] + 0.003, 1);

		JSMeow.drawCircle(x, y, radius - 15, color.random, false);
		JSMeow.drawCircle(x, y, radius - 15, [color.random[1], color.random[2], color.random[0]]);

		await JSMeow.waits(15);
	}
})();
