<template>
  <q-layout class="main">
    <Header />
    <q-page-container class="container">
      <router-view />
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<script setup lang="ts">
import Header from 'components/common/HeaderComponent.vue';
import Footer from 'components/common/FooterComponent.vue';
import SearchPackageComponent from 'components/packages/SearchPackageComponent.vue';
</script>

<style lang="stylus">
.main
  background-color var(--page-bg)
</style>
