#!/bin/bash 

echo "配置临时变量"
source .zshrc

echo "创建临时目录"
if [ ! -d "temp" ]; then
  mkdir temp
fi
cd temp

echo "克隆项目"
git clone git@github.com:zkl2333/home-page.git
cd home-page

#upload dir to remote ftp server 

echo "开始上传"
updir='./'     #local dir 
todir='./htdocs'    #remote dir 
ip=$FTP_HOST       #remote IP 
user=$FTP_USER   #ftp username 
password=$FTP_PASSWORD   #password 
sss=`find $updir -path "./.git" -prune -o -type d -printf '%P\n'| awk '{if ($0 == "")next;print "mkdir " $0}'`  
aaa=`find $updir -path "./.git" -prune -o -type f -printf 'put %P\n'`  
ftp -nv $ip <<EOF  
user $user $password 
type binary
prompt  
cd $todir  
$sss
$aaa
quit  
EOF

echo "上传完毕，清理临时目录"

cd ../../
rm -rf temp
