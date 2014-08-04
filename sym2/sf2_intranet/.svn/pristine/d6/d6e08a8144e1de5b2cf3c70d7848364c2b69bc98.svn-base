#!/bin/bash
group=$1
if [ "$group" == "" ] 
then
  echo "useage: ldap-group-add.sh group-name"
  exit 1	
fi
sudo smbldap-groupadd "$group"
exit
