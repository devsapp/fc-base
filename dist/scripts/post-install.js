const fse = require('fs-extra');
const path = require('path');
const { downloadRequest } = require('@serverless-devs/core');

const ALICLOUD_PLUGIN_VERSION = 'v2.38.0';
const ALICLOUD_PLUGIN_ZIP_FILE_NAME = `pulumi-resource-alicloud-${ALICLOUD_PLUGIN_VERSION}.tgz`;
const OSS_BUCKET_NAME = 'serverless-pulumi';
const OSS_OBJECT_KEY = `alicloud-plugin/${ALICLOUD_PLUGIN_ZIP_FILE_NAME}`;
const OSS_ACCELERATE_DOMAIN = `${OSS_BUCKET_NAME}.oss-accelerate.aliyuncs.com`;
const PLUGIN_DOWNLOAD_URL = `${OSS_ACCELERATE_DOMAIN}/${OSS_OBJECT_KEY}`;

async function postInstall() {
  const distPath = path.resolve(__dirname, '..');
  const pulumiPluginPathInDist = path.join(distPath, 'lib', 'utils', 'pulumi-plugin');
  await fse.mkdirp(pulumiPluginPathInDist);

  await downloadRequest(PLUGIN_DOWNLOAD_URL, pulumiPluginPathInDist, { extract: true });
}

postInstall().then(() => console.log(`${ALICLOUD_PLUGIN_ZIP_FILE_NAME} download and extract done!\n`));
