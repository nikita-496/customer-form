<template>
  <main class="main">
    <form class="form" @submit.prevent="submit">
      <h2 class="form-header">Регистрация</h2>
      <h4 class="error-message" v-if="$v.form.$error">Заполните все обазательные поля*</h4>

      <!--@transfer="get" @transferPersonal="getInfo" @transferDate="getInfo" @transferGetDate="getInfo"-->
      <data-personalization
        :isRequired="[
          $v.form.firstName.$error,
          $v.form.lastName.$error,
          $v.form.date.$error,
          $v.form.phoneNumber.$error,
        ]"
        @transfer="getInfo"
        @transferName="getInfo"
        @transferLastName="getInfo"
        @transferDate="getInfo"
      />
      <adress :isRequired="[$v.form.sity.$error]" @transferAdress="getInfo" />
      <passport-data :isRequired="[$v.form.getDate.$error]" @transferGetDate="getInfo" />
      <custom-button />
    </form>
  </main>
</template>

<script>
  import { validationMixin } from "vuelidate";
  import { required } from "vuelidate/lib/validators";

  import CustomButton from "./components/ui/CustomButton.vue";
  import Adress from "./views/Adress.vue";
  import DataPersonalization from "./views/DataPersonalization.vue";
  import PassportData from "./views/PassportData.vue";

  export default {
    components: { DataPersonalization, Adress, PassportData, CustomButton },
    data() {
      return {
        form: {
          firstName: "",
          lastName: "",
          date: "",
          phoneNumber: "",
          sity: "",
          getDate: "",
        },
      };
    },
    mixins: [validationMixin],
    validations: {
      form: {
        firstName: {
          required,
        },
        lastName: {
          required,
        },
        date: {
          required,
        },
        phoneNumber: {
          required,
        },
        sity: {
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
          console.log(this.$v.form.$error);
        }
      },
      getInfo(e) {
        console.log(e);
        let [info, identify] = [...e];
        console.log(info, identify);
        //debugger;
        switch (identify) {
          case "firstName":
            console.log("тут");
            return (this.form[identify] = info);
          case "lastName":
            return (this.form[identify] = info);
          case "phoneNumber":
            return (this.form[identify] = info);
          case "sity":
            console.log("адресс пришел");
            return (this.form[identify] = info);
          case "date":
            console.log("дата рождения пришла");
            return (this.form[identify] = info);
          case "getDate":
            return (this.form[identify] = info);
          default:
            console.log("Не обязательное поле!");
        }
      },
    },
  };
</script>

<style lang="scss">
  @import "./scss/media.scss";
  .error-message {
    font-size: 0.9rem;
    color: red;
  }
</style>
