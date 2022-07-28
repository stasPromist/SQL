const PORT = process.env.PORT || 3200;
const express = require("express");
const app = express();
const Joi = require('joi');
const sql = require('./modules/connectToSql');
const path = require("path");
const bodyParser = require('body-parser');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));
const views = path.join(__dirname, './views');
app.set('views', views);

app.get("/users", (req, res) => {
    sql.query('SELECT * FROM Persons', function (error, results) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.render('users', { userArr: results });
    });
});

app.get("/form", (req, res) => {
    console.log(req.body);
    res.render("form");
});

// app.post("/form", (req, res) => {
//     console.log(req.query);
//     res.render("form");
// });
const contactSchema = Joi.object({
    name: Joi.string().required().min(2).max(70),
    email: Joi.string().required().email(),
    phone: Joi.number().integer().min(9),
    submit: Joi.string()

});

app.post("/form", (req, res) => {
    console.log(req.body);
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
        res.send(error);
    }
    else {
        sql.query(`INSERT INTO Persons VALUES (NULL, '${req.body.name}', '${req.body.email}', '${req.body.phone}');`,
            function (error, results, fields) {
                if (error) throw error;
                console.log(results);
                console.log(fields);
            });
        res.redirect(303, "form");

    }

});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
})





