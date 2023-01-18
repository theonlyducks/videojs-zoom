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

### Usage

#### Example

```js
const video = videojs('my-video');
const zoomPlugin = video.zoomPlugin();
zoomPlugin.onchange(data => {
  console.log(data);
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
