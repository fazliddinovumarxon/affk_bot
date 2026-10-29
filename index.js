const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Render'ın uyumasını önlemek için Web Sunucusu
app.get('/', (req, res) => {
  res.send('AFK Bot aktif ve çalışıyor!');
});

app.listen(PORT, () => {
  console.log(`Web sunucusu ${PORT} portunda çalışıyor.`);
});

// Bot Yapılandırması
const botOptions = {
  host: 'survival-mj32.aternos.me', // Aternos IP adresinizi yazın
  port: 57148,                             // Sunucu portunuz
  username: 'AFK_Bot_724',                // Botun oyundaki adı
  version: '1.21.11'                       // Minecraft versiyonunuz
};

function createBot() {
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('Bot sunucuya başarıyla bağlandı!');
  });

  bot.on('end', () => {
    console.log('Bot sunucudan ayrıldı. 30 saniye içinde tekrar bağlanılıyor...');
    setTimeout(createBot, 30000);
  });

  bot.on('error', (err) => {
    console.log('Hata oluştu:', err);
  });
}

createBot();