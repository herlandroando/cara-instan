
const fs = require("fs");

var date = Date.now();
fs.writeFile('./public/last-build', date, function (err) {
    if (err) throw err;
    console.log("Latest build date file was added");
})