const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            password: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            phoneNumber: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
        }, {
            sequelize,                      // 옵션 설정
            timestamps: true,               // timestamp(created_at, updated_at)
            underscored: false,             // 디폴트 camel case를 snake case로
            modelName: 'User',              // 모델명
            tableName: 'users',             // 실제 db의 테이블명
            paranoid: true,                 // deleted_at soft delete 여부
            charset: 'utf8mb4',             // DB에 이모티콘 가능하게 설정
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Cart);
        }
    };

