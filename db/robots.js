const client = require('./client.js')
// create a function to create a robots table
const createRobot = async(name,type,kid_safe, customers_id) =>{
    try{
        await client.query(`
        INSERT INTO robots (name, type, kid_safe, customers_id)
        VALUES ('${name}', '${type}', '${kid_safe}', '${customers_id}');
        

        `)
    }catch(error){
        console.log(error)
    }
}
module.exports = {
    createRobot
}