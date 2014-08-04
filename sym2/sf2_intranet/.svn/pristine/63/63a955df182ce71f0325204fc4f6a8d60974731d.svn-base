<?php
namespace Application\LDAPBundle\Tests\Service;
use Application\LDAPBundle\Service\LDAPServer;
use Application\LDAPBundle\Service\LDAPGroup as LDAPGroupService;

class LDAPServerTest extends \PHPUnit_Framework_TestCase
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

	public function test_getGroup() 
	{	
		$this->server->bind("admin", "st0n3s2010");
		$this->object = new LDAPGroupService($this->server);
		
		$groupName = "";
		$expected = "";
		$result = $this->object->getGroup($groupName);
		$this->assertEquals($result, $expected, "Returns the correct value!");
	
		$groupName = "alchemy";		
		$expected = array(	'name' 				=> 'alchemy'
						  ,	'description' 		=> 'Group account'
				          , 'id' 				=> '503'
				          , 'objectclass' 		=> 'posixGroup,sambaGroupMapping'
				          , 'sambagrouptype' 	=> '2'
				          , 'sambasid' 			=> 'S-1-5-21-1596523735-3243437934-4265973462-2031'
						 );
		$result = $this->object->getGroup($groupName);
		unset($result['group']['memberuid']);
		$this->assertEquals($expected, $result['group'], "Returns the correct value!");
	}		
	
	public function test_getGroups(){
		
		$this->server->bind("admin", "st0n3s2010");
		$this->object = new LDAPGroupService($this->server);
		
		$result = $this->object->getGroups();		
		$this->assertTrue(count($result) > 0, "getGroups returns some records");
		$this->assertTrue(isset($result[0]['cn']), "getGroups returns correct record format -1");
	}
	
	public function test_addGroup(){
		
		$this->server->bind("cn=admin,dc=alchemyworx,dc=local", "st0n3s2010", true);
		$this->object = new LDAPGroupService($this->server);
				
		$group = array(	'name' 				=> 'test_group_'.date("YmdHis")
					  ,	'description' 		=> 'Group account'
					  , 'id' 				=> '5001'
					  , 'objectclass' 		=> 'posixGroup,sambaGroupMapping'
					  , 'sambagrouptype' 	=> '2'
					  , 'sambasid' 			=> 'S-1-5-21-1596523735-3243437934-4265973462-2031'
		);
		$expected = true;
		
		$result = $this->object->addGroup($group);
		$this->assertEquals($expected, $result, "addGroup returns correct result");
		
		$group = array(	'name' 			=> 'test_group2_'.date("YmdHis")
				,	'description' 		=> 'Group account'
				, 'id' 					=> '5001'
				, 'objectclass' 		=> 'posixGroup,sambaGroupMapping'
				, 'sambagrouptype' 		=> '2'
				, 'sambasid' 			=> 'S-1-5-21-1596523735-3243437934-4265973462-2031'				  
		);
		$expected = true;
		
		$result = $this->object->addGroup($group);
		$this->assertEquals($expected, $result, "addGroup returns correct result -2");
	}
	
	public function test_saveGroup(){
	
		$this->server->bind("cn=admin,dc=alchemyworx,dc=local", "st0n3s2010", true);
		$this->object = new LDAPGroupService($this->server);
		
		$group = array(	'name' 				=> 'test_group_'.date("YmdHis")
				,	'description' 		=> 'Group account'
				, 'id' 				=> '5001'
				, 'objectclass' 		=> 'posixGroup,sambaGroupMapping'
				, 'sambagrouptype' 	=> '2'
				, 'sambasid' 			=> 'S-1-5-21-1596523735-3243437934-4265973462-2031'
		);
				
		$expected = true;
		
		$result = $this->object->addGroup($group);
		$this->assertEquals($result, $expected, "addGroup returns correct result");
		
		$group['memberuid'] = array('user', 'user2', 'user3');
		
		$groupDn = "cn=".$group['name'].",ou=group,dc=alchemyworx,dc=local";
		$result = $this->object->saveGroup($group);
		$this->assertEquals($expected, $result, "saveGroup returns correct result -1");		
	}
	
	
	public function test_deleteGroup(){
		
		$this->server->bind("cn=admin,dc=alchemyworx,dc=local", "st0n3s2010", true);
		$this->object = new LDAPGroupService($this->server);
		
		$group = array(	'name' 		=> 'test_group_'.date("YmdHis")
				,	'description' 	=> 'Group account'
				, 'id' 				=> '5001'
				, 'objectclass' 	=> 'posixGroup,sambaGroupMapping'
				, 'sambagrouptype' 	=> '2'
				, 'sambasid' 		=> 'S-1-5-21-1596523735-3243437934-4265973462-2031'
		);
		
		$expected = true;
		
		$result = $this->object->addGroup($group);
		$this->assertEquals($result, $expected, "addGroup returns correct result");
		
		$result = $this->object->deleteGroup($group);
		$this->assertEquals($result, $expected, "deleteGroup returns correct result");
		
	}
	
}
