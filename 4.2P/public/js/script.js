async function loadRecipes() {
    const response = await fetch('/api/recipes');
    const result = await response.json();
    const container = document.getElementById('recipes');
    container.innerHTML = '';
    
    result.data.forEach(recipe => {
        container.innerHTML += `
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="${recipe.image}">
                        <span class="card-title" style="background: rgba(0,0,0,0.6); padding: 10px;">
                            ${recipe.name}
                        </span>
                    </div>
                    <div class="card-content">
                        <p><b>Cuisine:</b> ${recipe.cuisine}</p>
                        <p><b>Time:</b> ${recipe.cookTime}</p>
                        <p><b>Difficulty:</b> ${recipe.difficulty}</p>
                        <p><b>Ingredients:</b> ${recipe.ingredients.length}</p>
                    </div>
                </div>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', loadRecipes);
