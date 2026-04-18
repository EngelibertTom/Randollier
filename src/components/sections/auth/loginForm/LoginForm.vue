<template>
  <form @submit.prevent="handleLogin" :class="styles.form">
    <div :class="styles.header">
      <h1 :class="styles.title">Bon retour parmi nous</h1>
      <p :class="styles.subtitle">Connectez-vous pour accéder à vos commandes et favoris</p>
    </div>

    <FormField
      label="Adresse e-mail"
      type="email"
      v-model="form.email"
      placeholder="votre@email.com"
      required
    />

    <div :class="styles.passwordWrapper">
      <FormField
        label="Mot de passe"
        type="password"
        v-model="form.password"
        placeholder="••••••••"
        required
      />
      <Button :class="styles.forgotLink">Mot de passe oublié ?</Button>
    </div>

    <p v-if="auth.error" :class="styles.errorMsg">{{ auth.error }}</p>

    <Button
      type="submit"
      :class="styles.primaryBtn"
      :disabled="auth.loading || !form.email || !form.password"
    >
      <span v-if="auth.loading" :class="styles.spinner"></span>
      {{ auth.loading ? 'Connexion…' : 'Se connecter' }}
    </Button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import FormField from '@/components/ui/formField/FormField.vue'
import Button from '@/components/ui/button/Button.vue'
import styles from './LoginForm.module.css'

const emit = defineEmits<{ success: [] }>()

const auth = useAuthStore()
const form = reactive({ email: '', password: '' })

async function handleLogin() {
  await auth.login(form.email, form.password)
  if (!auth.error) emit('success')
}
</script>
