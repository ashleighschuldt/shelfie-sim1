const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');

require('dotenv').config();



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static( './client/build'));

massive(process.env.CONNECTION_STRING)
    .then((dbInstance) => {
        app.set('db',dbInstance)
    })


app.get('/api/bin/:letter/:num', (req, res) => {
    const db = app.get('db');

    db.inventory.findOne({shelf: req.params.letter.toUpperCase(), bin: req.params.num})
    .then(inventory =>
    res.send(inventory));
})

app.get('/api/bin/:letter', (req, res) => {
    const db = app.get('db');

    db.inventory.find({shelf: req.params.letter.toUpperCase()})
    .then(inventory =>
    res.send(inventory));
})

app.post('/api/bin/:id', (req, res) => {
    const db = app.get('db');
    const newName = req.body.name;
    const newPrice = req.body.price;
    
    db.inventory.update({id: req.params.id, name: newName, price: newPrice})
        .then( inventory => {
            res.send(inventory);
        })
        .catch((error) => res.sendStatus(500));
})

app.delete('/api/bin/:letter/:num', (req, res) => {
    const db = app.get('db');
    
    db.inventory.update({ id: req.query.id, name: '', price: ''})
        .then(inventory => 
                res.send(inventory)
            
        )

});

app.put('/api/bin/:id', (req, res) => {
    const db = app.get('db');
    

    db.inventory.update({id: req.params.id, name: req.body.name, price: req.body.price})
        .then(inventory => {
            res.send(inventory)
        })
})


const port = process.env.PORT || 8080;
app.listen(port, ()=>{console.log(`Listening on port ${port}`)});