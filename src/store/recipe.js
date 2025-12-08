import axios from 'axios';

export default {
    namespaced: true,

    state() {
        return {
            recipes: [],
            recipeDetail: {}, // NEW
        };
    },

    mutations: {
        setRecipes(state, payload) {
            state.recipes = payload;
        },

        setRecipeDetail(state, payload) {
            state.recipeDetail = payload; // NEW
        },
    },

    actions: {
        async getRecipeDetail({commit}, payload) {
            try {
                const { data } = await axios.get(
                    `https://recipe-vue-batch2-default-rtdb.firebaseio.com/recipes/${payload}.json`)
                commit('setRecipeDetail', data);
                
            } catch (err) {

            }
        },  
        async getRecipeData({ commit }) {
            try {
                const { data } = await axios.get(
                    'https://recipe-vue-batch2-default-rtdb.firebaseio.com/recipes.json'
                );

                const arr = [];
                for (let key in data) {
                    arr.push({ id: key, ...data[key] });
                }

                commit('setRecipes', arr);
            } catch (err) {
                console.log(err);
            }
        },

        // OPTIONAL: action detail
        async getRecipeDetail({ commit }, id) {
            try {
                const { data } = await axios.get(
                    `https://recipe-vue-batch2-default-rtdb.firebaseio.com/recipes/${id}.json`
                );

                commit('setRecipeDetail', { id, ...data });
            } catch (err) {
                console.log(err);
            }
        },
    },
};
