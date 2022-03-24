#include "overlay.h"

#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include <GLFW/glfw3native.h>

Value overlayInit(const CallbackInfo &info) {
	Env env = info.Env();
	Object result = Object::New(env);

	std::string target = info[0].As<String>();
	int borderOffset = info[2].As<Number>(), width, height;

	RECT rect;

	if (glfwInit() == 0) {
		Error::New(env, "GLFW initialization failed.").ThrowAsJavaScriptException();
		return env.Undefined();
	}

	glfwWindowHint(GLFW_FLOATING, 1);
	glfwWindowHint(GLFW_DECORATED, 0);
	glfwWindowHint(GLFW_RESIZABLE, 0);
	glfwWindowHint(GLFW_TRANSPARENT_FRAMEBUFFER, 1);
	glfwWindowHint(GLFW_MOUSE_PASSTHROUGH, 1);
	glfwWindowHint(GLFW_SAMPLES, 8);

	if (target == "FullScreen") {
		const GLFWvidmode *videoMode = glfwGetVideoMode(glfwGetPrimaryMonitor());
		width = videoMode->width;
		height = videoMode->height;

		result.Set("width", width);
		result.Set("height", height);
		result.Set("midX", width / 2);
		result.Set("midY", height / 2);
		result.Set("target", "FullScreen");
		result.Set("targetHwnd", 0);
	} else {
		HWND hwnd = FindWindowA(NULL, target.c_str());
		if (hwnd == 0) {
			Error::New(env, "Window " + target + " not found.").ThrowAsJavaScriptException();
			return env.Undefined();
		}

		SetForegroundWindow(hwnd);

		GetWindowRect(hwnd, &rect);
		width = rect.right - rect.left;
		height = rect.bottom - rect.top - borderOffset;

		result.Set("width", width);
		result.Set("height", height);
		result.Set("midX", width / 2);
		result.Set("midY", height / 2);
		result.Set("target", target);
		result.Set("targetHwnd", (intptr_t)hwnd);
	}

	GLFWwindow *OverlayWindow = glfwCreateWindow(width - 1, height - 1, "JSMeow", NULL, NULL);
	result.Set("exitKey", info[1].As<Number>());
	result.Set("window", (intptr_t)OverlayWindow);

	glfwSetInputMode(OverlayWindow, GLFW_CURSOR, GLFW_CURSOR_DISABLED);
	glfwMakeContextCurrent(OverlayWindow);
	glfwSwapInterval(0);

	if (glewInit() != GLEW_OK) {
		Error::New(env, "OPENGL initialization failed.").ThrowAsJavaScriptException();
		return env.Undefined();
	}

	glPushAttrib(GL_ALL_ATTRIB_BITS);
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	glOrtho(0, width, 0, height, -1, 1);
	glDisable(GL_DEPTH_TEST);
	glDisable(GL_TEXTURE_2D);
	glEnable(GL_BLEND);
	glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

	HWND hwnd = glfwGetWin32Window(OverlayWindow);
	result.Set("hwnd", (intptr_t)hwnd);

	if (target != "FullScreen" && !SetWindowPos(hwnd, NULL, rect.left, rect.top + borderOffset, 0, 0, 0x0001)) {
		Error::New(env, "Failed to set position overlay").ThrowAsJavaScriptException();
		return env.Undefined();
	}

	return result;
}

Value overlayDeinit(CallbackInfo &info) {
	glfwDestroyWindow((GLFWwindow *)(intptr_t)info[0].As<Object>().Get("window").As<Number>());
	glfwTerminate();
	return info.Env().Undefined();
}

Value overlayUpdate(const CallbackInfo &info) {
	glfwSwapBuffers((GLFWwindow *)(intptr_t)info[0].As<Object>().Get("window").As<Number>());
	glClear(GL_COLOR_BUFFER_BIT);
	glfwPollEvents();
	return info.Env().Undefined();
}

Value overlayClose(const CallbackInfo &info) {
	glfwSetWindowShouldClose((GLFWwindow *)(intptr_t)info[0].As<Object>().Get("window").As<Number>(), true);
	return info.Env().Null();
}

Value overlayLoop(const CallbackInfo &info) {
	Object ov = info[0].As<Object>();
	intptr_t targetHwnd = ov.Get("targetHwnd").As<Number>(), ovWindow = ov.Get("window").As<Number>();
	bool shouldClose;

	if (GetAsyncKeyState(ov.Get("exitKey").As<Number>()))
		overlayClose(info);
	if (info[1].As<Boolean>())
		overlayUpdate(info);
	if (targetHwnd != 0)
		shouldClose = IsWindow((HWND)targetHwnd) && !(bool)glfwWindowShouldClose((GLFWwindow *)ovWindow);
	else
		shouldClose = !(bool)glfwWindowShouldClose((GLFWwindow *)ovWindow);

	return Boolean::From(info.Env(), shouldClose);
}

Value overlaySetPos(const CallbackInfo &info) {
	return Boolean::New(info.Env(), SetWindowPos((HWND)(intptr_t)info[0].As<Object>().Get("hwnd").As<Number>(), NULL, info[1].As<Number>(), info[2].As<Number>(), 0, 0, 0x0001));
}

Value overlayFontInit(const CallbackInfo &info) {
	Object result = Object::New(info.Env());
	HDC fontHDC = wglGetCurrentDC();

	if (fontHDC == 0) {
		Error::New(info.Env(), "Font initialisation without a overlay").ThrowAsJavaScriptException();
		return info.Env().Undefined();
	}

	result.Set("fontHDC", (intptr_t)fontHDC);
	int height = info[0].As<Number>();
	std::string fontName = info[1].As<String>();

	HFONT hFont = CreateFontA(-(height), 0, 0, 0, FW_DONTCARE, 0, 0, 0, ANSI_CHARSET, OUT_TT_PRECIS, CLIP_DEFAULT_PRECIS, DEFAULT_QUALITY, FF_DONTCARE | DEFAULT_PITCH, fontName.c_str());
	HGDIOBJ hOldFont = SelectObject(fontHDC, hFont);

	result.Set("font", (int32_t)glGenLists(96));
	result.Set("height", height);

	wglUseFontBitmaps(fontHDC, 32, 96, result.Get("font").As<Number>().Int32Value());
	SelectObject(fontHDC, hOldFont);
	DeleteObject(hFont);

	return result;
}

Value overlayFontDeInit(const CallbackInfo &info) {
	glDeleteLists(info[0].As<Object>().Get("font").As<Number>(), 96);
	return info.Env().Undefined();
}

Object ovInit(Env env, Object exports) {
	exports.Set("overlayInit", Function::New(env, overlayInit));
	exports.Set("overlayDeinit", Function::New(env, overlayDeinit));
	exports.Set("overlayUpdate", Function::New(env, overlayUpdate));
	exports.Set("overlayClose", Function::New(env, overlayClose));
	exports.Set("overlayLoop", Function::New(env, overlayLoop));
	exports.Set("overlaySetPos", Function::New(env, overlaySetPos));
	exports.Set("overlayFontInit", Function::New(env, overlayFontInit));
	exports.Set("overlayFontDeInit", Function::New(env, overlayFontDeInit));

	return exports;
}