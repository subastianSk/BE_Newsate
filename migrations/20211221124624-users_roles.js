'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users_roles', {
      admin_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }
    }).then(() => queryInterface.addConstraint('roles', ['rolesId'], {
      type: 'FOREIGN KEY',
      name: 'FK_rolesId_roles',
      references: {
        table: 'users_roles',
        field: 'id',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }))
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users_roles');
  }
};