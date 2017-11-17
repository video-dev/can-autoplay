<h1 align="center">can-autoplay.js</h1>

<div align="center">
 <img src="http://img.badgesize.io/video-dev/can-autoplay/master/build/can-autoplay.min.js?compression=gzip">
</div>

<br>

Work in Progress

## Instalation

```
npm install can-autoplay
```

## API

### `canAutoplay.video()`

```js
// Promise API
canAutoplay.video().then(result => {
  if (result) {
    // Can autoplay
  } else {
    // Can not autoplay
  }
})

// async/await API
if (await canAutoplay.video()) {
  // Can autoplay
} else {
  // Can not autoplay
}
```

### `canAutoplay.videoMuted()`

```js
// Promise API
canAutoplay.videoMuted().then(result => {
  if (result) {
    // Can autoplay
  } else {
    // Can not autoplay
  }
})

// async/await API
if (await canAutoplay.videoMuted()) {
  // Can autoplay
} else {
  // Can not autoplay
}
```

### `canAutoplay.audio()`

```js
// Promise API
canAutoplay.audio().then(result => {
  if (result) {
    // Can autoplay
  } else {
    // Can not autoplay
  }
})

// async/await API
if (await canAutoplay.audio()) {
  // Can autoplay
} else {
  // Can not autoplay
}
```
