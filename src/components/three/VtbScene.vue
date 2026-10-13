<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const props = defineProps({
  state: { type: Object, required: true },
})

const mount = ref(null)

let renderer
let scene
let camera
let model = null
const wheels = []
const highlightMats = []
let clock
let raf = 0
let disposed = false
let resizeObserver = null

const MAX_DIST = 7

function findAxle(obj) {
  const geo = obj.geometry
  if (!geo.boundingBox) geo.computeBoundingBox()
  const s = geo.boundingBox.getSize(new THREE.Vector3())
  if (s.y <= s.x && s.y <= s.z) return new THREE.Vector3(0, 1, 0)
  if (s.x <= s.y && s.x <= s.z) return new THREE.Vector3(1, 0, 0)
  return new THREE.Vector3(0, 0, 1)
}

function applyModelFit() {
  if (!model) return
  const el = mount.value
  const aspect = (el.clientWidth || 1) / (el.clientHeight || 1)
  const fovRad = THREE.MathUtils.degToRad(camera.fov)
  const visH = 2 * MAX_DIST * Math.tan(fovRad / 2)
  const visW = visH * aspect
  const s = model.userData.rawSize
  const mH = s.y
  const mW = Math.hypot(s.x, s.z)
  const f = Math.min((0.92 * visH) / mH, (0.92 * visW) / mW)
  const c = model.userData.rawCenter
  model.scale.setScalar(f)
  model.position.set(-c.x * f, -model.userData.rawMinY * f, -c.z * f)
  model.userData.baseY = model.position.y
  model.userData.scaledHeight = s.y * f
}

function init() {
  const el = mount.value
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  el.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x120a1a, 0.035)

  camera = new THREE.PerspectiveCamera(40, 1, 0.1, 120)

  const key = new THREE.DirectionalLight(0xfff2ff, 2.4)
  key.position.set(5, 7, 6)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  key.shadow.camera.near = 0.5
  key.shadow.camera.far = 40
  key.shadow.camera.left = -8
  key.shadow.camera.right = 8
  key.shadow.camera.top = 8
  key.shadow.camera.bottom = -8
  scene.add(key)

  const rim = new THREE.DirectionalLight(0xb794f6, 3.2)
  rim.position.set(-6, 4, -5)
  scene.add(rim)

  const fill = new THREE.DirectionalLight(0x9070e0, 1.2)
  fill.position.set(0, -1, 4)
  scene.add(fill)

  scene.add(new THREE.AmbientLight(0x2a1a36, 1.1))

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.ShadowMaterial({ opacity: 0.32 }),
  )
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -0.02
  ground.receiveShadow = true
  scene.add(ground)

  const loader = new GLTFLoader()
  loader.load(
    `${import.meta.env.BASE_URL}models/vtb0.glb`,
    (gltf) => {
      if (disposed) return
      model = gltf.scene
      const box = new THREE.Box3().setFromObject(model)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      model.userData.rawSize = size
      model.userData.rawCenter = center
      model.userData.rawMinY = box.min.y

      model.traverse((o) => {
        if (o.isMesh) {
          o.castShadow = true
          o.receiveShadow = true
          if (o.name.toLowerCase().startsWith('wheel')) {
            wheels.push(o)
            o.userData.axle = findAxle(o)
          }
          const m = o.material
          if (m && m.name === 'VTB_Orange') {
            m.emissive = new THREE.Color(0xff7a2f)
            m.emissiveIntensity = 0
            highlightMats.push(m)
          }
        }
      })
      scene.add(model)
      applyModelFit()
    },
    undefined,
    (err) => console.error('VTB0 model failed to load:', err),
  )

  const onResize = () => {
    const w = el.clientWidth || 1
    const h = el.clientHeight || 1
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    applyModelFit()
  }
  onResize()
  resizeObserver = new ResizeObserver(onResize)
  resizeObserver.observe(el)

  clock = new THREE.Clock()
  raf = requestAnimationFrame(loop)
}

function loop() {
  raf = requestAnimationFrame(loop)
  const s = props.state
  const dt = Math.min(clock.getDelta(), 0.05)

  if (model) {
    model.rotation.y = s.rotY + Math.sin(clock.elapsedTime * 0.4) * 0.02
    model.rotation.z = s.tilt
    model.position.y = model.userData.baseY + s.lift - s.crouch * 0.35

    for (const w of wheels) {
      w.rotateOnAxis(w.userData.axle, s.wheelSpin * dt * 9)
    }
    for (const m of highlightMats) {
      m.emissiveIntensity = s.highlight * 1.6
    }
  }

  const st = Math.sin(s.camTheta)
  const ct = Math.cos(s.camTheta)
  const k = model ? model.userData.scaledHeight / 3.4 : 1
  camera.position.set(st * s.camDist, s.camHeight * k, ct * s.camDist)
  camera.lookAt(0, s.camTargetY * k, 0)

  renderer.render(scene, camera)
}

onMounted(init)
onBeforeUnmount(() => {
  disposed = true
  cancelAnimationFrame(raf)
  resizeObserver?.disconnect()
  if (renderer) {
    renderer.dispose()
    renderer.domElement.remove()
  }
})
</script>

<template>
  <div ref="mount" class="vtb-scene" />
</template>

<style scoped>
.vtb-scene {
  position: absolute;
  inset: 0;
}
.vtb-scene :deep(canvas) {
  display: block;
}
</style>
