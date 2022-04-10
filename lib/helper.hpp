#pragma once
#include "include.hpp"

struct rgbColor
{
	float r, g, b;
};

rgbColor colorRgb(Array color);

struct vec2
{
	float x, y;
};

vec2 getVec2(Object obj);

struct vec3
{
	float x, y, z;
};

vec3 getVec3(Object obj);

float getNapiFloat(Value value);
bool checkVec2(Object obj);
bool checkVec3(Object obj);

void pixelDraw(float x, float y, rgbColor color);
void boxDraw(float x, float y, float width, float height, float lineWidth, rgbColor color);
void alphaBoxDraw(float x, float y, float width, float height, rgbColor color, rgbColor outlineColor, float alpha);
void cornerBoxDraw(float x, float y, float width, float height, rgbColor color, rgbColor outlineColor, float lineWidth);
void lineDraw(float x1, float y1, float x2, float y2, float lineWidth, rgbColor color);
void dashedLineDraw(float x1, float y1, float x2, float y2, float lineWidth, int factor, int pattern, rgbColor color, float alpha);
void circleDraw(float x, float y, float radius, rgbColor color, bool filled);
void radCircleDraw(float x, float y, float radius, int startValue, int endValue, rgbColor color);
bool valueBarDraw(float x1, float y1, float x2, float y2, float width, float maxValue, float value, bool vertical);
void polyDraw(float x, float y, float radius, float rotation, int sides, rgbColor color);
void customShapeDraw(Array points, rgbColor color, bool filled, float alpha);
#pragma once