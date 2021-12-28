<template>
  <main class="main">
    <form class="form" @submit.prevent="submit">
      <h2 class="form-header">Регистрация</h2>
      <snackbar @close="changeStateSnackbar" :isSuccess="isSuccess" :isError="isError" />
      <personalization
        :isRequired="[
          $v.form.lastName.$error,
          $v.form.firstName.$error,
          $v.form.date.$error,
          $v.form.phoneNumber.$error,
          $v.form.multi.$error,
        ]"
        @transfer="getInfo"
        @transferName="getInfo"
        @transferLastName="getInfo"
        @transferDate="getInfo"
        @transferMultiSelect="getInfo"
      />
      <adress :isRequired="[$v.form.sity.$error]" @transferAdress="getInfo" />
      <document
        :isRequired="[$v.form.typeDoc.$error, $v.form.getDate.$error]"
        @transferSelect="getInfo"
        @transferGetDate="getInfo"
      />
      <custom-button />
    </form>
  </main>
</template>

<script>
  import { validationMixin } from "vuelidate";
  import { required, minLength } from "vuelidate/lib/validators";
  import { validLength, checkFirstSymbol, processAlpha, processAlphaRegion } from "./validators";

  import CustomButton from "./components/ui/CustomButton.vue";
  import Adress from "./views/Adress.vue";
  import Personalization from "./views/Personalization.vue";
  import Document from "./views/Document.vue";
  import Snackbar from "./components/Snackbar.vue";

  export default {
    components: { Personalization, Adress, Document, Snackbar, CustomButton },
    data() {
      return {
        form: {
          firstName: "",
          lastName: "",
          date: "",
          phoneNumber: "",
          multi: "",
          sity: "",
          typeDoc: "",
          getDate: "",
        },
        isSuccess: false,
        isError: false,
      };
    },
    mixins: [validationMixin],
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(2),
          processAlpha,
        },
        lastName: {
          required,
          minLength: minLength(2),
          processAlpha,
        },
        date: {
          required,
        },
        phoneNumber: {
          required,
          validLength,
          checkFirstSymbol,
        },
        multi: {
          required,
        },
        sity: {
          required,
          processAlphaRegion,
        },
        typeDoc: {
          required,
        },
        getDate: {
          required,
        },
      },
    },
    methods: {
      submit() {
        this.$v.form.$touch();
        if (this.$v.form.$error) {
          this.isError = true;
          this.isSuccess = false;
          return;
        }
        this.isSuccess = true;
      },
      getInfo(e) {
        let [info, identify] = [...e];
        return (this.form[identify] = info);
      },
      changeStateSnackbar(e) {
        if (e === "success") {
          return (this.isSuccess = false);
        }
        return (this.isError = false);
      },
    },
  };
</script>

<style lang="scss">
  @import "./scss/main.scss";

  body {
    background-image: url("/img/cover2.49b3ab92.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
