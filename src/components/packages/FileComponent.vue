<template>
  <div class="q-pl-md q-pr-md q-pt-sm q-pb-sm">
    <q-icon class="q-mr-sm" name="description" color="grey" />
    <a class="link" :href="createInstallLink(`/${fileInfo.name}`)" target="_blank">
      {{ fileInfo.name }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { FileInfo } from 'src/dto/packages';

const props = defineProps<{
  fileInfo: Pick<FileInfo, 'name'>;
  packageName: string;
  version: string;
}>();

function createInstallLink(fileName: string) {
  return `https://cdn.jsdelivr.net/npm/${props.packageName}@${props.version}${fileName}`;
}
</script>

<style scoped lang="stylus">
.link
  color var(----text-color-main)
  text-decoration none
</style>
