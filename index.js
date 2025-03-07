require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// تلگرام
const token = '7403751467:AAH5bQLy8ft6ga59wHq75q10aRlRMHi7RHs';
const bot = new TelegramBot(token, { polling: true });

// ای پی ای چت جی پی تی
const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';

bot.on('message', async(msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;

    try {
        // ارسال پیام کاربر به API
        const response = await axios.post(apiUrl, {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        // ارسال جواب API به کاربر تلگرام
        const reply = response.data.choices[0].message.content;
        bot.sendMessage(chatId, reply);
    } catch (error) {
        console.error('Error:', error);
        bot.sendMessage(chatId, 'متاسفم، مشکلی پیش اومده.');
    }
});

console.log('بات فعال شد...');