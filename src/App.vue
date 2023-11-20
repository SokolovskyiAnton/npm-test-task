<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useQuasar } from 'quasar'

const $q = useQuasar()

onMounted(() => {
  $q.dark.set(false)
})
</script>
