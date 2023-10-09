const express   = require('express');
const mysql  = require('mysql2');
const cors      = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: ''
});

app.post('/createTask', (req,res)=>{
        const task = req.body.task;

        db.query('INSERT into tasks (task) VALUES (?)', [task], (err,result)=>{
            if(err){
                console.log(err)
                res.status(500).send(err)
            }else{
                console.log("added")
                res.send('Tasks added successfully!')
            }
        });
    });

app.get('/getTasks', (req,res)=>{
    db.query("SELECT * FROM tasks", (err,results)=>{
        if(err){
            console.log(err)
            res.status(500).send(err)
        }else{
            console.log(results)
            res.json(results)
        }
    });
});

app.put('/editTask', (req,res)=> {
    const id    = req.body.id
    const task  = req.body.task

    db.query("UPDATE tasks SET task = ? WHERE id = ?", [task, id],
    (err,results)=>{
        if(err){
            console.log(err)
            res.status(500).send(err)
        }else{
            console.log("Edited...")
        }
    });
});

app.delete('/delete/:id', (req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM tasks WHERE id = ?", id, (err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send(err)
        }else{
            console.log(result)
        }
    });
});

app.listen(3001, ()=> {
    console.log("Server Started")
});