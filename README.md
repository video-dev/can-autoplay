<h1 align="center">can-autoplay.js</h1>

<div align="center">
 <img src="http://img.badgesize.io/video-dev/can-autoplay/master/build/can-autoplay.min.js#1?compression=gzip">
</div>

<br>

The auto-play feature detection in HTMLMediaElement (`<audio>` or `<video>`).

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

## Example:

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
