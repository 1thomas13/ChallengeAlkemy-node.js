import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('alkemy-node', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
})

;(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
  
})();


export default sequelize 