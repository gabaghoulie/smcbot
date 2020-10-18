const tmi = require('tmi.js');

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

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// globals
let bukkake = 0;
let quotes = ["Elbow pasta is the Milhouse Van Houten of pasta",
"ive arrived clown boys and squirter girls",
"ive returned and im sad horny",
"mi pachoochie es juithy",
"step on me steve harrington", 
"my mom is blue balling me with her lasagna",
"im boutta squirt some sauce in a minute", 
"horny typing is a lot of work my brain barely Functioning", 
"want glencour to raw me out goodnigjt", 
"wish xqc would pounce on this xpussc", 
"i sucked a shelob before", 
"threats are hot tho", 
"play with me be my gacha sugar daddy", 
"typing and stealing my grandma's chicken wings rn", 
"oh to be a dumpster...", 
"need dj mans to fill my hol- I mean... the void in my as--heart", 
"time to start peppegging his dad", 
"go use ur douching toilet beta boy @NuggiesBoy",
"boutta astral project my juicy pussy to the perfect dimension"];

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
  
  if (msg.includes('chosen one') && target != '#sausagemcbot') {
    bukkake += 1;
    client.say(target, ` ..(‿ˠ‿) _(‿ˠ‿) only the chosen one can fist both asses.⎝. Kreygasm .⎠`);
    return;
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
    ribbon = String.fromCodePoint(0x1F380);
    client.say(target, `${ribbon} ${quotes[Math.floor(Math.random()*quotes.length)]} ${ribbon}`);
    return;
  }
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
