import { elements } from './views/base';
import Search from './models/Search';
import * as searchView from './views/searchView';

/**  globas state of the app 
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
*/
const state = {};

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

        // - Search for recipes
        await state.search.getResult();

        // - render results on UI
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


