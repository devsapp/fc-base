
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

// export function transformNasConfig(nasConfig: NasConfig): NasConfig {
//   if (!nasConfig) {
//     return null;
//   }
//   const fcClientMountPoints: MountConfig[] = [];

//   if (!_.isEmpty(nasConfig.MountPoints)) {
//     for (const mountPoint of nasConfig.MountPoints) {
//       if (mountPoint.discriminator === 'MountPoint') {
//         fcClientMountPoints.push({
//           ServerAddr: `${mountPoint.NasAddr}:${mountPoint.NasDir}`,
//           MountDir: mountPoint.FcDir
//         });
//       } else if (mountPoint.discriminator === 'MountConfig') {
//         // support old format
//         fcClientMountPoints.push({
//           ServerAddr: mountPoint.ServerAddr,
//           MountDir: mountPoint.MountDir
//         });
//       }
//     }
//   }

//   return {
//     GroupId: nasConfig.GroupId,
//     UserId: nasConfig.UserId,
//     MountPoints: fcClientMountPoints
//   }
// }

// const serverAddrReGe = /^[a-z0-9-.]*.nas.[a-z]+.com:\//;

// export function resolveMountPoint (mountPoint: MountConfig) {
//   // '012194b28f-ujc20.cn-hangzhou.nas.aliyuncs.com:/'
//   const serverAddr = mountPoint.ServerAddr
//   const mountDir = mountPoint.MountDir

//   // valid serverAddr
//   if (!serverAddrReGe.test(serverAddr)) {
//     throw new Error(`NasConfig's nas server address '${serverAddr}' doesn't match expected format (allowed: '^[a-z0-9-.]*.nas.[a-z]+.com:/')`)
//   }

//   const suffix = '.com:'
//   const index = serverAddr.lastIndexOf(suffix)

//   // /
//   const mountSource = serverAddr.substr(index + suffix.length)
//   // 012194b28f-ujc20.cn-hangzhou.nas.aliyuncs.com
//   const serverPath = serverAddr.substr(0, serverAddr.length - mountSource.length - 1)

//   return {
//     serverPath,
//     mountSource,
//     mountDir,
//     serverAddr
//   }
// }
