<?php
namespace  Application\LDAPBundle\Service;

use Symfony\Bundle\FrameworkBundle\Console\Application;

use Application\LDAPBundle\Service\LDAPServer;
use Doctrine\ORM\EntityManager;
use Application\LDAPBundle\Entity\LDAPGroup as LDAPGroupModel;

class LDAPGroup {

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
	}
	
	public function getGroup($name){
		if(empty($name)){
			return null;
		}
		$filter          = "cn=$name";
		$attributes      = array('cn', 'description', 'gidNumber', 'objectClass', 'sambaGroupType', 'sambaSID', 'memberuid') ;
		$distinguishedName  = $this->ldapServer->getGroupdn();

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
		//var_dump($data);
		if(!empty($data)){
			$results = array();
			$results['group'] = array(	'name' 				=> $data[0]['cn']
				//,	'description' 		=> $data[0]['description']
				, 'id' 				=> $data[0]['gidnumber']
				, 'objectclass' 		=> implode(",", $data[0]['objectclass'])
			//	, 'sambagrouptype' 	=> $data[0]['sambagrouptype']
			//	, 'sambasid' 			=> $data[0]['sambasid']
				//, 'memberuid'			=> $data[0]['memberuid'][0]
			);
		}
		return $results;
	}

	private function resetError(){
		$this->errorMsg = null;
		$this->errorNo = null;
	}
	
	public function getGroups(){
		$filter          = "cn=*";
		$attributes      = array('cn', 'description', 'gidNumber', 'objectClass', 'sambaGroupType', 'sambaSID', 'memberuid') ;
		$distinguishedName  = $this->ldapServer->getGroupdn();
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

	public function addGroup($group){
		
		$this->resetError();
		
		$attributes = array(	'cn' 		=> $group['name']
				, 'description' 		=> $group['description']
				, 'gidNumber' 			=> $group['id']
				, 'objectClass' 		=> explode(",", $group['objectclass'])
				, 'sambaGroupType' 		=> $group['sambagrouptype']
				, 'sambaSID' 			=> $group['sambasid']				
		);
		
		if(isset($group['memberuid']) && count($group['memberuid']) > 0){
			$attributes['memberUid'] = $group['memberuid'];
		}
				
		$groupDn = $this->ldapServer->getGroupdn();
		$distinguishedName = "cn={$group['name']}, $groupDn";
		
		$res = ldap_add($this->ldapServer->getConnection(), $distinguishedName, $attributes);
		if($res === false){
			$this->errorNo 		= ldap_errno($this->server->getConnection());
			$this->errorMsg    	= ldap_error($this->server->getConnection());			
		}
		return $res;
    }

	public function saveGroup($group){

		$groupDn = $this->ldapServer->getGroupdn();
		$name = $group['name'];
		$distinguishedName = "cn=$name,$groupDn";

		$attributes = array(	'cn' 	=> $group['name']
				, 'description' 		=> $group['description']
				, 'gidNumber' 			=> $group['id']
				, 'objectClass' 		=> explode(",", $group['objectclass'])
				, 'sambaGroupType' 		=> $group['sambagrouptype']
				, 'sambaSID' 			=> $group['sambasid']				
		);
		
		if(isset($group['memberuid']) && count($group['memberuid']) > 0){
			$attributes['memberUid'] = $group['memberuid'];
		}

		$res = ldap_modify($this->ldapServer->getConnection(), $distinguishedName, $attributes);
		if($res === false){
			$error_no = ldap_errno($this->server->connection);
			$error    = ldap_error($this->server->connection);
			echo "Add Alias error $error_no: $error\n";
		}
		
		return $res;		
	}
	
	
	public function deleteGroup($group){
		
		$groupDn = $this->ldapServer->getGroupdn();
		$name = $group['name'];
		$distinguishedName = "cn=$name,$groupDn";
		
		return $this->ldapServer->delete_entry($distinguishedName);
	}
}
