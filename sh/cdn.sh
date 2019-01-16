#!/bin/bash
curl https://api.upyun.com/buckets/purge/batch \
-H 'Authorization: Bearer '$CDN_TOKEN \
-X POST \
-d 'source_url=http://home.zkl2333.com/
http://home.zkl2333.com/*' \
-o t.txt
echo -e '\n打印结果'
cat t.txt
