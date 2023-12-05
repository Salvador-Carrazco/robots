const client = require(`./client.js`)
// create a function to create a customers table
const createCustomer =async(name) =>{
    try{
        await client.query(`
        INSERT INTO customers (name)
        VALUES ('${name}');
        `)
    }catch(error){
        console.log(error)
    }
}
module.exports = {
    createCustomer
}