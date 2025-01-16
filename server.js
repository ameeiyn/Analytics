const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

// Root route
app.get('/', (req, res) => {
    res.send('<h1>AutoStore Proxy Server</h1><p>Welcome to the AutoStore Proxy Server.</p>');
});

// Fetch installation IDs
app.get('/api/v1/installations', async (req, res) => {
    const apiUrl = 'https://api.unify.autostoresystem.com/v1/installations';
    try {
        const { data } = await axios.get(apiUrl, {
            headers: {
                'API-Authorization': 'iVt5VVIHoynBQBJgFDfCywFSMqCx9N4nfpLndHlVNfdYmOA4CpKQTHFRsNkPgYBi',
                'Content-Type': 'application/json',
            },
        });
        res.json(data); // Send JSON response directly
    } catch (error) {
        console.error('Error fetching installations:', error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to fetch installations data',
            details: error.message,
        });
    }
});

// Fetch bin presentations
app.get('/api/v1/installations/:installationId/bin-presentations', async (req, res) => {
    const { installationId } = req.params;
    const apiUrl = `https://api.unify.autostoresystem.com/v1/installations/${installationId}/bin-presentations`;

    try {
        const { data } = await axios.get(apiUrl, {
            headers: {
                'API-Authorization': 'iVt5VVIHoynBQBJgFDfCywFSMqCx9N4nfpLndHlVNfdYmOA4CpKQTHFRsNkPgYBi',
                'Content-Type': 'application/json',
            },
        });
        res.json(data); // Send JSON response directly
    } catch (error) {
        console.error('Error fetching bin presentations:', error.message);
        res.status(error.response?.status || 500).json({
            error: `Failed to fetch bin presentations for installation ${installationId}`,
            details: error.message,
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
