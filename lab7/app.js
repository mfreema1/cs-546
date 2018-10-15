const express = require('express');
const app = express();
const port = 3000;

app.get('/recipes', (req, res) => {
    
});

app.get('/recipes/:id', (req, res) => {
    
});

app.post('/recipes', (req, res) => {

});

app.put('/recipes/:id', (req, res) => {

});

app.patch('/recipes/:id', (req, res) => {

});

app.delete('/recipes/:id', (req, res) => {

});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});