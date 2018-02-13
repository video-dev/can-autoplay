import * as Media from './media';

function audio (options) {
  return startPlayback(setupDefaultValues(options), () => {
    return {
      element: document.createElement('audio'),
      source: Media.AUDIO
    }
  })
}

function setupDefaultValues (options) {
  return Object.assign({muted: false, timeout: 250, inline: false}, options)
}

function startPlayback ({muted, timeout, inline}, elementCallback) {
  let {element, source} = elementCallback()
  let playResult
  let timeoutId
  let sendOutput

  element.muted = muted
  if (muted === true) {
      element.setAttribute('muted', 'muted')
  }
  // indicates that the video is to be played "inline",
  // that is within the element's playback area.
  if (inline === true) {
      element.setAttribute('playsinline', 'playsinline')
  }

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
      source: Media.VIDEO
    }
  })
}

export default {audio, video}
