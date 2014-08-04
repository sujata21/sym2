<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20140108092306 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != "mysql", "Migration can only be executed safely on 'mysql'.");
        
        $this->addSql("CREATE TABLE groups (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, roles LONGTEXT NOT NULL COMMENT '(DC2Type:array)', UNIQUE INDEX UNIQ_F06D39705E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(255) NOT NULL, username_canonical VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, email_canonical VARCHAR(255) NOT NULL, enabled TINYINT(1) NOT NULL, salt VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, last_login DATETIME DEFAULT NULL, locked TINYINT(1) NOT NULL, expired TINYINT(1) NOT NULL, expires_at DATETIME DEFAULT NULL, confirmation_token VARCHAR(255) DEFAULT NULL, password_requested_at DATETIME DEFAULT NULL, roles LONGTEXT NOT NULL COMMENT '(DC2Type:array)', credentials_expired TINYINT(1) NOT NULL, credentials_expire_at DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D64992FC23A8 (username_canonical), UNIQUE INDEX UNIQ_8D93D649A0D96FBF (email_canonical), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE user_group (user_id INT NOT NULL, group_id INT NOT NULL, INDEX IDX_8F02BF9DA76ED395 (user_id), INDEX IDX_8F02BF9DFE54D947 (group_id), PRIMARY KEY(user_id, group_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE ldap_mail_alias_user (id INT AUTO_INCREMENT NOT NULL, ldap_user_id INT DEFAULT NULL, ldap_mail_alias_id INT DEFAULT NULL, updated_at DATETIME DEFAULT NULL, created_at DATETIME NOT NULL, synchronized_at DATETIME DEFAULT NULL, subscribe INT DEFAULT NULL, INDEX IDX_4632904BCE024346 (ldap_user_id), INDEX IDX_4632904BF0DB7A2F (ldap_mail_alias_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE ldap_user (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, username VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) DEFAULT NULL, job_title VARCHAR(25) DEFAULT NULL, email VARCHAR(255) NOT NULL, department VARCHAR(25) DEFAULT NULL, office VARCHAR(25) DEFAULT NULL, telephone VARCHAR(15) DEFAULT NULL, enabled TINYINT(1) NOT NULL, mail_account TINYINT(1) DEFAULT NULL, deleted TINYINT(1) DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, synchronized_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, created_at DATETIME NOT NULL, shadowLastChange VARCHAR(50) DEFAULT NULL, UNIQUE INDEX UNIQ_3888D380F85E0677 (username), UNIQUE INDEX UNIQ_3888D380A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE ldap_group (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, ldap_mail_alias_id INT DEFAULT NULL, name VARCHAR(50) NOT NULL, mail_alias VARCHAR(50) NOT NULL, description VARCHAR(255) NOT NULL, updated_at DATETIME DEFAULT NULL, created_at DATETIME NOT NULL, synchronized_at DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_8FCD25D45E237E06 (name), INDEX IDX_8FCD25D4A76ED395 (user_id), UNIQUE INDEX UNIQ_8FCD25D4F0DB7A2F (ldap_mail_alias_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE ldap_mail_alias (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(50) NOT NULL, updated_at DATETIME DEFAULT NULL, created_at DATETIME DEFAULT NULL, deleted INT DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, synchronized_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE ldap_mail_account (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(50) NOT NULL, updated_at DATETIME DEFAULT NULL, created_at DATETIME NOT NULL, enabled INT NOT NULL, deleted INT DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, synchronized_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE ldap_user_group (id INT AUTO_INCREMENT NOT NULL, ldap_user_id INT DEFAULT NULL, ldap_group_id INT DEFAULT NULL, updated_at DATETIME DEFAULT NULL, created_at DATETIME NOT NULL, synchronized_at DATETIME DEFAULT NULL, INDEX IDX_358893F4CE024346 (ldap_user_id), INDEX IDX_358893F4E1E736B9 (ldap_group_id), UNIQUE INDEX group_idx01 (ldap_group_id, ldap_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE hd_category (id INT AUTO_INCREMENT NOT NULL, parent_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_97192A94727ACA70 (parent_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE hd_status_type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_31C5D63C5E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE hd_ticket (id INT AUTO_INCREMENT NOT NULL, submitted_by INT DEFAULT NULL, assigned_to INT DEFAULT NULL, status_id INT DEFAULT NULL, category_id INT DEFAULT NULL, sub_category_id INT DEFAULT NULL, subject VARCHAR(255) NOT NULL, from_email VARCHAR(255) NOT NULL, updated_at DATETIME NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_A6EC0C0D641EE842 (submitted_by), INDEX IDX_A6EC0C0D89EEAF91 (assigned_to), INDEX IDX_A6EC0C0D6BF700BD (status_id), INDEX IDX_A6EC0C0D12469DE2 (category_id), INDEX IDX_A6EC0C0DF7BFE87C (sub_category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE hd_ticket_issue (id INT AUTO_INCREMENT NOT NULL, ticket_id INT DEFAULT NULL, submitted_by INT DEFAULT NULL, message LONGTEXT NOT NULL, note LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, INDEX IDX_A0A7EE2F700047D2 (ticket_id), INDEX IDX_A0A7EE2F641EE842 (submitted_by), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE hd_status (id INT AUTO_INCREMENT NOT NULL, status_type_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_4A4CC4B2CD9CFB16 (status_type_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE hd_device (id INT AUTO_INCREMENT NOT NULL, device_type_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, asset_tag VARCHAR(255) NOT NULL, ip_address VARCHAR(15) DEFAULT NULL, updated_at DATETIME DEFAULT NULL, created_at DATETIME NOT NULL, UNIQUE INDEX UNIQ_386317205E237E06 (name), UNIQUE INDEX UNIQ_386317206983740F (asset_tag), INDEX IDX_386317204FFA550E (device_type_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE ticket_log_entry (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE hd_device_type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_80FAAE925E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE Test2 (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, info VARCHAR(255) NOT NULL, date DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE Test3 (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, date DATE NOT NULL, time TIME NOT NULL, datetime DATETIME NOT NULL, info LONGTEXT NOT NULL, status TINYINT(1) NOT NULL, entity VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE Test1 (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, date VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE acl_classes (id INT UNSIGNED AUTO_INCREMENT NOT NULL, class_type VARCHAR(200) NOT NULL, UNIQUE INDEX UNIQ_69DD750638A36066 (class_type), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE acl_security_identities (id INT UNSIGNED AUTO_INCREMENT NOT NULL, identifier VARCHAR(200) NOT NULL, username TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_8835EE78772E836AF85E0677 (identifier, username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE acl_object_identities (id INT UNSIGNED AUTO_INCREMENT NOT NULL, parent_object_identity_id INT UNSIGNED DEFAULT NULL, class_id INT UNSIGNED NOT NULL, object_identifier VARCHAR(100) NOT NULL, entries_inheriting TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_9407E5494B12AD6EA000B10 (object_identifier, class_id), INDEX IDX_9407E54977FA751A (parent_object_identity_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE acl_object_identity_ancestors (object_identity_id INT UNSIGNED NOT NULL, ancestor_id INT UNSIGNED NOT NULL, INDEX IDX_825DE2993D9AB4A6 (object_identity_id), INDEX IDX_825DE299C671CEA1 (ancestor_id), PRIMARY KEY(object_identity_id, ancestor_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE acl_entries (id INT UNSIGNED AUTO_INCREMENT NOT NULL, class_id INT UNSIGNED NOT NULL, object_identity_id INT UNSIGNED DEFAULT NULL, security_identity_id INT UNSIGNED NOT NULL, field_name VARCHAR(50) DEFAULT NULL, ace_order SMALLINT UNSIGNED NOT NULL, mask INT NOT NULL, granting TINYINT(1) NOT NULL, granting_strategy VARCHAR(30) NOT NULL, audit_success TINYINT(1) NOT NULL, audit_failure TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_46C8B806EA000B103D9AB4A64DEF17BCE4289BF4 (class_id, object_identity_id, field_name, ace_order), INDEX IDX_46C8B806EA000B103D9AB4A6DF9183C9 (class_id, object_identity_id, security_identity_id), INDEX IDX_46C8B806EA000B10 (class_id), INDEX IDX_46C8B8063D9AB4A6 (object_identity_id), INDEX IDX_46C8B806DF9183C9 (security_identity_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE phpcr_namespaces (prefix VARCHAR(255) NOT NULL, uri VARCHAR(255) NOT NULL, PRIMARY KEY(prefix)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE phpcr_workspaces (name VARCHAR(255) NOT NULL, PRIMARY KEY(name)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE phpcr_nodes (id INT AUTO_INCREMENT NOT NULL, path VARCHAR(255) NOT NULL, parent VARCHAR(255) NOT NULL, local_name VARCHAR(255) NOT NULL, namespace VARCHAR(255) NOT NULL, workspace_name VARCHAR(255) NOT NULL, identifier VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, props LONGTEXT NOT NULL, depth INT NOT NULL, sort_order INT DEFAULT NULL, UNIQUE INDEX UNIQ_A4624AD7B548B0F1AC10DC4 (path, workspace_name), UNIQUE INDEX UNIQ_A4624AD7772E836A (identifier), INDEX IDX_A4624AD73D8E604F (parent), INDEX IDX_A4624AD78CDE5729 (type), INDEX IDX_A4624AD7623C14D533E16B56 (local_name, namespace), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE phpcr_internal_index_types (type VARCHAR(255) NOT NULL, node_id INT NOT NULL, PRIMARY KEY(type, node_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE phpcr_binarydata (id INT AUTO_INCREMENT NOT NULL, node_id INT NOT NULL, property_name VARCHAR(255) NOT NULL, workspace_name VARCHAR(255) NOT NULL, idx INT DEFAULT 0 NOT NULL, data LONGBLOB NOT NULL, UNIQUE INDEX UNIQ_37E65615460D9FD7413BC13C1AC10DC4E7087E10 (node_id, property_name, workspace_name, idx), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE phpcr_nodes_references (source_id INT NOT NULL, source_property_name VARCHAR(220) NOT NULL, target_id INT NOT NULL, INDEX IDX_F3BF7E1158E0B66 (target_id), PRIMARY KEY(source_id, source_property_name, target_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE phpcr_nodes_weakreferences (source_id INT NOT NULL, source_property_name VARCHAR(220) NOT NULL, target_id INT NOT NULL, INDEX IDX_F0E4F6FA158E0B66 (target_id), PRIMARY KEY(source_id, source_property_name, target_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE phpcr_type_nodes (node_type_id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, supertypes VARCHAR(255) NOT NULL, is_abstract TINYINT(1) NOT NULL, is_mixin TINYINT(1) NOT NULL, queryable TINYINT(1) NOT NULL, orderable_child_nodes TINYINT(1) NOT NULL, primary_item VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_34B0A8095E237E06 (name), PRIMARY KEY(node_type_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE phpcr_type_props (node_type_id INT NOT NULL, name VARCHAR(255) NOT NULL, protected TINYINT(1) NOT NULL, auto_created TINYINT(1) NOT NULL, mandatory TINYINT(1) NOT NULL, on_parent_version INT NOT NULL, multiple TINYINT(1) NOT NULL, fulltext_searchable TINYINT(1) NOT NULL, query_orderable TINYINT(1) NOT NULL, required_type INT NOT NULL, query_operators INT NOT NULL, default_value VARCHAR(255) DEFAULT NULL, PRIMARY KEY(node_type_id, name)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE phpcr_type_childs (node_type_id INT NOT NULL, name VARCHAR(255) NOT NULL, protected TINYINT(1) NOT NULL, auto_created TINYINT(1) NOT NULL, mandatory TINYINT(1) NOT NULL, on_parent_version INT NOT NULL, primary_types VARCHAR(255) NOT NULL, default_type VARCHAR(255) DEFAULT NULL) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("ALTER TABLE user_group ADD CONSTRAINT FK_8F02BF9DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE");
        $this->addSql("ALTER TABLE user_group ADD CONSTRAINT FK_8F02BF9DFE54D947 FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE CASCADE");
        $this->addSql("ALTER TABLE ldap_mail_alias_user ADD CONSTRAINT FK_4632904BCE024346 FOREIGN KEY (ldap_user_id) REFERENCES ldap_user (id)");
        $this->addSql("ALTER TABLE ldap_mail_alias_user ADD CONSTRAINT FK_4632904BF0DB7A2F FOREIGN KEY (ldap_mail_alias_id) REFERENCES ldap_mail_alias (id)");
        $this->addSql("ALTER TABLE ldap_user ADD CONSTRAINT FK_3888D380A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)");
        $this->addSql("ALTER TABLE ldap_group ADD CONSTRAINT FK_8FCD25D4A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)");
        $this->addSql("ALTER TABLE ldap_group ADD CONSTRAINT FK_8FCD25D4F0DB7A2F FOREIGN KEY (ldap_mail_alias_id) REFERENCES ldap_mail_alias (id)");
        $this->addSql("ALTER TABLE ldap_user_group ADD CONSTRAINT FK_358893F4CE024346 FOREIGN KEY (ldap_user_id) REFERENCES ldap_user (id)");
        $this->addSql("ALTER TABLE ldap_user_group ADD CONSTRAINT FK_358893F4E1E736B9 FOREIGN KEY (ldap_group_id) REFERENCES ldap_group (id)");
        $this->addSql("ALTER TABLE hd_category ADD CONSTRAINT FK_97192A94727ACA70 FOREIGN KEY (parent_id) REFERENCES hd_category (id)");
        $this->addSql("ALTER TABLE hd_ticket ADD CONSTRAINT FK_A6EC0C0D641EE842 FOREIGN KEY (submitted_by) REFERENCES user (id)");
        $this->addSql("ALTER TABLE hd_ticket ADD CONSTRAINT FK_A6EC0C0D89EEAF91 FOREIGN KEY (assigned_to) REFERENCES user (id)");
        $this->addSql("ALTER TABLE hd_ticket ADD CONSTRAINT FK_A6EC0C0D6BF700BD FOREIGN KEY (status_id) REFERENCES hd_status (id)");
        $this->addSql("ALTER TABLE hd_ticket ADD CONSTRAINT FK_A6EC0C0D12469DE2 FOREIGN KEY (category_id) REFERENCES hd_category (id)");
        $this->addSql("ALTER TABLE hd_ticket ADD CONSTRAINT FK_A6EC0C0DF7BFE87C FOREIGN KEY (sub_category_id) REFERENCES hd_category (id)");
        $this->addSql("ALTER TABLE hd_ticket_issue ADD CONSTRAINT FK_A0A7EE2F700047D2 FOREIGN KEY (ticket_id) REFERENCES hd_ticket (id)");
        $this->addSql("ALTER TABLE hd_ticket_issue ADD CONSTRAINT FK_A0A7EE2F641EE842 FOREIGN KEY (submitted_by) REFERENCES user (id)");
        $this->addSql("ALTER TABLE hd_status ADD CONSTRAINT FK_4A4CC4B2CD9CFB16 FOREIGN KEY (status_type_id) REFERENCES hd_status_type (id)");
        $this->addSql("ALTER TABLE hd_device ADD CONSTRAINT FK_386317204FFA550E FOREIGN KEY (device_type_id) REFERENCES hd_device_type (id)");
        $this->addSql("ALTER TABLE acl_object_identities ADD CONSTRAINT FK_9407E54977FA751A FOREIGN KEY (parent_object_identity_id) REFERENCES acl_object_identities (id)");
        $this->addSql("ALTER TABLE acl_object_identity_ancestors ADD CONSTRAINT FK_825DE2993D9AB4A6 FOREIGN KEY (object_identity_id) REFERENCES acl_object_identities (id) ON UPDATE CASCADE ON DELETE CASCADE");
        $this->addSql("ALTER TABLE acl_object_identity_ancestors ADD CONSTRAINT FK_825DE299C671CEA1 FOREIGN KEY (ancestor_id) REFERENCES acl_object_identities (id) ON UPDATE CASCADE ON DELETE CASCADE");
        $this->addSql("ALTER TABLE acl_entries ADD CONSTRAINT FK_46C8B806EA000B10 FOREIGN KEY (class_id) REFERENCES acl_classes (id) ON UPDATE CASCADE ON DELETE CASCADE");
        $this->addSql("ALTER TABLE acl_entries ADD CONSTRAINT FK_46C8B8063D9AB4A6 FOREIGN KEY (object_identity_id) REFERENCES acl_object_identities (id) ON UPDATE CASCADE ON DELETE CASCADE");
        $this->addSql("ALTER TABLE acl_entries ADD CONSTRAINT FK_46C8B806DF9183C9 FOREIGN KEY (security_identity_id) REFERENCES acl_security_identities (id) ON UPDATE CASCADE ON DELETE CASCADE");
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != "mysql", "Migration can only be executed safely on 'mysql'.");
        
        $this->addSql("ALTER TABLE user_group DROP FOREIGN KEY FK_8F02BF9DFE54D947");
        $this->addSql("ALTER TABLE user_group DROP FOREIGN KEY FK_8F02BF9DA76ED395");
        $this->addSql("ALTER TABLE ldap_user DROP FOREIGN KEY FK_3888D380A76ED395");
        $this->addSql("ALTER TABLE ldap_group DROP FOREIGN KEY FK_8FCD25D4A76ED395");
        $this->addSql("ALTER TABLE hd_ticket DROP FOREIGN KEY FK_A6EC0C0D641EE842");
        $this->addSql("ALTER TABLE hd_ticket DROP FOREIGN KEY FK_A6EC0C0D89EEAF91");
        $this->addSql("ALTER TABLE hd_ticket_issue DROP FOREIGN KEY FK_A0A7EE2F641EE842");
        $this->addSql("ALTER TABLE ldap_mail_alias_user DROP FOREIGN KEY FK_4632904BCE024346");
        $this->addSql("ALTER TABLE ldap_user_group DROP FOREIGN KEY FK_358893F4CE024346");
        $this->addSql("ALTER TABLE ldap_user_group DROP FOREIGN KEY FK_358893F4E1E736B9");
        $this->addSql("ALTER TABLE ldap_mail_alias_user DROP FOREIGN KEY FK_4632904BF0DB7A2F");
        $this->addSql("ALTER TABLE ldap_group DROP FOREIGN KEY FK_8FCD25D4F0DB7A2F");
        $this->addSql("ALTER TABLE hd_category DROP FOREIGN KEY FK_97192A94727ACA70");
        $this->addSql("ALTER TABLE hd_ticket DROP FOREIGN KEY FK_A6EC0C0D12469DE2");
        $this->addSql("ALTER TABLE hd_ticket DROP FOREIGN KEY FK_A6EC0C0DF7BFE87C");
        $this->addSql("ALTER TABLE hd_status DROP FOREIGN KEY FK_4A4CC4B2CD9CFB16");
        $this->addSql("ALTER TABLE hd_ticket_issue DROP FOREIGN KEY FK_A0A7EE2F700047D2");
        $this->addSql("ALTER TABLE hd_ticket DROP FOREIGN KEY FK_A6EC0C0D6BF700BD");
        $this->addSql("ALTER TABLE hd_device DROP FOREIGN KEY FK_386317204FFA550E");
        $this->addSql("ALTER TABLE acl_entries DROP FOREIGN KEY FK_46C8B806EA000B10");
        $this->addSql("ALTER TABLE acl_entries DROP FOREIGN KEY FK_46C8B806DF9183C9");
        $this->addSql("ALTER TABLE acl_object_identities DROP FOREIGN KEY FK_9407E54977FA751A");
        $this->addSql("ALTER TABLE acl_object_identity_ancestors DROP FOREIGN KEY FK_825DE2993D9AB4A6");
        $this->addSql("ALTER TABLE acl_object_identity_ancestors DROP FOREIGN KEY FK_825DE299C671CEA1");
        $this->addSql("ALTER TABLE acl_entries DROP FOREIGN KEY FK_46C8B8063D9AB4A6");
        $this->addSql("DROP TABLE groups");
        $this->addSql("DROP TABLE user");
        $this->addSql("DROP TABLE user_group");
        $this->addSql("DROP TABLE ldap_mail_alias_user");
        $this->addSql("DROP TABLE ldap_user");
        $this->addSql("DROP TABLE ldap_group");
        $this->addSql("DROP TABLE ldap_mail_alias");
        $this->addSql("DROP TABLE ldap_mail_account");
        $this->addSql("DROP TABLE ldap_user_group");
        $this->addSql("DROP TABLE hd_category");
        $this->addSql("DROP TABLE hd_status_type");
        $this->addSql("DROP TABLE hd_ticket");
        $this->addSql("DROP TABLE hd_ticket_issue");
        $this->addSql("DROP TABLE hd_status");
        $this->addSql("DROP TABLE hd_device");
        $this->addSql("DROP TABLE ticket_log_entry");
        $this->addSql("DROP TABLE hd_device_type");
        $this->addSql("DROP TABLE Test2");
        $this->addSql("DROP TABLE Test3");
        $this->addSql("DROP TABLE Test1");
        $this->addSql("DROP TABLE acl_classes");
        $this->addSql("DROP TABLE acl_security_identities");
        $this->addSql("DROP TABLE acl_object_identities");
        $this->addSql("DROP TABLE acl_object_identity_ancestors");
        $this->addSql("DROP TABLE acl_entries");
        $this->addSql("DROP TABLE phpcr_namespaces");
        $this->addSql("DROP TABLE phpcr_workspaces");
        $this->addSql("DROP TABLE phpcr_nodes");
        $this->addSql("DROP TABLE phpcr_internal_index_types");
        $this->addSql("DROP TABLE phpcr_binarydata");
        $this->addSql("DROP TABLE phpcr_nodes_references");
        $this->addSql("DROP TABLE phpcr_nodes_weakreferences");
        $this->addSql("DROP TABLE phpcr_type_nodes");
        $this->addSql("DROP TABLE phpcr_type_props");
        $this->addSql("DROP TABLE phpcr_type_childs");
    }
}
