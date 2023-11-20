<template>
  <div class="search-package">
    <div class="container flex no-wrap items-center">
      <q-input
        v-model.trim="packageName"
        class="full-width"
        filled
        placeholder="Search Package"
        :rules="[val => !!val]"
        hide-bottom-space
        @keyup.enter="handleClick"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        @click="handleClick"
        :disable="isLoading"
        class="q-pa-md bg-black text-white"
      >
        Search
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePackagesStore } from 'stores/packages-store';

const packageName = ref('');
const packagesStore = usePackagesStore();

const isLoading = computed(() => packagesStore.getLoadingState);
async function handleClick() {
  if (!packageName.value) return

  await packagesStore.getPackage(packageName.value.toLowerCase());
  packageName.value = '';
}
</script>

<style lang="stylus">
.search-package
  height 90px
  padding 12px
  border-top 1px solid rgba(0, 0, 0, .1)
  border-bottom 1px solid rgba(210, 210, 210, .28)
  > div
    height 100%
    label
      font-size var(--base-font-size)
</style>
