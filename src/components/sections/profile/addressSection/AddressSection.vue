<template>
  <div :class="styles.section">
    <div :class="styles.sectionHeader">
      <h2 :class="styles.title">Mes adresses</h2>
      <button v-if="!showForm" :class="styles.addBtn" @click="startAdd">+ Ajouter</button>
    </div>

    <div v-if="user.addresses.length > 0" :class="styles.addresses">
      <div v-for="addr in user.addresses" :key="addr.id" :class="styles.addressCard">
        <div :class="styles.cardHeader">
          <span :class="styles.cardLabel">{{ addr.label }}</span>
          <span v-if="addr.isDefault" :class="styles.defaultBadge">Par défaut</span>
        </div>
        <p>{{ addr.firstName }} {{ addr.lastName }}</p>
        <p>{{ addr.street }}</p>
        <p>{{ addr.postalCode }} {{ addr.city }}, {{ addr.country }}</p>
        <div :class="styles.cardActions">
          <button @click="startEdit(addr)">Modifier</button>
          <button :class="styles.deleteBtn" @click="user.deleteAddress(addr.id)">Supprimer</button>
        </div>
      </div>
    </div>

    <p v-else :class="styles.empty">Aucune adresse enregistrée.</p>

    <div v-if="showForm" :class="styles.form">
      <h3 :class="styles.formTitle">{{ editingId ? 'Modifier l\'adresse' : 'Nouvelle adresse' }}</h3>

      <div :class="styles.row">
        <FormField label="Prénom" v-model="form.firstName" required />
        <FormField label="Nom" v-model="form.lastName" required />
      </div>
      <FormField label="Étiquette" v-model="form.label" placeholder="Domicile, Bureau…" />
      <FormField label="Rue" v-model="form.street" required />
      <div :class="styles.row">
        <FormField label="Code postal" v-model="form.postalCode" required />
        <FormField label="Ville" v-model="form.city" required />
      </div>
      <FormField
        label="Pays"
        type="select"
        v-model="form.country"
        :options="[
          { value: 'France', label: 'France' },
          { value: 'Belgique', label: 'Belgique' },
          { value: 'Suisse', label: 'Suisse' },
          { value: 'Luxembourg', label: 'Luxembourg' },
        ]"
      />
      <label :class="styles.checkboxLabel">
        <input type="checkbox" v-model="form.isDefault" />
        Définir comme adresse par défaut
      </label>

      <p v-if="user.saveSuccess" :class="styles.success">{{ user.saveSuccess }}</p>
      <p v-else-if="user.saveError" :class="styles.error">{{ user.saveError }}</p>

      <div :class="styles.formActions">
        <button type="button" :class="styles.submitBtn" :disabled="user.saving" @click="handleSave">
          {{ user.saving ? 'Enregistrement…' : 'Enregistrer' }}
        </button>
        <button type="button" :class="styles.cancelBtn" @click="showForm = false">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import FormField from '@/components/ui/formField/FormField.vue'
import type { Address } from '@/types'
import styles from './AddressSection.module.css'

const user = useUserStore()
const showForm = ref(false)

onMounted(() => user.fetchAddresses())
const editingId = ref<number | undefined>(undefined)

const emptyForm = () => ({
  label: '',
  firstName: '',
  lastName: '',
  street: '',
  city: '',
  postalCode: '',
  country: 'France',
  isDefault: false,
})

const form = reactive<Omit<Address, 'id'>>(emptyForm())

function startAdd() {
  editingId.value = undefined
  Object.assign(form, emptyForm())
  user.clearFeedback()
  showForm.value = true
}

function startEdit(addr: Address) {
  editingId.value = addr.id
  Object.assign(form, addr)
  user.clearFeedback()
  showForm.value = true
}

async function handleSave() {
  user.clearFeedback()
  await user.saveAddress(editingId.value ? { ...form, id: editingId.value } : { ...form })
  if (!user.saveError) showForm.value = false
}
</script>
