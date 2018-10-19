const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const recipe = require('./recipe');
const port = 3000;
app.use(bodyParser.json()); //this is a json household


app.get('/recipes', (req, res) => {
    recipe.getAllRecipes().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(404).send({message: err});
    });
});

app.get('/recipes/:id', (req, res) => {
    recipe.getRecipe(req.params.id).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(404).send({message: err});
    });
});

app.post('/recipes', (req, res) => {
    recipe.createRecipe(req.body).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({message: err});
    });
});

app.put('/recipes/:id', (req, res) => {
    recipe.updateRecipe(req.params.id, req.body).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({message: err});
    });
});

app.patch('/recipes/:id', (req, res) => {
    recipe.patchRecipe(req.params.id, req.body).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({message: err});
    });
});

app.delete('/recipes/:id', (req, res) => {
    recipe.deleteRecipe(req.params.id).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({message: err});
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});