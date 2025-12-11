import axios from 'axios';

export default {
    namespaced: true,

    state() {
        return {
            recipes: [],
            recipeDetail: {},
        };
    },

    mutations: {
        setRecipes(state, payload) {
            state.recipes = payload;
        },

        setRecipeDetail(state, payload) {
            state.recipeDetail = payload;
        },

        setNewRecipe(state, payload) {
            state.recipes.push(payload);
        },
    },

    actions: {
        async getRecipeDetail({ commit }, payload) {
            try {
                const { data } = await axios.get(
                    `https://vue-js-project-53d71-default-rtdb.firebaseio.com/recipes/${payload}.json`
                );
                commit('setRecipeDetail', data);
            } catch (err) {
                console.log(err);
            }
        },

        async getRecipeData({ commit }) {
            try {
                const { data } = await axios.get(
                    'https://vue-js-project-53d71-default-rtdb.firebaseio.com/recipes.json'
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

        async addNewRecipe({ commit, rootState }, payload) {
            const newData = {
                ...payload,
                username: rootState.auth.userLogin.username,
                createdAt: Date.now(),
                likes: ["null"],
                userId: rootState.auth.userLogin.userId,
            };

            try {
                const { data } = await axios.post(
                    `https://vue-js-project-53d71-default-rtdb.firebaseio.com/recipes.json?auth=${rootState.auth.token}`,
                    newData
                );

                commit('setNewRecipe', { id: data.name, ...newData });
            } catch (err) {
                console.log(err);
            }
        },

        async deleteRecipe({dispatch, rootState }, payload) {
            try {
                const { data } = await axios.delete(`https://vue-js-project-53d71-default-rtdb.firebaseio.com/recipes/${payload}.json?auth=${rootState.auth.token}`);
                await dispatch('getRecipeData');
            } catch (err) {
                console.log(err);
            }
        }
    },
};