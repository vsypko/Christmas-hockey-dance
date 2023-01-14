import { Mesh } from "three"
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader"

export default async function loadModel(url: string, shadowBehavior: string) {
  const loader = new GLTFLoader()
  const model = await loader.loadAsync(url)

  model.scene.traverse((node) => {
    if ((node as Mesh).isMesh) {
      if (shadowBehavior === "castShadow") {
        node.castShadow = true
        node.receiveShadow = false
        return
      }
      node.receiveShadow = true
      node.castShadow = false
    }
  })
  return model
}
