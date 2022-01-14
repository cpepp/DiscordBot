const CryptoJS = require("crypto-js");
const dateformat = require("dateformat");
const fetch = require("node-fetch");
const fs = require("fs");

const config = require("./../config.json");
const sessionInfo = require("./../session.json");

const url = "https://api.smitegame.com/smiteapi.svc/";
const devID = config.devID;
const auth = config.auth;
const langCode = "1"; //English language code
const millOffset = new Date().getTimezoneOffset() * 60000; //offset of local timezone from UTC

/**
 * Used to create new sessions for the SMITE API.
 */
exports.createSession = async function () {
    let timestamp = dateformat(new Date(), "UTC:yyyymmddHHMMss"); //UTC timestamp
    let sign = devID + "createsession" + auth + timestamp; //String to be hashed
    let signature = CryptoJS.MD5(sign); //MD5 Hash for signature
    const req = url + "createsessionJson/" + devID + "/" + signature.toString() + "/" + timestamp; //request URL

    console.log("Creating SMITE API session...");

    await fetch(req)
        .then(response => response.json())
        .then(result => fs.writeFile("./session.json", JSON.stringify(result), function (e, result) {
            //writes result to file, logs session id and timestamp session was created.
            console.log("Session call result written to file.");
            if (e) {
                console.log("Session data not written.");
            }
        }
        ));
}

/**
 * 
 * @return {boolean} True if session is expired
 */
exports.checkSession = async function () {
    let time = (Date.parse(sessionInfo.timestamp) - millOffset); //gets timestamp from session
    //since it's converted as if it were local, we have to subtract the offset to get the actual UTC time
    let diff = Date.now() - time; //finds time diff between now and when last session was made
    console.log("Min since last session: " + (diff / 60000).toFixed(2));
    let sess = false;
    if (diff > 900000) { //since sessions are only 15 min, if the diff is greater a new session is created
        sess = true;
    }

    return new Promise((resolve, reject) => {
        resolve(sess);
    });
}

/**
 * Gets God data.
 * 
 * @param {String} sessID sessionID from the session function.
 * @return {JSON} getgods request data
 */
exports.loadgods = async function (sessID) {
    let timestamp = dateformat(new Date(), "UTC:yyyymmddHHMMss"); //UTC timestamp
    let sign = devID + "getgods" + auth + timestamp; //String to be hashed
    let signature = CryptoJS.MD5(sign); //MD5 Hash for signature
    const req = url + "getgodsJson/" + devID + "/" + signature.toString() + "/" + sessID + "/" + timestamp + "/" + langCode; //request URL

    let getGodsJson;
    console.log("Loading SMITE God data...");
    try {
        let getGodsData = await fetch(req);
        getGodsJson = await getGodsData.json();
    } catch (error) {
        console.log(error);
    }

    return new Promise((resolve, reject) => {
        resolve(getGodsJson);
    });
}

/**
 * Gets God data.
 * 
 * @param {String} sessID sessionID from the session function.
 * @return {JSON} getgods request data
 */
exports.getInformation = async function (sessID, playerName) {
    let timestamp = dateformat(new Date(), "UTC:yyyymmddHHMMss"); //UTC timestamp
    let sign = devID + "getmatchhistory" + auth + timestamp; //String to be hashed
    let signature = CryptoJS.MD5(sign); //MD5 Hash for signature
    const req = url + "getmatchhistoryJson/" + devID + "/" + signature.toString() + "/" + sessID + "/" + timestamp + "/" + playerName; //request URL

    let getGodsJson;
    console.log("Getting player info...");
    try {
        let getGodsData = await fetch(req);
        getGodsJson = await getGodsData.json();
    } catch (error) {
        console.log(error);
    }

    return new Promise((resolve, reject) => {
        resolve(getGodsJson);
    });
}

/**
 * Gets God data.
 * 
 * @param {String} sessID sessionID from the session function.
 * @return {JSON} getgods request data
 */
exports.getMatch = async function (sessID, id) {
    let timestamp = dateformat(new Date(), "UTC:yyyymmddHHMMss"); //UTC timestamp
    let sign = devID + "getmatchdetails" + auth + timestamp; //String to be hashed
    let signature = CryptoJS.MD5(sign); //MD5 Hash for signature
    const req = url + "getmatchdetailsJson/" + devID + "/" + signature.toString() + "/" + sessID + "/" + timestamp + "/" + id; //request URL

    let getGodsJson;
    try {
        let getGodsData = await fetch(req);
        getGodsJson = await getGodsData.json();
    } catch (error) {
        console.log(error);
    }

    return new Promise((resolve, reject) => {
        resolve(getGodsJson);
    });
}