const { BadRequestError } = require("../expressError")
const {sqlForPartialUpdate} = require("./sql")

const dataToUpdate = {
    firstName :"test",
    lastName : "testLastName",
    email : "test@email.com"
  }

const jsToSql = {
    firstName : "first_name",
    lastName  : "last_name",
    email : "email"
}

describe("works => returns correct setCols and values", function(){
    test("Returns setCols based on jsToSql column names", function(){
        const results = sqlForPartialUpdate(dataToUpdate, jsToSql)
        expect(results).toEqual({
            setCols : '"first_name"=$1, "last_name"=$2, "email"=$3',
            values : ["test", "testLastName", "test@email.com"]
        })
    })
    test("Returns default setCols if jsToSql is blank", function(){
        const results = sqlForPartialUpdate(dataToUpdate, {})
        expect(results).toEqual({
            setCols : '"firstName"=$1, "lastName"=$2, "email"=$3',
            values : ["test", "testLastName", "test@email.com"]
        })
    })
})

describe("throws error with invalid input", function(){
    test("throws error when dataToUpdate is blank", function(){
        function results (){
            sqlForPartialUpdate({}, jsToSql)
        }
        expect(results).toThrow(BadRequestError)
    })
})