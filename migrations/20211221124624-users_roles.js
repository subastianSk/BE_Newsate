'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('users_roles', {
      adminId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
    // Order belongsTo Customer
    return queryInterface.addColumn(
      'users_roles', //Nama Tabel Tujuan yang mau di tambahkan
      'roleId', //Nama Kolom yang mau ditambahkan
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id'
        },
        allowNull: false,
        foreignKey: true
      })
  },

  down: (queryInterface, Sequelize) => {
    // remove Order belongsTo Customer
    return queryInterface.removeColumn(
      'roles', // name of Source model
      'users_roles' // key we want to remove
    )
  }
};