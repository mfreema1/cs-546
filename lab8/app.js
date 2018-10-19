const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const palindrome = require('./palindrome');
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true })); //this is a json household

app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.post('/result', (req, res) => {
    console.log(palindrome.isPalindrome(req.body));
    //res.sendFile(path.join(__dirname, 'public', 'result.html'))
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});