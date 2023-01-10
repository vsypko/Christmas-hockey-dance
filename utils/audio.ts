import { AudioListener, Audio, AudioLoader } from "three"

export default async function createAudio(url: string) {
  const listener = new AudioListener()

  const audio = new Audio(listener)
  const audioLoader = new AudioLoader()
  const uri = new URL(url, import.meta.url)
  const buffer = await audioLoader.loadAsync(uri.toString())
  audio.setBuffer(buffer)
  audio.setLoop(true)
  audio.setVolume(0.2)
  audio.play()
  return { listener, audio }
}
