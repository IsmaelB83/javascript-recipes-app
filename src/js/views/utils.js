/* 'Pasta with tomato and spinach'
    * counter: 0 / counter + word.lengt: 5 / newTitle = ['Pasta']
    * counter: 5 / counter + word.lengt: 9 / newTitle = ['Pasta', 'with']
    * counter: 9 / counter + word.lengt: 15 / newTitle = ['Pasta', 'with', 'tomato']
    * counter: 15 / counter + word.lengt: 21 / newTitle = ['Pasta', 'with', 'tomato']
    * counter: 18 / counter + word.lengt: 24 / newTitle = ['Pasta', 'with', 'tomato']
    */
export const limitTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > 17) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
        title.split(' ').reduce((counter, word) => {
            if (counter + word.length <= limit) {
                newTitle.push(word);
            }
            return counter += word.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

export const insertLoader = (container) => {
    let html = `<div class="loader"><svg><use href="img/icons.svg#icon-cw"></use></svg></div>`;
    container.insertAdjacentHTML('afterbegin', html);
}

export const removeLoader = (container) => {
    let loader = container.querySelector('.loader');
    loader.parentNode.removeChild(loader);
}