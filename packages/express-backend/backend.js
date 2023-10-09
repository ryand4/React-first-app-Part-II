import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 };

app.use(cors());
app.use(express.json());

const findUserByName = (name) => {
    return users['users_list'].filter( (user) => user['name'] === name);
};

const findUserById = (id) => 
    users['users_list'].find( (user) => user['id'] === id);

const findAllUserByNameAndJob = (name, job) => 
    users['users_list'].find ( 
        (user) => {
            if (user['name'] === name && user['job'] == job)
                return user;
        }
    );

app.get('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
})

app.get('/users', (req, res) => {
    const job = req.query.job;
    const name = req.query.name;
    if (name != undefined && job != undefined){
        let result = findAllUserByNameAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    } else if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    } else {
        res.send(users);
    }
});

const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}


app.get('/', (req, res) => {
    res.send('Hello World!');
});

function generateID() {
    const random = Math.random().toString();
    const id = random.substring(2);
    return id;
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    const newID = generateID();
    userToAdd.id = newID;
    addUser(userToAdd);
    res.status(201).send(userToAdd);
})

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
       let ind = users['users_list'].indexOf(result);
       result = {users_list : users['users_list'].splice(ind, 1)};
       res.status(204).send(result);
    }
})

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});