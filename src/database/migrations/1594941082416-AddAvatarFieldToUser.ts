import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAvatarFieldToUser1594941082416
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar');
    }
}

// yarn typeorm migration:create -n AddAvatarFieldToUser
// Alterar para export default class
// Importante comentar, a tabela usuário já existe, e como estamos mexendo nela e adicionando um campo que não tinha antes, assim os usuários que estavam antes na tabela users eles não vão possui nada no campo 'avatar' quando ele for criado, então caso ele tenha que ser obrigatório então teriámos que fazer uma lógica que aplicasse valor nele aos que não tivessem nada
