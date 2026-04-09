<template>
  <form @submit.prevent="handleRegister" :class="styles.form">
    <div :class="styles.header">
      <h1 :class="styles.title">Rejoignez Randollier</h1>
      <p :class="styles.subtitle">Créez votre compte et profitez de tous nos avantages</p>
    </div>

    <div :class="styles.row">
      <FormField label="Prénom" v-model="form.firstName" placeholder="Jean" required />
      <FormField label="Nom" v-model="form.lastName" placeholder="Dupont" required />
    </div>

    <FormField
      label="Adresse e-mail"
      type="email"
      v-model="form.email"
      placeholder="votre@email.com"
      required
    />
    <FormField
      label="Mot de passe"
      type="password"
      v-model="form.password"
      placeholder="Minimum 8 caractères"
      required
    />
    <FormField
      label="Confirmer le mot de passe"
      type="password"
      v-model="form.confirmPassword"
      placeholder="••••••••"
      required
      :error="passwordError"
    />

    <p v-if="auth.error" :class="styles.errorMsg">{{ auth.error }}</p>

    <button
      type="submit"
      :class="styles.primaryBtn"
      :disabled="auth.loading || !!passwordError || !canSubmit"
    >
      <span v-if="auth.loading" :class="styles.spinner"></span>
      {{ auth.loading ? 'Création…' : 'Créer mon compte' }}
    </button>

    <p :class="styles.legalNote">
      En créant un compte, vous acceptez nos
      <a href="#" :class="styles.legalLink">Conditions générales</a> et notre
      <a href="#" :class="styles.legalLink">Politique de confidentialité</a>.
    </p>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import FormField from '@/components/ui/formField/FormField.vue'
import styles from './RegisterForm.module.css'

const emit = defineEmits<{ success: [] }>()

const auth = useAuthStore()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const passwordError = computed(() =>
  form.confirmPassword && form.password !== form.confirmPassword
    ? 'Les mots de passe ne correspondent pas'
    : undefined
)

const canSubmit = computed(() =>
  form.firstName && form.lastName && form.email && form.password && form.confirmPassword
)

async function handleRegister() {
  if (passwordError.value || !canSubmit.value) return
  await auth.register({
    email: form.email,
    password: form.password,
    firstName: form.firstName,
    lastName: form.lastName,
  })
  if (!auth.error) emit('success')
}
</script>
