const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

const app = express();
const port = 8000;
const db = massive.connectSync({
    connectionString: 'postgres://startrekapi:makeitso@localhost/startrekapi',
});
app.set('db', db);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
module.exports = app;


const restCtrl = require('./controllers/restCtrl');
app.get('/api/people', restCtrl.readList);
app.post('/api/people', restCtrl.create);


app.listen(port, () => console.log(`listening on port ${port}`));


// post from frontend
// make http request from this server
