const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

// هنا استخدم المنفذ من متغير البيئة، إذا لم يكن موجودًا استخدم 8080
const PORT = process.env.PORT || 8080;

// وضع التوكن الخاص بك هنا
const TELEGRAM_BOT_TOKEN = '7944784035:AAG9QlBrJP4snXb3AxtZv-BiPbWZ3tzHYtU';
const TELEGRAM_CHAT_ID = '452567629'; // معرف المستخدم الخاص بك

// دالة لإرسال الصورة إلى بوت تليجرام
const sendPhotoToTelegram = async (photoPath) => {
    // كود إرسال الصورة كما هو
};

// إضافة مسار للجذر لإرسال ملف index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// هنا تابع الكود كما هو
app.post('/upload', (req, res) => {
    // كود معالجة الصور كما هو
});

// تشغيل الخادم على المنفذ
app.listen(PORT, () => {
    console.log(`السيرفر يعمل على المنفذ ${PORT}`);
});
