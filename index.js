const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3030;

app.use(bodyParser.json())
app.use(express.static('public'));

const createId = () => Math.random().toString(36).slice(2);

const DEFAULT_DATA = [
    {id: createId(), first_name: 'John', last_name: 'Mason', email: 'test@example.com'},
    {id: createId(), first_name: 'Mary', last_name: 'John', email: 'mason@example.ru'},
];

const storageFile = path.join(__dirname, '/storage/data.json'); 

const users = fs.existsSync(storageFile) ? 
    JSON.parse(
        fs.readFileSync(storageFile)
    ) : 
    DEFAULT_DATA;


app.get('/users', (req, res) => {
  res.send(users);
});

app.post('/users/add', (req, res) => {
    const user = req.body;
    const id = createId();

    users.push({
        id,
        ...user
    });

    fs.writeFileSync(storageFile, JSON.stringify(users));

    res.send({
        succes: true,
        message: 'User added!'
    })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});