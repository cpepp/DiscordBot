const CryptoJS = require("crypto-js");
const dateformat = require("dateformat");
const fetch = require("node-fetch");
const fs = require("fs");

const url = "http://api.smitegame.com/smiteapi.svc/";
const config = require("./../config.json");
const devID = config.devID;
const auth = config.auth;
const langCode = "1"; //English language code

/**
 * Used to create new sessions for the SMITE API.
 */
exports.session = function() {
    var timestamp = dateformat(new Date(), "UTC:yyyymmddHHMMss"); //UTC timestamp
    var sign = devID + "createsession" + auth + timestamp; //String to be hashed
    var signature = CryptoJS.MD5(sign); //MD5 Hash for signature
    const req = url + "createsessionJson/" + devID + "/" + signature.toString() + "/" + timestamp; //request URL

    console.log("Creating SMITE API session...");

    fetch(req)
    .then(response => response.json())
    .then(result => fs.writeFile("./../session.json", JSON.stringify(result), function(e, result) {
        if(e) {
            console.log("Session data not written.");
        }
    }
    ));
}

/**
 * Gets url to request God data.
 * 
 * @param {String} sessID sessionID from the session function.
 * @return {String} url
 */
exports.loadgods = function(sessID) {
    var timestamp = dateformat(new Date(), "UTC:yyyymmddHHMMss"); //UTC timestamp
    var sign = devID + "getgods" + auth + timestamp; //String to be hashed
    var signature = CryptoJS.MD5(sign); //MD5 Hash for signature
    const req = url + "getgodsJson/" + devID + "/" + signature.toString() + "/" + sessID + "/" + timestamp + "/" + langCode; //request URL

    return req;
}