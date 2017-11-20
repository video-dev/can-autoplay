const media = require('./media')

//
// API
//

function video (opts) {
  opts = Object.assign({ muted: false }, opts)

  const $video = document.createElement('video')

  if (opts.muted) {
    $video.muted = true
    $video.volume = 0
  } else {
    $video.muted = false
    $video.volume = 0.0001
  }
  $video.src = media.VIDEO
  $video.style.position = 'absolute'
  $video.style.width = 0
  $video.style.height = 0
  $video.style.pointerEvents = 'none'

  return new Promise((resolve, reject) => {
    $video.addEventListener('canplay', () => {
      $video.play()
        .then(() => resolve(true))
        .catch(() => resolve(false))
    })

    setTimeout(() => resolve(false), 250)
  })
}

function videoMuted () {
  return video({ muted: true })
}

function audio () {
  const $audio = document.createElement('audio')

  $audio.src = media.AUDIO

  return new Promise((resolve, reject) => {
    $audio.addEventListener('canplay', () => {
      $audio.play()
        .then(() => resolve(true))
        .catch(() => resolve(false))
    })

    setTimeout(() => resolve(false), 250)
  })
}

module.exports = {
  video,
  videoMuted,
  audio
}
