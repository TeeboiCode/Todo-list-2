<template>
  <div>
    <div class="login-contain">
      <div class="header">
        <div class="back-btn" @click="$router.back()">
          <img
            src="../../assets/back-arrow-icon.png"
            width="28"
            height="25"
            alt=""
          />
        </div>
        <h3 class="heading">Login</h3>
      </div>

      <div class="login-form-container">
        <p class="des">enter your details below</p>

        <form class="row g-3 needs-validation" novalidate @submit.prevent="handleLogin">
          <div class="col-md-4">
            <label for="validationDefaultUsername" class="form-label">Email</label>
            <div class="input-group">
              <span class="input-group-text border-end-0" id="inputGroupPrepend2">
                <i class="fa-solid fa-envelope" style="color: #a8a9aa"></i>
              </span>
              <input
                type="email"
                placeholder="ayomideakorede0@gmail.com"
                class="form-control border-start-0"
                :class="{ 'is-invalid': errors.email }"
                id="validationDefaultUsername"
                v-model.trim="formValue.email"
                ref="email"
                required
              />
            </div>
          </div>

          <div class="col-md-4">
            <label for="Password" class="form-label">Password</label>
            <div class="input-group">
              <span class="input-group-text border-end-0" id="password">
                <div class="icon">
                  <img
                    src="../../assets/icon-park-solid_personal-privacy.png"
                    width="24"
                    height="24"
                  />
                </div>
              </span>
              <input
                type="password"
                placeholder="Password"
                class="form-control pass border-start-0"
                :class="{ 'is-invalid': errors.password }"
                id="password"
                v-model="formValue.password"
                ref="password"
                required
              />
            </div>
          </div>

          <div class="col-12">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="rememberMe"
                v-model="formValue.rememberMe"
              />
              <label class="form-check-label" for="rememberMe">
                remember me
              </label>
            </div>
          </div>
          <div class="col-12 mt-5">
            <button
              class="btn btn-primary p-3 submitForm w-100"
              type="submit"
            >
              login
            </button>
          </div>
          <div class="col-12 mb-3">
            <p class="footer-link">
              already have an account ?
              <span class="login-link" @click="$emit('signup')">Sign Up</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: "loginVue",
  emits: ["signup"],
  data() {
    return {
      formValue: {
        email: "",
        password: "",
        rememberMe: false
      },
      errors: {
        email: false,
        password: false
      }
    };
  },
  watch: {
    'formValue.email'(newValue) {
      if (newValue.trim()) {
        this.errors.email = false;
      }
    },
    'formValue.password'(newValue) {
      if (newValue) {
        this.errors.password = false;
      }
    }
  },
  methods: {
    resetErrors() {
      this.errors = {
        email: false,
        password: false
      };
    },

    async handleLogin() {
      try {
        this.resetErrors();
        let hasError = false;

        // Validate empty fields
        if (!this.formValue.email.trim()) {
          this.errors.email = true;
          this.$refs.email.focus();
          hasError = true;
        }
        if (!this.formValue.password) {
          this.errors.password = true;
          if (!hasError) this.$refs.password.focus();
          hasError = true;
        }

        if (hasError) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill in all required fields',
            confirmButtonColor: '#09203e'
          });
          return;
        }

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('usersData')) || [];
        const user = users.find(u => u.email === this.formValue.email.trim());

        if (!user) {
          this.errors.email = true;
          await Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Email not found. Please check your email or sign up.',
            confirmButtonColor: '#09203e'
          });
          return;
        }

        if (user.password !== this.formValue.password) {
          this.errors.password = true;
          await Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Incorrect password. Please try again.',
            confirmButtonColor: '#09203e'
          });
          return;
        }

        // If remember me is checked, store the login state
        if (this.formValue.rememberMe) {
          localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            email: user.email,
            fullName: user.fullName
          }));
        }

        // Successful login
        await Swal.fire({
          icon: 'success',
          title: 'Welcome back!',
          text: `Hello, ${user.fullName}`,
          confirmButtonColor: '#09203e'
        });

        // Navigate to dashboard
        this.$router.push('/dashboard');

      } catch (error) {
        console.error('Login error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred during login. Please try again.',
          confirmButtonColor: '#09203e'
        });
      }
    }
  }
};
</script>

<style scoped>
.login-contain {
  padding: 15px 16px;
}

.header {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0 10px;
}

.login-form-container .des {
  color: #a8a9aa;
  font-size: 14px;
  margin-top: 20px;
  font-weight: 300 !important;
}

input::placeholder {
  color: #a8a9aa !important;
  font-size: 14px !important;
  font-weight: 300 !important;
}

input {
  font-size: 14px !important;
  font-weight: 300 !important;
}

label {
  font-size: 16px !important;
  font-weight: 500;
}

.heading {
  font-size: 20px !important;
}

.form-control:focus {
  color: #212529 !important;
  background-color: transparent !important;
  /* border-color: #dee2e6 !important; */
  border-color: #3532326b !important;
  outline: 0;
  box-shadow: none !important;
}

.input-group-text {
  background-color: transparent !important;
  border-color: #3532326b !important;
}

.form-control.pass {
  padding: 0.375rem 2.5rem 0.375rem 0.5rem;
}

.btn-primary.submitForm {
  border-radius: 50px !important;
  background: #09203e !important;
  border-color: #09203e !important;
}

.login-link {
  color: #09203e;
  font-weight: 500;
}

.footer-link {
  font-size: 14px;
  text-align: center;
  font-weight: 300;
  color: #a8a9aa;
}

.form-check-input,
.form-control {
  border-color: #3532326b !important;
}

.form-check-label {
  font-weight: 400;
}

.form-control.is-invalid {
  border-color: #dc3545 !important;
  background-image: none !important;
}

.input-group .form-control.is-invalid {
  z-index: 0;
}
</style>
