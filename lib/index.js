const media = require('./media')
let error = null

function audio (options) {
  return startPlayback(setupDefaultValues(options), () => {
    return {
      element: document.createElement('audio'),
      source: media.AUDIO
    }
  })
}

function getError () {
  return error
}

function setupDefaultValues (options) {
  return Object.assign({muted: false, timeout: 250}, options)
}

function startPlayback ({muted, timeout}, elementCallback) {
  let {element, source} = elementCallback()
  let playResult
  let timeoutId
  let sendOutput

  error = null

  element.muted = muted
  element.src = source

  return new Promise(resolve => {
    playResult = element.play()
    timeoutId = setTimeout(() => {
      error = new Error(`Timeout ${timeout} ms has been reached`)
      sendOutput(false)
    }, timeout)
    sendOutput = result => {
      clearTimeout(timeoutId)
      resolve(result)
    }

    if (playResult !== undefined) {
      playResult
        .then(() => sendOutput(true))
        .catch(playError => {
          error = playError
          sendOutput(false)
        })
    } else {
      sendOutput(true)
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

module.exports = {audio, getError, video}
