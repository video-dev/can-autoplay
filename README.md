<h1 align="center">can-autoplay.js</h1>

<div align="center">
 <img src="http://img.badgesize.io/video-dev/can-autoplay/master/build/can-autoplay.min.js#1?compression=gzip">
</div>

<br>

Work in Progress

## Instalation

```
npm install can-autoplay
```

## API

### `audio(options)`

Parameters:

- options.muted `<Boolean>`, check if auto-play is possible for a muted content
- options.timeout `<Number>`, timeout for a check, default value is `250` ms

Returns:

- `<Promise>`, resoles to a `<Boolean>`, `true` - if auto-play is possible


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

### `getError()`

Returns:

- `<Error>`, internal or timeout Error object

```js
canAutoplay.video({mute: true}).then(result => {
  if(result === false){
    console.warn('Error did occur: ', canAutoplay.getError())
  }
})
```

### `video(options)`

Parameters:

- options.muted `<Boolean>`, check if auto-play is possible for a muted content
- options.timeout `<Number>`, timeout for a check, default value is `250` ms

Returns:

- `<Promise>`, resoles to a `<Boolean>`, `true` - if auto-play is possible

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
