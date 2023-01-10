import { Mesh } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export default async function loadModel(url: string, shadowBehavior: string) {
  const loader = new GLTFLoader()
  const loadedObject = await loader.loadAsync(url)

  if (loadedObject) {
    const model = loadedObject
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
}
