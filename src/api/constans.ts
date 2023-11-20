import { Package, PackageDetails, PackageStats } from 'src/dto/packages';

export enum Method {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export enum ContentType {
  JSON = 'application/json',
  FormData = 'multipart/form-data',
}

export interface EndpointConfig {
  url: string;
  method?: Method;
  contentType?: ContentType;
}

export interface Urls {
  packages: {
    getPackage: {
      url: string;
    };
    getPackageVersion: {
      url: string;
    };
    getPackageVersionStats: {
      url: string;
    };
  };
}

export enum ApiMethods {
  GET_PACKAGE = 'GET_PACKAGE',
  GET_PACKAGE_VERSION = 'GET_PACKAGE_VERSION',
  GET_PACKAGE_STATS = 'GET_PACKAGE_STATS',
}
export interface ApiResponseTypes {
  [ApiMethods.GET_PACKAGE]: Package;
  [ApiMethods.GET_PACKAGE_VERSION]: PackageDetails;
  [ApiMethods.GET_PACKAGE_STATS]: PackageStats;
}
