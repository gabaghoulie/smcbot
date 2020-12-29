const tmi = require('tmi.js');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

// Define configuration options
const opts = {
  identity: {
    username: 'sausagemcbot',
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    'sausagemcburn'
  ]
};

const smb_id = '219092110';

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// globals
let bukkake = 0;
let puchiFile = '/home/burnsnoss/bot/puchisms.txt'
let abbyFile = '/home/burnsnoss/bot/abbyshapiro.txt'

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  // console.log(context); 
  msg = msg.toLowerCase();

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
        if (data.total === 0) {
          client.say(target, `/timeout ${context['display-name']} 300`);
        }
      }
    });
  }

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!d20') {
    const num = rollDice(commandName);
    client.say(target, `You rolled a ${num}`);
    return;
  }
  if (commandName === '!puchi') {
    let quotes = getPuchiQuotes();
    let ribbon = String.fromCodePoint(0x1F380);
    client.say(target, `${ribbon} ${quotes[Math.floor(Math.random()*quotes.length)]} ${ribbon}`);
    return;
  }
  if (commandName === '!abby' || commandName === '!abbyshapiro') {
    let quotes = getAbbyQuotes();
    client.say(target, `${quotes[Math.floor(Math.random()*quotes.length)]}`);
  }
}

function getPuchiQuotes() {
  let fs = require('fs');
  let quotes = fs.readFileSync(puchiFile).toString().split("\n");
  return quotes;
}

function getAbbyQuotes() {
  let fs = require('fs');
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
