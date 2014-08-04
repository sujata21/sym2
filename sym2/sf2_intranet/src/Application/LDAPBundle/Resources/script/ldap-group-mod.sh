#!/bin/bash
group=$1
newgroup=$2
if [ "$group" == "" ] 
then
  echo "useage: ldap-group-mod.sh group-name new-group-name"
  exit 1
elif [ "$newgroup" == "" ]
then
  echo "useage: ldap-group-mod.sh  group-name new-group-name"
  exit 1	
fi
sudo smbldap-groupmod -n "$newgroup" "$group" 
exit

