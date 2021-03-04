
export interface VpcConfig {
  securityGroupId: string;
  vswitchIds: string[];
  vpcId: string;
}

// export function transformVpcConfig(vpcConfig: VpcConfig) {
//   if (vpcConfig) {
//     return {
//       vpcId: vpcConfig.SecurityGroupId,
//       vswitchIds: vpcConfig.VSwitchIds,
//       securityGroupId: vpcConfig.VpcId
//     }
//   }
//   return null;
// }
