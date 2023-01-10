import { WebGLRenderer, sRGBEncoding, PCFSoftShadowMap } from "three"
export default function createRenderer(WIDTH: number, HEIGHT: number): WebGLRenderer {
  const renderer = new WebGLRenderer({ antialias: false })
  renderer.setSize(WIDTH, HEIGHT)
  renderer.setPixelRatio(window.devicePixelRatio * 0.8)
  renderer.physicallyCorrectLights = true
  renderer.outputEncoding = sRGBEncoding
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
  document.body.appendChild(renderer.domElement)
  return renderer
}
