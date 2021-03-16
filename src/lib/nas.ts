
export interface NasConfig {
  userId?: number;
  groupId?: number;
  mountPoints: MountPoint[];
}

export interface MountConfig {
  discriminator?: 'MountPoint';
  Alias?: string;
  NasAddr: string;
  NasDir: string;
  FcDir: string;
  LocalDir?: string;
}

export interface MountPoint {
  serverAddr: string;
  mountDir: string;
}
