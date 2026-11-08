<script setup>
import { computed, ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  modelValue: { type: [String, Number], required: true },
  options: { type: Array, required: true },
  label: { type: String, required: true },
  compact: Boolean,
})
const emit = defineEmits(['update:modelValue'])
const root = ref(null)
const trigger = ref(null)
const open = ref(false)
const above = ref(false)
const active = ref(0)
const selected = computed(() => props.options.findIndex(option => option.value === props.modelValue))
const selectedLabel = computed(() => props.options[selected.value]?.label || '')
let typed = ''
let typedAt = 0
function ensureVisible() { nextTick(() => document.getElementById(`${props.id}-option-${active.value}`)?.scrollIntoView({ block: 'nearest' })) }
function show() {
  const rect = trigger.value.getBoundingClientRect()
  above.value = window.innerHeight - rect.bottom < Math.min(props.options.length * 48 + 20, 310) && rect.top > 310
  active.value = Math.max(0, selected.value)
  open.value = true
  ensureVisible()
}
function choose(index) {
  emit('update:modelValue', props.options[index].value)
  open.value = false
  trigger.value?.focus({ preventScroll: true })
}
function keydown(e) {
  if (e.key === 'Escape' && open.value) { e.preventDefault(); e.stopPropagation(); open.value = false; return }
  if (e.key === 'Tab') { open.value = false; return }
  if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
    e.preventDefault()
    if (!open.value) show()
    else if (e.key === 'ArrowDown') active.value = (active.value + 1) % props.options.length
    else if (e.key === 'ArrowUp') active.value = (active.value - 1 + props.options.length) % props.options.length
    if (e.key === 'Home') active.value = 0
    if (e.key === 'End') active.value = props.options.length - 1
    ensureVisible()
    return
  }
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    if (open.value) choose(active.value)
    else show()
    return
  }
  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
    e.preventDefault()
    if (!open.value) show()
    typed = Date.now() - typedAt > 700 ? e.key : typed + e.key
    typedAt = Date.now()
    const index = props.options.findIndex(option => option.label.toLocaleLowerCase().startsWith(typed.toLocaleLowerCase()))
    if (index >= 0) { active.value = index; ensureVisible() }
  }
}
function outside(e) { if (!root.value?.contains(e.target)) open.value = false }
function focusout(e) { if (!root.value?.contains(e.relatedTarget)) open.value = false }
onMounted(() => document.addEventListener('pointerdown', outside))
onBeforeUnmount(() => document.removeEventListener('pointerdown', outside))
</script>

<template>
  <div ref="root" class="select-menu" :class="{ compact, expanded: open, above }" @focusout="focusout">
    <button :id="id" ref="trigger" class="select-trigger" type="button" role="combobox" :aria-label="label" aria-haspopup="listbox" :aria-expanded="open" :aria-controls="`${id}-list`" :aria-activedescendant="open ? `${id}-option-${active}` : undefined" @click="open ? open = false : show()" @keydown="keydown">
      <slot name="icon" />
      <span class="selected-label">{{ selectedLabel }}</span>
      <svg class="select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </button>
    <Transition name="select-pop">
      <ul v-if="open" :id="`${id}-list`" class="select-options" role="listbox" :aria-label="label">
        <li v-for="(option, i) in options" :id="`${id}-option-${i}`" :key="option.value" role="option" :aria-selected="modelValue === option.value" :class="{ active: active === i }" @pointermove="active = i" @pointerdown.prevent @click="choose(i)">
          <span>{{ option.label }}</span><svg v-if="modelValue === option.value" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.select-menu { position: relative; width: 100%; }
.select-trigger { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 52px; padding: 12px 16px; border: 1px solid var(--control-line); border-radius: 12px; color: var(--text-bright); background: var(--ink); font-size: 14px; text-align: left; cursor: pointer; transition: border-color .2s, box-shadow .2s, background .2s; }
.select-trigger:hover, .expanded .select-trigger { border-color: var(--purple); background: var(--surface-raised); box-shadow: 0 0 0 3px color-mix(in srgb, var(--purple) 10%, transparent); }
.selected-label { flex: 1; min-width: 0; }
.select-chevron { flex-shrink: 0; transition: transform .22s ease; opacity: .8; }
.expanded .select-chevron { transform: rotate(180deg); }
.select-options { position: absolute; top: calc(100% + 8px); left: 0; right: 0; z-index: 70; list-style: none; padding: 6px; max-height: min(310px, 50dvh); overflow-y: auto; overscroll-behavior: contain; border: 1px solid var(--line); border-radius: 14px; background: var(--surface-raised); box-shadow: 0 16px 44px #160c2526, 0 3px 8px #160c2512; transform-origin: top center; }
.above .select-options { top: auto; bottom: calc(100% + 8px); transform-origin: bottom center; }
.select-options li { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 44px; padding: 10px 12px; border-radius: 8px; font-size: 14px; line-height: 1.45; color: var(--text); cursor: pointer; transition: background .15s, color .15s; }
.select-options li.active { background: var(--surface); color: var(--purple); }
.select-options li[aria-selected='true'] { color: var(--purple); font-weight: 500; }
.select-options li svg { flex-shrink: 0; }
.compact { width: auto; }
.compact .select-trigger { min-height: 44px; padding: 8px 11px; min-width: 122px; font-size: 12px; border-color: var(--line); background: transparent; }
.compact .select-options { left: auto; min-width: 170px; }
.select-pop-enter-active, .select-pop-leave-active { transition: opacity .18s ease, transform .18s cubic-bezier(.2,.8,.2,1); }
.select-pop-enter-from, .select-pop-leave-to { opacity: 0; transform: translateY(-5px) scale(.97); }
@media (max-width: 430px) { .compact .select-trigger { min-width: 44px; width: 44px; padding: 10px; justify-content: center; } .compact .selected-label, .compact .select-chevron { display: none; } }
@media (prefers-reduced-motion: reduce) { *, .select-pop-enter-active, .select-pop-leave-active { transition: none !important; } }
</style>
