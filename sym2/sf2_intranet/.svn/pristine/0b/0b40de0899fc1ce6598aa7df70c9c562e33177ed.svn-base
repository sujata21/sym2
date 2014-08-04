#!/bin/bash
member=$1
group=$2
option=$3
if [ "$group" == "" ] 
then
  echo "useage: ldap-group-adduser.sh member-list group-name"
  exit 1
elif [ "$member" == "" ]
then
  echo "useage: ldap-group-adduser.sh  member-list group-name"
  exit 1	
fi
sudo smbldap-groupmod $option $member "$group" 
exit

