<template>
  <div class="login-page">
    <div class="login-container">
      <h1 class="title">Login</h1>
      <b-form @submit.prevent="onLogin">
        <b-form-group
          id="input-group-Username"
          label-cols-sm="3"
          label="Username:"
          label-for="Username"
        >
          <b-form-input
            id="Username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Username is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-Password"
          label-cols-sm="3"
          label="Password:"
          label-for="Password"
        >
          <b-form-input
            id="Password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Password is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button
          type="submit"
          variant="secondary"
          style="width: 140px;"
          class="mx-auto mt-3 d-block"
        >
          Login
        </b-button>

        <div class="mt-2 text-center">
          <span>Do not have an account yet?</span>
          <router-link to="register" class="ml-1" style="color: #a09e9e;">Register here</router-link>
        </div>
      </b-form>

      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >
        Login failed: {{ form.submitError }}
      </b-alert>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mockLogin } from "../services/auth.js";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: { required },
      password: { required }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const userDetails = {
          username: this.form.username,
          password: this.form.password,
        };
        // const success = true; // Modify this to test the error handling
        const response = await this.axios.post(
          this.$root.store.server_domain + "/login", userDetails 
        );
        // const response = mockLogin(
        //   { username: this.form.username, password: this.form.password },
        //   success
        // );

        this.$root.store.login(this.form.username);
        this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;
      this.Login();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 2rem;
  background-color: rgba(44, 44, 46, 0.8); /* Transparent background */
  color: #fff;
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.login-page {
  padding-top: 3px;
  padding-bottom: 3px;
  min-height: calc(100vh - 80px);
}

.title {
  text-align: center;
}

.b-form-group {
  margin-bottom: 1.5rem;
}

.b-form-invalid-feedback {
  color: #ff6347;
}

.mt-2 {
  margin-top: 1rem;
}

.router-link {
  color: #a09e9e !important;
}
</style>
