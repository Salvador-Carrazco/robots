const client = require('./client');
const { createCustomer } = require('./customers.js');
const { createRobot } = require('./robots.js');
const { createTask } = require('./tasks.js');
const { createCustomersRobots } = require('./customer_robots.js');
const { createRobotsTasks } = require('./robots_tasks.js');
//create drop tables function


const  dropTables = async () => {
    //try catch for drop tables
        try{
            await client.query(`
            DROP TABLE IF EXISTS customers CASCADE;
            DROP TABLE IF EXISTS robots CASCADE;
            DROP TABLE IF EXISTS tasks CASCADE;
            DROP TABLE IF EXISTS customers_robots CASCADE;
            DROP TABLE IF EXISTS robots_tasks CASCADE;
            `)
        }catch (error){
            console.log( `Error dropping tables`,error);
        }
};


// create create tables function
const createTables = async () =>{
    //try catch for create tables
    try{
        await client.query(`
        CREATE TABLE customers(
            customers_id SERIAL PRIMARY KEY,
            name VARCHAR(30) NOT NULL
        );
        CREATE TABLE robots(
            robots_id SERIAL PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            type VARCHAR(30) NOT NULL,
            kid_safe BOOLEAN NOT NULL,
            customers_id INTEGER REFERENCES customers(customers_id) 
        );
        CREATE TABLE tasks(
            tasks_id SERIAL PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            robots_id INTEGER REFERENCES robots(robots_id)
        );
        CREATE TABLE robots_tasks(
            robots_id INTEGER REFERENCES robots(robots_id),
            tasks_id INTEGER REFERENCES tasks(tasks_id),
            PRIMARY KEY (robots_id, tasks_id)
        );
        CREATE TABLE customers_robots(    
            customers_id INTEGER REFERENCES customers(customers_id),
            robots_id INTEGER REFERENCES robots(robots_id),
         PRIMARY KEY (customers_id, robots_id)
        );
        `)

        }catch (error){
            console.log(`Error creating tables`, error);
    }
}


// create sync and seed function
const syncAndSeed = async () => {
    //try catch for sync seed
    try{
         //connect to database
        await client.connect();
        console.log(`database is connected`);
        
        //drop tables
        await dropTables();
        console.log(`tabels are dropped`);
        
        //create tables
        await createTables();
        console.log(`tables are created`);
        //create customers
        await createCustomer('moe');
        await createCustomer('larry');
        await createCustomer('curly');
        console.log(`customers are created`);
        
        //create robots
        await createRobot('c3po', 'lucas arts', true, 1);
        await createRobot('r2d2', 'lucas arts', true, 2);
        await createRobot('bb8', 'lucas arts', true, 3);
        await createRobot('ig88', 'lucas arts', false, 1);
        console.log(`robots are created`);
        
        //create tasks
        await createTask('cleaning', 1);
        await createTask('cooking', 2);
        await createTask('gardening', 3);
        await createTask('washing', 4);
        console.log(`tasks are created`);
       
        //create customer_robots
        await createCustomersRobots(1,1);
        await createCustomersRobots(1,2);
        await createCustomersRobots(1,3);
        await createCustomersRobots(2,2);
        await createCustomersRobots(2,3);   
        await createCustomersRobots(2,4);
        await createCustomersRobots(3,1);
        await createCustomersRobots(3,2);
        await createCustomersRobots(3,4);
        console.log(`customers_robots are created`);
        //create robots_tasks
        await createRobotsTasks(1,1);
        await createRobotsTasks(1,2);
        await createRobotsTasks(2,3);
        await createRobotsTasks(2,2);
        await createRobotsTasks(3,1);
        await createRobotsTasks(3,2);
        await createRobotsTasks(4,3);
        await createRobotsTasks(4,4);
        console.log(`robots_tasks are created`);

        client.end();
    }catch (error){
        console.log(`sync and seed error`, error);
    }   
}

syncAndSeed();