const express = require('express');
const mineflayer = require('mineflayer');

// Render o'chib qolmasligi uchun kichik Web Server
const app = express();
app.get('/', (req, res) => res.send('Bot 24/7 ishlamoqda!'));
app.listen(process.env.PORT || 3000);

// Minecraft Bot sozlamalari
function createBot() {
  const bot = mineflayer.createBot({
    host: 'survival-mj32.aternos.me', // Aternos IP- manzilingiz
    port: 57148,                  // Serveringiz porti (agar bo'lsa)
    username: 'afk_Donut',       // Botning Minecraft'dagi nikini kiriting
    version: '1.20.1'             // Server versiyasi
  });

  bot.on('spawn', () => {
    console.log("Bot serverga kirdi!");
    // AFK bo'lib qolmaslik uchun har 30 sekundda bir sakraydi
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  // Server o'chsa yoki bot uzilsa, avtomatik qayta ulanadi
  bot.on('end', () => {
    console.log("Bot uzildi, 10 sekunddan keyin qayta ulanadi...");
    setTimeout(createBot, 10000);
  });

  bot.on('error', err => console.log('Xatolik:', err));
}

createBot();