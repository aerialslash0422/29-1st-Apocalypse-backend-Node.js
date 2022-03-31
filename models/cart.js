const Sequelize = require('sequelize');

module.exports = class Cart extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            quantity: {
                type: Sequelize.INTEGER(50),
                allowNull: false,
            },
        }, {
            sequelize,                      // 옵션 설정
            timestamps: true,               // timestamp(created_at, updated_at)
            underscored: false,             // 디폴트 camel case를 snake case로
            modelName: 'Cart',              // 모델명
            tableName: 'carts',             // 실제 db의 테이블명
            paranoid: true,                 // deleted_at soft delete 여부
            charset: 'utf8mb4',             // DB에 이모티콘 가능하게 설정
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Cart.belongsTo(db.User);
        db.Cart.belongsTo(db.Product);
        }
    };
