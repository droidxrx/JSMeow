#include "include.hpp"
#include "draws.hpp"
#include "misc.hpp"
#include "vector_utils.hpp"
#include "colors.hpp"
#include "memory/memoryjs.hpp"

GLFWwindow *overlay_window;
HWND overlay_hwnd;
HWND target_hwnd;
int32_t exitKey;

Value overlay_init(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() < 3)
	{
		Error::New(env, "requires 3 arguments").ThrowAsJavaScriptException();
		return env.Null();
	}
	if (!info[0].IsString() || !info[1].IsBoolean() || !info[2].IsNumber())
	{
		Error::New(env, "first argument must be a string, second must be a boolean, third must be a number").ThrowAsJavaScriptException();
		return env.Null();
	}

	Object result = Object::New(env);
	Object overlayCenterScreen = Object::New(env);
	std::string target = info[0].As<String>();
	bool windowed_fullscreen = info[1].As<Boolean>();
	exitKey = info[2].As<Number>().Int32Value();
	int32_t width, height;
	POINT ptClientUL;
	RECT rect;

	if (glfwInit() == 0)
	{
		Error::New(env, "GLFW initialization failed.").ThrowAsJavaScriptException();
		return env.Null();
	}

	glfwWindowHint(GLFW_FLOATING, 1);
	glfwWindowHint(GLFW_DECORATED, 0);
	glfwWindowHint(GLFW_RESIZABLE, 0);
	glfwWindowHint(GLFW_TRANSPARENT_FRAMEBUFFER, 1);
	glfwWindowHint(GLFW_MOUSE_PASSTHROUGH, 1);
	glfwWindowHint(GLFW_SAMPLES, 8);

	target_hwnd = FindWindowA(NULL, target.c_str());
	if (target_hwnd == 0)
	{
		Error::New(env, "Window " + target + " not found.").ThrowAsJavaScriptException();
		return env.Null();
	}

	if (windowed_fullscreen)
	{
		const GLFWvidmode *videoMode = glfwGetVideoMode(glfwGetPrimaryMonitor());
		width = videoMode->width;
		height = videoMode->height;
	}
	else
	{
		if (!SetForegroundWindow(target_hwnd))
		{
			Error::New(env, "Failed to set focus " + target).ThrowAsJavaScriptException();
			return env.Null();
		}

		GetClientRect(target_hwnd, &rect);
		ptClientUL.x = rect.left;
		ptClientUL.y = rect.top;

		if (!ClientToScreen(target_hwnd, &ptClientUL))
		{
			Error::New(env, "Failed to set focus " + target).ThrowAsJavaScriptException();
			return env.Null();
		}

		width = rect.right;
		height = rect.bottom;
	}

	overlayCenterScreen.Set("x", width / 2);
	overlayCenterScreen.Set("y", height / 2);
	result.Set("width", width);
	result.Set("height", height);
	result.Set("center", overlayCenterScreen);

	overlay_window = glfwCreateWindow(width - 0.001, height - 0.001, "JSMeow", NULL, NULL);
	glfwSetInputMode(overlay_window, GLFW_CURSOR, GLFW_CURSOR_DISABLED);
	glfwMakeContextCurrent(overlay_window);
	glfwSwapInterval(0);

	if (glewInit() != GLEW_OK)
	{
		Error::New(env, "OPENGL initialization failed.").ThrowAsJavaScriptException();
		return env.Null();
	}

	glPushAttrib(GL_ALL_ATTRIB_BITS);
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	glOrtho(0, width, 0, height, -1, 1);
	glDisable(GL_DEPTH_TEST);
	glDisable(GL_TEXTURE_2D);
	glEnable(GL_BLEND);
	glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

	overlay_hwnd = glfwGetWin32Window(overlay_window);
	if (windowed_fullscreen == false && !SetWindowPos(overlay_hwnd, NULL, ptClientUL.x, ptClientUL.y, 0, 0, SWP_NOSIZE))
	{
		Error::New(env, "Failed to set position overlay").ThrowAsJavaScriptException();
		return env.Null();
	}

	return result;
}

Value overlay_deinit(CallbackInfo &info)
{
	glfwDestroyWindow(overlay_window);
	glfwTerminate();
	return info.Env().Null();
}

Value overlay_update(const CallbackInfo &info)
{
	glfwSwapBuffers(overlay_window);
	glClear(GL_COLOR_BUFFER_BIT);
	glfwPollEvents();
	return info.Env().Null();
}

Value overlay_close(const CallbackInfo &info)
{
	glfwSetWindowShouldClose(overlay_window, true);
	return info.Env().Null();
}

Value overlay_loop(const CallbackInfo &info)
{
	bool shouldClose;

	if (GetAsyncKeyState(exitKey))
		overlay_close(info);

	if (info[0].As<Boolean>())
		overlay_update(info);

	if (target_hwnd != 0)
		shouldClose = IsWindow(target_hwnd) && !(bool)glfwWindowShouldClose(overlay_window);
	else
		shouldClose = !(bool)glfwWindowShouldClose(overlay_window);

	return Boolean::From(info.Env(), shouldClose);
}

Value overlay_set_pos(const CallbackInfo &info)
{
	Env env = info.Env();
	int32_t x, y;

	if (info.Length() < 2)
	{
		POINT ptClientUL;
		RECT rect;
		GetClientRect(target_hwnd, &rect);
		ptClientUL.x = rect.left;
		ptClientUL.y = rect.top;

		if (!ClientToScreen(target_hwnd, &ptClientUL))
		{
			Error::New(env, "Failed to set position ").ThrowAsJavaScriptException();
			return env.Null();
		}

		x = ptClientUL.x;
		y = ptClientUL.y;
	}
	else
	{
		if (!info[0].IsNumber() || !info[1].IsNumber())
		{
			Error::New(env, "first and second argument must be a number").ThrowAsJavaScriptException();
			return env.Null();
		}
		x = info[0].As<Number>().Int32Value();
		y = info[1].As<Number>().Int32Value();
	}

	return Boolean::From(info.Env(), SetWindowPos(overlay_hwnd, NULL, x, y, 0, 0, SWP_NOSIZE | SWP_NOACTIVATE));
}

Value overlay_font_init(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() < 2)
	{
		Error::New(env, "requires 2 arguments").ThrowAsJavaScriptException();
		return env.Null();
	}
	if (!info[0].IsNumber() || !info[1].IsString())
	{
		Error::New(env, "first argument must be a number and second argument must be a string").ThrowAsJavaScriptException();
		return env.Null();
	}
	int height = info[0].As<Number>();
	std::string fontName = info[1].As<String>();
	Object result = Object::New(env);
	HDC fontHDC = wglGetCurrentDC();

	if (fontHDC == 0)
	{
		Error::New(env, "Font initialisation without a overlay").ThrowAsJavaScriptException();
		return env.Null();
	}

	result.Set("fontHDC", (intptr_t)fontHDC);

	HFONT hFont = CreateFontA(-(height), 0, 0, 0, FW_DONTCARE, 0, 0, 0, ANSI_CHARSET, OUT_TT_PRECIS, CLIP_DEFAULT_PRECIS, DEFAULT_QUALITY, FF_DONTCARE | DEFAULT_PITCH, fontName.c_str());
	HGDIOBJ hOldFont = SelectObject(fontHDC, hFont);

	result.Set("font", (int32_t)glGenLists(96));
	result.Set("height", height);

	wglUseFontBitmaps(fontHDC, 32, 96, result.Get("font").As<Number>().Int32Value());
	SelectObject(fontHDC, hOldFont);
	DeleteObject(hFont);

	return result;
}

Value overlay_font_deinit(const CallbackInfo &info)
{
	Env env = info.Env();
	if (!info.Length() == 0 || !info[0].IsObject())
	{
		Error::New(env, "requires 1 argument and argument must be object").ThrowAsJavaScriptException();
		return env.Null();
	}
	glDeleteLists(info[0].As<Object>().Get("font").As<Number>(), 96);
	return env.Null();
}

Object overlay_exports(Env env, Object exports)
{
	Object result = Object::New(env);
	result.Set("init", Function::New(env, overlay_init));
	result.Set("deInit", Function::New(env, overlay_deinit));
	result.Set("update", Function::New(env, overlay_update));
	result.Set("close", Function::New(env, overlay_close));
	result.Set("loop", Function::New(env, overlay_loop));
	result.Set("setPosition", Function::New(env, overlay_set_pos));
	result.Set("fontInit", Function::New(env, overlay_font_init));
	result.Set("fontDeInit", Function::New(env, overlay_font_deinit));

	exports.Set("overlay", result);
	return exports;
}

Object init_modules(Env env, Object exports)
{
	overlay_exports(env, exports);
	misc_exports(env, exports);
	draws_exports(env, exports);
	vector_utils_exports(env, exports);
	memory_exports(env, exports);
	colors_exports(env, exports);
	return exports;
}

NODE_API_MODULE(JSMeow, init_modules);