import { createStore } from 'redux';
import config from './config';

const initialState = {
    search: {
        term: undefined,
        sort: config.sort.default
    },
    likes: {},
    favourite: undefined
};
  
function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'SEARCH': {
            const { term } = payload;

            return {
                ...state,
                search: {
                    ...state.search,
                    term
                }
            };
        }
        case 'SORT': {
            const { sort } = payload;

            return {
                ...state,
                search: {
                    ...state.search,
                    sort
                }
            };
        }
        case 'ADD_LIKE': {
            const { id } = payload;

            const currentLikes = state.likes[id] || 0;
            const likes = currentLikes + 1;

            return {
                ...state,
                likes: {
                    ...state.likes,
                    [id]: likes
                }
            };
        }
        case 'FAVOURITE': {
            console.log(payload);
            const { id } = payload;

            return {
                ...state,
                favourite: id
            };
        }
        default:
            return state;
    }
}

let preloadedState = {
    ...initialState
};

try {
    const localState = JSON.parse(localStorage.getItem('feed'));

    preloadedState = {
        ...preloadedState,
        ...localState
    };
} catch (err) {
    localStorage.getItem('feed', '{}');
}

export default createStore(reducer, preloadedState);
