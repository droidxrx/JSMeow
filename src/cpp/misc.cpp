#include "misc.h"

#include <GLFW/glfw3.h>
#include <GLFW/glfw3native.h>

Value isKeyPressed(const CallbackInfo &info) {
	return Boolean::From(info.Env(), (bool)GetAsyncKeyState(info[0].As<Number>()));
}

Value pressKey(const CallbackInfo &info) {
	INPUT input;
	input.type = INPUT_KEYBOARD;
	input.ki.wScan = 0;
	input.ki.time = 0;
	input.ki.dwExtraInfo = 0;
	input.ki.dwFlags = 0;
	input.ki.wVk = (int)info[0].As<Number>();
	SendInput(1, &input, sizeof(input));

	return info.Env().Undefined();
}

Value setForeground(const CallbackInfo &info) {
	std::string winTitle = info[0].As<String>();
	return Boolean::From(info.Env(), SetForegroundWindow(FindWindowA(NULL, winTitle.c_str())));
}

Value mouseMove(const CallbackInfo &info) {
	INPUT input = {};
	input.type = INPUT_MOUSE;
	input.mi.dwFlags = MOUSEEVENTF_MOVE;
	input.mi.time = 0;
	input.mi.dx = info[0].As<Number>().FloatValue();
	input.mi.dy = info[1].As<Number>().FloatValue();
	UINT result = SendInput(1, &input, sizeof(input));
	return Value::From(info.Env(), result);
}

Value mouseClick(const CallbackInfo &info) {
	INPUT down, release = {};
	down.type = INPUT_MOUSE;
	down.mi.time = 0;
	release.type = INPUT_MOUSE;
	release.mi.time = 0;
	if (info[0].As<Boolean>()) {
		down.mi.dwFlags = MOUSEEVENTF_LEFTDOWN;
		release.mi.dwFlags = MOUSEEVENTF_LEFTUP;
	} else {
		down.mi.dwFlags = MOUSEEVENTF_RIGHTDOWN;
		release.mi.dwFlags = MOUSEEVENTF_RIGHTUP;
	}

	SendInput(1, &down, sizeof(down));
	Sleep(3);
	SendInput(1, &release, sizeof(release));
	return info.Env().Undefined();
}

Object miscInit(Env env, Object exports) {
	exports.Set("isKeyPressed", Function::New(env, isKeyPressed));
	exports.Set("pressKey", Function::New(env, pressKey));
	exports.Set("setForeground", Function::New(env, setForeground));
	exports.Set("mouseMove", Function::New(env, mouseMove));
	exports.Set("mouseClick", Function::New(env, mouseClick));

	return exports;
}