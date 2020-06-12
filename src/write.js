const fs = require("fs");

/**
 * Writes user data to file.
 */

exports.write = function (info) {
    fs.writeFile("./users.json", info, function (e, result) {
        if (e) {
            console.log("Did not create new file", e);
            return;
        }
        console.log("Write to file");
    });
}