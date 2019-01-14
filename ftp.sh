#!/bin/bash 

#upload dir to remote ftp server 
updir='./'     #local dir 
todir='./htdocs'    #remote dir 
ip=$FTP_HOST       #remote IP 
user=$FTP_USER   #ftp username 
password=$FTP_PASSWORD   #password 
sss=`find $updir -path "./.git" -prune -o -type d -printf '%P\n'| awk '{if ($0 == "")next;print "mkdir " $0}'`  
echo $sss
aaa=`find $updir -path "./.git" -prune -o -type f -printf 'put %P\n'`  
ftp -nv $ip <<EOF  
user $user $password 
passive mode
type binary
prompt  
cd $todir  
$sss
$aaa
quit  
EOF
