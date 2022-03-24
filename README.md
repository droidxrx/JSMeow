# JSMeow - Small Tool Hacking game

## NodeJS for external Game Hacking (Windows only)

## Requirement:

- NodeJS v16.14.0 or latest (x64 only)

## Installing:

```powershell
NPM: npm install jsmeow
YARN: yarn add jsmeow
```

## Manual build:

#### Requirement:

- NodeJS v16.14.0 or latest (x64 only)
- cmake >= 3.23
- cmake-js >= 6.3.0

#### Build:

```powershell
git clone https://github.com/droidxrx/JSMeow.git
cd JSMeow
npm run build-all
```

## Example Usage

```javascript
const JSMeow = require("jsmeow") // cjs
import JSMeow from "jsmeow" // esm
// or with selection
const {JSMemory, vector3, drawCornerBox, ...etc} = require("jsmeow") // cjs
import {JSMemory, vector3, drawCornerBox, ...etc} from "jsmeow" // esm

void (async function () {
	const mem = JSMeow.JSMemory
	const { th32ProcessID: processId } = mem.openProcess('csgo.exe')
	const { modBaseAddr } = mem.findModule('client.dll', processId)

	// const overlay = overlayInit(); // windowed fullscreen
	const overlay = JSMeow.overlayInit('window title'); // windowed mode
	const font = JSMeow.overlayFontInit(10, 'Tahoma');
	// setForeground('Counter-Strike: Global Offensive - Direct3D 9') windowed fullscreen need to call function setForeground

	const localPlayer = mem.readDword(address)
	const findPatern = mem.findPattern("AB ?? ?? FF 00")
	const findPatern = mem.findPatternByAddress(baseAddress, "AB ?? ?? FF 00")
	const findPatern = mem.findPatternByModule("xxxx.dll", "AB ?? ?? FF 00")
	while(JSMeow.overlayLoop(overlay)) {
		JSMeow.drawDashedLine(x1, y1, x2, y2, lineWidth, colors);
		await JSMeow.waits(5); // recommended value less then 20
	}
})()
```

## [CS:GO](example/cs_go.ts)

[![](https://cdn.discordapp.com/attachments/954962300866035722/955787171959304192/CSGO.png)](example/cs_go.ts)

## [AssaultCube](example/assault-cube.ts)

[![](https://cdn.discordapp.com/attachments/954962300866035722/955682302388764682/AssaultCube_1.3_Lockdown-Edition.png)](example/assault-cube.ts)

## [All Overlay](example/all-overlay.ts)

[![](https://cdn.discordapp.com/attachments/954962300866035722/954962418725969960/JSMeow-All-Overlay.gif)](example/all-overlay.ts)

### Thank to [qb-0](https://github.com/qb-0/PyMeow) & [Rob--](https://github.com/Rob--/memoryjs) ❤️
