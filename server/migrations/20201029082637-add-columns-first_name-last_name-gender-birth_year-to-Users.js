'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const addFirstName = await queryInterface.addColumn('Users', 'first_name', Sequelize.STRING);
    const addLastName = await queryInterface.addColumn('Users', 'last_name', Sequelize.STRING);
    const addGender = await queryInterface.addColumn('Users', 'gender', Sequelize.STRING);
    const addBirthYear = await queryInterface.addColumn('Users', 'birth_year', Sequelize.INTEGER);

    return Promise.all([addFirstName, addLastName, addGender, addBirthYear]);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    const removeFirstName = await queryInterface.removeColumn('Users', 'first_name');
    const removeLastName = await queryInterface.removeColumn('Users', 'last_name');
    const removeGender = await queryInterface.removeColumn('Users', 'gender');
    const removeBirthYear = await queryInterface.removeColumn('Users', 'birth_year');

    return Promise.all([removeFirstName, removeLastName, removeGender, removeBirthYear]);

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
