#!/bin/bash
group=$1
if [ "$group" == "" ] 
then
  echo "useage: ldap-group-del.sh group-name"
  exit 1	
fi
sudo smbldap-groupdel "$group"
exit
