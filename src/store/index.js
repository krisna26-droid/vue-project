import { createStore } from 'vuex';
import recipe from './recipe'; // PERBAIKAN: path harus ./recipe

export const store = createStore({
    modules: {
        recipe,
    },
});
