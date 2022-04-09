{
	"targets": [
		{
			"target_name": "JSMeow",
			"include_dirs": [
				"<!@(node -p \"require('node-addon-api').include\")",
				"<(module_root_dir)/external/include"
			],
			"library_dirs": [
				"<(module_root_dir)/external/lib"
			],
			"libraries": [
				"glew32.lib",
				"glfw3dll.lib",
				"opengl32.lib"
			],
			"defines": [
				"NAPI_DISABLE_CPP_EXCEPTIONS",
				"NAPI_VERSION=8",
				"GLFW_EXPOSE_NATIVE_WIN32"
			],
			"sources": [
				"<(module_root_dir)/lib/memory/memory.cpp",
				"<(module_root_dir)/lib/memory/module.cpp",
				"<(module_root_dir)/lib/memory/pattern.cpp",
				"<(module_root_dir)/lib/memory/process.cpp",
				"<(module_root_dir)/lib/memory/debugger.cpp",
				"<(module_root_dir)/lib/memory/functions.cpp",
				"<(module_root_dir)/lib/memory/memoryjs.cpp",
				"<(module_root_dir)/lib/colors.cpp",
				"<(module_root_dir)/lib/misc.cpp",
				"<(module_root_dir)/lib/helper.cpp",
				"<(module_root_dir)/lib/draws.cpp",
				"<(module_root_dir)/lib/vector_utils.cpp",
				"<(module_root_dir)/lib/overlay.cpp"
			],
			"copies":[
                { 
                    'destination': './build/Release',
                    'files':[
                        '<(module_root_dir)/external/lib/glfw3.dll',
                        '<(module_root_dir)/external/lib/glew32.dll',
                    ]
                }
            ]
		}
	]
}
