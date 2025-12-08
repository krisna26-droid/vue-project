<template>
  <div class="signup-wrapper">
    <div class="signup-container shadow">
      <div class="text-center mb-4">
        <img src="../../assets/images/Logo.png" alt="Logo" class="signup-logo" />
        <h2 class="mt-3 fw-bold">Create your account</h2>
        <p class="text-muted">Enter your details to use all the app features.</p>
      </div>

      <form>
        <div class="row">
          <div class="col-md-6 mb-3">
            <base-input 
              type="text"
              identity="first-name"
              placeholder="Ex : Jack"
              label="First Name"
            />
          </div>

          <div class="col-md-6 mb-3">
            <base-input 
              type="text"
              identity="last-name"
              placeholder="Ex : Sparrow"
              label="Last Name"
            />
          </div>
        </div>

        <div class="mb-3">
          <base-input 
            type="text"
            identity="username"
            placeholder="Your Username"
            label="Username"
          />
        </div>

        <div class="mb-3">
          <base-input 
            type="email"
            identity="email"
            placeholder="Your Email"
            label="Email"
          />
        </div>

        <div class="mb-3">
          <base-input 
            type="password"
            identity="password"
            placeholder="Your Password"
            label="Password"
            v-model="signupData.password" 
            @keyInput="passwordCheck"
          />
          <p class="text-danger mt-1 fw-medium" style="font-size:11px" :style="{ display: passwordStatusDisplay }">
            The password must be at least 8 characters long and contain a mix of letters, numbers, and special characters.
          </p>
        </div>

        <div class="mb-4">
          <base-input 
            type="password"
            identity="confirm-password"
            placeholder="Confirm Your Password"
            label="Confirm Password"
          />
        </div>

        <!-- FOTO PROFIL -->
        <div class="my-4">
          <base-input type="file" identity="recipeImage" label="Profile Photo" isImage="True" @input="checkImage" />

          <div class="position-relative d-flex justify-content-center mt-3">
            <div class="profile-photo-wrapper">
              <img 
                :src="signupData.imageLink || 'https://cdn-icons-png.flaticon.com/512/219/219986.png'"
                alt="User"
                class="profile-photo"
              />
            </div>

            <div class="camera-icon position-absolute">
              <i class="fa-solid fa-camera"></i>
            </div>
          </div>
        </div>

        <button 
          type="button" 
          class="btn btn-signup w-100 rounded-pill"
          @click="goToLogin"
        >
          Sign Up
        </button>
      </form>

      <div class="text-center mt-4">
        <p class="fw-semibold">
          Already have an account?
          <span class="login-link" @click="goToLogin">Login</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import BaseInput from "../ui/BaseInput.vue";
import { reactive, ref } from "vue";

const signupData = reactive({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  isLogin: false,
  imageLink: "",
});

const passwordStatusDisplay = ref(none);
const passwordCheck = (value) => {
  if (signupData.password.length < 8) {
    passwordStatusDisplay.value = "block";
  } else {
    passwordStatusDisplay.value = "none";
  }
} 

const router = useRouter();

const checkImage = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      signupData.imageLink = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const goToLogin = () => router.push("/login");
</script>

<style scoped>
/* WRAPPER UTAMA */
.signup-wrapper {
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.signup-container {
  background: #ffffff;
  padding: 40px 35px;
  border-radius: 14px;
  width: 100%;
  max-width: 620px;
}

/* LOGO */
.signup-logo {
  width: 90px;
}

/* TOMBOL */
.btn-signup {
  background-color: #4c4ddc;
  color: white;
  padding: 12px 0;
  font-weight: 600;
  transition: 0.2s ease-in-out;
}

.btn-signup:hover {
  background-color: #393acc;
}

/* LINK */
.login-link {
  color: #4c4ddc;
  cursor: pointer;
  margin-left: 5px;
}

.login-link:hover {
  text-decoration: underline;
}

/* FOTO PROFIL BULAT & RAPI */
.profile-photo-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e3e3e3;
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ICON CAMERA */
.camera-icon {
  bottom: 0;
  right: 32%;
  transform: translateY(20%);
  background: white;
  padding: 8px;
  border-radius: 50%;
  font-size: 1.1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
</style>