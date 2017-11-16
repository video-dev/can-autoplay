const h264Base64 = require('./h264-base64')
const mp3Base64 = require('./mp3-base64')

const $ = document.querySelector.bind(document)

function removeElement ($element) {
  $element.parentElement.removeChild($element)
}

//
// API
//

function video (opts) {
  opts = Object.assign({ muted: false }, opts)

  const $video = document.createElement('video')

  if (opts.muted) $video.muted = true
  $video.src = h264Base64
  $video.volume = 0.0001
  $video.style.position = 'absolute'
  $video.style.width = 0
  $video.style.height = 0
  $video.style.pointerEvents = 'none'
  $('body').appendChild($video)

  return new Promise((resolve, reject) => {
    $video.addEventListener('canplay', () => {
      $video.play()
        .then(resolve)
        .catch(reject)
        .then(() => removeElement($video))
    })

    setTimeout(reject, 250)
  })
}

function videoMuted () {
  return video({ muted: true })
}

function audio () {
  const $audio = document.createElement('audio')

  $audio.src = mp3Base64
  $('body').appendChild($audio)

  return new Promise((resolve, reject) => {
    $audio.addEventListener('canplay', () => {
      $audio.play()
        .then(resolve)
        .catch(reject)
        .then(() => removeElement($audio))
    })

    setTimeout(reject, 250)
  })
}

module.exports = {
  video,
  videoMuted,
  audio
}
