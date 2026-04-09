<template>
  <div :class="styles.tabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      type="button"
      :class="[styles.tab, modelValue === tab.value && styles.tabActive]"
      @click="emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import styles from './Tabs.module.css'

defineProps<{
  tabs: { value: string; label: string }[]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
