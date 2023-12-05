const client = require('./client.js');
// create a function to join tables robots and customers

const createCustomersRobots = async(customers_id, robots_id) =>{
    try{
        await client.query(`
        INSERT INTO customers_robots (customers_id)
        VALUES ('${customers_id}');
        (robots_id) VALUES ('${robots_id}');
        `)
    }catch(error){
        console.log(error)
    }
}
module.exports={
    createCustomersRobots
}
