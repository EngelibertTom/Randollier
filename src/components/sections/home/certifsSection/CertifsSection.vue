<template>
  <div :class="styles.certifs">
    <div :class="styles.certif" v-reveal="0">
      <CardIcon :class="styles.icon"/>
      <p>Paiement sécurisé</p>
    </div>
    <div :class="styles.certif" v-reveal="150">
      <DeliveryIcon :class="styles.icon"/>
      <p>Livraison rapide</p>
    </div>
    <div :class="styles.certif" v-reveal="300">
      <CheckIcon :class="styles.icon"/>
      <p>Satisfaction garantie</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import styles from './CertifsSection.module.css'
import CardIcon from '@/assets/images/card.svg?component'
import DeliveryIcon from '@/assets/images/delivery.svg?component'
import CheckIcon from '@/assets/images/check.svg?component'
</script>
