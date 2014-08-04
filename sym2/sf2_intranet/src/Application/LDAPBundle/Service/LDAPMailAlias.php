<?php
namespace  Application\LDAPBundle\Service;

use Symfony\Bundle\FrameworkBundle\Console\Application;

use Application\LDAPBundle\Service\LDAPServer;
use Doctrine\ORM\EntityManager;
use Application\LDAPBundle\Entity\LDAPMailAlias as LDAPMailAliasModel;

class LDAPMailAlias {

	protected $ldapServer;
	protected $errorNo;
	protected $errorMsg;
	/**
	 * Constructor.
	 *
	 */

	public function __construct(LDAPServer $ldapServer){
		$this->ldapServer = $ldapServer;
	}

	public function initialize(){

		$this->ldapServer->connect();
		$this->ldapServer->bindAdmin();
		//var_dump($this->ldapServer->getUserdn());
	}
	
	public function getMailAlias($name){
		if(empty($name)){
			return null;
		}
		$filter          = "cn=$name";
		$attributes      = array('cn', 'description', 'objectClass','member') ;
		 $distinguishedName  = $this->ldapServer->getMailAliasdn();
		//var_dump($this->ldapServer);
		$data = array();
		try {
			$results = $this->ldapServer->search($distinguishedName, $filter, $attributes);
			//var_dump($results);
			
			if(!empty($results)){
				foreach ($results as $key=>$val) {
					if(is_array($val)){
						foreach($val as $k=>$v){
							if(!is_numeric($k)){
								if(isset($v["count"]) && $v["count"] == 1){
									$data[$key][$k] = $v[0];
								}elseif(isset($v["count"]) && $v["count"] > 1) {
									$members = array();
									for($i=0; $i < $v["count"]; $i++){
										$members[$i] = $v[$i];
									}
									$data[$key][$k] = $members;
								}
							}
						}
					}
				}
			}
		} catch(Exception $e){
		}
		
		if(!empty($data)){
			$results = array();
			$results['group'] = array(	'name' 				=> $data[0]['cn']
				,	'description' 		=> $data[0]['description']
				, 'objectclass' 		=> $data[0]['objectclass']
			//	, 'sambagrouptype' 	=> $data[0]['sambagrouptype']
			//	, 'sambasid' 			=> $data[0]['sambasid']
			    , 'member'			=> $data[0]['member']
			);
		}
		
		return $results;
	}

	private function resetError(){
		$this->errorMsg = null;
		$this->errorNo = null;
	}
	
	public function getAllMailAlias(){
		$filter          = "cn=*";
		$attributes      = array('cn', 'description', 'objectClass','member') ;
		$distinguishedName  = $this->ldapServer->getMailAliasdn();
		$data = array();
		try {
			$results = $this->ldapServer->search($distinguishedName, $filter, $attributes);
			if(!empty($results)){
				foreach ($results as $key=>$val) {
					if(is_array($val)){
						foreach($val as $k=>$v){
							if(!is_numeric($k)){
								if(isset($v["count"]) && $v["count"] == 1){
									$data[$key][$k] = $v[0];
								}elseif(isset($v["count"]) && $v["count"] > 1) {
									$members = array();
									for($i=0; $i < $v["count"]; $i++){
										$members[$i] = $v[$i];
									}
									$data[$key][$k] = $members;
								}
							}
						}
					}
				}
			}
		} catch(Exception $e){
		}
		return $data;
	}

	public function addMailAlias($group){
		
		$this->resetError();
		
		$attributes = array(	'cn' 		=> $group['name']
				, 'description' 		=> $group['description']
				, 'objectClass' 		=> $group['objectclass']
				, 'member' 		=> $group['member']
					
		);
		
				
		$groupDn = $this->ldapServer->getMailAliasdn();
		$distinguishedName = "cn={$group['name']}, $groupDn";
		
		$res = ldap_add($this->ldapServer->getConnection(), $distinguishedName, $attributes);
		if($res === false){
			$this->errorNo 		= ldap_errno($this->server->getConnection());
			$this->errorMsg    	= ldap_error($this->server->getConnection());			
		}
		return $res;
    }

	public function saveMailAlias($group){
		/*echo 'test';
		echo '<pre>';	
			//var_dump($group);
		echo '</pre>'; //die();*/
		$groupDn = $this->ldapServer->getMailAliasdn();
		$name = $group['name'];
		 $distinguishedName = "cn=$name,$groupDn";

		$attributes = array('cn' 	=> $group['name']
				, 'description' 		=> $group['description']
				//, 'objectClass' 		=> 'groupOfNames'
						
		);
		
		if(isset($group['member']) && count($group['member']) > 0){
			$attributes['member'] = $group['member'];
		}else{
			$attributes['member'] = '';
		}
		//echo $this->ldapServer->getConnection();
		/*echo '<pre>';	
			var_dump($attributes);
		echo '</pre>'; //die();*/
		$res = ldap_modify($this->ldapServer->getConnection(), $distinguishedName, $attributes);
		//var_dump($res); 
		if($res == false){
			 $error_no = ldap_errno($this->server->connection);
			 $error    = ldap_error($this->server->connection);
			echo "Add Alias error $error_no: $error\n";
		}
		//die();

		
		return $res;		
	}
	
	public function saveMailAliasUser($group,$user){
		//echo $group;
		$userDn = $this->ldapServer->getUserdn();
		$username = "uid=$user,$userDn";
		$result = $this->getMailAlias($group);
		
		//echo in_array($username, $result['group']['member']); 
				//var_dump($mailuser);
			//	die();

		if(count($result['group']['member']) >0 && isset($result['group']['member']) && ($result['group']['member']!= '')){
			//echo count($result['group']['member']);
			if(is_array($result['group']['member'])){
				if(!in_array($username, $result['group']['member'])){
					array_push($result['group']['member'], $username);
				}
				
			}else{
				$mailuser = array($result['group']['member']);
				if(!in_array($username, $mailuser)){
					array_push($mailuser, $username);
				}
				//var_dump($mailuser);
				$result['group']['member'] = $mailuser;
			}
			
		}else{
			$result['group']['member'] = array($username);
		}
		$result['group']['name'] = $group;
		$result['group']['description'] = $group;
		//$result['group']['objectclass'] = $group;
		//var_dump($result['group']); die();	
				
		$res = $this->saveMailAlias($result['group']);
		//var_dump($res); die();
		return $res;
		
	}
	public function removeMailAliasUser($group,$user){
		//echo $user; 
		$userDn = $this->ldapServer->getUserdn();
		$username = "uid=$user,$userDn";
		$result = $this->getMailAlias($group);
		$members = $result['group']['member'];
			/*echo '<pre>';
			var_dump($result['group']['member']);
			echo '</pre>';*/
			
			if(is_array($members)){
				$pos = array_search($username, $members);
				unset($members[$pos]);
						
			}else{
				
				$mailuser = array($result['group']['member']);
				$pos = array_search($username, $mailuser);
				unset($mailuser[$pos]);
				$result['group']['member'] = $mailuser;
				
			}
			
			$result['group']['member'] = array_values($members);
		/*echo '<pre>';
			var_dump($result['group']);
			echo '</pre>';*/
		//die();
					
		$res = $this->saveMailAlias($result['group']);
		
		return $res;
		
	}

	public function deleteMailAlias($group){
		
		$groupDn = $this->ldapServer->getMailAliasdn();
		$name = $group;
		$distinguishedName = "cn=$name,$groupDn";
//die();
		
		return $this->ldapServer->delete_entry($distinguishedName);
	}
}
