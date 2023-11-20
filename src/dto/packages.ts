type PackageFileType = 'directory' | 'file';
export interface Package {
  type: string;
  name: string;
  tags: {
    beta: string;
    latest: string;
  };
  versions: Array<PackageVersionData>;
  links: Omit<PackageLinks, 'self' | 'entrypoints'>;
}

interface PackageVersionData {
  version: string;
  links: Array<PackageLinks>;
}

interface PackageLinks {
  self: string;
  entrypoints: string;
  stats: string;
}

export interface PackageDetails extends Omit<Package, 'versions' | 'tags'> {
  version: string;
  default: string;
  files: Array<PackageFileInfo>;
}

export interface PackageFileInfo {
  type: PackageFileType;
  name: string;
  files: Array<FileInfo>;
}

export interface FileInfo {
  type: PackageFileType;
  name: string;
  hash: string;
  size: number;
}

export interface PackageStats {
  hits: {
    total: number;
    dates: Record<string, number>;
  };
  bandwidth: {
    total: number;
    dates: Record<string, number>;
  };
  links: Array<PackageLinks>;
}
