const express = require('express');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

// Sample recipe data
const recipes = [
    {
        id: 1,
        name: "Spaghetti Carbonara",
        cuisine: "Italian",
        prepTime: "30 mins",
        difficulty: "Medium",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400",
        description: "Classic Italian pasta dish with eggs, cheese, and bacon"
    },
    {
        id: 2,
        name: "Chicken Tikka Masala",
        cuisine: "Indian",
        prepTime: "45 mins",
        difficulty: "Medium",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
        description: "Creamy tomato curry with tender chicken pieces"
    },
    {
        id: 3,
        name: "Caesar Salad",
        cuisine: "American",
        prepTime: "15 mins",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
        description: "Fresh romaine lettuce with parmesan and crispy croutons"
    },
    {
        id: 4,
        name: "Pad Thai",
        cuisine: "Thai",
        prepTime: "25 mins",
        difficulty: "Medium",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
        description: "Stir-fried rice noodles with shrimp and peanuts"
    }
];

// API endpoint to get all recipes
app.get('/api/recipes', (req, res) => {
    res.json(recipes);
});

// Start server
app.listen(port, () => {
    console.log(`Recipe app running at http://localhost:${port}`);
});