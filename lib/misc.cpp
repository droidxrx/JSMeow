#include "misc.hpp"

Value is_key_preseed(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() == 0 || !info[0].IsNumber())
	{
		Error::New(env, "requires 1 arguments and argument must be a number").ThrowAsJavaScriptException();
		return env.Null();
	}

	return Boolean::From(env, GetAsyncKeyState(info[0].As<Number>().Int32Value()));
}

Value press_key(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() == 0 || !info[0].IsNumber())
	{
		Error::New(env, "requires 1 arguments and argument must be a number").ThrowAsJavaScriptException();
		return env.Null();
	}

	INPUT input;
	input.type = INPUT_KEYBOARD;
	input.ki.wScan = 0;
	input.ki.time = 0;
	input.ki.dwExtraInfo = 0;
	input.ki.dwFlags = 0;
	input.ki.wVk = (int)info[0].As<Number>();
	SendInput(1, &input, sizeof(input));

	return env.Null();
}

Value mouse_move(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() == 0 || !info[0].IsNumber() || !info[1].IsNumber())
	{
		Error::New(env, "requires 2 arguments and all argument must be a number").ThrowAsJavaScriptException();
		return env.Null();
	}

	INPUT input = {};
	input.type = INPUT_MOUSE;
	input.mi.dwFlags = MOUSEEVENTF_MOVE;
	input.mi.time = 0;
	input.mi.dx = info[0].As<Number>().FloatValue();
	input.mi.dy = info[1].As<Number>().FloatValue();
	bool result;

	if (SendInput(1, &input, sizeof(input)) == 0)
		result = false;
	else
		result = true;

	return Boolean::From(env, result);
}

Value mouse_click(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() == 0 || !info[0].IsBoolean())
	{
		Error::New(env, "requires 1 arguments and argument must be a boolean").ThrowAsJavaScriptException();
		return env.Null();
	}

	INPUT down, release = {};
	down.type = INPUT_MOUSE;
	down.mi.time = 0;
	release.type = INPUT_MOUSE;
	release.mi.time = 0;
	if (info[0].As<Boolean>())
	{
		down.mi.dwFlags = MOUSEEVENTF_LEFTDOWN;
		release.mi.dwFlags = MOUSEEVENTF_LEFTUP;
	}
	else
	{
		down.mi.dwFlags = MOUSEEVENTF_RIGHTDOWN;
		release.mi.dwFlags = MOUSEEVENTF_RIGHTUP;
	}

	SendInput(1, &down, sizeof(down));
	Sleep(3);
	SendInput(1, &release, sizeof(release));
	return env.Null();
}

Value set_foreground(const CallbackInfo &info)
{
	Env env = info.Env();
	if (info.Length() == 0 || !info[0].IsString())
	{
		Error::New(env, "requires 1 arguments and argument must be a string").ThrowAsJavaScriptException();
		return env.Null();
	}
	std::string winTitle = info[0].As<String>();
	return Boolean::From(info.Env(), SetForegroundWindow(FindWindowA(NULL, winTitle.c_str())));
}

Object misc_exports(Env env, Object exports)
{
	exports.Set("isKeyPressed", Function::New(env, is_key_preseed));
	exports.Set("pressKey", Function::New(env, press_key));
	exports.Set("mouseMove", Function::New(env, mouse_move));
	exports.Set("mouseClick", Function::New(env, mouse_click));
	exports.Set("setForeground", Function::New(env, set_foreground));
	return exports;
}