<?php
namespace Application\LDAPBundle\Tests\Service;
use Application\LDAPBundle\Service\LDAPServer;
use Application\LDAPBundle\Service\LDAPMailAlias as LDAPMailAliasService;

class LDAPMailAliasTest extends \PHPUnit_Framework_TestCase
{
	protected $object;
	 
	public function setUp()
	{   
		$server = 'ldap://192.168.1.11';
		$port	= 389;		
		$useTLS = false;
		$parameters = array( 'base_dn' 			=> "dc=alchemyworx,dc=local"
				, 'bind_dn'						=> "cn=admin,dc=alchemyworx,dc=local"
				, 'bind_passwd' 				=> 'st0n3s2010'
				, 'user_prefix' 				=> 'ou=people'
				, 'group_prefix' 				=> 'ou=groups'
				, 'mailalias_prefix' 			=> 'ou=mailalias'
				, 'user_attribute' 				=> 'uid');

		$this->server = new LDAPServer($server, $port, $useTLS, $parameters);
		$this->server->connect();
		
	}

	protected function tearDown()
	{
		$this->server->close();
		$this->server = null;
	}

/*	public function test_getMailAlias() 
	{	
		//$this->server->bind("admin", "st0n3s2010");
		$this->object = new LDAPMailAliasService($this->server);
		$this->object->initialize();
		
		$groupName = "";
		$expected = "";
		$result = $this->object->getMailAlias($groupName);
		$this->assertEquals($result, $expected, "Returns the correct value!");
	
		$groupName = "dev";		
		$expected = array(	'name' 				=> 'dev'
						  ,	'description' 		=> 'dev mail group'
				          , 'objectclass' 		=> 'groupOfNames'
				         			          
						 );
		$result = $this->object->getMailAlias($groupName);
		//var_dump($result);
		unset($result['group']['member']);
		$this->assertEquals($expected, $result['group'], "Returns the correct value!");
	}		
	
	public function test_getAllMailAlias(){
		
		
		$this->object = new LDAPMailAliasService($this->server);
		$this->object->initialize();
		
		$result = $this->object->getAllMailAlias();		
		//echo count($result);
		$this->assertTrue(count($result) > 0, "getGroups returns some records");
		$this->assertTrue(isset($result[0]['cn']), "getGroups returns correct record format -1");
	}
	
	public function test_addMailAlias(){
		
		//$this->server->bind("cn=admin,dc=alchemyworx,dc=local", "st0n3s2010", true);
		$this->object = new LDAPMailAliasService($this->server);
		$this->object->initialize();
				
		$group = array(	'name' 				=> 'test_MailAlias_'.date("YmdHis")
					  ,	'description' 		=> 'Group Mail account'
					  , 'objectclass' 		=> 'groupOfNames'
					  , 'member'	        =>  ''
		);
		$expected = true;
		
		//$result = $this->object->addMailAlias($group);
		//$this->assertEquals($expected, $result, "addGroup returns correct result");
		
		$group = array(	'name' 			=> 'test_group2_'.date("YmdHis")
				,	'description' 		=> 'Group Mail account'
				, 'objectclass' 		=> 'groupOfNames'
				, 'member'	        =>  ''
			    		  
		);
		
		$expected = true;
		
		$result = $this->object->addMailAlias($group);
		$this->assertEquals($expected, $result, "addGroup returns correct result -2");
	}
	*/
	public function test_saveMailAlias(){
	
		$this->object = new LDAPMailAliasService($this->server);
		$this->object->initialize();
		
		$group = array(	'name' 				=> 'test_mailAlias_'.date("YmdHis")
				,	'description' 		=> 'MailAlias account'
				, 'objectclass' 		=> 'groupOfNames'
				, 'member'	        =>  ''
				
		);
				
		$expected = true;
		
		$result = $this->object->addMailAlias($group);
		$this->assertEquals($result, $expected, "addGroup returns correct result");
		
		$group['member'] = array('uid=spandey,ou=people,dc=alchemyworx,dc=local', 'uid=alchemy,ou=people,dc=alchemyworx,dc=local');
		//var_dump($group); //die();
		
		$groupDn = "cn=".$group['name'].",ou=mailalias,dc=alchemyworx,dc=local";
		$result = $this->object->saveMailAlias($group);
		$this->assertEquals($expected, $result, "saveGroup returns correct result -1");		
	}
	
	
	/*
	
	public function test_deleteGroup(){
		
		$this->object = new LDAPMailAliasService($this->server);
		$this->object->initialize();
		
		$group = array(	'name' 				=> 'test_MailAlias_20140306151115'
				,	'description' 		=> 'MailAlias account'
				, 'objectclass' 		=> 'groupOfNames'
				, 'member'	        =>  ''
				
		);
		
		$expected = true;
		
		//$result = $this->object->addGroup($group);
		//$this->assertEquals($result, $expected, "addGroup returns correct result");
		
		$result = $this->object->deleteMailAlias($group);
		$this->assertEquals($result, $expected, "deleteGroup returns correct result");
		
	}*/
	
}
