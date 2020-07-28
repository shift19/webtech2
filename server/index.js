const express = require("express");
const PORT = 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const MongoClient = require('mongodb').MongoClient;

const app = express();

//configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose
    .connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Database is connected");
    })
    .catch(err => {
        console.log({database_error: err});
    });
// db configuaration ends here
//registering cors
app.use(cors());
//configure body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//configure body-parser ends here

app.use(morgan("dev")); // configure morgan

// define first route
app.get("/", (req, res) => {
    console.log("/");
});

try {
    MongoClient.connect(config.database, function (err, db) {
        let dbo = db.db("database");

        dbo.createCollection("users", function (err, res) {
            console.log("Collection created!");
        });

        dbo.collection("users").updateOne(
            {
                "name": "admin"
            },
            {
                "$set": {
                    "name": "admin",
                    "email": "admin@admin",
                    "password": "$2b$08$yq33ovAO4EdmpyvofFysN.Fw5Wbd/GuLhIZ0ACQeRq38sPuE.gtqi"
                }
            },
            {
                "upsert": true
            }).then(r => {
            console.log(r.result)
        })

        db.close();
    });

} catch (e) {
    console.log(e)
}

const userRoutes = require("./api/user/route/user");
app.use("/user", userRoutes);
const seriesRouter = require('./api/serie/route/series')
app.use('/series', seriesRouter)

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});
