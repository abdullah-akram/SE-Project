
alert("Name Cannot be empty!");
console.log('Yo listening to 3000 from htmlllll');
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

var mysql = require('mysql');
// import * as mysql from 'mysql';
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "mydb"
});

con.query('select * from sellers', function(err, result, fields) {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
})


//  import  {mysql} from 'mysql';

console.log('Yo listening to 3000 from htmlllll');
