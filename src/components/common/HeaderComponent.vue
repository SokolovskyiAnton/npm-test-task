<template>
  <q-header class="header">
    <div class="container flex justify-between q-pa-md">
      <span class="header__title">PackagesExplorer</span>

      <div>
        <q-icon
          class="cursor-pointer"
          size="18px"
          :name="$q.dark.mode ? 'light_mode' : 'dark_mode'"
          @click="toggleMode"
        />
        <a
          class="header__link"
          href="https://www.jsdelivr.com/docs/data.jsdelivr.com#overview"
          target="_blank"
        >
          Documentation
        </a>
      </div>
    </div>
    <SearchPackageComponent />
  </q-header>
</template>

<script setup lang="ts">
import SearchPackageComponent from 'components/packages/SearchPackageComponent.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar()

function toggleMode() {
  $q.dark.toggle()
}
</script>

<style lang="stylus" scoped>
.header
  background var(--header-bg)
  font-size 14px
  color var(--text-color-main)
  border-width 10px 0 0
  border-top-style:solid
  border-image var(--header-gradient)
  box-shadow 0 4px 13px -3px rgba(0, 0, 0, 0.1)
  &__title
    font-weight 600
  &__link
    text-decoration none
    color inherit
    margin-left 8px
</style>
