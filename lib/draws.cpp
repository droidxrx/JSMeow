#include "draws.hpp"

Value draw_text(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() < 5 || !info[0].IsObject() || !info[1].IsNumber() || !info[2].IsNumber() || !info[3].IsString() || !info[4].IsArray())
		Error::New(env, "requires 5 argument, first argument must be object, second and third argument must be a number, fourth argument must be a string, fifth argument must be array").ThrowAsJavaScriptException();
	else
	{
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
	}

	return env.Null();
}

Value draw_text_lines(const CallbackInfo &info)
{
	Env env = info.Env();

	if (info.Length() < 6 || !info[0].IsObject() || !info[1].IsNumber() || !info[2].IsNumber() || !info[3].IsArray() || !info[4].IsArray() || !info[5].IsNumber())
		Error::New(env, "requires 6 argument, first argument must be object, second and third argument must be a number, fourth argument must be a array, fifth argument must be array, sixth argument must be number").ThrowAsJavaScriptException();
	else
	{
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
		for (uint32_t i = 0; i < lines.Length(); i++)
		{
			std::string tempStr = lines.Get(i).As<String>();
			glWindowPos2f(x, y);
			glCallLists((int)tempStr.length(), GL_UNSIGNED_BYTE, tempStr.c_str());
			y = y - (height + offset);
		}

		glPopAttrib();
	}
	return env.Null();
}

Value draw_pixel(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() < 3 || !info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsArray())
		Error::New(env, "requires 3 argument, first and second argument must be a number, third argument must be array number");
	else
		pixelDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), colorRgb(info[2].As<Array>()));
	return env.Null();
}

Value draw_box(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() < 6 || !info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber() || !info[3].IsNumber() || !info[4].IsNumber() || !info[5].IsArray())
		Error::New(env, "requires 6 argument, first to fifth argument must be a number, sixth argument must be array number");
	else
		boxDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), getNapiFloat(info[3]), getNapiFloat(info[4]), colorRgb(info[5].As<Array>()));
	return env.Null();
}

Value draw_alpha_box(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() < 7 || !info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber() || !info[3].IsNumber() || !info[4].IsArray() || !info[5].IsArray() || !info[6].IsNumber())
		Error::New(env, "requires 7 argument, first to fourth argument must be a number, fifth and sixth argument must be array number, seventh argument must be number");
	else
		alphaBoxDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), getNapiFloat(info[3]), colorRgb(info[4].As<Array>()), colorRgb(info[5].As<Array>()), getNapiFloat(info[6]));
	return env.Null();
}

Value draw_corner_box(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() < 7 || !info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber() || !info[3].IsNumber() || !info[4].IsArray() || !info[5].IsArray() || !info[6].IsNumber())
		Error::New(env, "requires 7 argument, first to fourth argument must be a number, fifth and sixth argument must be array number, seventh argument must be number");
	else
		cornerBoxDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), getNapiFloat(info[3]), colorRgb(info[4].As<Array>()), colorRgb(info[5].As<Array>()), getNapiFloat(info[6]));
	return env.Null();
}

Value draw_line(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() < 6 || !info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber() || !info[3].IsNumber() || !info[4].IsNumber() || !info[5].IsArray())
		Error::New(env, "requires 6 argument, first to fifth argument must be a number, sixth argument must be array number");
	else
		lineDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), getNapiFloat(info[3]), getNapiFloat(info[4]), colorRgb(info[5].As<Array>()));
	return env.Null();
}

Value draw_dashed_line(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() < 9 || !info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber() || !info[3].IsNumber() || !info[4].IsNumber() || !info[5].IsNumber() || !info[6].IsNumber() || !info[7].IsArray() || !info[8].IsNumber())
		Error::New(env, "requires 9 argument, first to seventh argument must be a number, eighth argument must be array number, ninth argument must be a number");
	else
		dashedLineDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), getNapiFloat(info[3]), getNapiFloat(info[4]), info[5].As<Number>(), info[6].As<Number>(), colorRgb(info[7].As<Array>()), getNapiFloat(info[8]));
	return env.Null();
}

Value draw_circle(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() < 5 || !info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber() || !info[3].IsArray() || !info[4].IsBoolean())
		Error::New(env, "requires 5 argument, first to third argument must be a number, fourth argument must be array number, fifth argument must be a boolean");
	else
		circleDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), colorRgb(info[3].As<Array>()), info[4].As<Boolean>());
	return env.Null();
}

Value draw_rad_circle(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() < 6 || !info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber() || !info[3].IsNumber() || !info[4].IsNumber() || !info[5].IsArray())
		Error::New(env, "requires 6 argument, first to fifth argument must be a number, sixth argument must be array number");
	else
		radCircleDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), info[3].As<Number>(), info[4].As<Number>(), colorRgb(info[5].As<Array>()));
	return env.Null();
}

Value draw_value_bar(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() < 8 || !info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber() || !info[3].IsNumber() || !info[4].IsNumber() || !info[5].IsNumber() || !info[6].IsNumber() || !info[7].IsBoolean())
	{
		Error::New(env, "requires 8 argument, first to seventh argument must be a number, eighth argument must be array boolean");
		return env.Null();
	}

	bool valueMoreThenMaxValue = valueBarDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), getNapiFloat(info[3]), getNapiFloat(info[4]), getNapiFloat(info[5]), getNapiFloat(info[6]), info[7].As<Boolean>());
	if (valueMoreThenMaxValue)
		Error::New(info.Env(), "ValueBar: Max Value > value").ThrowAsJavaScriptException();
	return env.Null();
}

Value draw_poly(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() < 6 || !info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber() || !info[3].IsNumber() || !info[4].IsNumber() || !info[5].IsArray())
		Error::New(env, "requires 6 argument, first to fifth argument must be a number, sixth argument must be array number");
	else
		polyDraw(getNapiFloat(info[0]), getNapiFloat(info[1]), getNapiFloat(info[2]), getNapiFloat(info[3]), info[4].As<Number>(), colorRgb(info[5].As<Array>()));
	return env.Null();
}

Value draw_custom_shape(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() < 4)
		Error::New(env, "requires 1 argument, first argument must be a array vector2, second must be a array number, third argument must be a boolean, fourth argument must be a number");
	else
		customShapeDraw(info[0].As<Array>(), colorRgb(info[1].As<Array>()), info[2].As<Boolean>(), getNapiFloat(info[3]));
	return env.Null();
}

Object draws_exports(Env env, Object exports)
{
	Object result = Object::New(env);
	result.Set("text", Function::New(env, draw_text));
	result.Set("textLines", Function::New(env, draw_text_lines));
	result.Set("pixel", Function::New(env, draw_pixel));
	result.Set("box", Function::New(env, draw_box));
	result.Set("alphaBox", Function::New(env, draw_alpha_box));
	result.Set("cornerBox", Function::New(env, draw_corner_box));
	result.Set("line", Function::New(env, draw_line));
	result.Set("dashLine", Function::New(env, draw_dashed_line));
	result.Set("circle", Function::New(env, draw_circle));
	result.Set("radCircle", Function::New(env, draw_rad_circle));
	result.Set("valueBar", Function::New(env, draw_value_bar));
	result.Set("poly", Function::New(env, draw_poly));
	result.Set("customShape", Function::New(env, draw_custom_shape));

	exports.Set("draws", result);
	return exports;
}