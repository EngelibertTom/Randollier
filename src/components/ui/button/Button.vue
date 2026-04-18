<template>
  <button :type="type" :class="styles.button">
    <slot />
  </button>
</template>

<script setup lang="ts">
import styles from './styles.module.css'

defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button'
  }
})
</script>
