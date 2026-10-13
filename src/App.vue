<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/layout/NavBar.vue'
import SiteFooter from './components/layout/SiteFooter.vue'

const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    window.scrollTo(0, 0)
  },
)
</script>

<template>
  <NavBar />
  <main>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </main>
  <SiteFooter />
</template>
