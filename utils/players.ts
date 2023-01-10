import { AnimationObjectGroup, AnimationMixer, Group } from "three"
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils"

export function playersPosition(model: any, count: number, figure: string, pos: { x: number; z: number; r: number }) {
  const group = new Group()
  const team = new AnimationObjectGroup()

  for (let i = 0; i < count; i++) {
    const dancer = SkeletonUtils.clone(model.scene)
    if (figure === "circle") {
      let x = pos.r * Math.cos((i * 2 * Math.PI) / count) + pos.x
      let z = pos.r * Math.sin((i * 2 * Math.PI) / count) + pos.z
      dancer.position.set(x, 0, z)
    }
    //group for addition to the scene
    group.add(dancer)
    //group for addition to the animation
    team.add(dancer)
  }
  return { group, team }
}

export function playersAnimation(model: any, group: AnimationObjectGroup): AnimationMixer {
  const mixer = new AnimationMixer(group)
  const action = mixer.clipAction(model.animations[0], group)
  action.play()
  return mixer
}
