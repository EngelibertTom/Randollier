<template>
  <div :class="styles.card">
    <button type="button" :class="styles.backBtn" @click="emit('back')">← Changer d'email</button>

    <h1 :class="styles.title">Bienvenue !</h1>
    <p :class="styles.emailBadge">{{ email }}</p>
    <p :class="styles.subtitle">Entrez votre mot de passe pour vous connecter</p>

    <form @submit.prevent="handleLogin" :class="styles.form">
      <FormField label="Mot de passe" type="password" v-model="password" required />

      <p v-if="auth.error" :class="styles.error">{{ auth.error }}</p>

      <button type="submit" :class="styles.primaryBtn" :disabled="auth.loading || !password">
        {{ auth.loading ? 'Connexion…' : 'Se connecter' }}
      </button>
    </form>

    <button type="button" :class="styles.forgotBtn">Mot de passe oublié ?</button>

    <div :class="styles.divider"><span>ou</span></div>

    <button type="button" :class="styles.guestBtn" @click="handleAsGuest">
      Continuer en tant qu'invité
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import FormField from '@/components/ui/formField/FormField.vue'
import styles from './LoginStep.module.css'

const props = defineProps<{ email: string }>()
const emit = defineEmits<{
  login: []
  asGuest: []
  back: []
}>()

const auth = useAuthStore()
const password = ref('')

async function handleLogin() {
  await auth.login(props.email, password.value)
  if (!auth.error) emit('login')
}

function handleAsGuest() {
  auth.continueAsGuest(props.email)
  emit('asGuest')
}
</script>
