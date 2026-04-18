<template>
  <div :class="styles.card">
    <Button :class="styles.backBtn" @click="emit('back')">← Changer d'email</Button>

    <h1 :class="styles.title">Bienvenue !</h1>
    <p :class="styles.emailBadge">{{ email }}</p>
    <p :class="styles.subtitle">Entrez votre mot de passe pour vous connecter</p>

    <form @submit.prevent="handleLogin" :class="styles.form">
      <FormField label="Mot de passe" type="password" v-model="password" required />

      <p v-if="auth.error" :class="styles.error">{{ auth.error }}</p>

      <Button type="submit" :class="styles.primaryBtn" :disabled="auth.loading || !password">
        {{ auth.loading ? 'Connexion…' : 'Se connecter' }}
      </Button>
    </form>

    <Button :class="styles.forgotBtn">Mot de passe oublié ?</Button>

    <div :class="styles.divider"><span>ou</span></div>

    <Button :class="styles.guestBtn" @click="handleAsGuest">
      Continuer en tant qu'invité
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import FormField from '@/components/ui/formField/FormField.vue'
import Button from '@/components/ui/button/Button.vue'
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
