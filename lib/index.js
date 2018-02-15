import * as Media from './media';

function audio (options) {
  return startPlayback(setupDefaultValues(options), () => {
    return {
      element: document.createElement('audio'),
      source: URL.createObjectURL(base64toBlob(Media.AUDIO))
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
      source: URL.createObjectURL(base64toBlob(Media.VIDEO))
    }
  })
}

function base64toBlob (base64) {
  const base64Regex = /^data:([^;]+);base64,(.+)$/i
  const matches = base64.match(base64Regex)
  const contentType = matches[1];
  const base64Data = matches[2];

  const sliceSize = 1024
  const byteCharacters = atob(base64Data)
  const bytesLength = byteCharacters.length
  const slicesCount = Math.ceil(bytesLength / sliceSize)
  const byteArrays = new Array(slicesCount)

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize
    const end = Math.min(begin + sliceSize, bytesLength)

    const bytes = new Array(end - begin)
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0)
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes)
  }
  return new Blob(byteArrays, { type: contentType })
}

export default {audio, video}
