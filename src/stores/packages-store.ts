import { defineStore } from 'pinia';
import { Package, PackageDetails, PackageStats } from 'src/dto/packages';
import { api } from 'boot/axios';
import { ApiMethods } from 'src/api/constans';

interface PackagesStore {
  packageVersion: PackageDetails | null;
  packageData: Package | null;
  packageStats: PackageStats | null;
  loading: boolean;
}
export const usePackagesStore = defineStore('packagesStore', {
  state: (): PackagesStore => ({
    packageVersion: null,
    packageStats: null,
    packageData: null,
    loading: false,
  }),
  getters: {
    getVersion: ({ packageVersion }) => packageVersion,
    getStats: ({ packageStats }) => packageStats,
    getPackageData: ({ packageData }) => packageData,
    getLoadingState: ({ loading }) => loading,
  },
  actions: {
    async getPackage(packageName: string): Promise<void> {
      try {
        this.loading = true;
        this.packageData = await api.request<ApiMethods.GET_PACKAGE>(
          api.urls.packages.getPackage,
          null,
          { packageName }
        );
      } finally {
        this.loading = false;
      }
    },
    async getPackageVersion(packageName: string, version: string) {
      this.packageVersion = await api.request<ApiMethods.GET_PACKAGE_VERSION>(
        api.urls.packages.getPackageVersion,
        null,
        {
          packageName,
          version,
        }
      );
    },
    async getPackageVersionStats(
      packageName: string,
      version: string,
      periodValue = 'month'
    ) {
      this.packageStats = await api.request<ApiMethods.GET_PACKAGE_STATS>(
        api.urls.packages.getPackageVersionStats,
        null,
        {
          packageName,
          version,
          period: periodValue,
        }
      );
    },
  },
});
