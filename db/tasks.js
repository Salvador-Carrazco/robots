const client = require('./client.js');
// creat fucntion to create a tasks table

const createTask = async(name, robots_id) =>{
    try{
        await client.query(`
        INSERT INTO tasks (name, robots_id)
        VALUES ('${name}', '${robots_id}')
       
        `)
    }catch(error){
        console.log(error)
    }
}
module.exports={
    createTask
}