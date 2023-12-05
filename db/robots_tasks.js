const client = require ('./client.js')
// create a function to join tables robots and tasks

const createRobotsTasks = async(robots_id, tasks_id) =>{
    try{
        await client.query(`
        INSERT INTO robots_tasks (robots_id)
        VALUES ('${robots_id}');
        (tasks_id) VALUES ('${tasks_id}');
        `)
    }catch(error){
        console.log(error)
    }
}
module.exports={
    createRobotsTasks
}   