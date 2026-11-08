<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { brand, nav } from '../../content/site.js'

const route = useRoute()
const scrolled = ref(false)
const open = ref(false)
const menuButton = ref(null)
watch(() => route.fullPath, () => { open.value = false })
function closeMenu() { open.value = false; menuButton.value?.focus() }

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ scrolled }" @keydown.esc="closeMenu">
    <div class="nav-inner container">
      <RouterLink to="/" class="wordmark" @click="open = false">
        <svg class="wordmark-mark" width="29" height="30" viewBox="0 0 29 30" aria-hidden="true"><path d="M3 4L14 26L25 4" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="25" cy="4" r="3" fill="#a74618"/></svg>
        {{ brand.name.toLowerCase() }}
      </RouterLink>

      <nav class="links" aria-label="Main navigation">
        <RouterLink v-for="l in nav" :key="l.to" :to="l.to" class="link mono">
          {{ l.label }}
        </RouterLink>
        <RouterLink to="/contact" class="pill mono">Contact</RouterLink>
      </nav>

      <button ref="menuButton" class="burger" :class="{ open }" :aria-expanded="open" aria-controls="mobile-nav" :aria-label="open ? 'Close menu' : 'Open menu'" @click="open = !open">
        <span></span><span></span>
      </button>
    </div>

    <transition name="drop">
      <nav v-if="open" id="mobile-nav" class="mobile mono" aria-label="Mobile navigation">
        <RouterLink v-for="l in nav" :key="l.to" :to="l.to" @click="open = false">{{ l.label }}</RouterLink>
        <RouterLink to="/contact" @click="open = false">Contact</RouterLink>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  transition: background 0.4s ease, border-color 0.4s ease;
  background: rgba(250, 248, 244, .97);
  border-bottom: 1px solid var(--line);
}
.nav.scrolled {
  background: rgba(250, 248, 244, .97);
  backdrop-filter: blur(12px);
  border-color: var(--line);
}
.nav-inner {
  height: 82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wordmark {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 27px;
  letter-spacing: -0.055em;
  color: var(--text-bright);
  display: flex;
  align-items: center;
  gap: 10px;
}
.wordmark-mark {
  color: var(--purple);
  font-size: 14px;
}
.links {
  display: flex;
  align-items: center;
  gap: 32px;
}
.link {
  color: var(--text-muted);
  transition: color 0.2s ease;
}
.link:hover {
  color: var(--text-bright);
}
.link.router-link-active {
  color: var(--text-bright);
}
.pill {
  border: 1px solid var(--purple-light);
  color: var(--text-bright);
  padding: 9px 20px;
  border-radius: 999px;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.pill:hover {
  background: var(--purple);
  border-color: var(--purple);
  color: #fff;
}
.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px;
  min-width: 44px;
  min-height: 44px;
}
.burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-bright);
  transition: transform 0.3s ease;
}
.mobile {
  display: none;
  flex-direction: column;
  padding: 16px var(--gutter) 28px;
  gap: 18px;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}
@media (max-width: 720px) {
  .links {
    display: none;
  }
  .burger {
    display: flex;
  }
  .mobile {
    display: flex;
  }
}
.drop-enter-active,
.drop-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
