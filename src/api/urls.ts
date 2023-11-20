import { ContentType, Method, Urls } from 'src/api/constans';

export const urlsApp: Urls = {
  packages: {
    getPackage: {
      url: '/packages/npm/:packageName',
    },
    getPackageVersion: {
      url: 'packages/npm/:packageName@:version',
    },
    getPackageVersionStats: {
      url: '/stats/packages/npm/:packageName@:version',
    },
  },
};
