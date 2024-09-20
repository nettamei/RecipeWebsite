<template>
  <div class="register-page">
    <div class="container">
      <h1 class="title">Register</h1>
      <b-form @submit.prevent="onRegister" @reset.prevent="onReset" class="mt-4">
        <!-- Username -->
        <b-form-group
          id="input-group-username"
          label-cols-sm="3"
          label="Username:"
          label-for="username"
          class="mb-4"
        >
          <b-form-input
            id="username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.username.required">
            Username is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.username.length">
            Username length should be between 3-8 characters long
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.username.alpha">
            Username must be alphabetic
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- First Name -->
        <b-form-group
          id="input-group-firstName"
          label-cols-sm="3"
          label="First Name:"
          label-for="firstName"
          class="mb-4"
        >
          <b-form-input
            id="firstName"
            v-model="$v.form.firstName.$model"
            type="text"
            :state="validateState('firstName')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.firstName.required">
            First Name is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.firstName.length">
            First name length should be at least 2 letters
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.firstName.alpha">
            First name must be alphabetic
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Last Name -->
        <b-form-group
          id="input-group-lastName"
          label-cols-sm="3"
          label="Last Name:"
          label-for="lastName"
          class="mb-4"
        >
          <b-form-input
            id="lastName"
            v-model="$v.form.lastName.$model"
            type="text"
            :state="validateState('lastName')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.lastName.required">
            Last Name is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.lastName.length">
            Last name length should be at least 2 letters
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.lastName.alpha">
            Last name must be alphabetic
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Country -->
        <b-form-group
          id="input-group-country"
          label-cols-sm="3"
          label="Country:"
          label-for="country"
          class="mb-4"
        >
          <b-form-select
            id="country"
            v-model="$v.form.country.$model"
            :options="countries"
            :state="validateState('country')"
            direction="down"
          ></b-form-select>
          <b-form-invalid-feedback v-if="!$v.form.country.required">
            Country is required
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Email -->
        <b-form-group
          id="input-group-email"
          label-cols-sm="3"
          label="Email:"
          label-for="email"
          class="mb-4"
        >
          <b-form-input
            id="email"
            v-model="$v.form.email.$model"
            type="email"
            :state="validateState('email')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.email.required">
            Email is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.email.email">
            Please enter a valid email address
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Password -->
        <b-form-group
          id="input-group-password"
          label-cols-sm="3"
          label="Password:"
          label-for="password"
          class="mb-4"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.password.required">
            Password is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.password.length">
            Password must be between 5-10 characters long
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.password.containsNumber">
            Password must contain at least one number
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.password.containsSpecial">
            Password must contain at least one special character
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Confirm Password -->
        <b-form-group
          id="input-group-confirmedPassword"
          label-cols-sm="3"
          label="Confirm Password:"
          label-for="confirmedPassword"
          class="mb-4"
        >
          <b-form-input
            id="confirmedPassword"
            type="password"
            v-model="$v.form.confirmedPassword.$model"
            :state="validateState('confirmedPassword')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
            Password confirmation is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-else-if="!$v.form.confirmedPassword.sameAsPassword"
          >
            The confirmed password must match the original password
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Buttons -->
        <b-row class="justify-content-center">
          <b-col cols="6" class="pr-1">
            <b-button type="reset" variant="dark" block>Reset</b-button>
          </b-col>
          <b-col cols="6" class="pl-1">
            <b-button
              type="submit"
              variant="secondary"
              block
            >
              Register
            </b-button>
          </b-col>
        </b-row>

        <!-- Already have an account -->
        <div class="mt-4 text-center">
          <p class="mb-0">Already have an account?</p>
          <router-link to="login" class="text-primary">Log in here</router-link>
        </div>
      </b-form>

      <!-- Error Alert -->
      <b-alert
        v-if="form.submitError"
        variant="danger"
        dismissible
        show
        class="mt-3"
      >
        Register failed: {{ form.submitError }}
      </b-alert>
    </div>
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";

const containsNumber = (value) => /\d/.test(value);
const containsSpecial = (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value);

import { mockRegister } from "../services/auth.js";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: countries
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstName: {
        required,
        length: (u) => minLength(2)(u),
        alpha
      },
      lastName: {
        required,
        length: (u) => minLength(2)(u),
        alpha
      },
      country: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        containsNumber,
        containsSpecial
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      try {
        const userDetails = {
          username: this.form.username,
          password: this.form.password,
          firstname: this.form.firstName,
          lastname: this.form.lastName,
          country: this.form.country,
          email: this.form.email
        };
        const response = await this.axios.post(
          this.$root.store.server_domain + "/register", userDetails
        );
        // const response = mockRegister(userDetails);
        this.$router.push("/login");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
  margin: 20px auto;
  padding: 2rem;
  background-color: rgba(44, 44, 46, 0.8); /* Transparent background */
  color: #fff;
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.register-page {
  padding-top: 3px; 
  padding-bottom: 3px;
  min-height: calc(100vh - 80px); 
}

.title {
  text-align: center;
  color: #ffffff;
}

.b-form-group {
  margin-bottom: 1.5rem;
}

.b-form-invalid-feedback,
.b-form-text {
  color: #ff6347;
}

.b-row {
  margin: 0;
}

.b-col {
  padding: 0;
}

.b-button {
  border-radius: 20px; /* Rounded buttons */
}

.text-primary {
  color: #a09e9e !important;
}

.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 2rem;
}

.mt-3 {
  margin-top: 1rem;
}
</style>
