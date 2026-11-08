<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const props = defineProps({ labels: { type: Object, required: true }, dark: { type: Boolean, default: false }, progress: { type: Number, default: 0 }, poster: String, posterAlt: String })
const mount = ref(null)
const state = ref('loading')
const status = computed(() => props.labels[state.value])
const ready = ref(false)
let renderer, scene, camera, controls, observer, environment
let disposed = false
const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
let radius = 1.8
let angle = .65
function frameModel() {
  if (!camera || !controls) return
  const fov = THREE.MathUtils.degToRad(camera.fov)
  const limitingFov = Math.min(fov, 2 * Math.atan(Math.tan(fov / 2) * camera.aspect))
  const distance = radius / Math.sin(limitingFov / 2) * .99
  camera.position.set(Math.sin(angle) * distance, 1.35 + distance * .08, Math.cos(angle) * distance)
  controls.target.set(0, 1.35, 0)
  controls.update()
  render()
}
function followScroll() { if (!motion.matches) { angle = .65 + props.progress * Math.PI * 2; frameModel() } }
watch(() => props.progress, followScroll)
watch(() => props.labels.label, label => renderer?.domElement.setAttribute('aria-label', label))
watch(() => props.dark, dark => { if (renderer) { renderer.toneMappingExposure = dark ? .85 : 1.1; render() } })

function render() { if (!disposed && renderer && camera) renderer.render(scene, camera) }
function release(root) {
  root.traverse(o => {
    o.geometry?.dispose()
    const materials = Array.isArray(o.material) ? o.material : [o.material]
    for (const material of materials) {
      if (!material) continue
      for (const value of Object.values(material)) if (value?.isTexture) value.dispose()
      material.dispose()
    }
  })
}
function rotate(direction) {
  if (!ready.value) return
  const offset = camera.position.clone().sub(controls.target)
  offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), direction * Math.PI / 8)
  camera.position.copy(controls.target).add(offset)
  controls.update()
  render()
}
function reset() {
  if (!ready.value) return
  angle = motion.matches ? .65 : .65 + props.progress * Math.PI * 2
  frameModel()
}
onMounted(() => {
  motion.addEventListener('change', reset)
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = props.dark ? .85 : 1.1
    renderer.domElement.setAttribute('aria-label', props.labels.label)
    renderer.domElement.setAttribute('role', 'img')
    mount.value.appendChild(renderer.domElement)
    scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    const room = new RoomEnvironment()
    environment = pmrem.fromScene(room)
    scene.environment = environment.texture
    room.dispose()
    pmrem.dispose()
    camera = new THREE.PerspectiveCamera(40, 1, .01, 100)
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false
    controls.enableZoom = false
    controls.enabled = !window.matchMedia('(pointer: coarse)').matches
    renderer.domElement.style.touchAction = 'pan-y'
    controls.minPolarAngle = .25
    controls.maxPolarAngle = Math.PI * .85
    controls.addEventListener('change', render)
    scene.add(new THREE.HemisphereLight(0xffffff, 0x807280, 2.8))
    for (const [x, y, z, power] of [[4, 6, 5, 3], [-4, 3, -2, 2]]) {
      const light = new THREE.DirectionalLight(0xffffff, power)
      light.position.set(x, y, z)
      scene.add(light)
    }
    observer = new ResizeObserver(() => {
      if (!mount.value) return
      const { clientWidth: w, clientHeight: h } = mount.value
      renderer.setSize(w, h)
      camera.aspect = w / Math.max(h, 1)
      camera.updateProjectionMatrix()
      frameModel()
    })
    observer.observe(mount.value)
    new GLTFLoader().load(`${import.meta.env.BASE_URL}models/exo-dfm-r03.glb`, gltf => {
      if (disposed) { release(gltf.scene); return }
      const model = gltf.scene
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const scale = 2.7 / box.getSize(new THREE.Vector3()).y
      model.scale.setScalar(scale)
      model.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale)
      scene.add(model)
      radius = new THREE.Box3().setFromObject(model).getBoundingSphere(new THREE.Sphere()).radius
      ready.value = true
      state.value = 'ready'
      reset()
    }, undefined, () => { if (!disposed) state.value = 'error' })
  } catch {
    state.value = 'error'
  }
})
onBeforeUnmount(() => {
  disposed = true
  motion.removeEventListener('change', reset)
  observer?.disconnect()
  controls?.dispose()
  if (scene) release(scene)
  environment?.dispose()
  renderer?.dispose()
  renderer?.domElement.remove()
})
</script>

<template>
  <div class="viewer">
    <img v-if="!ready && poster" class="viewer-poster" :src="poster" :alt="posterAlt" />
    <div ref="mount" class="canvas-mount" />
    <p class="viewer-status" role="status">{{ status }}</p>
    <div v-if="ready" class="rotate-controls" :aria-label="labels.controls">
      <button :aria-label="labels.left" @click="rotate(-1)">←</button>
      <button @click="reset">{{ labels.reset }}</button>
      <button :aria-label="labels.right" @click="rotate(1)">→</button>
    </div>
  </div>
</template>

<style scoped>
.viewer { position: absolute; inset: 0; background: transparent; }
.viewer-poster { position: absolute; width: 100%; height: calc(100% - 65px); object-fit: contain; border-radius: 24px; }
.canvas-mount { position: absolute; inset: 0 0 65px; }
.canvas-mount :deep(canvas) { display: block; }
.viewer-status { position: absolute; top: 16px; left: 16px; right: 16px; font-size: 12px; text-align: center; color: var(--text); pointer-events: none; }
.rotate-controls { position: absolute; bottom: 14px; display: flex; gap: 8px; justify-content: center; width: 100%; }
button { min-width: 44px; min-height: 44px; border: 1px solid #ffffff65; border-radius: 14px; padding: 8px 16px; background: #ffffff25; backdrop-filter: blur(16px); color: inherit; cursor: pointer; font-size: 13px; box-shadow: inset 0 1px 0 #ffffff45; }
</style>
