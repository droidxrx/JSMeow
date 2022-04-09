# JSMeow - Small Tool Hacking game

### NodeJS for external Game Hacking (Windows only)

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 16.14.0 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

## Installation

#### manual build version:

manual build version require [node-gyp](https://www.npmjs.com/package/node-gyp).

```console
> npm install jsmeow
```

#### prebuild version:

```console
> npm install jsmeow@n-api
```

#### note please install Visual C++ Redistributable latest

## Features

- memory
  - signatureTypes
  - Debugger
  - openProcess
  - closeProcess
  - getProcesses
  - findModule
  - getModules
  - readMemory
  - readBuffer
  - writeMemory
  - writeBuffer
  - findPattern
  - findPatternByModule
  - findPatternByAddress
  - callFunction
  - virtualAllocEx
  - virtualProtectEx
  - getRegions
  - virtualQueryEx
  - attachDebugger
  - detatchDebugger
  - awaitDebugEvent
  - handleDebugEvent
  - setHardwareBreakpoint
  - removeHardwareBreakpoint
  - injectDll
  - unloadDll
  - STRUCTRON_TYPE_STRING
- Struct (class)
- overlay
  - init
  - deInit
  - update
  - close
  - loop
  - setPosition
  - fontInit
  - fontDeInit
- draws
  - text
  - textLines
  - pixel
  - box
  - alphaBox
  - cornerBox
  - line
  - dashLine
  - circle
  - radCircle
  - valueBar
  - poly
  - customShape
- vector2
  - create
  - addition
  - subtraction
  - multiplication
  - division
  - magnitude
  - distance
  - closest
- vector3
  - create
  - addition
  - subtraction
  - multiplication
  - division
  - magnitude
  - distance
  - closest
- isKeyPressed
- pressKey
- mouseMove
- mouseClick
- setForeground

#### See [example](https://github.com/droidxrx/JSMeow/tree/master/example)

## [CS:GO](https://github.com/droidxrx/JSMeow/tree/master/example/cs_go.ts)

[![](https://cdn.discordapp.com/attachments/954962300866035722/962451273326661652/CSGO.png)](https://github.com/droidxrx/JSMeow/tree/master/example/cs_go.ts)

## [All Overlay](https://github.com/droidxrx/JSMeow/tree/master/example/all-overlay.ts)

[![](https://cdn.discordapp.com/attachments/954962300866035722/954962418725969960/JSMeow-All-Overlay.gif)](https://github.com/droidxrx/JSMeow/tree/master/example/all-overlay.ts)

### Thank to [qb-0](https://github.com/qb-0/PyMeow) & [Rob--](https://github.com/Rob--/memoryjs) ❤️
