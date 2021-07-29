// SAUSAGEMCBOT CODE REEEEEEE
//  edited: 2/3/2021

const tmi = require('tmi.js');
const fs = require('fs');
//const dotenv = require('dotenv');
//dotenv.config();
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);


// Define configuration options for twitch
const opts = {
  identity: {
    username: 'sausagemcbot',
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    'sausagemcburn'
  ]
};
// Create a client with our options
const client = new tmi.client(opts);
// Register our event handlers (defined below)
client.on('message', onMessageHandler);
// Connect to Twitch:
client.connect();
client.on('connected', onConnectedHandler);


// config stuff for Google Cloud Translate API
// const {Translate} = require('@google-cloud/translate').v2;
// const GCT_CREDS = JSON.parse(process.env.TRANSLATE_CREDS);
// const translator = new Translate({
//     credentials: GCT_CREDS,
//     projectId: GCT_CREDS.project_id
// });


// globals
let bukkake = 0;
// TODO: IMPLEMENT THIS
// if (process.argv[2] == '-dev') {
let puchiFile = '/home/burnsnoss/bot/util/puchisms.txt';
let abbyFile = '/home/burnsnoss/bot/util/abbyshapiro.txt';
let puchiCounterFile = '/home/burnsnoss/bot/util/puchism_counter.json'
const smb_id = '219092110';
let ribbon = String.fromCodePoint(0x1F380);
//let foreign_chatters = fs.readFileSync('translate.txt').toString().split('\n');

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  // console.log(context); 
  msg = msg.toLowerCase();

  // CHECKING GENERAL MESSAGE
  if (msg.includes('bukkake') && target != '#sausagemcbot') {
    bukkake += 1;
    client.say(target, `ah i see you're a man of culture as well :: bukkake count = ${bukkake}`);
    return;
  }

  if (msg.includes('bigswallows') && target != '#sausagemcbot') {
    client.say(target, `are you really watching porn alone?? check out bigswallows . dot com (;; click here to see my pussy`);
    return;
  }
  
  if (msg.includes('chosen one') && target != '#sausagemcbot') {
    client.say(target, ` .....(‿ˠ‿) _(‿ˠ‿) only the chosen one can fist both asses.⎝. Kreygasm .⎠`);
    return;
  }

  if (msg.includes('bigfollows')) {
   // use twitch API to check if they're a follower
   // $.ajax({
   //   type: 'GET',
   //   url: `https://api.twitch.tv/helix/users/follows?from_id=${context['user-id']}&to_id=${smb_id}`,
   //   headers: {
   //     'Client-ID': process.env.TTV_CLIENT_ID,
   //     'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
   //    },
   //    success: function(data) {
   //      // time 'em out if they dont follow (bad boys bad boys)
   //      console.log('bigfollows bad boye:');
   //      console.log(data);
   //      if (data.total == 0 || data.total == null) {
   //        client.say(target, `/timeout ${context['display-name']} 10`);
   //      }
   //    }
   //  });
   client.say(target, `/timeout ${context['display-name']} 10`);
  }


  // CHECKING COMMANDS WITH ARGUMENTS

  if (msg.substring(0, 12) == "!addpuchism " && target == "#sausagemcburn") {
    addPuchism(msg.substring(12, msg.length));
    return;
  }


  // CHECKING TRIMMED MESSAGE

  // Remove whitespace from chat message
  let command = msg.trim();

  // If the command is known, let's execute it
  if (command === '!d20') {
    const num = rollDice(command);
    client.say(target, `You rolled a ${num}`);
    return;
  }

  if (command === '!puchi') {
    let quotes = getPuchiQuotes();
    let puchism = quotes[Math.floor(Math.random()*quotes.length)];
    client.say(target, `${ribbon} ${puchism} ${ribbon}`);
    increasePuchismCounter(puchism);
    return;
  }

  if (command === '!toppuchisms' || command === '!toppuchism') {
    let topPuchismsMsg = topPuchisms();
    client.say(target, `${topPuchismsMsg}`);
    return;
  }

  if (command === '!abby' || command === '!abbyshapiro') {
    let quotes = getAbbyQuotes();
    client.say(target, `${quotes[Math.floor(Math.random()*quotes.length)]}`);
  }
  if (command === '!strain') {
    client.say(target, `Lemon Haze - https://www.leafly.com/strains/lemon-haze`);
  }
  if (command === '!video') {
    // TODO: have this auto-grab most recent youtube video
    client.say(target, `NEW UNCONVENTIONAL SUSHI! https://youtu.be/IV1PqubiKXI `);
  }
  if (command === '!recipe') {
    client.say(target, `Spicy Sausage Rigatoni - https://www.pinchofyum.com/spicy-sausage-rigatoni `);
  }
  if (command === '!stonks') {

    var request = require('request');

    // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
    var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=ATOS&interval=5min&apikey=' + process.env.STONKS_KEY;  

    request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (res.statusCode !== 200) {
          console.log('Status:', res.statusCode);
        } else {
          // data is successfully parsed as a JSON object:
          console.log(data);
        }
    });

    //client.say(target, ``);
  }



  // CHECKING SPLIT MESSAGE
  command = command.split(' ');
  // if (command[0] == '!translate') {
  //   if (command.length != 2) {
  //     client.say(target, `syntax: !translate username`);
  //     return;
  //   }
  //   // add user to translate.txt
  //   fs.appendFile('translate.txt', command[1] + '\n', function (err) {
  //     if (err) throw err;
  //     console.log(`saved ${command[1]} to translate.txt`);
  //   });
  // }



  // CHECK SPECIAL USERS
  // if (foreign_chatters.indexOf(context.username)) {
  //   client.say(target, translateText(msg, detectLanguage(msg)));
  // }
}

const detectLanguage = async (text) => {
  try {
    let response = await translator.detect(text);
    return response[0].language;
  } catch (error) {
    console.log(`Error at detectLanguage --> ${error}`);
    return 0;
  }
}

const translateText = async (text, targetLanguage) => {
  try {
    let [response] = await translator.translate(text, targetLanguage);
    return response;
  } catch (error) {
    console.log(`Error at translateText --> ${error}`);
    return 0;
  }
}

function getPuchiQuotes() {
  let quotes = fs.readFileSync(puchiFile).toString().split("\n");
  for (let i = 0; i < quotes.length; i++) {
    quotes[i] = quotes[i].replace("\r", "");
  }
  return quotes;
}

// gets and parses contents of the puchism counter json file
function getPuchiHisto() {
  let rawdata = fs.readFileSync(puchiCounterFile);
  return JSON.parse(rawdata);
}

// writes the puchism histogram to the puchism counter json file
function setPuchiHisto(histo) {
  let histoString = JSON.stringify(histo);
  fs.writeFileSync(puchiCounterFile, histoString);
}

function increasePuchismCounter(puchism) {
  let puchismHisto = getPuchiHisto();
  puchismHisto[puchism] += 1;
  setPuchiHisto(puchismHisto);
  return;
}

function addPuchism(puchism) {
  // add a puchism to puchisms.txt
  fs.appendFileSync(puchiFile, "\n" + puchism);

  // update puchism_counter.json
  let puchismHisto = getPuchiHisto();
  puchismHisto[puchism] = 0;
  setPuchiHisto(puchismHisto);
  return;
}

// returns top 3 puchisms
function topPuchisms() {
  let rawdata = fs.readFileSync(puchiCounterFile);
  let puchismHisto = JSON.parse(rawdata);
  let sortable = [];
  for (let puchism in puchismHisto) {
      sortable.push([puchism, puchismHisto[puchism]]);
  }
  // sort by values of json obj
  sortable.sort(function(a, b) {
    return -1 * (a[1] - b[1]);
  });
  // print top 3 puchisms
  let output = ribbon;
  for (let i = 0; i < 3; i++) {
    output += sortable[i][0] + ": " + sortable[i][1] + ribbon;
  }
  return output;
}

function getAbbyQuotes() {
  let quotes = fs.readFileSync(abbyFile).toString().split(".");
  return quotes;
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}


// manifesting the hot german daddy thatll choke me out and make me bust like a dormant volcano thatll endanger the planet
// saus could stare at a wall doing nothing and my coochie would turn into a pressure wash system