const { BadRequestError } = require("../expressError");

/* returns object with setCols as the SQL syntax for updating values, and values as the new data
example:
const dataToUpdate = {
  firstName :"test",
  lastName : "testLastName",
  email : "test@email.com"
}
jsToSql = {
  firstName : "first_name",
  lastName  : "last_name",
  email : "email"
}

sqlForPartialUpdate(dataToUpdate, jsToSql) will return
{
  setCols  : '"first_name" = $1, "last_name" = $2, "email" = $3',
  values  : ["test", "testLastName", "test@email.com"]
}
*/

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
