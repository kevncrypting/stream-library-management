const request = require("supertest"); // enables use of supertest
const app = require("../app"); // creating an instance of the app
const db = require('../db') // allows for use of knex

describe("The /books endpoint", () => {
    describe("for GET requests", () => {

        // SETUP: first part of the SEAT acronym, occurs before every test
        beforeEach(async () => { // important to set this up as async/await
            await db('books').insert([ // inserts the following array of books into the 'books' table
                {title: "JavaScript Design Patterns", author: "Addy Osmani"},
                {title: "The Things They Carry", author: "Unknown"}
            ])
        })

        // TEARDOWN: last part of the SEAT acronym, occurs after every test
        afterEach(async () => {
            await db('books').del() // drops the 'books' table
        })

        test("responds with a list of books", async () =>{
            // SETUP & EXECUTE
            const response = await request(app).get('/books'); // a GET request is sent to /books, and the response is stored in this created variable called 'response'

            // ASSERT
            expect(response.statusCode).toBe(200) // checking for successful status code
            expect(response.body).toHaveLength(2) // checking if the response.body has 2 items in the array
            expect(Array.isArray(response.body)).toBeTruthy() // checking if the response.body is of type array
            expect(response.body[0]).toHaveProperty('title') // checking first item in the array for 'title' property
            expect(response.body[0]).toHaveProperty('author') // checking first item in the array for 'author' property
        })
    });
});