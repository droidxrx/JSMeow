#pragma once
#ifndef MEMORYJS_H
#define MEMORYJS_H
#define WIN32_LEAN_AND_MEAN

#include <windows.h>

class memoryjs {
  public:
	memoryjs();
	~memoryjs();
};
#endif
#pragma once
#include <napi.h>
Napi::Object memoryinit(Napi::Env env, Napi::Object exports);