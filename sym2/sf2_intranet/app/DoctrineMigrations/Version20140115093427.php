<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20140115093427 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != "mysql", "Migration can only be executed safely on 'mysql'.");
        
        $this->addSql("CREATE TABLE banner (id INT AUTO_INCREMENT NOT NULL, department_id INT DEFAULT NULL, name VARCHAR(200) NOT NULL, link VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_6F9DB8E7AE80F5DF (department_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("CREATE TABLE department (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(200) NOT NULL, created_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB");
        $this->addSql("ALTER TABLE banner ADD CONSTRAINT FK_6F9DB8E7AE80F5DF FOREIGN KEY (department_id) REFERENCES department (id)");
        $this->addSql("ALTER TABLE ldap_mail_alias_user ADD subscribe INT DEFAULT NULL");
        $this->addSql("ALTER TABLE ldap_user ADD department_id INT DEFAULT NULL, ADD mobile VARCHAR(15) DEFAULT NULL");
        $this->addSql("ALTER TABLE ldap_user ADD CONSTRAINT FK_3888D380AE80F5DF FOREIGN KEY (department_id) REFERENCES department (id)");
        $this->addSql("CREATE UNIQUE INDEX UNIQ_3888D380AE80F5DF ON ldap_user (department_id)");
        $this->addSql("ALTER TABLE ldap_group ADD user_id INT DEFAULT NULL, ADD ldap_mail_alias_id INT DEFAULT NULL, ADD mail_alias VARCHAR(50) NOT NULL");
        $this->addSql("ALTER TABLE ldap_group ADD CONSTRAINT FK_8FCD25D4A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)");
        $this->addSql("ALTER TABLE ldap_group ADD CONSTRAINT FK_8FCD25D4F0DB7A2F FOREIGN KEY (ldap_mail_alias_id) REFERENCES ldap_mail_alias (id)");
        $this->addSql("CREATE INDEX IDX_8FCD25D4A76ED395 ON ldap_group (user_id)");
        $this->addSql("CREATE UNIQUE INDEX UNIQ_8FCD25D4F0DB7A2F ON ldap_group (ldap_mail_alias_id)");
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != "mysql", "Migration can only be executed safely on 'mysql'.");
        
        $this->addSql("ALTER TABLE ldap_user DROP FOREIGN KEY FK_3888D380AE80F5DF");
        $this->addSql("ALTER TABLE banner DROP FOREIGN KEY FK_6F9DB8E7AE80F5DF");
        $this->addSql("DROP TABLE banner");
        $this->addSql("DROP TABLE department");
        $this->addSql("ALTER TABLE ldap_group DROP FOREIGN KEY FK_8FCD25D4A76ED395");
        $this->addSql("ALTER TABLE ldap_group DROP FOREIGN KEY FK_8FCD25D4F0DB7A2F");
        $this->addSql("DROP INDEX IDX_8FCD25D4A76ED395 ON ldap_group");
        $this->addSql("DROP INDEX UNIQ_8FCD25D4F0DB7A2F ON ldap_group");
        $this->addSql("ALTER TABLE ldap_group DROP user_id, DROP ldap_mail_alias_id, DROP mail_alias");
        $this->addSql("ALTER TABLE ldap_mail_alias_user DROP subscribe");
        $this->addSql("DROP INDEX UNIQ_3888D380AE80F5DF ON ldap_user");
        $this->addSql("ALTER TABLE ldap_user DROP department_id, DROP mobile");
    }
}
