all the files in script should be owned by root with 754 permission

sudo bash

visudo
//add folllowing command in the file (make sure the path to the script is correct)
www-data ALL=(ALL) NOPASSWD: /usr/sbin/smbldap-groupadd
www-data ALL=(ALL) NOPASSWD: /usr/sbin/smbldap-groupdel
www-data ALL=(ALL) NOPASSWD: /usr/sbin/smbldap-groupmod
www-data All=(ALL) NOPASSWD: /home/spandey/sujata/sym2/sf2_intranet/src/Application/LDAPBundle/Resources/script/ldap-group-add.sh
www-data All=(ALL) NOPASSWD: /home/spandey/sujata/sym2/sf2_intranet/src/Application/LDAPBundle/Resources/script/ldap-group-mod.sh
www-data All=(ALL) NOPASSWD: /home/spandey/sujata/sym2/sf2_intranet/src/Application/LDAPBundle/Resources/script/ldap-group-adduser.sh
www-data All=(ALL) NOPASSWD: /home/spandey/sujata/sym2/sf2_intranet/src/Application/LDAPBundle/Resources/script/ldap-group-del.sh
