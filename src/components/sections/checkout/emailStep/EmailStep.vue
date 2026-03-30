<template>
  <div :class="styles.card">
    <h1 :class="styles.title">Commencer votre commande</h1>
    <p :class="styles.subtitle">Entrez votre email pour continuer</p>

    <form @submit.prevent="handleContinue" :class="styles.form">
      <FormField label="Email" type="email" v-model="email" required placeholder="vous@exemple.com" />

      <p v-if="error" :class="styles.error">{{ error }}</p>

      <button type="submit" :class="styles.primaryBtn" :disabled="loading || !email">
        {{ loading ? 'Vérification…' : 'Continuer' }}
      </button>
    </form>

    <div :class="styles.divider"><span>ou</span></div>

    <button type="button" :class="styles.guestBtn" @click="handleAsGuest" :disabled="!email">
      Continuer en tant qu'invité
    </button>

    <p :class="styles.guestNote">
      Commandez sans créer de compte. Vous pourrez toujours en créer un après.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import FormField from '@/components/ui/formField/FormField.vue'
import styles from './EmailStep.module.css'

const emit = defineEmits<{
  continue: [email: string]
  asGuest: [email: string]
}>()

const auth = useAuthStore()
const email = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

async function handleContinue() {
  if (!email.value) return
  loading.value = true
  error.value = null
  await auth.checkEmail(email.value)
  loading.value = false
  emit('continue', email.value)
}

function handleAsGuest() {
  if (!email.value) return
  auth.continueAsGuest(email.value)
  emit('asGuest', email.value)
}
</script>
