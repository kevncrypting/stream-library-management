const express = require("express");
const router = express.Router();
const knex = require("../db");

router.get("/", (req, res, next) => {
    knex("books") // knex is a query builder, syntax similar to writing a SQL query directly
        .select("*") 
        .then((books) => res.json(books))
        .catch((err) => next(err)); // catches error and passes onwards
});

module.exports = router;
