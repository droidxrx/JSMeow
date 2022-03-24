import { Font, Overlay, overlays } from './addon';
import { isBoolean, isNumber, isObject, isString } from './checking-params';

export function overlayClose(overlay: Overlay) {
	if (!isObject(overlay))
		throw new TypeError(
			'Parameter overlay must be object get from Function overlayInit'
		);
	overlays.overlayClose(overlay);
}

export function overlayDeinit(overlay: Overlay) {
	if (!isObject(overlay))
		throw new TypeError(
			'Parameter overlay must be object get from Function overlayInit'
		);
	overlays.overlayDeinit(overlay);
}

export function overlayFontDeInit(font: Font) {
	if (!isObject(font))
		throw new TypeError(
			'Parameter font must be object get from Function overlayFontInit'
		);
	overlays.overlayFontDeInit(font);
}

export function overlayFontInit(height: number, fontName: string) {
	if (!isNumber(height)) throw new TypeError('Parameter height must be number');
	if (!isString(fontName)) throw new TypeError('Parameter fontName must be string');
	return overlays.overlayFontInit(height, fontName);
}

export function overlayLoop(overlay: Overlay, update = true) {
	if (!isObject(overlay))
		throw new TypeError(
			'Parameter overlay must be object get from Function overlayInit'
		);
	if (!isBoolean(update)) throw new TypeError('Parameter update must be boolean');
	return overlays.overlayLoop(overlay, update);
}

export function overlaySetPos(overlay: Overlay) {
	if (!isObject(overlay))
		throw new TypeError(
			'Parameter overlay must be object get from Function overlayInit'
		);
	return overlays.overlaySetPos(overlay);
}

export function overlayUpdate(overlay: Overlay) {
	if (!isObject(overlay))
		throw new TypeError(
			'Parameter overlay must be object get from Function overlayInit'
		);
	overlays.overlayUpdate(overlay);
}

export function overlayInit(target = 'FullScreen', exitkey = 0x23, borderOffset = 25) {
	if (!isString(target))
		throw new TypeError('Parameter target must be string default is "FullScreen"');
	if (!isNumber(exitkey)) throw new TypeError('Parameter exitkey must be number');
	if (!isNumber(borderOffset))
		throw new TypeError('Parameter borderOffset must be number');
	return overlays.overlayInit(target, exitkey, borderOffset);
}

export default {
	overlayClose,
	overlayDeinit,
	overlayFontDeInit,
	overlayFontInit,
	overlayLoop,
	overlaySetPos,
	overlayUpdate,
	overlayInit,
};
