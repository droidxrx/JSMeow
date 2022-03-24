const { readdirSync, writeFileSync } = require('fs-extra');
const { resolve, sep } = require('path');
const nodeAddonApi = require('node-addon-api').include;

const getSrc = (srcDir, ext) => readdirSync(srcDir).filter(f => f.endsWith(ext)).map(f => `${srcDir}${sep}${f}`) // prettier-ignore
const srcDir1 = resolve(__dirname, 'src/cpp');
const srcDir2 = `${srcDir1}${sep}memory`;
const listSrc = [
	...getSrc(srcDir1, '.cpp'),
	...getSrc(srcDir1, '.h'),
	...getSrc(srcDir2, '.cc'),
	...getSrc(srcDir2, '.h'),
].join(' ');

const extFolder = resolve(__dirname, './external');
const includeFolder = `${extFolder}${sep}include`;
const libraries = [
	`${extFolder}${sep}lib${sep}glew32s.lib`,
	`${extFolder}${sep}lib${sep}glfw3.lib`,
].join(' ');

const CMakeListsTxt = [
	'cmake_minimum_required(VERSION 3.4)',
	'project(JSMeow)',
	'set(CMAKE_CXX_STANDARD 17)',
	'add_library(${PROJECT_NAME} SHARED ' + listSrc + ' ${CMAKE_JS_SRC})',
	'set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")',
	'include_directories(${CMAKE_JS_INC} ' + includeFolder + ')',
	'target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB} ' + libraries + ')',
	'target_include_directories(${PROJECT_NAME} PRIVATE ' + nodeAddonApi + ')',
	`add_definitions(-DNAPI_VERSION=${process.versions.napi} -DNAPI_DISABLE_CPP_EXCEPTIONS -DGLFW_EXPOSE_NATIVE_WIN32 -DGLEW_STATIC)`,
].join('\n');

writeFileSync(resolve(__dirname, 'CMakeLists.txt'), CMakeListsTxt.replace(/\\/g, '/'));
