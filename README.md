# Video.js Zoom

> Simple plugin to zoom in video.js player

![Version](https://img.shields.io/github/package-json/v/theonlyducks/videojs-zoom)
![Project Size](https://img.shields.io/bundlephobia/min/@theonlyducks/videojs-zoom@latest)
![Dependencies](https://img.shields.io/github/languages/top/theonlyducks/videojs-zoom)
![Licence](https://img.shields.io/github/license/theonlyducks/videojs-zoom)

<img src="./preview.png" width="500" height="auto">

## Table of contents

- [Getting started](#getting-started)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## Documentation

See

## Getting started

### Requirements

```shell
yarn add video.js
```

### Installation

```shell
npm install @theonlyducks/videojs-zoom@latest
```
or
```shell
yarn add @theonlyducks/videojs-zoom@latest
```

### Usage

```js
import '@theonlyducks/videojs-zoom/styles';
import '@theonlyducks/videojs-zoom';
```

#### Example

```js
const video = videojs('my-video');
const zoomPlugin = video.zoomPlugin();
zoomPlugin.listen('change', data => {
	console.log(data);
});
```

## Methods

### zoom(value): void

Zoom function

- **value**
	- type: `Number`
	
```js
const zoomPlugin = video.zoomPlugin();
zoomPlugin.zoom(2);
```

### rotate(value): void

Rotate function

- **value**
	- type: `Number` in deg

```js
const zoomPlugin = video.zoomPlugin();
zoomPlugin.rotate(180);
```

### move(x, y): void

Rotate function

- **x**
	- type: `Number`
- **y**
	- type: `Number`	

```js
const zoomPlugin = video.zoomPlugin();
zoomPlugin.move(0, 0);
```

### toggle(): void

Open and close modal function

```js
const zoomPlugin = video.zoomPlugin();
zoomPlugin.toggle();
```

### flip(signal): void

Flip video image

- **x**
	- type: `String` use + or - for flip image

```js
const zoomPlugin = video.zoomPlugin();
zoomPlugin.flip("-");
```

## Events

### listen(event, callback): void

Listen events of the zoom plugin

- **event**
	- type: `String`
	- options: 
	  - `'change'` when click in buttons modal
	  - `'click'` when modal is opened or closed
- **callback**
	- type: `Function`

```js
const zoomPlugin = video.zoomPlugin();
zoomPlugin.listen('click', () => {
    console.log('click');
});
```

## Development

Install

```shell
yarn
```

Start server listening https://localhost:3000

```shell
yarn start
```

## License

[MIT](https://opensource.org/licenses/MIT) © [The Only Ducks](https://github.com/theonlyducks)
