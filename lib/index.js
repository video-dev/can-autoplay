const media = require('./media')

function setupDefaultValues (options) {
  return Object.assign({muted: false, timeout: 250}, options)
}

function startPlayback ({muted, timeout}, elementCallback) {
  let {element, source} = elementCallback()
  let playResult
  let timeoutId
  let sendOutput

  element.muted = muted
  element.src = source

  return new Promise(resolve => {
    playResult = element.play()
    timeoutId = setTimeout(() => sendOutput(false), timeout)
    sendOutput = result => {
      clearTimeout(timeoutId)
      resolve(result)
    }

    if (playResult !== undefined) {
      playResult
        .then(() => sendOutput(true))
        .catch(() => sendOutput(false))
    } else {
      sendOutput(true)
    }
  })
}

function audio (options) {
  return startPlayback(setupDefaultValues(options), () => {
    return {
      element: document.createElement('audio'),
      source : media.AUDIO
    }
  })
}

function video (options) {
  return startPlayback(setupDefaultValues(options), () => {
    return {
      element: document.createElement('video'),
      source : media.VIDEO
    }
  })
}

module.exports = {
  audio,
  video
}
