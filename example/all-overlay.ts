import { overlay, draws, vector2, waitsLoop, colors } from '../';

async function main() {
	const { center } = overlay.init('Untitled - Notepad', false, 0x23);
	const font = overlay.fontInit(12, 'Impact');

	const x = center.x + 200;
	const y = center.y;
	const barLength = 300;
	const barWidth = 5;
	const maxHealth = 200;
	let currenHealth = maxHealth;

	const pointY = center.y - 175;
	const points1 = [
		vector2.create(120 + 120, 250 + pointY),
		vector2.create(400 + 120, 250 + pointY),
		vector2.create(400 + 120, 350 + pointY),
		vector2.create(450 + 120, 200 + pointY),
		vector2.create(120 + 120, 250 + pointY),
	];

	const points2 = [
		vector2.create(120 + 450, 250 + pointY),
		vector2.create(400 + 450, 250 + pointY),
		vector2.create(400 + 450, 350 + pointY),
		vector2.create(450 + 450, 200 + pointY),
		vector2.create(120 + 450, 250 + pointY),
	];

	while (overlay.loop(true)) {
		await waitsLoop(1);
		draws.text(font, 10, center.y, 'drawText', colors.red);
		draws.textLines(font, 70, center.y, ['drawTextLines1', 'drawTextLines2', 'drawTextLines3'], colors.red, 2.0);
		draws.pixel(175, center.y + 5, colors.red);
		draws.box(185, center.y - 45, 30, 50, 1.5, colors.red);
		draws.alphaBox(255, center.y - 45, 30, 50, colors.blue, colors.red, 0.3);
		draws.cornerBox(325, center.y - 45, 30, 50, colors.red, colors.green, 1.5);
		draws.line(400, center.y + 5, 400, center.y - 50, 1.5, colors.green);
		draws.dashLine(470, center.y + 5, 470, center.y - 90, 1.5, 2, null, colors.red, 2);
		draws.circle(620, center.y - 50, 50, colors.green, false);
		draws.radCircle(830, center.y - 50, 50, 0, 180, colors.green);
		draws.poly(55, center.y + 60, 50, 120, 2, colors.green);
		draws.customShape(points1, colors.green, false, 0.5);
		draws.customShape(points2, colors.green, true, 0.5);
		draws.valueBar(x, y, x, y + barLength, barWidth, maxHealth, currenHealth, true);
		draws.valueBar(x, y - 12, x + barLength, y - 12, barWidth, maxHealth, currenHealth, false);
		draws.cornerBox(x + 7, y, barLength - 7, barLength, [255, 255, 255], [0, 0, 0], 1.5);
		if (currenHealth === 0) currenHealth = maxHealth;
		else currenHealth -= 1;
	}
}

void main();
