<template>
  <q-table
    :title="packageData?.name"
    :columns="columns"
    :rows="rows"
    :loading="isLoading"
    :rows-per-page-options="[10]"
    :grid="$q.screen.lt.md"
    :hide-header="!rows"
  >
    <template #header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </q-td>
        <q-td auto-width>
          <q-btn
            size="sm"
            color="primary"
            square
            dense
            @click="handleDetailPackage(props.cols[0].value)"
          >
            Show more
          </q-btn>
        </q-td>
      </q-tr>
    </template>
    <template #item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <q-card class="q-pa-sm" flat bordered>
          <q-list dense>
            <q-item v-for="col in props.cols" :key="col.name">
              <q-item-section>
                <q-item-label>{{ col.label }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ col.value }}
              </q-item-section>
            </q-item>
            <q-separator class="q-mt-md q-mb-md" />
            <q-item>
              <q-btn
                class="full-width"
                size="sm"
                color="primary"
                dense
                @click="handleDetailPackage(props.cols[0].value)"
              >
                Show more
              </q-btn>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </template>
    <template #no-data>
      <div class="text-center full-width">There are not packages yet.</div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import PackageDetailsComponent from 'components/packages/PackageDetailsComponent.vue';
import { usePackagesStore } from 'stores/packages-store';
import { computed } from 'vue';
import { Package } from 'src/dto/packages';
import { QTableProps } from 'quasar';
import { useQuasar } from 'quasar';

const packagesStore = usePackagesStore();
const $q = useQuasar();

const packageData = computed(() => packagesStore.getPackageData as Package);
const isLoading = computed(() => packagesStore.getLoadingState);
const columns = computed(() => {
  return [
    {
      name: 'version',
      label: 'Version',
      field: 'version',
      align: 'left',
    },
  ] as QTableProps['columns'];
});
const rows = computed(() => packageData.value?.versions);

function handleDetailPackage(version: string) {
  $q.dialog({
    component: PackageDetailsComponent,
    componentProps: {
      version,
      packageName: packageData.value?.name,
    },
  });
}
</script>

<style scoped lang="stylus"></style>
