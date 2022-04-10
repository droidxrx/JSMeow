#include "vector_utils.hpp"
#include <cmath>

float vec2_dist(Object arg1, Object arg2)
{
	float x, y;
	x = getNapiFloat(arg1.Get("x")) - getNapiFloat(arg2.Get("x"));
	y = getNapiFloat(arg1.Get("y")) - getNapiFloat(arg2.Get("y"));
	return sqrtf((x * x) + (y * y));
}

float vec3_dist(Object arg1, Object arg2)
{
	float x, y, z;
	x = getNapiFloat(arg1.Get("x")) - getNapiFloat(arg2.Get("x"));
	y = getNapiFloat(arg1.Get("y")) - getNapiFloat(arg2.Get("y"));
	z = getNapiFloat(arg1.Get("z")) - getNapiFloat(arg2.Get("z"));
	return sqrtf((x * x) + (y * y) + (z * z));
}

Value create_vector2(const CallbackInfo &info)
{
	Env env = info.Env();
	Object result = Object::New(env);
	int lengthArg = info.Length();

	if (lengthArg == 0)
	{
		result.Set("x", 0);
		result.Set("y", 0);
	}
	else if (lengthArg > 0)
	{
		if (!info[0].IsNumber() || !info[1].IsNumber())
		{
			Error::New(env, "first and second argument must a number").ThrowAsJavaScriptException();
			return env.Null();
		}
		result.Set("x", getNapiFloat(info[0]));
		result.Set("y", getNapiFloat(info[1]));
	}

	return result;
}
Value create_vector3(const CallbackInfo &info)
{
	Env env = info.Env();
	Object result = Object::New(env);
	int lengthArg = info.Length();

	if (lengthArg == 0)
	{
		result.Set("x", 0);
		result.Set("y", 0);
		result.Set("z", 0);
	}
	else if (lengthArg > 0)
	{
		if (!info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber())
		{
			Error::New(env, "first to third argument must a number").ThrowAsJavaScriptException();
			return env.Null();
		}
		result.Set("x", getNapiFloat(info[0]));
		result.Set("y", getNapiFloat(info[1]));
		result.Set("z", getNapiFloat(info[2]));
	}

	return result;
}

Value vector2_addition(const CallbackInfo &info)
{
	Env env = info.Env();
	Object result = Object::New(env);

	if (info.Length() < 2 || !info[0].IsObject() || !info[1].IsObject())
	{
		Error::New(env, "requires 2 arguments, first and second argument must a vector2").ThrowAsJavaScriptException();
		return env.Null();
	}

	Object arg1 = info[0].As<Object>();
	Object arg2 = info[1].As<Object>();

	if (!checkVec2(arg1) || !checkVec2(arg2))
	{
		Error::New(env, "first and second argument must a vector2").ThrowAsJavaScriptException();
		return env.Null();
	}

	result.Set("x", getNapiFloat(arg1.Get("x")) + getNapiFloat(arg2.Get("x")));
	result.Set("y", getNapiFloat(arg1.Get("y")) + getNapiFloat(arg2.Get("y")));
	return result;
}
Value vector3_addition(const CallbackInfo &info)
{
	Env env = info.Env();
	Object result = Object::New(env);

	if (info.Length() < 2 || !info[0].IsObject() || !info[1].IsObject())
	{
		Error::New(env, "requires 2 arguments, first and second argument must a vector3").ThrowAsJavaScriptException();
		return env.Null();
	}

	Object arg1 = info[0].As<Object>();
	Object arg2 = info[1].As<Object>();

	if (!checkVec3(arg1) || !checkVec3(arg2))
	{
		Error::New(env, "first and second argument must a vector3").ThrowAsJavaScriptException();
		return env.Null();
	}

	result.Set("x", getNapiFloat(arg1.Get("x")) + getNapiFloat(arg2.Get("x")));
	result.Set("y", getNapiFloat(arg1.Get("y")) + getNapiFloat(arg2.Get("y")));
	result.Set("z", getNapiFloat(arg1.Get("z")) + getNapiFloat(arg2.Get("z")));
	return result;
}

Value vector2_subtraction(const CallbackInfo &info)
{
	Env env = info.Env();
	Object result = Object::New(env);

	if (info.Length() < 2 || !info[0].IsObject() || !info[1].IsObject())
	{
		Error::New(env, "requires 2 arguments, first and second argument must a vector2").ThrowAsJavaScriptException();
		return env.Null();
	}

	Object arg1 = info[0].As<Object>();
	Object arg2 = info[1].As<Object>();

	if (!checkVec2(arg1) || !checkVec2(arg2))
	{
		Error::New(env, "first and second argument must a vector2").ThrowAsJavaScriptException();
		return env.Null();
	}

	result.Set("x", getNapiFloat(arg1.Get("x")) - getNapiFloat(arg2.Get("x")));
	result.Set("y", getNapiFloat(arg1.Get("y")) - getNapiFloat(arg2.Get("y")));
	return result;
}

Value vector3_subtraction(const CallbackInfo &info)
{
	Env env = info.Env();
	Object result = Object::New(env);

	if (info.Length() < 2 || !info[0].IsObject() || !info[1].IsObject())
	{
		Error::New(env, "requires 2 arguments, first and second argument must a vector3").ThrowAsJavaScriptException();
		return env.Null();
	}

	Object arg1 = info[0].As<Object>();
	Object arg2 = info[1].As<Object>();

	if (!checkVec3(arg1) || !checkVec3(arg2))
	{
		Error::New(env, "first and second argument must a vector3").ThrowAsJavaScriptException();
		return env.Null();
	}

	result.Set("x", getNapiFloat(arg1.Get("x")) - getNapiFloat(arg2.Get("x")));
	result.Set("y", getNapiFloat(arg1.Get("y")) - getNapiFloat(arg2.Get("y")));
	result.Set("z", getNapiFloat(arg1.Get("z")) - getNapiFloat(arg2.Get("z")));
	return result;
}

Value vector2_multiplication(const CallbackInfo &info)
{
	Env env = info.Env();
	Object result = Object::New(env);

	if (info.Length() < 2 || !info[0].IsObject() || !info[1].IsObject())
	{
		Error::New(env, "requires 2 arguments, first and second argument must a vector2").ThrowAsJavaScriptException();
		return env.Null();
	}

	Object arg1 = info[0].As<Object>();
	Object arg2 = info[1].As<Object>();

	if (!checkVec2(arg1) || !checkVec2(arg2))
	{
		Error::New(env, "first and second argument must a vector2").ThrowAsJavaScriptException();
		return env.Null();
	}

	result.Set("x", getNapiFloat(arg1.Get("x")) * getNapiFloat(arg2.Get("x")));
	result.Set("y", getNapiFloat(arg1.Get("y")) * getNapiFloat(arg2.Get("y")));
	return result;
}
Value vector3_multiplication(const CallbackInfo &info)
{
	Env env = info.Env();
	Object result = Object::New(env);

	if (info.Length() < 2 || !info[0].IsObject() || !info[1].IsObject())
	{
		Error::New(env, "requires 2 arguments, first and second argument must a vector3").ThrowAsJavaScriptException();
		return env.Null();
	}

	Object arg1 = info[0].As<Object>();
	Object arg2 = info[1].As<Object>();

	if (!checkVec3(arg1) || !checkVec3(arg2))
	{
		Error::New(env, "first and second argument must a vector3").ThrowAsJavaScriptException();
		return env.Null();
	}

	result.Set("x", getNapiFloat(arg1.Get("x")) * getNapiFloat(arg2.Get("x")));
	result.Set("y", getNapiFloat(arg1.Get("y")) * getNapiFloat(arg2.Get("y")));
	result.Set("z", getNapiFloat(arg1.Get("z")) * getNapiFloat(arg2.Get("z")));
	return result;
}

Value vector2_division(const CallbackInfo &info)
{
	Env env = info.Env();
	Object result = Object::New(env);

	if (info.Length() < 2 || !info[0].IsObject() || !info[1].IsObject())
	{
		Error::New(env, "requires 2 arguments, first and second argument must a vector2").ThrowAsJavaScriptException();
		return env.Null();
	}

	Object arg1 = info[0].As<Object>();
	Object arg2 = info[1].As<Object>();

	if (!checkVec2(arg1) || !checkVec2(arg2))
	{
		Error::New(env, "first and second argument must a vector2").ThrowAsJavaScriptException();
		return env.Null();
	}

	result.Set("x", getNapiFloat(arg1.Get("x")) / getNapiFloat(arg2.Get("x")));
	result.Set("y", getNapiFloat(arg1.Get("y")) / getNapiFloat(arg2.Get("y")));
	return result;
}
Value vector3_division(const CallbackInfo &info)
{
	Env env = info.Env();
	Object result = Object::New(env);

	if (info.Length() < 2 || !info[0].IsObject() || !info[1].IsObject())
	{
		Error::New(env, "requires 2 arguments, first and second argument must a vector3").ThrowAsJavaScriptException();
		return env.Null();
	}

	Object arg1 = info[0].As<Object>();
	Object arg2 = info[1].As<Object>();

	if (!checkVec3(arg1) || !checkVec3(arg2))
	{
		Error::New(env, "first and second argument must a vector3").ThrowAsJavaScriptException();
		return env.Null();
	}

	result.Set("x", getNapiFloat(arg1.Get("x")) / getNapiFloat(arg2.Get("x")));
	result.Set("y", getNapiFloat(arg1.Get("y")) / getNapiFloat(arg2.Get("y")));
	result.Set("z", getNapiFloat(arg1.Get("z")) / getNapiFloat(arg2.Get("z")));
	return result;
}

Value vector2_magnitude(const CallbackInfo &info)
{
	Env env = info.Env();
	float x, y;

	if (info.Length() < 1 || !info[0].IsObject())
	{
		Error::New(env, "requires 1 arguments, first argument must a vector2").ThrowAsJavaScriptException();
		return env.Null();
	}

	Object arg1 = info[0].As<Object>();

	if (!checkVec2(arg1))
	{
		Error::New(env, "first argument must a vector2").ThrowAsJavaScriptException();
		return env.Null();
	}

	x = getNapiFloat(arg1.Get("x"));
	y = getNapiFloat(arg1.Get("y"));

	return Number::From(env, sqrtf((x * x) + (y * y)));
}

Value vector3_magnitude(const CallbackInfo &info)
{
	Env env = info.Env();
	float x, y, z;

	if (info.Length() < 1 || !info[0].IsObject())
	{
		Error::New(env, "requires 1 arguments, first argument must a vector3").ThrowAsJavaScriptException();
		return env.Null();
	}

	Object arg1 = info[0].As<Object>();

	if (!checkVec3(arg1))
	{
		Error::New(env, "first argument must a vector3").ThrowAsJavaScriptException();
		return env.Null();
	}

	x = getNapiFloat(arg1.Get("x"));
	y = getNapiFloat(arg1.Get("y"));
	z = getNapiFloat(arg1.Get("z"));

	return Number::From(env, sqrtf((x * x) + (y * y) + (z * z)));
}

Value vector2_distance(const CallbackInfo &info)
{
	Env env = info.Env();

	if (info.Length() < 2 || !info[0].IsObject() || !info[1].IsObject())
	{
		Error::New(env, "requires 2 arguments, first and second argument must a vector2").ThrowAsJavaScriptException();
		return env.Null();
	}

	Object arg1 = info[0].As<Object>();
	Object arg2 = info[1].As<Object>();

	if (!checkVec2(arg1) || !checkVec2(arg2))
	{
		Error::New(env, "first and second argument must a vector2").ThrowAsJavaScriptException();
		return env.Null();
	}

	return Number::From(env, vec2_dist(arg1, arg2));
}
Value vector3_distance(const CallbackInfo &info)
{
	Env env = info.Env();

	if (info.Length() < 2 || !info[0].IsObject() || !info[1].IsObject())
	{
		Error::New(env, "requires 2 arguments, first and second argument must a vector3").ThrowAsJavaScriptException();
		return env.Null();
	}

	Object arg1 = info[0].As<Object>();
	Object arg2 = info[1].As<Object>();

	if (!checkVec3(arg1) || !checkVec3(arg2))
	{
		Error::New(env, "first and second argument must a vector2").ThrowAsJavaScriptException();
		return env.Null();
	}

	return Number::From(env, vec3_dist(arg1, arg2));
}

Value vector2_closest(const CallbackInfo &info)
{
	Env env = info.Env();

	if (info.Length() < 2 || !info[0].IsObject() || !info[1].IsArray() || !info[2].IsBoolean())
	{
		Error::New(env, "requires 2 arguments, first argument must a vector2, second argument must a array vector2, third argument must a boolean").ThrowAsJavaScriptException();
		return env.Null();
	}

	Value result;
	Object arg1 = info[0].As<Object>();
	Array arg2 = info[1].As<Array>();
	bool returnType = info[2].As<Boolean>();
	float closest_value = 3.40282e+38F;

	if (!checkVec2(arg1))
	{
		Error::New(env, "first argument must a vector2").ThrowAsJavaScriptException();
		return env.Null();
	}

	bool isNotVec2 = false;
	if (returnType)
	{
		for (uint32_t i = 0; i < arg2.Length(); i++)
		{
			Value items = arg2.Get(i);
			if (!items.IsObject())
			{
				isNotVec2 = true;
				break;
			}

			Object itemVec = items.As<Object>();
			if (!checkVec2(itemVec))
			{
				isNotVec2 = true;
				break;
			}

			float dist = vec2_dist(arg1, itemVec);
			if (dist < closest_value)
			{
				result = itemVec;
				closest_value = dist;
			}
		}
	}
	else
	{
		for (uint32_t i = 0; i < arg2.Length(); i++)
		{
			Value items = arg2.Get(i);
			if (!items.IsObject())
			{
				isNotVec2 = true;
				break;
			}

			Object itemVec = items.As<Object>();
			if (!checkVec2(itemVec))
			{
				isNotVec2 = true;
				break;
			}

			float dist = vec2_dist(arg1, itemVec);
			if (dist < closest_value)
			{
				result = Number::From(env, i);
				closest_value = dist;
			}
		}
	}

	if (isNotVec2)
	{
		Error::New(env, "second argument must a array vector2").ThrowAsJavaScriptException();
		return env.Null();
	}

	return result;
}
Value vector3_closest(const CallbackInfo &info)
{
	Env env = info.Env();

	if (info.Length() < 3 || !info[0].IsObject() || !info[1].IsArray() || !info[2].IsBoolean())
	{
		Error::New(env, "requires 3 arguments, first argument must a vector3, second argument must a array vector3, third argument must a boolean").ThrowAsJavaScriptException();
		return env.Null();
	}

	Value result;
	Object arg1 = info[0].As<Object>();
	Array arg2 = info[1].As<Array>();
	bool returnType = info[2].As<Boolean>();
	float closest_value = 3.40282e+38F;

	if (!checkVec2(arg1))
	{
		Error::New(env, "first argument must a vector3").ThrowAsJavaScriptException();
		return env.Null();
	}

	bool isNotVec3 = false;
	if (returnType)
	{
		for (uint32_t i = 0; i < arg2.Length(); i++)
		{
			Value items = arg2.Get(i);
			if (!items.IsObject())
			{
				isNotVec3 = true;
				break;
			}

			Object itemVec = items.As<Object>();
			if (!checkVec3(itemVec))
			{
				isNotVec3 = true;
				break;
			}

			float dist = vec3_dist(arg1, itemVec);
			if (dist < closest_value)
			{
				result = itemVec;
				closest_value = dist;
			}
		}
	}
	else
	{
		for (uint32_t i = 0; i < arg2.Length(); i++)
		{
			Value items = arg2.Get(i);
			if (!items.IsObject())
			{
				isNotVec3 = true;
				break;
			}

			Object itemVec = items.As<Object>();
			if (!checkVec3(itemVec))
			{
				isNotVec3 = true;
				break;
			}

			float dist = vec3_dist(arg1, itemVec);
			if (dist < closest_value)
			{
				result = Number::From(env, i);
				closest_value = dist;
			}
		}
	}

	if (isNotVec3)
	{
		Error::New(env, "second argument must a array vector3").ThrowAsJavaScriptException();
		return env.Null();
	}

	return result;
}

Object vector_utils_exports(Env env, Object exports)
{
	Object vector_2 = Object::New(env);
	vector_2.Set("create", Function::New(env, create_vector2));
	vector_2.Set("addition", Function::New(env, vector2_addition));
	vector_2.Set("subtraction", Function::New(env, vector2_subtraction));
	vector_2.Set("multiplication", Function::New(env, vector2_multiplication));
	vector_2.Set("division", Function::New(env, vector2_division));
	vector_2.Set("magnitude", Function::New(env, vector2_magnitude));
	vector_2.Set("distance", Function::New(env, vector2_distance));
	vector_2.Set("closest", Function::New(env, vector2_closest));

	Object vector_3 = Object::New(env);
	vector_3.Set("create", Function::New(env, create_vector3));
	vector_3.Set("addition", Function::New(env, vector3_addition));
	vector_3.Set("subtraction", Function::New(env, vector3_subtraction));
	vector_3.Set("multiplication", Function::New(env, vector3_multiplication));
	vector_3.Set("division", Function::New(env, vector3_division));
	vector_3.Set("magnitude", Function::New(env, vector3_magnitude));
	vector_3.Set("distance", Function::New(env, vector3_distance));
	vector_3.Set("closest", Function::New(env, vector3_closest));

	exports.Set("vector2", vector_2);
	exports.Set("vector3", vector_3);
	return exports;
}