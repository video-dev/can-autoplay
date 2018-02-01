import * as media from './media';

function audio (options) {
  return startPlayback(setupDefaultValues(options), () => {
    return {
      element: document.createElement('audio'),
      source: media.AUDIO
    }
  })
}

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
    timeoutId = setTimeout(() => {
      sendOutput(false, new Error(`Timeout ${timeout} ms has been reached`))
    }, timeout)
    sendOutput = (result, error = null) => {
      clearTimeout(timeoutId)
      resolve({result, error})
    }

    if (playResult !== undefined) {
      playResult
        .then(() => sendOutput(true))
        .catch(playError => sendOutput(false, playError))
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

export {audio, video}
