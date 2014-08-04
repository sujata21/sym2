<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20140107121811 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != "mysql", "Migration can only be executed safely on 'mysql'.");
        
        $this->addSql("ALTER TABLE ldap_user ADD user_id INT DEFAULT NULL");
        $this->addSql("ALTER TABLE ldap_user ADD CONSTRAINT FK_3888D380A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)");
        $this->addSql("CREATE UNIQUE INDEX UNIQ_3888D380A76ED395 ON ldap_user (user_id)");
        $this->addSql("ALTER TABLE ldap_mail_alias CHANGE created_at created_at DATETIME DEFAULT NULL, CHANGE deleted deleted INT DEFAULT NULL");
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != "mysql", "Migration can only be executed safely on 'mysql'.");
        
        $this->addSql("ALTER TABLE ldap_mail_alias CHANGE created_at created_at DATETIME NOT NULL, CHANGE deleted deleted INT NOT NULL");
        $this->addSql("ALTER TABLE ldap_user DROP FOREIGN KEY FK_3888D380A76ED395");
        $this->addSql("DROP INDEX UNIQ_3888D380A76ED395 ON ldap_user");
        $this->addSql("ALTER TABLE ldap_user DROP user_id");
    }
}
