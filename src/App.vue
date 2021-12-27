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
          $v.form.multi.$error,
        ]"
        @transfer="getInfo"
        @transferName="getInfo"
        @transferLastName="getInfo"
        @transferDate="getInfo"
        @transferMultiSelect="getInfo"
      />
      <adress :isRequired="[$v.form.sity.$error]" @transferAdress="getInfo" />
      <passport-data
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
          multi: "",
          sity: "",
          typeDoc: "",
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
        multi: {
          required,
        },
        sity: {
          required,
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
            return (this.form[identify] = info);
          case "lastName":
            return (this.form[identify] = info);
          case "phoneNumber":
            return (this.form[identify] = info);
          case "multi":
            return (this.form[identify] = info);
          case "sity":
            return (this.form[identify] = info);
          case "date":
            return (this.form[identify] = info);
          case "typeDoc":
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
  @import "./scss/main.scss";
  .error-message {
    font-size: 0.9rem;
    color: red;
  }
</style>
