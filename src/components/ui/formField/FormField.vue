<template>
  <div :class="styles.field">
    <label :class="styles.label">
      {{ label }}<span v-if="required" :class="styles.required"> *</span>
    </label>

    <select
      v-if="type === 'select'"
      :class="[styles.input, styles.selectInput, error && styles.inputError, disabled && styles.inputDisabled]"
      :value="modelValue"
      :disabled="disabled"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>

    <textarea
      v-else-if="type === 'textarea'"
      :class="[styles.input, error && styles.inputError, disabled && styles.inputDisabled]"
      :placeholder="placeholder"
      :value="modelValue"
      :rows="rows ?? 4"
      :disabled="disabled"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />

    <input
      v-else
      :type="type ?? 'text'"
      :class="[styles.input, error && styles.inputError, disabled && styles.inputDisabled]"
      :placeholder="placeholder"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <p v-if="error" :class="styles.errorMsg">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import styles from './FormField.module.css'

withDefaults(defineProps<{
  label: string
  modelValue: string
  type?: 'text' | 'email' | 'tel' | 'date' | 'password' | 'select' | 'textarea'
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
  options?: { value: string; label: string }[]
  rows?: number
}>(), {
  type: 'text'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
