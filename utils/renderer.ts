import { WebGLRenderer, sRGBEncoding, PCFSoftShadowMap } from "three"
export default function createRenderer(
  WIDTH: number,
  HEIGHT: number,
  ADJUST_PIXEL_RATIO: number,
  ANTIALIAS: boolean,
): WebGLRenderer {
  const renderer = new WebGLRenderer({ antialias: ANTIALIAS })
  renderer.setSize(WIDTH, HEIGHT)
  renderer.setPixelRatio(window.devicePixelRatio * ADJUST_PIXEL_RATIO)
  renderer.physicallyCorrectLights = true
  renderer.outputEncoding = sRGBEncoding
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
  document.body.appendChild(renderer.domElement)
  return renderer
}
