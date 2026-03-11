<template>
    <button :class="styles.button">{{text}}</button>
</template>

<script setup lang="ts">
import styles from './styles.module.css'

defineProps({
  text:{
    type:String,
    requiered:true
  }
})

</script>