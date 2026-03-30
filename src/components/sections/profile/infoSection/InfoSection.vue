<template>
  <div :class="styles.section">
    <h2 :class="styles.title">Informations personnelles</h2>

    <form @submit.prevent="handleSubmit" :class="styles.form">
      <div :class="styles.row">
        <FormField label="Prénom" v-model="form.firstName" required />
        <FormField label="Nom" v-model="form.lastName" required />
      </div>
      <FormField label="Email" type="email" v-model="form.email" required />
      <div :class="styles.row">
        <FormField label="Téléphone" type="tel" v-model="form.phone" placeholder="06 00 00 00 00" />
        <FormField label="Date de naissance" type="date" v-model="form.birthdate" />
      </div>

      <p v-if="user.saveSuccess" :class="styles.success">{{ user.saveSuccess }}</p>
      <p v-else-if="user.saveError" :class="styles.error">{{ user.saveError }}</p>

      <button type="submit" :class="styles.submitBtn" :disabled="user.saving">
        {{ user.saving ? 'Enregistrement…' : 'Enregistrer les modifications' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import FormField from '@/components/ui/formField/FormField.vue'
import type { UserProfile } from '@/types'
import styles from './InfoSection.module.css'

const user = useUserStore()
const form = reactive<UserProfile>({ ...user.profile })

watch(() => user.profile, val => Object.assign(form, val))

async function handleSubmit() {
  user.clearFeedback()
  await user.updateProfile({ ...form })
}
</script>
