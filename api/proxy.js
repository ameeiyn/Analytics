// api/proxy.js
const axios = require('axios');

module.exports = async (req, res) => {
    // Extract the API URL dynamically based on the incoming request
    const apiUrl = `https://api.unify.autostoresystem.com${req.url.replace('/api', '')}`;

    try {
        // Make the request to the external API
        const apiResponse = await axios.get(apiUrl, {
            headers: {
                'API-Authorization': 'iVt5VVIHoynBQBJgFDfCywFSMqCx9N4nfpLndHlVNfdYmOA4CpKQTHFRsNkPgYBi', // Replace with your API key
                'Content-Type': 'application/json',
            },
        });

        // Send the API response back to the client
        res.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error('Error fetching API:', error.message);
        res.status(error.response?.status || 500).json({ error: 'Failed to fetch API data' });
    }
};