import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { NotificationService } from 'src/services/NotificationService';
import {
  ApiResponseTypes,
  ContentType,
  EndpointConfig,
  Method,
  Urls,
} from 'src/api/constans';

export class ApiService {
  config: AxiosRequestConfig;
  client: AxiosInstance;
  urls: Urls;
  constructor(config: AxiosRequestConfig, urls: Urls) {
    this.config = config;
    this.client = this.createHttpInstance();
    this.urls = urls;
    this.setInterceptors();
  }

  createHttpInstance = (
    config: AxiosRequestConfig = this.config
  ): AxiosInstance => axios.create(config);

  setInterceptors(config: AxiosInstance = this.client) {
    const requestSuccessInterceptor = (
      configuration: InternalAxiosRequestConfig<AxiosRequestConfig>
    ): InternalAxiosRequestConfig<AxiosRequestConfig> => {
      return configuration;
    };

    const responseSuccessInterceptor = (
      response: AxiosResponse
    ): AxiosResponse => {
      return response;
    };
    const errorInterceptor = async (error: AxiosError) => Promise.reject(error);

    config.interceptors.request.use(
      requestSuccessInterceptor,
      errorInterceptor
    );
    config.interceptors.response.use(
      responseSuccessInterceptor,
      errorInterceptor
    );
  }

  static displayError(message: string) {
    NotificationService.createNotification(message);
  }

  static replaceURLParams(url: string, params: Record<string, string>) {
    let newURL = url;

    for (const key of Object.keys(params)) {
      const pattern = new RegExp(`:${key}`, 'g');

      if (pattern.test(url)) {
        newURL = newURL.replace(pattern, params[key]);

        delete params[key];
      }
    }

    const newParams = { ...params };

    return {
      newURL,
      newParams,
    };
  }

  request<K extends keyof ApiResponseTypes>(
    endpointConfig: EndpointConfig,
    payload?: unknown,
    params?: Record<string, string>
  ) {
    let url = endpointConfig.url;

    const { method = Method.GET, contentType = ContentType.JSON } =
      endpointConfig;
    if (params) {
      const { newURL, newParams } = ApiService.replaceURLParams(url, params);

      url = newURL;

      if (!Object.keys(newParams).length) {
        params = undefined;
      } else {
        params = { ...newParams };
      }
    }

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': contentType,
      },
      url,
      method,
      params,
      data: payload ? payload : undefined,
    };

    const request = this.client.request({ ...this.config, ...config });
    const resolve = (res: AxiosResponse<ApiResponseTypes[K]>) => res.data;
    const reject = (error: AxiosError) =>
      ApiService.dispatchErrorHandling(error);

    return request.then(resolve).catch(reject);
  }

  static dispatchErrorHandling(error: AxiosError) {
    const message = error.message;
    this.displayError(message);

    return Promise.reject(error);
  }
}
