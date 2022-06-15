const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
const mongoose = require("mongoose");
const Discord = require('discord.js');
require('dotenv').config();
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const envVariables = process.env;

client.on('ready', async() => {
    await mongoose.connect(
        envVariables.PASSWORD,
        {
            keepAlive: true,
        }
    )

    mongoose.connection.on("connected", () => {
        console.log("Database connected");
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Database disconnected");
    });

  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
  if (msg.content.toLowerCase() === 's') {
    msg.reply('Starting Entrys');
  };
});
// You really don't want your token here since your repl's code
// is publically available. We'll take advantage of a Repl.it 
// feature to hide the token we got earlier. 
client.login(envVariables.TOKEN || ''  );