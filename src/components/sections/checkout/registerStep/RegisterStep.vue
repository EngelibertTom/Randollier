<template>
  <div :class="styles.card">
    <Button :class="styles.backBtn" @click="emit('back')">← Changer d'email</Button>

    <h1 :class="styles.title">Créer votre compte</h1>
    <p :class="styles.emailBadge">{{ email }}</p>

    <form @submit.prevent="handleRegister" :class="styles.form">
      <div :class="styles.row">
        <FormField label="Prénom" v-model="form.firstName" required />
        <FormField label="Nom" v-model="form.lastName" required />
      </div>
      <FormField label="Mot de passe" type="password" v-model="form.password" required />
      <FormField
        label="Confirmer le mot de passe"
        type="password"
        v-model="form.confirmPassword"
        required
        :error="passwordError"
      />

      <p v-if="auth.error" :class="styles.error">{{ auth.error }}</p>

      <Button
        type="submit"
        :class="styles.primaryBtn"
        :disabled="auth.loading || !!passwordError || !canSubmit"
      >
        {{ auth.loading ? 'Création…' : 'Créer mon compte' }}
      </Button>
    </form>

    <div :class="styles.divider"><span>ou</span></div>

    <Button :class="styles.guestBtn" @click="handleAsGuest">
      Continuer en tant qu'invité
    </Button>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import FormField from '@/components/ui/formField/FormField.vue'
import Button from '@/components/ui/button/Button.vue'
import styles from './RegisterStep.module.css'

const props = defineProps<{ email: string }>()
const emit = defineEmits<{
  register: []
  asGuest: []
  back: []
}>()

const auth = useAuthStore()

const form = reactive({
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
})

const passwordError = computed(() =>
  form.confirmPassword && form.password !== form.confirmPassword
    ? 'Les mots de passe ne correspondent pas'
    : undefined
)

const canSubmit = computed(() =>
  form.firstName && form.lastName && form.password && form.confirmPassword
)

async function handleRegister() {
  if (passwordError.value || !canSubmit.value) return
  await auth.register({
    email: props.email,
    password: form.password,
    firstName: form.firstName,
    lastName: form.lastName,
  })
  if (!auth.error) emit('register')
}

function handleAsGuest() {
  auth.continueAsGuest(props.email)
  emit('asGuest')
}
</script>
