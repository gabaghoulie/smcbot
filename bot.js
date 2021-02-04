// SAUSAGEMCBOT CODE REEEEEEE
//  edited: 2/3/2021

const tmi = require('tmi.js');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
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
const {Translate} = require('@google-cloud/translate').v2;
const GCT_CREDS = JSON.parse(process.env.TRANSLATE_CREDS);
const translator = new Translate({
    credentials: GCT_CREDS,
    projectId: GCT_CREDS.project_id
});


// globals
let bukkake = 0;
// TODO: IMPLEMENT THIS
// if (process.argv[2] == '-dev') {
let puchiFile = '/home/burnsnoss/bot/puchisms.txt';
let abbyFile = '/home/burnsnoss/bot/abbyshapiro.txt';
const smb_id = '219092110';
let foreign_chatters = fs.readFileSync('translate.txt').toString().split('\n');

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
    client.say(target, ` ..(‿ˠ‿) _(‿ˠ‿) only the chosen one can fist both asses.⎝. Kreygasm .⎠`);
    return;
  }

  if (msg.includes('bigfollows')) {
   // use twitch API to check if they're a follower
   $.ajax({
     type: 'GET',
     url: `https://api.twitch.tv/helix/users/follows?from_id=${context['user-id']}&to_id=${smb_id}`,
     headers: {
       'Client-ID': process.env.TTV_CLIENT_ID,
       'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
      },
      success: function(data) {
        // time 'em out if they dont follow (bad boys bad boys)
        console.log('bigfollows bad boye:');
        console.log(data);
        if (data.total == 0 || data.total == null) {
          client.say(target, `/timeout ${context['display-name']} 10`);
        }
      }
    });
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
    let ribbon = String.fromCodePoint(0x1F380);
    client.say(target, `${ribbon} ${quotes[Math.floor(Math.random()*quotes.length)]} ${ribbon}`);
    return;
  }
  if (command === '!abby' || command === '!abbyshapiro') {
    let quotes = getAbbyQuotes();
    client.say(target, `${quotes[Math.floor(Math.random()*quotes.length)]}`);
  }
  if (command === '!strain') {
    client.say(target, `Guava Cobbler - https://www.leafly.com/strains/guava + https://www.leafly.com/strains/cobbler`);
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
  if (foreign_chatters.indexOf(context.username)) {
    client.say(target, translateText(msg, detectLanguage(msg)));
  }
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
  return quotes;
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
