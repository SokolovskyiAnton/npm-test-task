<template>
  <q-dialog ref="dialogRef">
    <q-card class="package-detail">
      <h4>
        {{ versionData?.name }}
        <q-badge align="bottom">
          {{ versionData?.version }}
        </q-badge>
        <q-badge class="q-ml-sm" align="bottom" color="red">
          {{ versionData?.type }}
        </q-badge>
      </h4>

      <div class="package-detail__script">
        <div class="package-detail__script__header">Install</div>
        <q-separator
          class="q-mt-sm q-mb-md package-detail__script__separator"
        />
        <div class="package-detail__script__code">
          <span class="script-tag">&lt;script src="</span>
          <span>
            {{ installLink }}
          </span>
          <span class="script-tag">"&gt;&lt;/script&gt;</span>
        </div>
      </div>

      <div class="q-mt-md">
        <div class="flex justify-between">
          <h6>Stats</h6>

          <div class="flex items-center">
            <span class="q-mr-sm">Data range: </span>

            <q-select
              outlined
              dense
              v-model="rangeOption"
              :options="rangeOptions"
              @update:model-value="handleChangeOption"
            />
          </div>
        </div>

        <div class="flex justify-between items-center no-wrap">
          <div v-if="stats?.hits" class="package-detail__stats-block">
            <div class="text-bold text-h5">
              {{ formatNumber(stats.hits.total) }}
            </div>
            <div class="text-subtitle2 text-grey-7">Requests</div>
          </div>
          <div v-if="stats?.bandwidth" class="package-detail__stats-block">
            <div class="text-bold text-h5">
              {{ megabytesToTerabytes(stats.bandwidth.total) }} TB
            </div>
            <div class="text-subtitle2 text-grey-7">Bandwidth</div>
          </div>
        </div>
      </div>

      <div class="q-mt-md">
        <h6>Files</h6>

        <div
          v-for="file in versionData?.files"
          :key="file.name"
          class="package-detail__file"
        >
          <q-expansion-item
            v-if="file.type === 'directory'"
            dense
            class="full-width q-pa-none"
          >
            <template v-slot:header>
              <q-item-section
                style="min-width: 0; padding: 0; margin-right: 8px"
                avatar
              >
                <q-icon size="16px" color="orange" name="folder" />
              </q-item-section>

              <q-item-section>
                {{ file.name }}
              </q-item-section>
            </template>
            <FileComponent
              v-for="item in file.files"
              :key="item.name"
              :file-info="item"
              :package-name="packageName"
              :version="version"
            />
          </q-expansion-item>
          <FileComponent
            v-else
            :file-info="file"
            :package-name="packageName"
            :version="version"
          />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { usePackagesStore } from 'stores/packages-store';
import { PackageDetails, PackageStats } from 'src/dto/packages';
import { useStats } from 'src/composables/useStats';
import FileComponent from 'components/packages/FileComponent.vue';

defineEmits([...useDialogPluginComponent.emits]);
const props = defineProps<{
  version: string;
  packageName: string;
}>();

const rangeOption = ref('month');
const rangeOptions = ref(['day', 'month', 'quarter', 'year']);
const packagesStore = usePackagesStore();
const { megabytesToTerabytes, formatNumber } = useStats();
const { dialogRef } = useDialogPluginComponent();

const stats = computed(() => packagesStore.getStats as PackageStats);
const versionData = computed(() => packagesStore.getVersion as PackageDetails);
const installLink = computed(() => {
  return `https://cdn.jsdelivr.net/npm/${props.packageName}@${props.version}${versionData.value?.default}`;
});

async function handleChangeOption(option: string) {
  await packagesStore.getPackageVersionStats(
    props.packageName,
    props.version,
    option
  );
}

onMounted(async () => {
  await packagesStore.getPackageVersion(props.packageName, props.version);
  await packagesStore.getPackageVersionStats(props.packageName, props.version);
});
</script>

<style lang="stylus" scoped>
.package-detail
  height 100%
  padding 12px
  width 100%
  max-width 640px
  &__script
    background-color var(--color-blue-2)
    padding 20px
    border-radius 8px !important
    margin-top 12px
    &__header
      font-size 14px
      color var(--color-secondary)
      font-weight bold
    &__separator
      background  var(----color-blue-5)
    &__code
      display flex
      flex-direction column
      overflow-x auto
      color var(--color-grey-8)
      > span:nth-child(2n)
        margin-left 12px
        color var(--color-orange)
  &__file
    display flex
    padding 10px 12px
    background var(--file-bg)
    box-shadow inset 0 -1px 0 rgba(14,25,47,.08)
  &__stats-block
    display flex
    flex-direction column
    justify-content center
    align-items center
    width 100%
    padding 0 20px
    height 90px
    border 1px solid var(--color-grey-10)
    box-sizing border-box
    box-shadow 0 4px 2px -2px rgba(23,35,59,.06), 0 2px 8px rgba(23,35,59,.04)
    border-radius 6px
    margin 12px
</style>
