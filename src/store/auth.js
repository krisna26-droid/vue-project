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
            // API Key dari Firebase Config Anda
            const APIkey = "AIzaSyBmosIarC89gMtqxlZp3hhtJ24qnPSi5-g";
            const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
            
            console.log("=== STARTING REGISTRATION ===");
            
            try {
                // Step 1: Register user dengan Firebase Auth
                const { data } = await axios.post(authUrl + APIkey, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                });

                console.log("✅ Firebase Auth success, got token");

                // Step 2: Set token to state and cookies
                commit('setToken', {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
                });

                console.log("✅ Token saved to state");

                // Step 3: Create new user data object
                const newUserData = {
                    userId: data.localId,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    username: payload.username,
                    email: payload.email,
                    imageLink: payload.imageLink
                };

                // Step 4: Save user ID to cookies
                Cookies.set("UID", newUserData.userId);

                console.log("✅ User ID saved to cookies");

                // Step 5: Add user to database
                await dispatch('addNewUser', newUserData);

                console.log("✅ REGISTRATION COMPLETE");

                return { success: true, data: newUserData };
            } catch (error) {
                console.error("❌ Registration error:", error);
                
                // Handle Firebase Auth errors
                if (error.response?.data?.error?.message) {
                    throw new Error(error.response.data.error.message);
                }
                
                throw error;
            }
        },
    
        async addNewUser({ commit, state }, payload) {
            // PENTING: Database URL yang BENAR sesuai Firebase Config
            const databaseURL = "https://vue-js-project-53d71-default-rtdb.firebaseio.com";
            
            console.log("=== SAVING TO DATABASE ===");
            console.log("Database URL:", databaseURL);
            console.log("Token exists?", state.token ? "YES" : "NO");
            console.log("User data:", payload);
            
            try {
                const { data } = await axios.post(
                    `${databaseURL}/user.json?auth=${state.token}`,
                    payload
                );
                
                console.log("✅ User saved to database:", data);
                
                commit("setUserLogin", { 
                    userData: payload, 
                    loginStatus: true 
                });

                return { success: true, data };
            } catch (error) {
                console.error("❌ Database save error:", error.response?.data || error.message);
                
                if (error.response?.status === 401) {
                    console.error("⚠️ UNAUTHORIZED - Check Firebase Database Rules!");
                    throw new Error("Database permission denied. Please check Firebase Rules.");
                }
                
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