import { Camera, PerspectiveCamera } from "three"
export default function createCamera(WIDTH: number, HEIGHT: number, pos: { x: number; y: number; z: number }): Camera {
  const camera = new PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 500)
  camera.position.set(pos.x, pos.y, pos.z)
  return camera
}
