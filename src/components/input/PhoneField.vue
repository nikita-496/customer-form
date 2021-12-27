<template>
  <div class="form-phone">
    <legend>Номер Телефона*</legend>
    <input
      v-model="$v.phone.$model"
      @keydown.space.prevent
      v-on:blur="$emit('create-phone', [phone, identify])"
      type="text"
      :id="identify"
      :class="$v.phone.$error || isRequired ? 'is-error' : 'form-input'"
      autocomplete="off"
      placeholder=" "
    />
    <label :for="identify" class="form-label">{{ labelName }}</label>
    <!-- <span v-if="$v.phone.$dirty && !$v.phone.required" class="error-message"
      >Обязательное поле</span
    >-->
    <span v-if="$v.phone.$dirty && !$v.phone.checkFirstChar" class="error-message"
      >Номер должен начинаться с 7</span
    >
    <span class="counter">{{ phone.length }}/15</span>
    <!-- <span v-if="$v.phone.$dirty && !$v.phone.numeric" class="error-message"
      >Номер должен состоять из 11 цифр</span
    >-->
    <!--<span v-if="$v.phone.$dirty && !$v.phone.minLength" class="error-message"
      >Длина номера должны быть больше 15-ти символов</span
    >-->
  </div>
</template>

<script>
  import { validationMixin } from "vuelidate";
  import { checkFirstChar, determineLeng } from "../../validators";

  export default {
    name: "phone-field",
    props: {
      identify: { type: String, require: true },
      labelName: { type: String, require: true },
      isRequired: { type: Boolean },
    },
    data() {
      return {
        phone: "",
      };
    },
    mixins: [validationMixin],
    validations: {
      phone: {
        determineLeng,
        checkFirstChar,
      },
    },
    watch: {
      phone: function (newVal, prevVal) {
        let currLen = newVal.length;
        let prevLen = prevVal.length;
        function convertToPhoneNumber(subject, symbol = symbolPhone.dash) {
          if (prevLen > currLen) {
            return subject.slice(0, -1);
          }
          return (subject += symbol);
        }
        let symbolPhone = { openBracket: "(", closeBracket: ")", dash: "-" };
        switch (currLen) {
          case 1:
            return (this.phone = convertToPhoneNumber(this.phone, symbolPhone.openBracket));
          case 5:
            return (this.phone = convertToPhoneNumber(this.phone, symbolPhone.closeBracket));
          case 9:
            return (this.phone = convertToPhoneNumber(this.phone));
          case 12:
            return (this.phone = convertToPhoneNumber(this.phone));
          default:
            return this.phone;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../scss/_vars.scss";
  @import "../../scss/_mixins.scss";

  .form-phone {
    position: relative;
    height: 3em;
    .form-input {
      @include formInputStyle(true);
    }
    .form-label {
      @include formLabelStyle();
    }
    .form-input:focus ~ .form-label,
    .form-input:not(:placeholder-shown).form-input:not(:focus) ~ .form-label {
      @include toUpLabel();
    }
    .is-error {
      @include formInputStyle(false);
    }
    .is-error:focus ~ .form-label,
    .is-error:not(:placeholder-shown).is-error:not(:focus) ~ .form-label {
      @include toUpLabel();
    }
  }

  .error-message {
    position: absolute;
    top: 3em;
    font-size: 0.9rem;
    color: red;
  }
  .counter {
    position: absolute;
    top: 3em;
    right: 0;
    font-size: 0.9rem;
  }
</style>
