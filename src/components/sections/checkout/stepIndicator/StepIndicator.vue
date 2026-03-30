<template>
  <ol :class="styles.steps">
    <li
      v-for="(label, i) in steps"
      :key="i"
      :class="[styles.step, currentStep > i + 1 && styles.done, currentStep === i + 1 && styles.active]"
    >
      <span :class="styles.dot">{{ currentStep > i + 1 ? '✓' : i + 1 }}</span>
      <span :class="styles.label">{{ label }}</span>
    </li>
  </ol>
</template>

<script setup lang="ts">
import styles from './StepIndicator.module.css'

defineProps<{ currentStep: number }>()

const steps = ['Compte', 'Livraison', 'Paiement', 'Confirmation']
</script>
