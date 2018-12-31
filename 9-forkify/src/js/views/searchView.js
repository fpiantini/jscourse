import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultArr = Array.from(document.querySelectorAll('.results__link'));
    resultArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    if(document.querySelector(`.results__link[href*="#${id}"]`)) {
        document.querySelector(
            `.results__link[href*="#${id}"]`)
            .classList.add('results__link--active');
    }
};

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title
};

// ------------------------------------------
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next'
const createButtonMarkup = (page, type) => `
        <button class="btn-inline results__btn--${type}" data-goto='${type === 'prev' ? page-1 : page+1}'>
            <span>Page ${type === 'prev' ? page-1 : page+1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>
        `;

const renderButtons = (page, numPages) => {
    let button;
    if (page === 1 && numPages > 1) {
        // button to go to next page
        button = createButtonMarkup(page, 'next');
    } else if (page < numPages) {
        // Both buttons
        button = `
        ${createButtonMarkup(page, 'prev')}
        ${createButtonMarkup(page, 'next')}
        `;
    } else if (page === numPages) {
        // button to go to previous page
        button = createButtonMarkup(page, 'prev');

    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = start + resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, Math.ceil(recipes.length / resPerPage));
};

