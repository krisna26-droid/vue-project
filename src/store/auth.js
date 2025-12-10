import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    namespaced: true,

    state() {
        return {
            token: null,
            tokenExpirationDate: null,
            userLogin: null,
            isLogin: false,
        };
    },

    mutations: {
        setToken(state, { idToken, expiresIn }) {
            state.token = idToken;
            state.tokenExpirationDate = expiresIn;
            Cookies.set('tokenExpirationDate', expiresIn);
            Cookies.set('jwt', idToken);
        },
        setUserLogin(state, { userData, loginStatus }) {
            state.userLogin = userData;
            state.isLogin = loginStatus;
        }
    },

    actions: {
        async getRegisterData({ commit, dispatch }, payload) {
            const APIkey = "AIzaSyBmosIarC89gMtqxlZp3hhtJ24qnPSi5-g";
            const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
            
            try {
                const { data } = await axios.post(authUrl + APIkey, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                });

                commit('setToken', {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
                });

                const newUserData = {
                    userId: data.localId,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    username: payload.username,
                    email: payload.email,
                    imageLink: payload.imageLink
                };

                Cookies.set("UID", newUserData.userId);

                await dispatch('addNewUser', newUserData);

                return { success: true, data: newUserData };
            } catch (error) {
                if (error.response?.data?.error?.message) {
                    throw new Error(error.response.data.error.message);
                }
                throw error;
            }
        },
    
        async addNewUser({ commit, state }, payload) {
            const databaseURL = "https://vue-js-project-53d71-default-rtdb.firebaseio.com";
            
            try {
                const { data } = await axios.post(
                    `${databaseURL}/user.json?auth=${state.token}`,
                    payload
                );
                
                commit("setUserLogin", { 
                    userData: payload, 
                    loginStatus: true 
                });

                return { success: true, data };
            } catch (error) {
                if (error.response?.status === 401) {
                    throw new Error("Database permission denied. Please check Firebase Rules.");
                }
                throw error;
            }
        },

        async getUser({ commit }, payload) {
            try {
                const { data } = await axios.get(
                    `https://vue-js-project-53d71-default-rtdb.firebaseio.com/user.json`
                );
                
                for (let key in data) {
                    if (data[key].userId === payload) {
                        Cookies.set("UID", data[key].userId);
                        commit("setUserLogin", { 
                            userData: data[key], 
                            loginStatus: true 
                        });
                        break;
                    }
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                throw error;
            }
        }
    },

    getters: {
        token(state) {
            return state.token;
        },
        isAuthenticated(state) {
            return state.isLogin && state.token !== null;
        },
        userLogin(state) {
            return state.userLogin;
        }
    }
};