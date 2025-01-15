const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors({ origin: '*' })); // Allow all origins, or restrict to your Netlify domain

// Default route for root path
app.get('/', (req, res) => {
    res.send('<h1>AutoStore Proxy Server</h1><p>Welcome to the AutoStore Proxy Server.</p>');
});

// Proxy route to handle API requests for installations
app.get('/api/v1/installations', async (req, res) => {
    const apiUrl = `https://api.unify.autostoresystem.com/v1/installations`;

    try {
        const apiResponse = await axios.get(apiUrl, {
            headers: {
                'API-Authorization': 'iVt5VVIHoynBQBJgFDfCywFSMqCx9N4nfpLndHlVNfdYmOA4CpKQTHFRsNkPgYBi', // Replace with your API key
                'Content-Type': 'application/json',
            },
        });
        res.send(`
            <div>
                <h1>Installations Data</h1>
                <pre>${JSON.stringify(apiResponse.data, null, 2)}</pre>
                <button onclick="window.location.href='/'">Back to Home</button>
            </div>
        `);
    } catch (error) {
        console.error('Error fetching installations:', error.message);
        res.status(error.response?.status || 500).send(`
            <div>
                <h1>Error</h1>
                <p>Failed to fetch installations data</p>
                <button onclick="window.location.href='/'">Back to Home</button>
            </div>
        `);
    }
});

// Proxy route to handle API requests for bin presentations
app.get('/api/v1/installations/:installationId/bin-presentations', async (req, res) => {
    const { installationId } = req.params;
    const apiUrl = `https://api.unify.autostoresystem.com/v1/installations/${installationId}/bin-presentations`;

    try {
        const apiResponse = await axios.get(apiUrl, {
            headers: {
                'API-Authorization': 'iVt5VVIHoynBQBJgFDfCywFSMqCx9N4nfpLndHlVNfdYmOA4CpKQTHFRsNkPgYBi', // Replace with your API key
                'Content-Type': 'application/json',
            },
        });
        res.send(`
            <div>
                <h1>Bin Presentations for Installation ${installationId}</h1>
                <pre>${JSON.stringify(apiResponse.data, null, 2)}</pre>
                <button onclick="window.location.href='/'">Back to Home</button>
            </div>
        `);
    } catch (error) {
        console.error('Error fetching bin presentations:', error.message);
        res.status(error.response?.status || 500).send(`
            <div>
                <h1>Error</h1>
                <p>Failed to fetch bin presentations data</p>
                <button onclick="window.location.href='/'">Back to Home</button>
            </div>
        `);
    }
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.stack);
    res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
