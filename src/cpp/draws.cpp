#include "draws.h"

Value drawText(const CallbackInfo &info) {
	GLuint base = info[0].As<Object>().Get("font").As<Number>();
	GLfloat x = getNapiFloat(info[1]);
	GLfloat y = getNapiFloat(info[2]);
	std::string text = info[3].As<String>();
	rgbColor color = colorRgb(info[4].As<Array>());

	glColor3f(color.r, color.g, color.b);
	glWindowPos2f(x, y);
	glPushAttrib(GL_LIST_BIT);
	glListBase(base - 32);
	glCallLists((int)text.length(), GL_UNSIGNED_BYTE, text.c_str());
	glPopAttrib();
	return info.Env().Undefined();
}

Value drawTextLines(const CallbackInfo &info) {
	Object Font = info[0].As<Object>();

	GLuint base = Font.Get("font").As<Number>();
	GLfloat x = getNapiFloat(info[1]);
	GLfloat y = getNapiFloat(info[2]);
	Array lines = info[3].As<Array>();
	rgbColor color = colorRgb(info[4].As<Array>());
	GLfloat offset = getNapiFloat(info[5]);

	glColor3f(color.r, color.g, color.b);
	glPushAttrib(GL_LIST_BIT);
	glListBase(base - 32);

	GLfloat height = getNapiFloat(Font.Get("height"));
	for (uint32_t i = 0; i < lines.Length(); i++) {
		std::string tempStr = lines.Get(i).As<String>();
		glWindowPos2f(x, y);
		glCallLists((int)tempStr.length(), GL_UNSIGNED_BYTE, tempStr.c_str());
		y = y - (height + offset);
	}

	glPopAttrib();
	return info.Env().Undefined();
}

Value drawPixel(const CallbackInfo &info) {
	pixelDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), colorRgb(info[2].As<Array>()));
	return info.Env().Undefined();
}

Value drawPixelV(const CallbackInfo &info) {
	vec2 xy = getVec2(info[0].As<Object>());
	pixelDraw(xy.x, xy.y, colorRgb(info[1].As<Array>()));
	return info.Env().Undefined();
}

Value drawBox(const CallbackInfo &info) {
	boxDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), getNapiFloat(info[3]), getNapiFloat(info[4]), colorRgb(info[5].As<Array>()));
	return info.Env().Undefined();
}

Value drawBoxV(const CallbackInfo &info) {
	vec2 xy = getVec2(info[0].As<Object>());
	boxDraw(xy.x, xy.y, getNapiFloat(info[1]), getNapiFloat(info[2]), getNapiFloat(info[3]), colorRgb(info[4].As<Array>()));
	return info.Env().Undefined();
}

Value drawAlphaBox(const CallbackInfo &info) {
	alphaBoxDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), getNapiFloat(info[3]), colorRgb(info[4].As<Array>()), colorRgb(info[5].As<Array>()), getNapiFloat(info[6]));
	return info.Env().Undefined();
}

Value drawAlphaBoxV(const CallbackInfo &info) {
	vec2 xy = getVec2(info[0].As<Object>());
	alphaBoxDraw(xy.x, xy.y, getNapiFloat(info[1]), getNapiFloat(info[2]), colorRgb(info[3].As<Array>()), colorRgb(info[4].As<Array>()), getNapiFloat(info[5]));
	return info.Env().Undefined();
}

Value drawCornerBox(const CallbackInfo &info) {
	cornerBoxDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), getNapiFloat(info[3]), colorRgb(info[4].As<Array>()), colorRgb(info[5].As<Array>()), getNapiFloat(info[6]));
	return info.Env().Undefined();
}

Value drawCornerBoxV(const CallbackInfo &info) {
	vec2 xy = getVec2(info[0].As<Object>());
	cornerBoxDraw(xy.x, xy.y, getNapiFloat(info[1]), getNapiFloat(info[2]), colorRgb(info[3].As<Array>()), colorRgb(info[4].As<Array>()), getNapiFloat(info[5]));
	return info.Env().Undefined();
}

Value drawLine(const CallbackInfo &info) {
	lineDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), getNapiFloat(info[3]), getNapiFloat(info[4]), colorRgb(info[5].As<Array>()));
	return info.Env().Undefined();
}

Value drawLineV(const CallbackInfo &info) {
	vec2 xy1 = getVec2(info[0].As<Object>());
	vec2 xy2 = getVec2(info[1].As<Object>());
	lineDraw(xy1.x, xy1.y, xy2.x, xy2.y, getNapiFloat(info[2]), colorRgb(info[3].As<Array>()));
	return info.Env().Undefined();
}

Value drawDashedLine(const CallbackInfo &info) {
	dashedLineDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), getNapiFloat(info[3]), getNapiFloat(info[4]), info[5].As<Number>(), info[6].As<Number>(), colorRgb(info[7].As<Array>()), getNapiFloat(info[8]));
	return info.Env().Undefined();
}

Value drawDashedLineV(const CallbackInfo &info) {
	vec2 xy1 = getVec2(info[0].As<Object>());
	vec2 xy2 = getVec2(info[1].As<Object>());
	dashedLineDraw(xy1.x, xy1.y, xy2.x, xy2.y, getNapiFloat(info[2]), info[3].As<Number>(), info[4].As<Number>(), colorRgb(info[5].As<Array>()), getNapiFloat(info[6]));
	return info.Env().Undefined();
}

Value drawCircle(const CallbackInfo &info) {
	circleDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), colorRgb(info[3].As<Array>()), info[4].As<Boolean>());
	return info.Env().Undefined();
}

Value drawCircleV(const CallbackInfo &info) {
	vec2 xy = getVec2(info[0].As<Object>());
	circleDraw(xy.x, xy.y, getNapiFloat(info[1]), colorRgb(info[2].As<Array>()), info[3].As<Boolean>());
	return info.Env().Undefined();
}

Value drawRadCircle(const CallbackInfo &info) {
	radCircleDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), info[3].As<Number>(), info[4].As<Number>(), colorRgb(info[5].As<Array>()));
	return info.Env().Undefined();
}

Value drawRadCircleV(const CallbackInfo &info) {
	vec2 xy = getVec2(info[0].As<Object>());
	radCircleDraw(xy.x, xy.y, getNapiFloat(info[1]), info[2].As<Number>(), info[3].As<Number>(), colorRgb(info[4].As<Array>()));
	return info.Env().Undefined();
}

Value drawValueBar(const CallbackInfo &info) {
	bool valueMoreThenMaxValue = valueBarDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), getNapiFloat(info[3]), getNapiFloat(info[4]), getNapiFloat(info[5]), getNapiFloat(info[6]), info[7].As<Boolean>());
	if (valueMoreThenMaxValue)
		Error::New(info.Env(), "ValueBar: Max Value > value").ThrowAsJavaScriptException();
	return info.Env().Undefined();
}

Value drawValueBarV(const CallbackInfo &info) {
	vec2 xy1 = getVec2(info[0].As<Object>());
	vec2 xy2 = getVec2(info[1].As<Object>());
	bool valueMoreThenMaxValue = valueBarDraw(xy1.x, xy1.y, xy2.x, xy2.y, getNapiFloat(info[2]), getNapiFloat(info[3]), getNapiFloat(info[4]), info[5].As<Boolean>());
	if (valueMoreThenMaxValue)
		Error::New(info.Env(), "ValueBar: Max Value > value").ThrowAsJavaScriptException();
	return info.Env().Undefined();
}

Value drawPoly(const CallbackInfo &info) {
	polyDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), getNapiFloat(info[3]), info[4].As<Number>(), colorRgb(info[5].As<Array>()));
	return info.Env().Undefined();
}

Value drawPolyV(const CallbackInfo &info) {
	vec2 xy = getVec2(info[0].As<Object>());
	polyDraw(xy.x, xy.y, getNapiFloat(info[1]), getNapiFloat(info[2]), info[3].As<Number>(), colorRgb(info[4].As<Array>()));
	return info.Env().Undefined();
}

Value drawCustomShape(const CallbackInfo &info) {
	customShapeDraw(info[0].As<Array>(), colorRgb(info[1].As<Array>()), info[2].As<Boolean>(), getNapiFloat(info[3]));
	return info.Env().Undefined();
}

Object drawsInit(Env env, Object exports) {
	exports.Set("drawText", Function::New(env, drawText));
	exports.Set("drawTextLines", Function::New(env, drawTextLines));
	exports.Set("drawPixel", Function::New(env, drawPixel));
	exports.Set("drawPixelV", Function::New(env, drawPixelV));
	exports.Set("drawBox", Function::New(env, drawBox));
	exports.Set("drawBoxV", Function::New(env, drawBoxV));
	exports.Set("drawAlphaBox", Function::New(env, drawAlphaBox));
	exports.Set("drawAlphaBoxV", Function::New(env, drawAlphaBoxV));
	exports.Set("drawCornerBox", Function::New(env, drawCornerBox));
	exports.Set("drawCornerBoxV", Function::New(env, drawCornerBoxV));
	exports.Set("drawLine", Function::New(env, drawLine));
	exports.Set("drawLineV", Function::New(env, drawLineV));
	exports.Set("drawDashedLine", Function::New(env, drawDashedLine));
	exports.Set("drawDashedLineV", Function::New(env, drawDashedLineV));
	exports.Set("drawCircle", Function::New(env, drawCircle));
	exports.Set("drawCircleV", Function::New(env, drawCircleV));
	exports.Set("drawRadCircle", Function::New(env, drawRadCircle));
	exports.Set("drawRadCircleV", Function::New(env, drawRadCircleV));
	exports.Set("drawValueBar", Function::New(env, drawValueBar));
	exports.Set("drawValueBarV", Function::New(env, drawValueBarV));
	exports.Set("drawPoly", Function::New(env, drawPoly));
	exports.Set("drawPolyV", Function::New(env, drawPolyV));
	exports.Set("drawCustomShape", Function::New(env, drawCustomShape));

	return exports;
}