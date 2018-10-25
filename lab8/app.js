const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const palindrome = require('./palindrome');
const port = 3000;
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.post('/result', (req, res) => {
    palindrome.checkPalindrome(req.body)
        .then((isPalindrome) => {
            res.render('layouts/result', { 'text-to-test': req.body['text-to-test'], 'isPalindrome': isPalindrome })
        })
        .catch((err) => {
            res.status(400).render('layouts/error', { 'err': err })
        });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});