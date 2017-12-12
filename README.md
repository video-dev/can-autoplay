# can-autoplay.js

The auto-play feature detection in HTMLMediaElement (`<audio>` or `<video>`).

![FileSize](http://img.badgesize.io/video-dev/can-autoplay/master/build/can-autoplay.min.js#1?compression=gzip)
![Version](https://img.shields.io/npm/v/can-autoplay.svg)

[Demo page](https://video-dev.github.io/can-autoplay/)

Table of contents:

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
 

- [Installation](#installation)
- [API](#api)
  - [`audio(options)`](#audiooptions)
  - [`video(options)`](#videooptions)
- [Example:](#example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm install can-autoplay
```

## API

### `audio(options)`

Parameters:

- options.muted `<Boolean>`, check if auto-play is possible for a muted content
- options.timeout `<Number>`, timeout for a check, default value is `250` ms

Returns:

- `<Promise>`, resoles to a `<Object>`: 
  - `result <Boolean>`, `true` - if auto-play is possible
  - `error <Error>`, internal or timeout Error object


```js
canAutoplay.audio().then({result} => {
  if (result === true) {
    // Can auto-play
  } else {
    // Can not auto-play
  }
})
```

### `video(options)`

Parameters:

- options.muted `<Boolean>`, check if auto-play is possible for a muted content
- options.timeout `<Number>`, timeout for a check, default value is `250` ms

Returns:

- `<Promise>`, resoles to a `<Object>`:
  - `result <Boolean>`, `true` - if auto-play is possible
  - `error <Error>`, internal or timeout Error object

```js
canAutoplay.video().then(({result}) => {
  if (result === true) {
    // Can autoplay
  } else {
    // Can not autoplay
  }
})
```

## Example

```js
import canAutoPlay from 'can-autoplay';

canAutoPlay
    .video({timeout: 100, muted: true})
    .then(({result, error}) => {
        if(result === false){
            console.warn('Error did occur: ', error)
        }
    })
```
