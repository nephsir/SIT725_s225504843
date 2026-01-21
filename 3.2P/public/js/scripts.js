// Fetch recipes from API and display them
function loadRecipes() {
    console.log('Loading recipes from API...');
    
    fetch('/api/recipes')
        .then(response => response.json())
        .then(data => {
            console.log('Recipes loaded:', data);
            displayRecipes(data);
            hideLoading();
        })
        .catch(error => {
            console.error('Error loading recipes:', error);
            hideLoading();
        });
}

// Display recipes as Materialize cards
function displayRecipes(recipes) {
    const container = document.getElementById('recipes-container');
    container.innerHTML = '';
    
    recipes.forEach(recipe => {
        const difficultyClass = getDifficultyClass(recipe.difficulty);
        
        const cardHTML = `
            <div class="col s12 m6 l3">
                <div class="card">
                    <div class="card-image">
                        <img src="${recipe.image}" alt="${recipe.name}">
                        <span class="card-title">${recipe.name}</span>
                    </div>
                    <div class="card-content">
                        <p>${recipe.description}</p>
                        <br>
                        <div class="chip orange lighten-4">
                            <i class="material-icons tiny">public</i> ${recipe.cuisine}
                        </div>
                        <div class="chip blue lighten-4">
                            <i class="material-icons tiny">schedule</i> ${recipe.prepTime}
                        </div>
                        <div class="chip ${difficultyClass}">
                            <i class="material-icons tiny">star</i> ${recipe.difficulty}
                        </div>
                    </div>
                    <div class="card-action">
                        <a href="#" onclick="viewRecipe(${recipe.id})">View Recipe</a>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML += cardHTML;
    });
}

// Get CSS class based on difficulty
function getDifficultyClass(difficulty) {
    switch(difficulty.toLowerCase()) {
        case 'easy':
            return 'green lighten-4 difficulty-easy';
        case 'medium':
            return 'orange lighten-4 difficulty-medium';
        case 'hard':
            return 'red lighten-4 difficulty-hard';
        default:
            return 'grey lighten-4';
    }
}

// View recipe details (placeholder function)
function viewRecipe(id) {
    console.log('Viewing recipe with ID:', id);
    M.toast({html: `Recipe ${id} clicked!`, classes: 'orange'});
}

// Hide loading spinner
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, fetching recipes...');
    loadRecipes();
});