import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1562987272492 implements MigrationInterface {
  // tslint:disable-next-line: no-any
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `permission` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `email` varchar(255) NOT NULL, `password` varchar(255) NULL, `status` tinyint NOT NULL, `emailStatus` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'CREATE TABLE `roles_permission_permission` (`rolesId` int NOT NULL, `permissionId` int NOT NULL, INDEX `IDX_5633105c717323b1b31d36fd56` (`rolesId`), INDEX `IDX_27fcec6fe40044fe3d2e208fea` (`permissionId`), PRIMARY KEY (`rolesId`, `permissionId`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'CREATE TABLE `roles_user_user` (`rolesId` int NOT NULL, `userId` int NOT NULL, INDEX `IDX_894317781db6f714b16a82c5dc` (`rolesId`), INDEX `IDX_2f5f1c036feb52c9570583bc01` (`userId`), PRIMARY KEY (`rolesId`, `userId`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'ALTER TABLE `roles_permission_permission` ADD CONSTRAINT `FK_5633105c717323b1b31d36fd56d` FOREIGN KEY (`rolesId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE `roles_permission_permission` ADD CONSTRAINT `FK_27fcec6fe40044fe3d2e208feab` FOREIGN KEY (`permissionId`) REFERENCES `permission`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE `roles_user_user` ADD CONSTRAINT `FK_894317781db6f714b16a82c5dcb` FOREIGN KEY (`rolesId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE `roles_user_user` ADD CONSTRAINT `FK_2f5f1c036feb52c9570583bc01b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION'
    );
  }

  // tslint:disable-next-line: no-any
  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `roles_user_user` DROP FOREIGN KEY `FK_2f5f1c036feb52c9570583bc01b`'
    );
    await queryRunner.query(
      'ALTER TABLE `roles_user_user` DROP FOREIGN KEY `FK_894317781db6f714b16a82c5dcb`'
    );
    await queryRunner.query(
      'ALTER TABLE `roles_permission_permission` DROP FOREIGN KEY `FK_27fcec6fe40044fe3d2e208feab`'
    );
    await queryRunner.query(
      'ALTER TABLE `roles_permission_permission` DROP FOREIGN KEY `FK_5633105c717323b1b31d36fd56d`'
    );
    await queryRunner.query(
      'DROP INDEX `IDX_2f5f1c036feb52c9570583bc01` ON `roles_user_user`'
    );
    await queryRunner.query(
      'DROP INDEX `IDX_894317781db6f714b16a82c5dc` ON `roles_user_user`'
    );
    await queryRunner.query('DROP TABLE `roles_user_user`');
    await queryRunner.query(
      'DROP INDEX `IDX_27fcec6fe40044fe3d2e208fea` ON `roles_permission_permission`'
    );
    await queryRunner.query(
      'DROP INDEX `IDX_5633105c717323b1b31d36fd56` ON `roles_permission_permission`'
    );
    await queryRunner.query('DROP TABLE `roles_permission_permission`');
    await queryRunner.query('DROP TABLE `roles`');
    await queryRunner.query('DROP TABLE `user`');
    await queryRunner.query('DROP TABLE `permission`');
  }
}
