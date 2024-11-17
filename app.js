require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/external', require('./routes/external'));

app.get('/crypto.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cryptocurrency.html'));
});

app.get('/', async (req, res) => {
    try {
        const newsData = await axios.get('/api/external/news');
        const currencyData = await axios.get('/api/external/currency');
        res.render('index', {
            weather: weatherData.data,
            news: newsData.data,
            currency: currencyData.data,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to load data');
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
