<?php
namespace Application\LDAPBundle\Tests\Service;
use Application\LDAPBundle\Service\LDAPServer;
use Application\LDAPBundle\Service\LDAPUser as LDAPUserService;

class LDAPServerTest extends \PHPUnit_Framework_TestCase
{
	protected $object;

	public function setUp()
	{
        $server = '192.168.1.17';
        $port	= 389;
        $useTLS = 0;
        $parameters = array( 'base_dn' 			=> "dc=alchemyworx,dc=local"
        , 'bind_dn'			=> "cn=admin,dc=alchemyworx,dc=local"
        , 'bind_passwd' 		=> 'st0n3s2010'
        , 'user_prefix' 		=> 'ou=people'
        , 'group_prefix' 	=> 'ou=groups'
        , 'user_attribute' 	=> 'uid');

        $this->server = new LDAPServer($server, $port, $useTLS, $parameters);
        $this->server->connect();
	}

	protected function tearDown()
	{
		$this->server->close();
		$this->server = null;
	}
    /*
     public function test_addUserSamba(){

         $this->server->bind("cn=admin,dc=alchemyworx,dc=local", "st0n3s2010", true);
         $this->object = new LDAPUserService($this->server);

         $username = 'test_user1_'.date("Ymdis");
         $user = array( 'displayname' 		=>	$username
                      , 'objectclass' 		=>	'sambaSamAccount,account'
                      , 'sambaacctflags' 	=>	'[U ]'
                      , 'sambantpassword' 	=> 'E8F3BA8309DA88484279147303DC390C'
                      , 'sambapasswordhistory' => '0000000000000000000000000000000000000000000000000000000000000000'
                      , 'sambapwdlastset' 	=> '1314375838'
                      , 'sambasid' 			=> 'S-1-5-21-3592966601-4272935661-83688463-1010'
                      , 'uid' 				=> $username);

         $expected = true;

         $result = $this->object->addUser($user);
         $this->assertEquals($expected, $result, "addUser returns correct result");

         $username = 'test_user2_'.date("Ymdis");
         $user = array( 'displayname' 		=>	$username
                      , 'objectclass' 		=>	'sambaSamAccount,account'
                      , 'sambaacctflags' 	=>	'[U ]'
                      , 'sambantpassword' 	=> 'E8F3BA8309DA88484279147303DC390C'
                      , 'sambapasswordhistory' => '0000000000000000000000000000000000000000000000000000000000000000'
                      , 'sambapwdlastset' 	=> '1314375838'
                      , 'sambasid' 			=> 'S-1-5-21-3592966601-4272935661-83688463-1010'
                      , 'uid' 				=> $username);

         $expected = true;

         $result = $this->object->addUser($user);
         $this->assertEquals($expected, $result, "addUser returns correct result -2");
     }


     public function test_addUserPosix(){

         $this->server->bind("cn=admin,dc=alchemyworx,dc=local", "st0n3s2010", true);
         $this->object = new LDAPUserService($this->server);

         $username = 'test_posix_user1_'.date("Ymdis");
         $user = array( 'cn'				=> 	$username
                      , 'description'	=>	'Posix User Account'
                      , 'gecos'			=>	$username
                      , 'gidnumber' 		=>	'503'
                      , 'homedirectory' 	=>	'/home/test6'
                      , 'loginshell' 	=>	'/bin/bash'
                      , 'objectclass' 	=>	'account,posixAccount'
                      , 'uid'			=>	$username
                      , 'uidnumber'		=>	'10004');

         $expected = true;

         $result = $this->object->addUser($user, LDAPUserService::POSIX);
         $this->assertEquals($expected, $result, "addUser returns correct result");

         $username = 'test_posix_user2_'.date("Ymdis");
         $user = array( 'cn'				=> 	$username
                      , 'description'	=>	'Posix User Account'
                      , 'gecos'			=>	$username
                      , 'gidnumber' 		=>	'503'
                      , 'homedirectory' 	=>	'/home/test6'
                      , 'loginshell' 	=>	'/bin/bash'
                      , 'objectclass' 	=>	'account,posixAccount'
                      , 'uid'			=>	$username
                      , 'uidnumber'		=>	'10004');

         $expected = true;

         $result = $this->object->addUser($user, LDAPUserService::POSIX);
         $this->assertEquals($expected, $result, "addUser returns correct result -2");
     }

     public function test_addUserPosixSamba(){

         $this->server->bind("cn=admin,dc=alchemyworx,dc=local", "st0n3s2010", true);
         $this->object = new LDAPUserService($this->server);

         $username = 'test_posix_samba_user1_'.date("Ymdis");
         $user = array( 'cn'				=> 	$username
                 , 'sn'					=> 	'Test'
                 , 'displayname' 		=>	'Test User'
                 , 'facsimiletelephonenumber'	=> 	'0123456789'
                 , 'givenname' 			=>	'First name'
                 , 'mail'				=>	'test@alchemyworx.com'
                 , 'mobile'				=>	'1234567890'
                 , 'o'					=>	'Alchemy Worx Ltd'
                 , 'ou'					=>	'IT'
                 , 'physicaldeliveryofficename'	=>	'United Kingdom, London'
                 , 'telephonenumber'		=>	'0207 025 2100'
                 , 'title'				=>	'Job title'
                 , 'description'	=>	'Posix Samba User Account'
                 , 'gecos'			=>	$username
                 , 'gidnumber' 		=>	'503'
                 , 'homedirectory' 	=>	'/home/test6'
                 , 'loginshell' 	=>	'/bin/bash'
                 , 'objectclass' 	=>	'inetOrgPerson,posixAccount,shadowAccount,sambaSamAccount'
                 , 'sambaacctflags' 	=>	'[U ]'
                 , 'sambantpassword' 	=> 't3st'
                 , 'sambapasswordhistory' => '0000000000000000000000000000000000000000000000000000000000000000'
                 , 'sambapwdlastset' 	=> '1314375838'
                 , 'sambasid' 			=> 'S-1-5-21-3592966601-4272935661-83688463-1010'
                 , 'uid'			=>	$username
                 , 'uidnumber'		=>	'10004'
                 , 'password'   => 't3st');

         $expected = true;

         $result = $this->object->addUser($user, LDAPUserService::POSIX_SAMBA);
         $this->assertEquals($expected, $result, "addUser returns correct result");

         $username = 'test_posix_samba_user2_'.date("Ymdis");
         $user = array( 'cn'				=> 	$username
                 , 'sn'					=> 	'Test'
                 , 'displayname' 		=>	'Test User'
                 , 'facsimiletelephonenumber'	=> 	'0123456789'
                 , 'givenname' 			=>	'First name'
                 , 'mail'				=>	'test@alchemyworx.com'
                 , 'mobile'				=>	'1234567890'
                 , 'o'					=>	'Alchemy Worx Ltd'
                 , 'ou'					=>	'IT'
                 , 'physicaldeliveryofficename'	=>	'United Kingdom, London'
                 , 'telephonenumber'		=>	'0207 025 2100'
                 , 'title'				=>	'Job title'
                 , 'description'	=>	'Posix Samba User Account'
                 , 'gecos'			=>	$username
                 , 'gidnumber' 		=>	'503'
                 , 'homedirectory' 	=>	'/home/test6'
                 , 'loginshell' 	=>	'/bin/bash'
                 , 'objectclass' 	=>	'inetOrgPerson,posixAccount,shadowAccount,sambaSamAccount'
                 , 'sambaacctflags' 	=>	'[U ]'
                 , 'sambantpassword' 	=> 't3st'
                 , 'sambapasswordhistory' => '0000000000000000000000000000000000000000000000000000000000000000'
                 , 'sambapwdlastset' 	=> '1314375838'
                 , 'sambasid' 			=> 'S-1-5-21-3592966601-4272935661-83688463-1010'
                 , 'uid'			=>	$username
                 , 'uidnumber'		=>	'10004'
                 , 'password'   => 't3st');

         $expected = true;

         $result = $this->object->addUser($user, LDAPUserService::POSIX_SAMBA);
         $this->assertEquals($expected, $result, "addUser returns correct result -2");
     }


     public function test_getUser()
     {
         $this->server->bind("admin", "st0n3s2010");
         $this->object = new LDAPUserService($this->server);

         $userName = "";
         $expected = "";
         $result = $this->object->getUser($userName);
         $this->assertEquals($result, $expected, "Returns the correct value!");

         $userName = "testuser";
         $expected = "testuser testuser";
         $result = $this->object->getUser($userName);

         $this->assertEquals($expected, $result['user']['displayname'], "Returns the correct value!");
     }




     public function test_saveUser(){

         $this->server->bind("cn=admin,dc=alchemyworx,dc=local", "st0n3s2010", true);
         $this->object = new LDAPUserService($this->server);

         $username = 'test_user3_'.date("Ymdis");
         $user = array( 'cn'				=> 	$username
                 , 'sn'					=> 	'Test'
                 , 'displayname' 		=>	'Test User'
                 , 'facsimiletelephonenumber'	=> 	'0123456789'
                 , 'givenname' 			=>	'First name'
                 , 'mail'				=>	'test@alchemyworx.com'
                 , 'mobile'				=>	'1234567890'
                 , 'o'					=>	'Alchemy Worx Ltd'
                 , 'ou'					=>	'IT'
                 , 'physicaldeliveryofficename'	=>	'United Kingdom, London'
                 , 'telephonenumber'		=>	'0207 025 2100'
                 , 'title'				=>	'Job title'
                 , 'description'	=>	'Posix Samba User Account'
                 , 'gecos'			=>	$username
                 , 'gidnumber' 		=>	'503'
                 , 'homedirectory' 	=>	'/home/test6'
                 , 'loginshell' 	=>	'/bin/bash'
                 , 'objectclass' 	=>	'inetOrgPerson,posixAccount,shadowAccount,sambaSamAccount'
                 , 'sambaacctflags' 	=>	'[U ]'
                 , 'sambantpassword' 	=> 'E8F3BA8309DA88484279147303DC390C'
                 , 'sambapasswordhistory' => '0000000000000000000000000000000000000000000000000000000000000000'
                 , 'sambapwdlastset' 	=> '1314375838'
                 , 'sambasid' 			=> 'S-1-5-21-3592966601-4272935661-83688463-1010'
                 , 'uid'			=>	$username
                 , 'uidnumber'		=>	'10004');

         $expected = true;

         $result = $this->object->addUser($user, LDAPUserService::POSIX_SAMBA);
         $this->assertEquals($expected, $result, "addUser returns correct result");

         $result = $this->object->getUser($username);
         $this->assertEquals($user['displayname'], $result['user']['displayname'], "getUser returns the correct value!");

         $user['displayname'] = 'Updated displayname';
         $userDn = "uid=".$user['uid'].",ou=people,dc=alchemyworx,dc=local";
         $result = $this->object->saveUser($user);
         $this->assertEquals($expected, $result, "saveGroup returns correct result -1");

         $result = $this->object->getUser($username);
         $this->assertEquals($user['displayname'], $result['user']['displayname'], "getUser returns the correct value! -2");

     }

     public function test_deleteUser(){

         $this->server->bind("cn=admin,dc=alchemyworx,dc=local", "st0n3s2010", true);
         $this->object = new LDAPUserService($this->server);

         $username = 'test_user3_'.date("Ymdis");
         $user = array( 'cn'				=> 	$username
                 , 'sn'					=> 	'Test'
                 , 'displayname' 		=>	'Test User'
                 , 'facsimiletelephonenumber'	=> 	'0123456789'
                 , 'givenname' 			=>	'First name'
                 , 'mail'				=>	'test@alchemyworx.com'
                 , 'mobile'				=>	'1234567890'
                 , 'o'					=>	'Alchemy Worx Ltd'
                 , 'ou'					=>	'IT'
                 , 'physicaldeliveryofficename'	=>	'United Kingdom, London'
                 , 'telephonenumber'		=>	'0207 025 2100'
                 , 'title'				=>	'Job title'
                 , 'description'	=>	'Posix Samba User Account'
                 , 'gecos'			=>	$username
                 , 'gidnumber' 		=>	'503'
                 , 'homedirectory' 	=>	'/home/test6'
                 , 'loginshell' 	=>	'/bin/bash'
                 , 'objectclass' 	=>	'inetOrgPerson,posixAccount,shadowAccount,sambaSamAccount'
                 , 'sambaacctflags' 	=>	'[U ]'
                 , 'sambantpassword' 	=> 'E8F3BA8309DA88484279147303DC390C'
                 , 'sambapasswordhistory' => '0000000000000000000000000000000000000000000000000000000000000000'
                 , 'sambapwdlastset' 	=> '1314375838'
                 , 'sambasid' 			=> 'S-1-5-21-3592966601-4272935661-83688463-1010'
                 , 'uid'			=>	$username
                 , 'uidnumber'		=>	'10004');

         $expected = true;

         $result = $this->object->addUser($user, LDAPUserService::POSIX_SAMBA);
         $this->assertEquals($expected, $result, "addUser returns correct result");

         $result = $this->object->deleteUser($user);
         $this->assertEquals($result, $expected, "deleteUser returns correct result");

     }*/

    public function test_modifyUser(){
        $userInfo = array();
        $userInfo["uidNumber"]    = 1035;
        $userInfo["displayName"]  = "Todd Fraser";
        $userInfo["description"]  = "User Account";
        $userInfo["cn"]             = "tfraser";
        $userInfo["uid"]            = "tfraser";
        $userInfo["objectClass"][0]    = "person";
        $userInfo["objectClass"][1]    = "sambaSamAccount";
        $userInfo["sambaSID"]       = "S-1-5-21-1596523735-3243437934-4265973462-3070";
        //$hashed_password = strtoupper(bin2hex(mhash(MHASH_MD4, iconv("UTF-8","UTF-16LE", $userInfo["userPassword"]))));;
        $sambaPwdLastSet 	= strtotime("now");
        $sambaPwdMustChange     = strtotime("now + 45 days");
        $today = time(); // or your date as well
        $your_date = strtotime("1970-01-01");
        $datediff = $today - $your_date;
        $dateshadow = floor($datediff/(60*60*24));
        $shadowLastChange = $dateshadow;
        //$userInfo["sambaNTPassword"]    = $hashed_password;
        $userInfo["sambaPwdLastSet"]    = $sambaPwdLastSet;
        $userInfo["sambaPwdMustChange"]    = $sambaPwdMustChange;
        $userInfo["shadowLastChange"]    = $shadowLastChange;

        $filter          = "uid=tfraser";
        $attributes      = array('cn', 'displayName') ;
        $distinguishedName  = "ou=People,dc=nofloss,dc=local";

        // $result = $this->object->search($distinguishedName, $filter, $attributes);

        $this->server->bind("cn=admin,dc=alchemyworx,dc=local", "st0n3s2010", true);
        $this->object = new LDAPUserService($this->server);

        $result = $this->object->getUser('tfraser');
        
        $this->assertEquals($userInfo["uid"], $result['user']['uid'], "Correct uid set");

        $userInfo = array();
        $userInfo["displayName"]  = "Todd Fraser";
        $userInfo["uid"]          = "tfraser";


        $expected = true;
        $this->server->bindAdmin();
        $result = $this->object->modifyUser($userInfo);
        $this->assertEquals($expected, $result, "Modify returns the correct result -2");

        //   $result = $this->object->search($distinguishedName, $filter, $attributes);
        // $this->assertEquals($userInfo["displayName"], $result[0]['displayname'][0], "Correct modified display name set");

        //$expected = true;
        // $result = $this->object->deleteUser($userInfo);
        //$this->assertEquals($expected, $result, "deleteUser returns the correct result -1");

    }
	
}