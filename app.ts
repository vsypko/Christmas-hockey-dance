import { Scene, Color, Clock, Object3D } from "three"
import "./app.css"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import createRenderer from "./utils/renderer"

import loadModel from "./utils/loadModel"
import createCamera from "./utils/camera"
import createLight from "./utils/lights"
import { playersPosition, playersAnimation } from "./utils/players"
import createAudio from "./utils/audio"

let mediaW = window.matchMedia("(max-width: 760px)")
let mediaH = window.matchMedia("(max-height: 760px)")

let ADJUST_PIXEL_RATIO = 1
let ANTIALIAS = true
let PLAYERS_COUNT = 6

if (mediaW.matches || mediaH.matches) {
  ADJUST_PIXEL_RATIO = 0.8
  ANTIALIAS = false
  PLAYERS_COUNT = 5
}

const startButton = document.getElementById("startButton")
if (startButton) startButton.addEventListener("click", main)

//define consts -----------------------------------------------------------
const HEIGHT = window.innerHeight
const WIDTH = window.innerWidth

//define objects URL--------------------------------------------------------
const rink = new URL("./assets/hrm3.glb", import.meta.url)
const tree = new URL("./assets/tree.glb", import.meta.url)
const player = new URL("./assets/player.glb", import.meta.url)
const sound = new URL("./assets/rangers-goal-song.mp3", import.meta.url)

//create objects --------------------------------------------------------
const renderer = createRenderer(WIDTH, HEIGHT, ADJUST_PIXEL_RATIO, ANTIALIAS)
const camera = createCamera(WIDTH, HEIGHT, { x: -10, y: 10, z: 20 })
const controls = new OrbitControls(camera, renderer.domElement)
const scene = new Scene()
scene.background = new Color(0x020820)

/// create lights -----------------------------------------------------
const { ambientLight, mainLight } = createLight()
scene.add(ambientLight, mainLight)

//main function --------------------------------------------------------
async function main(): Promise<void> {
  const overlay = document.getElementById("overlay")
  if (overlay) overlay.remove()
  const rinkModel = await loadModel(rink.toString(), "receiveShadow")
  const treeModel = await loadModel(tree.toString(), "castShadow")
  if (rinkModel && treeModel) {
    treeModel.scene.scale.set(2, 2, 2)
    scene.add(rinkModel.scene as Object3D, treeModel.scene as Object3D)
  }

  const playerModel = await loadModel(player.toString(), "castShadow")
  const { listener, audio } = await createAudio(sound.toString())
  if (playerModel) {
    const { group, team } = playersPosition(playerModel, PLAYERS_COUNT, "circle", { x: 0, z: 0, r: 5 })
    scene.add(group)
    const mixer = playersAnimation(playerModel, team)
    const clock = new Clock()
    let delta: number

    function render() {
      window.requestAnimationFrame(render)
      delta = clock.getDelta() * 0.56
      mixer.update(delta)
      renderer.render(scene, camera)
    }
    render()
  }
}
