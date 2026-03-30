<template>
  <div :class="styles.section">
    <div :class="styles.sectionHeader">
      <h2 :class="styles.title">Sécurité</h2>
      <button v-if="!editMode" type="button" :class="styles.editBtn" @click="startEdit">
        Modifier
      </button>
    </div>

    <form @submit.prevent="handleSubmit" :class="styles.form">
      <template v-if="!editMode">
        <FormField label="Mot de passe" modelValue="••••••••" disabled />
      </template>

      <template v-else>
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

        <div :class="styles.actions">
          <button type="submit" :class="styles.submitBtn" :disabled="user.saving || !!passwordError">
            {{ user.saving ? 'Mise à jour…' : 'Enregistrer' }}
          </button>
          <button type="button" :class="styles.cancelBtn" @click="cancelEdit">Annuler</button>
        </div>
      </template>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import FormField from '@/components/ui/formField/FormField.vue'
import styles from './SecuritySection.module.css'

const user = useUserStore()
const editMode = ref(false)

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

function startEdit() {
  user.clearFeedback()
  editMode.value = true
}

function cancelEdit() {
  form.currentPassword = ''
  form.newPassword = ''
  form.confirmPassword = ''
  user.clearFeedback()
  editMode.value = false
}

async function handleSubmit() {
  if (passwordError.value) return
  user.clearFeedback()
  await user.updatePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword })
  if (!user.saveError) {
    cancelEdit()
  }
}
</script>
