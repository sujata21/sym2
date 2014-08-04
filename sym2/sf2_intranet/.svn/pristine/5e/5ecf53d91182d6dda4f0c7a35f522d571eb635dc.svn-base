<?php
namespace Application\LDAPBundle\Tests\Model;
use Application\LDAPBundle\Service\LDAPServer;

class LDAPServerTest extends \PHPUnit_Framework_TestCase
{
	
	protected function setUp()
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
		
	public function test_bind(){
			
		$user     = "alchemy";
		$password = "";
		$expected = false;
		$result = $this->server->bind($user, $password);		
		$this->assertEquals($expected, $result, "connect returns the correct result -1");
	
		$user     = "alchemy";
		$password = "wrongpassword";
		$expected = false;
		$result = $this->server->bind($user, $password);
		$this->assertEquals($expected, $result, "connect returns the correct result -2");
	
		$user     = "alchemy";
		$password = "w0rx";
		$expected = true;
		$result = $this->server->bind($user, $password);
		$this->assertEquals($expected, $result, "connect returns the correct result -3");
	}
}