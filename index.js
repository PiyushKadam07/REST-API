const express = require('express');
const app = express();
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const config = require('./config/config');

app.use(express.json());

//routes middleware
const router = require('./router/router');
app.use("/users", router);

const notes = require('./router/notes');
app.use("/notes", notes);

//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen("3000", (err) => {
    console.log("App is at port 3000");
})

mongoose.connect(config.mongoUrl, (err) => {
    if (err) {
        console.log("DB not connected");
    }
    else {
        console.log("DB connected");
    }
})