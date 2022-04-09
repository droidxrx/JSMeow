#pragma once
#include <napi.h>
#ifndef MEMORYJS_H
#define MEMORYJS_H
#define WIN32_LEAN_AND_MEAN

#include <windows.h>

class memoryjs
{

public:
	memoryjs();
	~memoryjs();
};
#endif

Napi::Object memory_exports(Napi::Env env, Napi::Object exports);
#pragma once