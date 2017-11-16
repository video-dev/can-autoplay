/* global HTMLVideoElement, HTMLAudioElement, Event */

const puppeteer = require('puppeteer')
const test = require('ava')
const canAutoplay = require('../lib')
const fs = require('fs')
const path = require('path')
const canAutoplayBuild = fs.readFileSync(
  path.join(__dirname, '..', 'build', 'can-autoplay.js')
).toString()

//
// Helpers
//

const createNewPage = (() => {
  let browser

  return async () => {
    browser = browser || await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent('<html><body></body></html>')
    await page.addScriptTag({ content: canAutoplayBuild })
    return page
  }
})()

//
// Video
//

test('returns false if video.play rejects', async t => {
  const page = await createNewPage()
  const result = await page.evaluate(async () => {
    HTMLVideoElement.prototype.play = () => Promise.reject(new Error())

    const promise = canAutoplay.video()
    document.querySelector('video').dispatchEvent(new Event('canplay'))
    const result = await promise
    return result
  })

  t.is(result, false)

  await page.close()
})

test('returns true if video.play resolves', async t => {
  const page = await createNewPage()
  const result = await page.evaluate(async () => {
    HTMLVideoElement.prototype.play = () => Promise.resolve()

    const promise = canAutoplay.video()
    document.querySelector('video').dispatchEvent(new Event('canplay'))
    const result = await promise
    return result
  })

  t.is(result, true)

  await page.close()
})

test('returns false if canplay event is not fired until timeout', async t => {
  const page = await createNewPage()
  const result = await page.evaluate(async () => {
    HTMLVideoElement.prototype.play = () => Promise.resolve()

    const promise = canAutoplay.video()
    const result = await promise
    return result
  })

  t.is(result, false)

  await page.close()
})

//
// Muted video
//

test('returns false if video.play rejects', async t => {
  const page = await createNewPage()
  const result = await page.evaluate(async () => {
    HTMLVideoElement.prototype.play = () => Promise.reject(new Error())

    const promise = canAutoplay.videoMuted()
    document.querySelector('video').dispatchEvent(new Event('canplay'))
    const result = await promise
    return result
  })

  t.is(result, false)

  await page.close()
})

test('returns true if video.play resolves', async t => {
  const page = await createNewPage()
  const result = await page.evaluate(async () => {
    HTMLVideoElement.prototype.play = () => Promise.resolve()

    const promise = canAutoplay.videoMuted()
    document.querySelector('video').dispatchEvent(new Event('canplay'))
    const result = await promise
    return result
  })

  t.is(result, true)

  await page.close()
})

test('returns false if canplay event is not fired until timeout', async t => {
  const page = await createNewPage()
  const result = await page.evaluate(async () => {
    HTMLVideoElement.prototype.play = () => Promise.resolve()

    const promise = canAutoplay.videoMuted()
    const result = await promise
    return result
  })

  t.is(result, false)

  await page.close()
})

//
// Audio
//

test('returns false if audio.play rejects', async t => {
  const page = await createNewPage()
  const result = await page.evaluate(async () => {
    HTMLAudioElement.prototype.play = () => Promise.reject(new Error())

    const promise = canAutoplay.audio()
    document.querySelector('audio').dispatchEvent(new Event('canplay'))
    const result = await promise
    return result
  })

  t.is(result, false)

  await page.close()
})

test('returns true if audio.play resolves', async t => {
  const page = await createNewPage()
  const result = await page.evaluate(async () => {
    HTMLAudioElement.prototype.play = () => Promise.resolve()

    const promise = canAutoplay.audio()
    document.querySelector('audio').dispatchEvent(new Event('canplay'))
    const result = await promise
    return result
  })

  t.is(result, true)

  await page.close()
})

test('returns false if canplay event is not fired until timeout', async t => {
  const page = await createNewPage()
  const result = await page.evaluate(async () => {
    HTMLAudioElement.prototype.play = () => Promise.resolve()

    const promise = canAutoplay.audio()
    const result = await promise
    return result
  })

  t.is(result, false)

  await page.close()
})
