const express = require('express');
const axios = require('axios');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const router = express.Router();


router.get('/news', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.NEWS_API_URL}/top-headlines`, {
            params: {
                country: 'us',
                apiKey: process.env.NEWS_API_KEY,
            },
        });
        res.json(response.data.articles);
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

router.get('/currency', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.CURRENCY_API_URL}/latest`, {
            params: {
                apiKey: process.env.CURRENCY_API_KEY,
            },
        });
        res.json(response.data.rates);
    } catch (error) {
        console.error('Error fetching currency rates:', error.message);
        res.status(500).json({ error: 'Failed to fetch currency rates' });
    }
});

router.post('/visualize', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const { type, data } = req.body;
        res.status(201).json({ message: 'Visualization created successfully' });
    } catch (error) {
        console.error('Error creating visualization:', error.message);
        res.status(500).json({ error: 'Failed to create visualization' });
    }
});

module.exports = router;
