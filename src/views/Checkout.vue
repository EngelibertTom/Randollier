<template>
  <div :class="styles.page">
    <header :class="styles.header">
      <RouterLink to="/" :class="styles.logo">Randollier</RouterLink>
      <StepIndicator :currentStep="indicatorStep" />
      <span :class="styles.secure">🔒 Paiement sécurisé</span>
    </header>

    <main :class="[styles.content, isNarrow && styles.narrow]">
      <EmailStep
        v-if="step === 'email'"
        @continue="onEmailContinue"
        @asGuest="onAsGuest"
      />
      <LoginStep
        v-else-if="step === 'login'"
        :email="checkoutEmail"
        @login="onAuthSuccess"
        @asGuest="onAsGuest"
        @back="step = 'email'"
      />
      <RegisterStep
        v-else-if="step === 'register'"
        :email="checkoutEmail"
        @register="onAuthSuccess"
        @asGuest="onAsGuest"
        @back="step = 'email'"
      />
      <DeliveryStep
        v-else-if="step === 'delivery'"
        @continue="onDeliveryContinue"
      />
      <PaymentStep
        v-else-if="step === 'payment'"
        :address="selectedAddress!"
        @pay="onPay"
        @back="step = 'delivery'"
      />
      <ConfirmationStep
        v-else-if="step === 'confirmation'"
        :orderId="orderId"
        :email="checkoutEmail"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { DeliveryAddress } from '@/types'
import StepIndicator from '@/components/sections/checkout/stepIndicator/StepIndicator.vue'
import EmailStep from '@/components/sections/checkout/emailStep/EmailStep.vue'
import LoginStep from '@/components/sections/checkout/loginStep/LoginStep.vue'
import RegisterStep from '@/components/sections/checkout/registerStep/RegisterStep.vue'
import DeliveryStep from '@/components/sections/checkout/deliveryStep/DeliveryStep.vue'
import PaymentStep from '@/components/sections/checkout/paymentStep/PaymentStep.vue'
import ConfirmationStep from '@/components/sections/checkout/confirmationStep/ConfirmationStep.vue'
import styles from './Checkout.module.css'

type Step = 'email' | 'login' | 'register' | 'delivery' | 'payment' | 'confirmation'

const auth = useAuthStore()
const step = ref<Step>('email')
const checkoutEmail = ref('')
const selectedAddress = ref<DeliveryAddress | null>(null)
const orderId = ref('')

const isNarrow = computed(() =>
  step.value === 'email' || step.value === 'login' || step.value === 'register' || step.value === 'confirmation'
)

const indicatorStep = computed(() => {
  if (step.value === 'email' || step.value === 'login' || step.value === 'register') return 1
  if (step.value === 'delivery') return 2
  if (step.value === 'payment') return 3
  return 4
})

function onEmailContinue(email: string) {
  checkoutEmail.value = email
  step.value = auth.emailCheckResult === 'exists' ? 'login' : 'register'
}

function onAsGuest(email: string) {
  checkoutEmail.value = email
  step.value = 'delivery'
}

function onAuthSuccess() {
  step.value = 'delivery'
}

function onDeliveryContinue(address: DeliveryAddress) {
  selectedAddress.value = address
  step.value = 'payment'
}

function onPay(id: string) {
  orderId.value = id
  step.value = 'confirmation'
}
</script>
