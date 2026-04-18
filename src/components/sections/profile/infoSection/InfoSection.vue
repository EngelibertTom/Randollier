<template>
  <div :class="styles.section">
    <div :class="styles.sectionHeader">
      <h2 :class="styles.title">Informations personnelles</h2>
      <Button v-if="!editMode" :class="styles.editBtn" @click="startEdit">
        Modifier
      </Button>
    </div>

    <form @submit.prevent="handleSubmit" :class="styles.form">
      <div :class="styles.row">
        <FormField label="Prénom" v-model="form.firstName" :disabled="!editMode" required />
        <FormField label="Nom" v-model="form.lastName" :disabled="!editMode" required />
      </div>
      <FormField label="Email" type="email" v-model="form.email" :disabled="!editMode" required />
      <div :class="styles.row">
        <FormField label="Téléphone" type="tel" v-model="form.phone" :disabled="!editMode" placeholder="06 00 00 00 00" />
        <FormField label="Date de naissance" type="date" v-model="form.birthdate" :disabled="!editMode" />
      </div>

      <template v-if="editMode">
        <p v-if="user.saveSuccess" :class="styles.success">{{ user.saveSuccess }}</p>
        <p v-else-if="user.saveError" :class="styles.error">{{ user.saveError }}</p>

        <div :class="styles.actions">
          <Button type="submit" :class="styles.submitBtn" :disabled="user.saving">
            {{ user.saving ? 'Enregistrement…' : 'Enregistrer' }}
          </Button>
          <Button :class="styles.cancelBtn" @click="cancelEdit">Annuler</Button>
        </div>
      </template>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import FormField from '@/components/ui/formField/FormField.vue'
import Button from '@/components/ui/button/Button.vue'
import type { UserProfile } from '@/types'
import styles from './InfoSection.module.css'

const user = useUserStore()
const editMode = ref(false)
const form = reactive<UserProfile>({ ...user.profile })

watch(() => user.profile, val => Object.assign(form, val))

function startEdit() {
  Object.assign(form, user.profile)
  user.clearFeedback()
  editMode.value = true
}

function cancelEdit() {
  Object.assign(form, user.profile)
  user.clearFeedback()
  editMode.value = false
}

async function handleSubmit() {
  user.clearFeedback()
  await user.updateProfile({ ...form })
  if (!user.saveError) editMode.value = false
}
</script>
