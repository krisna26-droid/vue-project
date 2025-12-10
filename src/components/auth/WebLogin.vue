<template>
  <div class="login-wrapper">
    <div class="login-container shadow">

      <!-- Header -->
      <div class="text-center mb-4">
        <img src="../../assets/images/Logo.png" alt="Logo" class="login-logo" />
        <h2 class="mt-3 fw-bold">Log in to your account</h2>
        <p class="text-muted">Welcome back! Please enter your details.</p>
      </div>

      <!-- Form -->
      <form class="mt-4" @submit.prevent="handleLogin">

        <!-- Email -->
        <div class="my-3">
          <label class="form-label fw-semibold">Email</label>
          <input 
            type="email" 
            class="form-control input-modern"
            placeholder="Enter your email"
            label="Email"
            v-model="loginData.email"
          />
        </div>

        <!-- Password -->
        <div class="my-3">
          <label class="form-label fw-semibold">Password</label>
          <input 
            type="password" 
            class="form-control input-modern"
            placeholder="Enter your password"
            v-model="loginData.password"
          />
        </div>

        <!-- Button -->
        <button type="submit" class="btn btn-login w-100 mt-3 py-2">
          Log In
        </button>
      </form>

      <!-- Signup Link -->
      <div class="text-center mt-4">
        <p class="fw-semibold">
          Don’t have an account?
          <router-link 
            :to="{ name: 'signupPage' }" 
            class="signup-link"
          >
            Signup
          </router-link>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import {reactive} from 'vue';

const loginData = reactive({
  email: '',
  password: '',
  isLogin: true
});


export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    handleLogin() {
      console.log("Login Email:", this.email);
      console.log("Login Password:", this.password);
      this.$router.push({ name: "homePage" });
    }
  }
};
</script>

<style scoped>
/* WRAPPER */
.login-wrapper {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

/* CARD */
.login-container {
  background: #ffffff;
  padding: 40px 35px;
  border-radius: 14px;
  width: 100%;
  max-width: 420px;
}

/* LOGO */
.login-logo {
  width: 90px;
}

/* INPUT MODERN */
.input-modern {
  border-radius: 10px;
  padding: 10px 12px;
  border: 1px solid #dcdcdc;
  transition: all 0.25s ease;
}

.input-modern:focus {
  border-color: #4c4ddc;
  box-shadow: 0 0 0 3px rgba(76, 77, 220, 0.15);
}

/* BUTTON LOGIN */
.btn-login {
  background-color: #4c4ddc;
  color: white;
  font-weight: 600;
  border-radius: 10px;
  transition: 0.2s ease-in-out;
}

.btn-login:hover {
  background-color: #393acc;
}

/* SIGNUP LINK */
.signup-link {
  color: #4c4ddc;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}
</style>
