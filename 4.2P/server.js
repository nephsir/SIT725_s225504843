const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/recipeDB');

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!');
});

const RecipeSchema = new mongoose.Schema({
    name: String,
    cuisine: String,
    cookTime: String,
    difficulty: String,
    ingredients: [String],
    image: String
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

app.get('/api/recipes', async (req, res) => {
    const recipes = await Recipe.find({});
    res.json({ statusCode: 200, data: recipes });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
