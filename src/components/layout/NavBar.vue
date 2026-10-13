<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { brand, nav } from '../../content/site.js'

const route = useRoute()
const scrolled = ref(false)
const open = ref(false)

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
  <header class="nav" :class="{ scrolled }">
    <div class="nav-inner container">
      <RouterLink to="/" class="wordmark" @click="open = false">
        <span class="wordmark-mark">▮</span>
        {{ brand.name.toUpperCase() }}
      </RouterLink>

      <nav class="links">
        <RouterLink v-for="l in nav" :key="l.to" :to="l.to" class="link mono">
          {{ l.label }}
        </RouterLink>
        <RouterLink to="/contact" class="pill mono">Contact</RouterLink>
      </nav>

      <button class="burger" :class="{ open }" aria-label="Menu" @click="open = !open">
        <span></span><span></span>
      </button>
    </div>

    <transition name="drop">
      <nav v-if="open" class="mobile mono">
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
  border-bottom: 1px solid transparent;
}
.nav.scrolled {
  background: rgba(18, 10, 26, 0.82);
  backdrop-filter: blur(12px);
  border-color: var(--line);
}
.nav-inner {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wordmark {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.02em;
  color: var(--text-bright);
  display: flex;
  align-items: center;
  gap: 10px;
}
.wordmark-mark {
  color: var(--orange);
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
}
.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
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
