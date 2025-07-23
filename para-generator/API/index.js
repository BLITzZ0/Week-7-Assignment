const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
const PORT = 3000;

// Function to generate a random word of a given length
function generateRandomWord(length) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let word = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        word += alphabet[randomIndex];
    }
    return word;
}

// API route to generate random word
app.get('/random-word/:length', (req, res) => {
    const length = parseInt(req.params.length, 10);

    if (isNaN(length) || length <= 0) {
        return res.status(400).json({ error: 'Length must be a positive number.' });
    }

    const word = generateRandomWord(length);
    res.json({ word });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
