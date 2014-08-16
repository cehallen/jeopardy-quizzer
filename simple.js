var fs = require('fs');
var file = "../JeopardyDatabase/jeopardy.db";
var exists =  fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

var query = process.argv.slice(2, process.argv.length).join(" ");
var sqlQuery = "SELECT * FROM clue WHERE text LIKE '% " + query + " %' ORDER BY RANDOM() LIMIT 1"; 

// console.log(query);
// console.log(sqlQuery);

db.serialize(function() {
  db.each(sqlQuery, function(err, row) {
      if (err) {
        console.log(err);
      } else { 
        console.log("The query is: " + query);
        console.log("________")
        console.log(row);
        console.log("________");
        console.log(row.answer);
      }
  });
});

db.close();

