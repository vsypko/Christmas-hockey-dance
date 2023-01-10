import { DirectionalLight, HemisphereLight } from "three"

type TDefaultLights = {
  ambientLight: HemisphereLight
  mainLight: DirectionalLight
}

export default function createLight(): TDefaultLights {
  const ambientLight = new HemisphereLight(0xffffff, 0x000000, 1)
  const mainLight = new DirectionalLight(0xffffff, 3)
  mainLight.castShadow = true
  mainLight.position.set(50, 100, 50)
  mainLight.shadow.camera.left = -30
  mainLight.shadow.camera.right = 30
  mainLight.shadow.camera.top = 25
  mainLight.shadow.camera.bottom = -25
  mainLight.shadow.camera.near = 0.5
  mainLight.shadow.camera.far = 1000
  mainLight.shadow.mapSize.width = 1024
  mainLight.shadow.mapSize.height = 1024

  return { ambientLight, mainLight }
}
