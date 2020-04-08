const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://newparts:genova22@reacttemp-uxlne.gcp.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true }).then(() => console.log('DC connected'))
    .catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Hello')
});

app.listen(5013);