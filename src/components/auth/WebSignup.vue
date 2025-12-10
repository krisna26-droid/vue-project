<template>
  <div class="signup-wrapper">
    <div class="signup-container shadow">
      <div class="text-center mb-4">
        <img src="../../assets/images/Logo.png" alt="Logo" class="signup-logo" />
        <h2 class="mt-3 fw-bold">Create your account</h2>
        <p class="text-muted">Enter your details to use all the app features.</p>
      </div>

      <form class="mt-3" @submit.prevent="register">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label fw-semibold">First Name</label>
            <input 
              type="text"
              class="form-control"
              placeholder="Ex : Jack"
              v-model="signupData.firstName"
            />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label fw-semibold">Last Name</label>
            <input 
              type="text"
              class="form-control"
              placeholder="Ex : Sparrow"
              v-model="signupData.lastName"
            />
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Username</label>
          <input 
            type="text"
            class="form-control"
            placeholder="Your Username"
            v-model="signupData.username"
          />
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Email</label>
          <input 
            type="email"
            class="form-control"
            placeholder="Your Email"
            v-model="signupData.email"
          />
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Password</label>
          <input 
            type="password"
            class="form-control"
            placeholder="Your Password"
            v-model="signupData.password" 
            @input="passwordCheck"
          />
          <p class="text-danger mt-1 fw-medium" style="font-size:11px" :style="{ display: passwordStatusDisplay }">
            The password must be at least 8 characters long and contain a mix of letters, numbers, and special characters.
          </p>
        </div>

        <div class="mb-4">
          <label class="form-label fw-semibold">Confirm Password</label>
          <input 
            type="password"
            class="form-control"
            placeholder="Confirm Your Password"
            v-model="signupData.confirmPassword"
            @input="confirmationPasswordCheck"
          />
          <p class="text-danger mt-1 fw-medium" style="font-size: 11px" :style="{ display: confirmationPasswordDoesNotMatch }">
            Passwords do not match.
          </p>
          <p class="text-success mt-1 fw-medium" style="font-size: 11px" :style="{ display: confirmationPasswordMatch }">
            Passwords match.
          </p>
        </div>

        <!-- FOTO PROFIL -->
        <div class="my-4">
          <label class="form-label fw-semibold">Profile Photo</label>
          <input 
            type="file" 
            class="form-control" 
            accept="image/*"
            @change="checkImage" 
          />

          <div class="position-relative d-flex justify-content-center mt-3">
            <div class="profile-photo-wrapper">
              <img :src="signupData.imageLink || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect fill=%22%23ddd%22 width=%22120%22 height=%22120%22/%3E%3Ctext fill=%22%23999%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3EPhoto%3C/text%3E%3C/svg%3E'" class="profile-photo" alt="Profile" />
            </div>

            <div class="camera-icon position-absolute">
              <i class="fa-solid fa-camera"></i>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          class="btn btn-signup w-100 rounded-pill"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Signing Up...' : 'Sign Up' }}
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";

const store = useStore();
const router = useRouter();

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

const passwordStatusDisplay = ref("none");
const confirmationPasswordDoesNotMatch = ref("none");
const confirmationPasswordMatch = ref("none");
const isSubmitting = ref(false);

// Password validation regex: at least 8 chars, contains letters, numbers, and special characters
const isPasswordValid = (password) => {
  if (password.length < 8) return false;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasLetter && hasNumber && hasSpecial;
};

const passwordCheck = (value) => {
  if (!isPasswordValid(signupData.password)) {
    passwordStatusDisplay.value = "block";
  } else {
    passwordStatusDisplay.value = "none";
  }
  
  // Recheck confirmation password if it's already filled
  if (signupData.confirmPassword) {
    confirmationPasswordCheck();
  }
};

const confirmationPasswordCheck = () => {
  if (signupData.confirmPassword === "") {
    confirmationPasswordDoesNotMatch.value = "none";
    confirmationPasswordMatch.value = "none";
    return; 
  }
  
  if (signupData.password !== signupData.confirmPassword) {
    confirmationPasswordDoesNotMatch.value = "block";
    confirmationPasswordMatch.value = "none";
    return;
  }

  confirmationPasswordDoesNotMatch.value = "none";
  confirmationPasswordMatch.value = "block";
};

const checkImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    signupData.imageLink = reader.result;
  });
};

const register = async () => {
  // Debug: Log semua data
  console.log("=== FORM DATA ===");
  console.log("First Name:", signupData.firstName);
  console.log("Last Name:", signupData.lastName);
  console.log("Username:", signupData.username);
  console.log("Email:", signupData.email);
  console.log("Password:", signupData.password ? "***filled***" : "EMPTY");
  console.log("Confirm Password:", signupData.confirmPassword ? "***filled***" : "EMPTY");
  console.log("Image Link:", signupData.imageLink ? "Image loaded" : "No image");
  
  // Validate all fields
  if (!signupData.firstName || !signupData.lastName || !signupData.username || !signupData.email) {
    alert("Please fill in all required fields");
    return;
  }

  // Validate password
  if (!isPasswordValid(signupData.password)) {
    passwordStatusDisplay.value = "block";
    alert("Password must be at least 8 characters and contain letters, numbers, and special characters");
    return;
  }

  // Check if passwords match
  if (signupData.password !== signupData.confirmPassword) {
    confirmationPasswordDoesNotMatch.value = "block";
    alert("Passwords do not match");
    return;
  }

  console.log("=== SENDING TO FIREBASE ===");
  
  try {
    isSubmitting.value = true;
    
    // Step 1: Register user
    await store.dispatch("auth/getRegisterData", signupData);
    console.log("Registration successful!");
    
    // Step 2: Login otomatis setelah register berhasil
    console.log("=== AUTO LOGIN ===");
    await store.dispatch("auth/login", {
      email: signupData.email,
      password: signupData.password
    });
    console.log("Auto login successful!");
    
    // Step 3: Redirect ke homepage
    // Ganti "/" dengan route homepage Anda (misal: "/home" atau "/dashboard")
    router.push("/");
    
  } catch (error) {
    console.error("Registration/Login failed:", error);
    
    let errorMessage = "Registration failed. ";
    
    if (error.response?.data?.error?.message) {
      const firebaseError = error.response.data.error.message;
      
      if (firebaseError.includes("EMAIL_EXISTS")) {
        errorMessage += "This email is already registered.";
      } else if (firebaseError.includes("INVALID_EMAIL")) {
        errorMessage += "Invalid email format.";
      } else if (firebaseError.includes("WEAK_PASSWORD")) {
        errorMessage += "Password is too weak (minimum 6 characters).";
      } else {
        errorMessage += firebaseError;
      }
    } else {
      errorMessage += error.message || "Please try again.";
    }
    
    alert(errorMessage);
  } finally {
    isSubmitting.value = false;
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

.btn-signup:disabled {
  background-color: #9999dc;
  cursor: not-allowed;
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
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
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