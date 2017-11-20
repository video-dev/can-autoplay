const media = require('./media')

function setupDefaultValues (options) {
  return Object.assign({muted: false, timeout: 250}, options)
}

function startPlayback ({muted, timeout}, elementCallback) {
  let {element, source} = elementCallback()
  let playResult
  let timeoutId

  element.muted = muted
  element.src = source

  return new Promise(resolve => {
    playResult = element.play()
    timeoutId = setTimeout(() => resolve(false), timeout)

    if (playResult !== undefined) {
      playResult
        .then(() => resolve(true))
        .catch(() => resolve(false))
    } else {
      resolve(true)
    }
  })
}

function audio (options) {
  return startPlayback(setupDefaultValues(options), () => {
    return {
      element: document.createElement('audio'),
      source: media.AUDIO
    }
  })
}

function video (options) {
  return startPlayback(setupDefaultValues(options), () => {
    return {
      element: document.createElement('video'),
      source: media.VIDEO
    }
  })
}

module.exports = {
  audio,
  video
}
