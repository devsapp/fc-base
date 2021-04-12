#!/bin/bash
set -e

ALICLOUD_PLUGIN_VERSION=v2.38.0
ALICLOUD_PLUGIN_ZIP_FILE_NAME=pulumi-resource-alicloud-${ALICLOUD_PLUGIN_VERSION}.tgz

cp -r src/lib/utils/pulumi dist/lib/utils
mkdir -p dist/scripts
cp -f scripts/post-install.js dist/scripts/post-install.js

# 上传 alicloud plugin 至 OSS

if ! [ -x "$(command -v ossutil)" ]; then

    case "$OSTYPE" in
    darwin*)
        curl -o ossutilmac64 http://gosspublic.alicdn.com/ossutil/1.7.2/ossutilmac64
        chmod 755 ossutilmac64
        mv ./ossutilmac64 /usr/local/bin/ossutil
        ;; 
    *)        
        echo "'ossutil' command is missing." 
        exit -1
        ;;
    esac
fi

OSS_CFG_FILE=./.oss_cfg
ENDPOINT=oss-accelerate.aliyuncs.com

echo "Try to load OSS config from $OSS_CFG_FILE"
if [ -f $OSS_CFG_FILE ]; then
    source $OSS_CFG_FILE
fi

if [ -z ${OSS_ACCESS_KEY_ID+x} ]; then
    echo -n "OSS Access Key ID:"
    read OSS_ACCESS_KEY_ID
fi

if [ -z ${OSS_ACCESS_KEY_SECRET+x} ]; then
    echo -n "OSS Access Key SECRET:"
    read OSS_ACCESS_KEY_SECRET
fi

cat >$OSS_CFG_FILE <<EOL
OSS_ACCESS_KEY_ID=$OSS_ACCESS_KEY_ID
OSS_ACCESS_KEY_SECRET=$OSS_ACCESS_KEY_SECRET
EOL

CHECK_FILE=oss://serverless-pulumi/alicloud-plugin/${ALICLOUD_PLUGIN_ZIP_FILE_NAME}

if ossutil ls $CHECK_FILE --endpoint $ENDPOINT --access-key-id $OSS_ACCESS_KEY_ID --access-key-secret $OSS_ACCESS_KEY_SECRET  | grep "Object Number is: 1" > /dev/null ; then
    echo "Version $ALICLOUD_PLUGIN_VERSION is already uploaded!"
    exit 0
fi

pulumi plugin install resource alicloud "$ALICLOUD_PLUGIN_VERSION"
mkdir -p output-plugin
tar czvf output-plugin/${ALICLOUD_PLUGIN_ZIP_FILE_NAME} -C ~/.pulumi/plugins resource-alicloud-${ALICLOUD_PLUGIN_VERSION} resource-alicloud-${ALICLOUD_PLUGIN_VERSION}.lock

ossutil cp output-plugin/${ALICLOUD_PLUGIN_ZIP_FILE_NAME} ${CHECK_FILE} --endpoint $ENDPOINT --access-key-id $OSS_ACCESS_KEY_ID --access-key-secret $OSS_ACCESS_KEY_SECRET
echo ""
echo "All uploaded success!"
echo "====================================="
rm -rf output-plugin/