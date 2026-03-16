<template>
  <button
    :class="styles.button"
    :style="[{ backgroundColor: bgColor, color: textColor }, customStyle]"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue'
import styles from './styles.module.css'

defineProps({
  text: {
    type: String,
    required: true
  },
  bgColor: {
    type: String,
    default: '#ffffff'
  },
  textColor: {
    type: String,
    default: '#111111'
  },
  customStyle: {
    type: Object as () => StyleValue,
    default: () => ({})
  }
})
</script>