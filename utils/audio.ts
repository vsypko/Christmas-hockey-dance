import { AudioListener, Audio, AudioLoader } from "three"

export default async function createAudio(url: string) {
  const listener = new AudioListener()

  const audio = new Audio(listener)
  const audioLoader = new AudioLoader()
  const buffer = await audioLoader.loadAsync(url)
  audio.setBuffer(buffer)
  audio.setLoop(true)
  audio.setVolume(0.2)
  audio.play()
  return { listener, audio }
}
