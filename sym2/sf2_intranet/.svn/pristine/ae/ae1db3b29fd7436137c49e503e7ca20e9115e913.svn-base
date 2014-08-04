<?php
namespace  Application\LDAPBundle\Service;

use Symfony\Bundle\FrameworkBundle\Console\Application;

use Application\LDAPBundle\Service\LDAPServer;
use Doctrine\ORM\EntityManager;
use Application\LDAPBundle\Entity\LDAPUser as LDAPUserModel;

class LDAPUser {

	const SAMBA = 'ldap_user.user.samba';
	const POSIX = 'ldap_user.user.posix';
	const POSIX_SAMBA = 'ldap_user.user.posix_samba';
	
	protected $ldapServer;
	protected $errorNo;
	protected $errorMsg;
	
	private $expiryDays = 45;
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

	private function resetError(){
		$this->errorMsg = null;
		$this->errorNo = null;
	}

	public function getSHAPassword($password){
		return '{SHA}'. base64_encode( sha1( $password, true ) );
	}	
	
	public function getNTPassword($password){
		return strtoupper(bin2hex(mhash(MHASH_MD4, iconv("UTF-8","UTF-16LE", $password))));	
	}
	
	public function getSambaPwdMustChange(){
		return 	strtotime("now + $this->expiryDays days");
	}
	
	public function getShadowLastChange(){
		$datediff = time() - strtotime("1970-01-01");
		return floor($datediff/(60*60*24)) + $this->expiryDays;
	}
	
	
	public function addUser($user, $mode = self::SAMBA){

		$this->resetError();
		
		if($mode == self::POSIX_SAMBA){
			$attributes = array(  'cn' 			=>	$user['cn']
					, 'sn' 			=>	$user['sn']
					, 'displayName' =>  $user['displayname']
					, 'facsimileTelephoneNumber'	=> 	$user['facsimiletelephonenumber']
					, 'givenName' 			=>	$user['givenname']
					, 'mobile'				=>	$user['mobile']
					, 'o'					=>	$user['o']
					, 'ou'					=>	$user['ou']
					, 'physicalDeliveryOfficeName'	=>	$user['physicaldeliveryofficename']
					, 'telephoneNumber'		=>	$user['telephonenumber']
					, 'title'				=>	$user['title']
					, 'description'	=>	$user['description']
					, 'gecos'	 	=>	$user['gecos']
					, 'gidNumber' 	=>	$user['gidnumber']
					, 'homeDirectory'	=>	$user['homedirectory']
					, 'loginShell'	=>	$user['loginshell']
					, 'objectClass'	=>	explode(",", $user['objectclass'])
					, 'sambaAcctFlags' 		=>	$user['sambaacctflags']
					, 'sambaNTPassword' 	=>	$this->getNTPassword($user['sambantpassword'])
					, 'sambaPasswordHistory'	=>	$user['sambapasswordhistory']
					, 'sambaPwdLastSet' 	=>	strtotime("now")
					, 'sambaSID' 			=>	$user['sambasid']
					, 'sambaPwdCanChange'	=>	0
					, 'sambaPwdMustChange' 	=>	$this->getSambaPwdMustChange()
					, 'shadowLastChange' 	=>	$this->getShadowLastChange()
					, 'shadowMax' 			=>	$this->expiryDays
					, 'uid'			=>	$user['uid']
					, 'uidNumber' 	=>	$user['uidnumber']
					, 'userPassword' 	=> $this->getSHAPassword( $user['userpassword'] ) );
				
		} elseif($mode == self::POSIX){
			$attributes = array(  'cn' 			=>	$user['cn']
					, 'description'	=>	$user['description']
					, 'gecos'	 	=>	$user['gecos']
					, 'gidNumber' 	=>	$user['gidnumber']
					, 'homeDirectory'	=>	$user['homedirectory']
					, 'loginShell'	=>	$user['loginshell']
					, 'objectClass'	=>	explode(",", $user['objectclass'])
					, 'uid'			=>	$user['uid']
					, 'uidNumber' 	=>	$user['uidnumber']);
		} else {
			$attributes = array( 'displayName' 	=> 	$user['displayname']
					, 'objectClass' 			=> 	explode(",", $user['objectclass'])
					, 'sambaAcctFlags' 			=>	$user['sambaacctflags']
					, 'sambaNTPassword' 		=>	$this->getNTPassword($user['sambantpassword'])
					, 'sambaPasswordHistory'	=>	$user['sambapasswordhistory']
					, 'sambaPwdLastSet' 		=>	strtotime("now")
					, 'sambaSID' 				=>	$user['sambasid']
					, 'sambaPwdCanChange'		=>	0
					, 'sambaPwdMustChange' 		=>	$this->getSambaPwdMustChange()
					, 'uid' 					=>	$user['uid']
			);
		}

		$userDn = $this->ldapServer->getUserdn();
		$distinguishedName = "uid={$user['uid']},$userDn";

		$res = ldap_add($this->ldapServer->getConnection(), $distinguishedName, $attributes);
		if($res === false){
			$this->errorNo 		= ldap_errno($this->server->getConnection());
			$this->errorMsg    	= ldap_error($this->server->getConnection());
		}
		return $res;
	}

	public function getUser($name){
		if(empty($name)){
			return null;
		}
		$filter          = "uid=$name";
		$attributes      = array( 'cn', 'sn', 'displayName', 'facsimileTelephoneNumber'
				, 'givenName', 'mobile', 'o', 'ou', 'physicalDeliveryOfficeName', 'telephoneNumber', 'title', 'description', 'gecos', 'gidNumber'
				, 'homeDirectory', 'loginShell', 'objectClass', 'sambaAcctFlags', 'sambaNTPassword', 'sambaPasswordHistory', 'sambaPwdLastSet'
				, 'sambaSID', 'sambaPwdCanChange', 'sambaPwdMustChange', 'shadowLastChange', 'shadowMax', 'uid', 'uidNumber', 'userPassword');
		$distinguishedName  = $this->ldapServer->getUserdn();

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
		$results = array();
		$results['user'] = $data[0];
		return $results;
	}

	public function getUsers(){
		$filter          = "uid=*";
		$attributes      = array( 'cn', 'sn', 'displayName', 'facsimileTelephoneNumber'
				, 'givenName', 'mobile', 'o', 'ou', 'physicalDeliveryOfficeName', 'telephoneNumber', 'title', 'description', 'gecos', 'gidNumber'
				, 'homeDirectory', 'loginShell', 'objectClass', 'sambaAcctFlags', 'sambaNTPassword', 'sambaPasswordHistory', 'sambaPwdLastSet'
				, 'sambaSID', 'sambaPwdCanChange', 'sambaPwdMustChange', 'shadowLastChange', 'shadowMax', 'uid', 'uidNumber', 'userPassword', 'description');
		$distinguishedName  = $this->ldapServer->getUserdn();

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

	public function saveUser($user){
		$userDn = $this->ldapServer->getUserdn();
		$name = $user['uid'];
		$distinguishedName = "uid=$name,$userDn";
		
		if(strpos($user['objectclass'], 'posixAccount') > 0 && strpos($user['objectclass'], 'sambaSamAccount')){
			$mode =  self::POSIX_SAMBA;
		} elseif(strpos($user['objectclass'], 'posixAccount') > 0) {
			$mode =  self::POSIX;
		} else {
			$mode =  self::SAMBA;
		}		
		
		if($mode == self::POSIX_SAMBA){
			$attributes = array(  'cn' 				=>	$user['cn']
					, 'sn' 							=>	$user['sn']
					, 'displayName' 				=>  $user['displayname']
					, 'facsimileTelephoneNumber'	=> 	$user['facsimiletelephonenumber']
					, 'givenName' 					=>	$user['givenname']
					, 'mobile'						=>	$user['mobile']
					, 'o'							=>	$user['o']
					, 'ou'							=>	$user['ou']
					, 'physicalDeliveryOfficeName'	=>	$user['physicaldeliveryofficename']
					, 'telephoneNumber'				=>	$user['telephonenumber']
					, 'title'						=>	$user['title']					
					, 'gecos'	 					=>	$user['gecos']
					, 'gidNumber' 					=>	$user['gidnumber']
					, 'homeDirectory'				=>	$user['homedirectory']
					, 'loginShell'					=>	$user['loginshell']
					, 'objectClass'					=>	explode(",", $user['objectclass'])
					, 'sambaAcctFlags' 				=>	$user['sambaacctflags']
					, 'sambaNTPassword' 			=>	$user['sambantpassword']
					, 'sambaPasswordHistory'		=>	$user['sambapasswordhistory']
					, 'sambaPwdLastSet' 			=>	$user['sambapwdlastset']
					, 'sambaSID' 					=>	$user['sambasid']
					, 'sambaPwdCanChange'			=>	0
					, 'sambaPwdMustChange' 			=>	$user['sambapwdmustchange']
					, 'shadowLastChange' 			=>	$user['shadowlastchange']
					, 'shadowMax' 					=>	$this->expiryDays
					, 'uid'							=>	$user['uid']
					, 'uidNumber' 					=>	$user['uidnumber']
					, 'userPassword' 				=>  $user['userpassword']);
				
		} elseif($mode == self::POSIX){
			$attributes = array(  'cn' 				=>	$user['cn']
					, 'description'					=>	$user['description']
					, 'gecos'	 					=>	$user['gecos']
					, 'gidNumber' 					=>	$user['gidnumber']
					, 'homeDirectory'				=>	$user['homedirectory']
					, 'loginShell'					=>	$user['loginshell']
					, 'objectClass'					=>	explode(",", $user['objectclass'])
					, 'uid'							=>	$user['uid']
					, 'uidNumber' 					=>	$user['uidnumber']);
		} else {
			$attributes = array( 'displayName' 		=> 	$user['displayname']
					, 'objectClass' 				=> 	explode(",", $user['objectclass'])
					, 'sambaAcctFlags' 				=>	$user['sambaacctflags']
					, 'sambaNTPassword' 			=>	$user['sambantpassword']
					, 'sambaPasswordHistory'		=>	$user['sambapasswordhistory']
					, 'sambaPwdLastSet' 			=>	$user['sambapwdlastset']
					, 'sambaSID' 					=>	$user['sambasid']
					, 'sambaPwdCanChange'			=>	0
					, 'sambaPwdMustChange' 			=>	$user['sambapwdmustchange']					
					, 'uid' 						=>	$user['uid']
			);
		}

		$res = ldap_modify($this->ldapServer->getConnection(), $distinguishedName, $attributes);
		if($res === false){
			$error_no = ldap_errno($this->server->connection);
			$error    = ldap_error($this->server->connection);
			echo "Add Alias error $error_no: $error\n";
		}
		return $res;
	}

	public function deleteUser($user){
		
		$userDn = $this->ldapServer->getUserdn();
		$name = $user['uid'];
		$distinguishedName = "uid=$name,$userDn";
		
		return $this->ldapServer->delete_entry($distinguishedName);
	}
    public function modifyUser($user){
        if(empty($user)) return null;
        if(isset($user['uid'])){
            $distinguishedName = "uid={$user['uid']},{$this->ldapServer->getUserdn()}";
        } elseif($user['userid']){
            $distinguishedName = "uid={$user['userid']},{$this->ldapServer->getUserdn()}";
        }else {
            $distinguishedName = "cn={$user['cn']},{$this->userdn}";
        }
echo $distinguishedName;
var_dump($user);
        return $this->modifyAttributes($distinguishedName, $user);
    }
    function modifyAttributes($dn, $attributes) {

        foreach ($attributes as $key => $cur_val) {
            if ($cur_val == '') {
                unset($attributes[$key]);
                /*	$old_value = $this->retrieveAttribute($dn, $key);
                    if (isset($old_value)) {
                        ldap_mod_del($this->server->getConnection(), $dn, array($key => $old_value));
                    }*/
            }
            if (is_array($cur_val)) {
                foreach ($cur_val as $mv_key => $mv_cur_val) {
                    if ($mv_cur_val == '') {
                        unset($attributes[$key][$mv_key]);
                    } else {
                        $attributes[$key][$mv_key] = $mv_cur_val;
                    }
                }
            }
        }
        return ldap_modify($this->ldapServer->getConnection(), $dn, $attributes);
    }

}