const express = require('express');
const app = express();
const mongoose = require('mongoose');
const body_parser = require('body-parser');

app.use(express.json());

const router = require('./router/router');
const notes = require('./router/notes');

//routes
app.use("/users", router);
app.use("/notes", notes);

//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen("3000", (err) => {
    console.log("App is at port 3000");
})

mongoose.connect("mongodb://localhost:27017/Persondetails", (err) => {
    if (err) {
        console.log("DB not connected");
    }
    else {
        console.log("DB connected");
    }
})