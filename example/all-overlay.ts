import JSMeow from '../';

void (async function () {
	const overlay = JSMeow.overlayInit('FullScreen', 35, 25);
	const Font = JSMeow.overlayFontInit(12, 'Impact');

	const x = overlay.midX + 200;
	const y = overlay.midY;
	const barLength = 300;
	const barWidth = 5;
	const maxHealth = 200;
	let currenHealth = maxHealth;

	const points1 = [
		{ x: 120 + 120, y: 250 + overlay.midY - 175 },
		{ x: 400 + 120, y: 250 + overlay.midY - 175 },
		{ x: 400 + 120, y: 350 + overlay.midY - 175 },
		{ x: 450 + 120, y: 200 + overlay.midY - 175 },
		{ x: 120 + 120, y: 250 + overlay.midY - 175 },
	];

	const points2 = [
		{ x: 120 + 450, y: 250 + overlay.midY - 175 },
		{ x: 400 + 450, y: 250 + overlay.midY - 175 },
		{ x: 400 + 450, y: 350 + overlay.midY - 175 },
		{ x: 450 + 450, y: 200 + overlay.midY - 175 },
		{ x: 120 + 450, y: 250 + overlay.midY - 175 },
	];

	const color = {
		red: [255, 0, 0],
		green: [0, 128, 0],
		blue: [0, 0, 255],
	};

	while (JSMeow.overlayLoop(overlay, true)) {
		JSMeow.drawText(Font, 10, overlay.midY, 'drawText', color.red);
		JSMeow.drawTextLines(Font, 70, overlay.midY, ['drawTextLines1', 'drawTextLines2', 'drawTextLines3'], color.red, 2.0);

		JSMeow.drawPixel(175, overlay.midY + 5, color.red);
		JSMeow.drawPixelV({ x: 175, y: overlay.midY - 5 }, color.red);

		JSMeow.drawBox(185, overlay.midY - 45, 30, 50, 1.5, color.red);
		JSMeow.drawBoxV({ x: 220, y: overlay.midY - 45 }, 30, 50, 1.5, color.red);

		JSMeow.drawAlphaBox(255, overlay.midY - 45, 30, 50, color.blue, color.red, 0.3);
		JSMeow.drawAlphaBoxV({ x: 290, y: overlay.midY - 45 }, 30, 50, color.blue, color.red, 0.3);

		JSMeow.drawCornerBox(325, overlay.midY - 45, 30, 50, color.red, color.green, 1.5);
		JSMeow.drawCornerBoxV({ x: 360, y: overlay.midY - 45 }, 30, 50, color.red, color.green, 1.5);

		JSMeow.drawLine(400, overlay.midY + 5, 400, overlay.midY - 50, 1.5, color.green);
		JSMeow.drawLineV({ x: 405, y: overlay.midY + 5 }, { x: 455, y: overlay.midY + 5 }, 1.5, color.green);

		JSMeow.drawDashedLine(470, overlay.midY + 5, 470, overlay.midY - 90, 1.5, color.green);
		JSMeow.drawDashedLineV({ x: 475, y: overlay.midY + 5 }, { x: 570, y: overlay.midY + 5 }, 1.5, color.green);

		JSMeow.drawCircle(620, overlay.midY - 50, 50, color.green, false);
		JSMeow.drawCircleV({ x: 725, y: overlay.midY - 50 }, 50, color.green, true);

		JSMeow.drawRadCircle(830, overlay.midY - 50, 50, 0, 180, color.green);
		JSMeow.drawRadCircleV({ x: 935, y: overlay.midY - 50 }, 50, 180, 360, color.green);

		JSMeow.drawPoly(55, overlay.midY + 60, 50, 120, 2, color.green);
		JSMeow.drawPolyV({ x: 155, y: overlay.midY + 60 }, 50, 25, 2, color.green);

		JSMeow.drawCustomShape(points1, color.green, false);
		JSMeow.drawCustomShape(points2, color.green, true, 0.5);

		JSMeow.drawValueBar(x, y, x, y + barLength, barWidth, maxHealth, currenHealth);
		JSMeow.drawValueBar(x, y - 12, x + barLength, y - 12, barWidth, maxHealth, currenHealth, false);
		JSMeow.drawCornerBox(x + 7, y, barLength - 7, barLength, [255, 255, 255], [0, 0, 0], 1.5);

		if (currenHealth === 0) currenHealth = maxHealth;
		else currenHealth -= 1;

		await JSMeow.waits(1);
	}
})();
