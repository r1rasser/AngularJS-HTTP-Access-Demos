let cfg = require('./config.json')
let express = require('express');
let cors = require('cors')
const app = express();
app.use(express.static('public')); // host public folder
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *
const db = require("./db");


let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

const heroesRoute = require('./routes/heroes');

app.use("/heroes", heroesRoute);

app.use("/", (req, res) => {
    res.status(200);
    res.send("Welcome to 'Tour Of Heroes' server 1.0 - you passed the parameter " + req.params.param);
});

db.initDb.then(() => {
    app.listen(cfg.server.port, () => {
        console.log("Listening on port " + cfg.server.port + "...");
    });
}, () => {console.log("Failed to connect to DB!")});
