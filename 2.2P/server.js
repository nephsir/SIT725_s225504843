const express = require('express');
const app = express();
const port = 3000;

// Serve static files from public folder
app.use(express.static('public'));

// Add two numbers endpoint
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const result = num1 + num2;
    res.json({ num1, num2, result });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});