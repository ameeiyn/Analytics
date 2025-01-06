const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON requests (if necessary)
app.use(express.json());

// Root route to handle requests to "/"
app.get('/', (req, res) => {
    res.send('AutoStore Proxy Server is running.');
});

// Proxy route to handle API requests
app.get('/api/*', async (req, res) => {
    const apiUrl = `https://api.unify.autostoresystem.com${req.originalUrl.replace('/api', '')}`;

    try {
        const apiResponse = await axios.get(apiUrl, {
            headers: {
                'API-Authorization': 'iVt5VVIHoynBQBJgFDfCywFSMqCx9N4nfpLndHlVNfdYmOA4CpKQTHFRsNkPgYBi', // Replace with your API key
                'Content-Type': 'application/json',
            },
        });
        res.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error('Error fetching API:', error.message);
        res.status(error.response?.status || 500).json({ error: 'Failed to fetch API data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
