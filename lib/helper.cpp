#include "helper.hpp"

float getNapiFloat(Value value)
{
	return value.As<Number>().FloatValue();
}

float degToRad(float a)
{
	return a * (3.141592741F / 180);
}

rgbColor colorRgb(Array color)
{
	rgbColor rgb;
	rgb.r = getNapiFloat(color.Get(0U));
	rgb.g = getNapiFloat(color.Get(1U));
	rgb.b = getNapiFloat(color.Get(2U));
	return rgb;
}

vec2 getVec2(Object obj)
{
	vec2 vec2s;
	vec2s.x = getNapiFloat(obj.Get("x"));
	vec2s.y = getNapiFloat(obj.Get("y"));
	return vec2s;
}

vec3 getVec3(Object obj)
{
	vec3 vec3s;
	vec3s.x = getNapiFloat(obj.Get("x"));
	vec3s.y = getNapiFloat(obj.Get("y"));
	vec3s.z = getNapiFloat(obj.Get("z"));
	return vec3s;
}

bool checkVec2(Object obj)
{
	bool checkXY = obj.HasOwnProperty("x") && obj.HasOwnProperty("y");
	bool checkValue = obj.Get("x").IsNumber() && obj.Get("y").IsNumber();

	return checkXY && checkValue;
}

bool checkVec3(Object obj)
{
	bool checkXYZ = obj.HasOwnProperty("x") && obj.HasOwnProperty("y") && obj.HasOwnProperty("z");
	bool checkValue = obj.Get("x").IsNumber() && obj.Get("y").IsNumber() && obj.Get("z").IsNumber();

	return checkXYZ && checkValue;
}

bool checkObject(Value value)
{
	return !value.IsNull() && value.IsObject() && !value.IsArray();
}

void pixelDraw(float x, float y, rgbColor color)
{
	glBegin(GL_LINES);
	glColor3f(color.r, color.g, color.b);
	glVertex2f(x, y);
	glVertex2f(x + 1, y + 1);
	glEnd();
}

void boxDraw(float x, float y, float width, float height, float lineWidth, rgbColor color)
{
	glLineWidth(lineWidth);
	glBegin(GL_LINE_LOOP);
	glColor3f(color.r, color.g, color.b);
	glVertex2f(x, y);
	glVertex2f(x + width, y);
	glVertex2f(x + width, y + height);
	glVertex2f(x, y + height);
	glEnd();
}

void alphaBoxDraw(float x, float y, float width, float height, rgbColor color, rgbColor outlineColor, float alpha)
{
	boxDraw(x, y, width, height, 1.0, outlineColor);
	glBegin(GL_POLYGON);
	glColor4f(color.r, color.g, color.b, alpha);
	glVertex2f(x, y);
	glVertex2f(x + width, y);
	glVertex2f(x + width, y + height);
	glVertex2f(x, y + height);
	glEnd();
}

void cornerBox(float x, float y, float width, float height, float lineW, float lineH)
{
	glBegin(GL_LINES);

	// Lower Left
	glVertex2f(x, y);
	glVertex2f(x + lineW, y);
	glVertex2f(x, y);
	glVertex2f(x, y + lineH);

	// Lower Right
	glVertex2f(x + width, y);
	glVertex2f(x + width, y + lineH);
	glVertex2f(x + width, y);
	glVertex2f(x + width - lineW, y);

	// Upper Left
	glVertex2f(x, y + height);
	glVertex2f(x, y + height - lineH);
	glVertex2f(x, y + height);
	glVertex2f(x + lineW, y + height);

	// Upper Right
	glVertex2f(x + width, y + height);
	glVertex2f(x + width, y + height - lineH);
	glVertex2f(x + width, y + height);
	glVertex2f(x + width - lineW, y + height);
	glEnd();
}

void cornerBoxDraw(float x, float y, float width, float height, rgbColor color, rgbColor outlineColor, float lineWidth)
{
	float lineW = width / 4, lineH = height / 3;
	glLineWidth(lineWidth + 2);
	glColor3f(outlineColor.r, outlineColor.g, outlineColor.b);
	cornerBox(x, y, width, height, lineW, lineH);
	glLineWidth(lineWidth);
	glColor3f(color.r, color.g, color.b);
	cornerBox(x, y, width, height, lineW, lineH);
}

void lineDraw(float x1, float y1, float x2, float y2, float lineWidth, rgbColor color)
{
	glLineWidth(lineWidth);
	glBegin(GL_LINES);
	glColor3f(color.r, color.g, color.b);
	glVertex2f(x1, y1);
	glVertex2f(x2, y2);
	glEnd();
}

void dashedLineDraw(float x1, float y1, float x2, float y2, float lineWidth, int factor, int pattern, rgbColor color, float alpha)
{
	glPushAttrib(GL_ENABLE_BIT);
	glLineStipple(factor, pattern);
	glLineWidth(lineWidth);
	glEnable(GL_LINE_STIPPLE);

	glBegin(GL_LINES);
	glColor4f(color.r, color.g, color.b, alpha);
	glVertex2f(x1, y1);
	glVertex2f(x2, y2);
	glEnd();
	glPopAttrib();
}

void circleDraw(float x, float y, float radius, rgbColor color, bool filled)
{
	if (filled)
		glBegin(GL_POLYGON);
	else
		glBegin(GL_LINE_LOOP);

	glColor3f(color.r, color.g, color.b);
	for (int i = 0; i < 360; i++)
		glVertex2f((cos(degToRad((float)i)) * radius) + x, (sin(degToRad((float)i)) * radius) + y);

	glEnd();
}

void radCircleDraw(float x, float y, float radius, int startValue, int endValue, rgbColor color)
{
	glBegin(GL_POLYGON);
	glColor3f(color.r, color.g, color.b);

	for (int i = startValue; i < endValue; i++)
		glVertex2f((cos(degToRad((float)i)) * radius) + x, (sin(degToRad((float)i)) * radius) + y);

	glEnd();
}

bool valueBarDraw(float x1, float y1, float x2, float y2, float width, float maxValue, float value, bool vertical)
{
	if (value > maxValue)
		return true;

	float x = value / maxValue;
	float barY = (y2 - y1) * x + y1;
	float barX = (x2 - x1) * x + x1;
	rgbColor color;
	color.r = 0;
	color.g = 0;
	color.b = 0;

	lineDraw(x1, y1, x2, y2, width, color);
	color.r = 2 * (1 - x);
	color.g = 2 * x;

	if (vertical)
	{
		lineDraw(x1, y1, x2, barY, width, color);
	}
	else
	{
		lineDraw(x1, y1, barX, y2, width, color);
	}

	return false;
}

void polyDraw(float x, float y, float radius, float rotation, int sides, rgbColor color)
{
	float s = sides <= 3 ? 3.0F : (float)sides, centralAngle = 0.0F;

	glPushMatrix();
	glTranslatef(x, y, 0.0F);
	glRotatef(rotation, 0.0F, 0.0F, 1.0F);
	glBegin(GL_TRIANGLES);

	for (int i = 0; i < sides; i++)
	{
		glColor3f(color.r, color.g, color.b);
		glVertex2f(0.0F, 0.0F);
		glVertex2f(sin(degToRad(centralAngle)) * radius, cos(degToRad(centralAngle)) * radius);
		centralAngle = centralAngle + (360.0F / s);
		glVertex2f(sin(degToRad(centralAngle)) * radius, cos(degToRad(centralAngle)) * radius);
	}
	glEnd();
	glPopMatrix();
}

void customShapeDraw(Array points, rgbColor color, bool filled, float alpha)
{
	if (filled)
		glBegin(GL_POLYGON);
	else
		glBegin(GL_LINE_LOOP);

	glColor4f(color.r, color.g, color.b, alpha);

	for (uint32_t i = 0; i < points.Length(); i++)
	{
		Object tepmVec2 = points.Get(i).As<Object>();
		glVertex2f(tepmVec2.Get("x").As<Number>().FloatValue(), tepmVec2.Get("y").As<Number>().FloatValue());
	}
	glEnd();
}