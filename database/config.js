const {connect} = require('mongoose');

const dbConnection = async() => {
   try {
       
     await connect(process.env.DB_CNN, {
           useNewUrlParser: true, 
           useUnifiedTopology: true ,
           useCreateIndex: true 
        });
     console.log("Db online!!!");
   } catch (error) {
       console.log(error);
       throw new Error("Error al inicializar la base de datos");
   }
}

module.exports = { dbConnection }