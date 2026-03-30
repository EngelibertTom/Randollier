<template>
  <div :class="styles.section">
    <h2 :class="styles.title">Sécurité</h2>

    <form @submit.prevent="handleSubmit" :class="styles.form">
      <FormField label="Mot de passe actuel" type="password" v-model="form.currentPassword" required />
      <FormField label="Nouveau mot de passe" type="password" v-model="form.newPassword" required />
      <FormField
        label="Confirmer le mot de passe"
        type="password"
        v-model="form.confirmPassword"
        required
        :error="passwordError"
      />

      <p v-if="user.saveSuccess" :class="styles.success">{{ user.saveSuccess }}</p>
      <p v-else-if="user.saveError" :class="styles.error">{{ user.saveError }}</p>

      <button type="submit" :class="styles.submitBtn" :disabled="user.saving || !!passwordError">
        {{ user.saving ? 'Mise à jour…' : 'Mettre à jour le mot de passe' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import FormField from '@/components/ui/formField/FormField.vue'
import styles from './SecuritySection.module.css'

const user = useUserStore()

const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const passwordError = computed(() =>
  form.confirmPassword && form.newPassword !== form.confirmPassword
    ? 'Les mots de passe ne correspondent pas'
    : undefined
)

async function handleSubmit() {
  if (passwordError.value) return
  user.clearFeedback()
  await user.updatePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword })
  if (!user.saveError) {
    form.currentPassword = ''
    form.newPassword = ''
    form.confirmPassword = ''
  }
}
</script>
