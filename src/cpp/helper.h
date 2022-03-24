#include <GL/glew.h>
#include <napi.h>
using namespace Napi;

struct rgbColor {
	float r, g, b;
};

struct vec2 {
	float x, y;
};

rgbColor colorRgb(Array color);
vec2 getVec2(Object obj);
float getNapiFloat(Value value);

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