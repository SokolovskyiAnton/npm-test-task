import { boot } from 'quasar/wrappers';
import { ApiService } from 'src/services/ApiService';
import { urlsApp } from 'src/api/urls';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
const api = new ApiService(
  { baseURL: import.meta.env.VITE_APP_API_URL },
  urlsApp
);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
});

export { api };
