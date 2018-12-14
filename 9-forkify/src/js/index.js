import { elements } from './views/base.js';
import Search from './models/Search';
import * as SearchView from './views/searchView';

/**  glovas state of the app 
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
*/
const state = {};

// ---------------------------------------------------------------
const controlSearch = async () => {
    // - get the query from the view
    const query = 'pizza'; // TODO

    if (query) {
        // - new search object and add it to state
        state.search = new Search(query);

        // - prepare UI for result

        // - Search for recipes
        await state.search.getResult();

        // - render results on UI
        console.log(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


