<?php
namespace Application\LDAPBundle\Service;

class LDAPServer {

	protected $connection;
	private $version;
	private $host;
	private $port;
	private $useTLS;

	public function __construct($server, $port, $useTLS, $parameters)
	{
		$this->connection = null;
		$this->version = 3;
		$this->host = $server;
		$this->port = $port;
		$this->useTLS  = $useTLS;

		$this->baseDN = $parameters['base_dn'];
		$this->bindDN = $parameters['bind_dn'];
		$this->bindPasswd =  $parameters['bind_passwd'];
		$this->userPrefix =  $parameters['user_prefix'];
		$this->groupPrefix =  $parameters['group_prefix'];
		$this->mailaliasPrefix =  $parameters['mailalias_prefix'];
		$this->userAttr = $parameters['user_attribute'];
		//var_dump($parameters);
		
	}

	
	public function getConnection(){
		return $this->connection;
	}

	public function getGroupdn(){
		return $this->groupPrefix.','.$this->baseDN;
	}
	public function getMailAliasdn(){
		return $this->mailaliasPrefix.','.$this->baseDN;
	}

	public function getUserdn(){
		return $this->userPrefix.','.$this->baseDN;
	}

	public function connect(){

		$this->connection = ldap_connect($this->host, $this->port);

		if ($this->connection) {

			if (ldap_set_option($this->connection, LDAP_OPT_PROTOCOL_VERSION, $this->version))
			{
				$this->version = "3";				
			} else{
				$this->version = "2";
			}
			ldap_set_option($this->connection, LDAP_OPT_REFERRALS, 0);
			//ldap_set_option(NULL, LDAP_OPT_DEBUG_LEVEL, 7);
			if ($this->useTLS) {
				ldap_get_option($this->connection, LDAP_OPT_PROTOCOL_VERSION, $this->version);
				
				if ($this->version == -1) {
					echo 'Could not get LDAP protocol version.';
					return;
				}
				if ($this->version != 3) {
					echo 'Could not start TLS, only supported by LDAP v3.';
					return;
				} else if (!function_exists('ldap_start_tls')) {
					echo 'Could not start TLS. It does not seem to be supported by this PHP setup.';
					return;
				} else if (!ldap_start_tls($this->connection)) {
					echo 'Could not start TLS.'; //(Error %errno: %error).', array('%errno' => ldap_errno($con), '%error' => ldap_error($con)), WATCHDOG_ERROR);
					return;
				}
			}

			return true;
		} else {
			return false;
		}
	}

	public function bind($user=null, $password=null, $useUserAsDN = false){

		if(!empty($user)){
			$distinguishedName  = "uid=$user,{$this->getUserdn()}";
		} else {
			return false;
		}		
		if($useUserAsDN){
			$distinguishedName = $user;
		}
		//else{
		//	$distinguishedName  = $this->bindDN;
		//	$password           = $this->bindPasswd;
		//}
		//echo $distinguishedName;
		$res = @ldap_bind($this->connection, $distinguishedName, $password);		
		if($res === true) {
			$this->connected = true;
			return true;
		} elseif ($res === false) {
			$error_no = ldap_errno($this->connection);
			$error    = ldap_error($this->connection);
			//echo "Bind error $error_no: $error\n";
			//ldap_close($this->connection);			
			return false;
		}
	}

	public function bindAdmin(){
		$this->bind($this->bindDN, $this->bindPasswd, true);
	}

	function disconnect() {
		if ($this->connection) {
			@ldap_unbind($this->connection);
			@ldap_close($this->connection);
		}
		$this->connected = false;
	}

	public function close(){
		$this->disconnect();
	}

	public function search($distinguishedName, $filter, $attributes = array('dn')){
		//var_dump($this->connection);
		//var_dump($distinguishedName);
		//var_dump($filter);
		//var_dump($attributes);
		$result = null;		
		$searchResult = ldap_search($this->connection, $distinguishedName, $filter, $attributes);
		if($searchResult && ldap_count_entries($this->connection, $searchResult)) {
			$result = ldap_get_entries($this->connection, $searchResult);		
		}
		return $result;
	}


	function create_entry($dn, $attributes) {
		//set_error_handler(array('LDAPInterface', 'void_error_handler'));
		$ret = ldap_add($this->connection, $dn, $attributes);
		//restore_error_handler();

		return $ret;
	}

	function rename_entry($dn, $newrdn, $newparent, $deleteoldrdn) {
		//set_error_handler(array('LDAPInterface', 'void_error_handler'));
		$ret = ldap_rename($this->connection, $dn, $newrdn, $newparent, $deleteoldrdn);
		//restore_error_handler();

		return $ret;
	}

	function delete_entry($dn) {
		//set_error_handler(array('LDAPInterface', 'void_error_handler'));
		$ret = ldap_delete($this->connection, $dn);
		//restore_error_handler();

		return $ret;
	}

	function deleteAttribute($dn, $attribute) {
		ldap_mod_del($this->connection, $dn, array($attribute => array()));
	}
} // LDAPServer
