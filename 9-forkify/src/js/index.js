import { elements, renderLoader, clearLoader } from './views/base';
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';

/**  globas state of the app 
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
*/
const state = {};
window.state = state;

// ---------------------------------------------------------------
// SEARCH CONTROLLER
// ---------------------------------------------------------------
const controlSearch = async () => {
    // - get the query from the view
    const query = searchView.getInput();
    if (query) {
        // - new search object and add it to state
        state.search = new Search(query);

        // - prepare UI for result
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // - Search for recipes
        try {
            await state.search.getResult();

            // - render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            clearLoader();
            alert(`Error searching for recipes: ${err}`);
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


// ---------------------------------------------------------------
// RECIPE CONTROLLER
// ---------------------------------------------------------------
const controlRecipe = async () => {
    // Get hash ID for the URL
    const id = window.location.hash.replace('#', '');
    if (id) {
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search
        if (state.search) searchView.highlightSelected(id);

        // create the recipe object
        state.recipe = new Recipe(id);
        
        try {
            // get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch(err) {
            alert(`Error getting recipe data: ${err}`);
        }

    }

}

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    // check if the target matches the button descrease button
    // or any child element of the button decrease button
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // decrease button is clicked
        if (state.recipe.servings > 1)  {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add,  .recipe__btn--add *')) {
        // add to shopping list button is clicked
        controlList();

    }
});

// ---------------------------------------------------------------
// LIST CONTROLLER
// ---------------------------------------------------------------
const controlList = () => {
    // create a new list if there is none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and render on page
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

// handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // delete from state
        state.list.deleteItem(id);

        // delete from UI
        listView.deleteItem(id);
    // handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});