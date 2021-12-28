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
    <span v-if="$v.phone.$dirty && !$v.phone.checkFirstSymbol" class="error-message"
      >Номер должен начинаться с 7</span
    >
    <span
      v-if="$v.phone.$dirty && !$v.phone.minLength && !$v.phone.checkFirstSymbol"
      class="error-message"
      >Номер должен начинаться с 7 и состоять из 11 цифр</span
    >
    <span
      v-if="$v.phone.$dirty && !$v.phone.minLength && $v.phone.checkFirstSymbol"
      class="error-message"
      >Длинна номера должна состоять <br />из 11 цифр</span
    >
    <span class="counter">{{ counter }}/11</span>
  </div>
</template>

<script>
  import { validationMixin } from "vuelidate";
  import { minLength } from "vuelidate/lib/validators";
  import { checkFirstSymbol } from "../../validators";

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
        minLength: minLength(15),
        checkFirstSymbol,
      },
    },
    computed: {
      //Счетчик подсчитывает только количество цифр в номере телефона
      counter() {
        const exceptionSymbol = ["(", ")", "-"];
        return this.phone.split("").filter((symbol) => !exceptionSymbol.includes(symbol)).length;
      },
    },
    watch: {
      phone: function (newVal, prevVal) {
        let currLen = newVal.length;
        let prevLen = prevVal.length;
        let symbolPhone = { openBracket: "(", closeBracket: ")", dash: "-" };
        if (currLen > 15) {
          let limitSymbol = this.phone.slice(0, -1);
          this.phone = limitSymbol;
          return;
        }
        this.phone = allowValidSymbol(this.phone);

        //Автоматическое добавление спец.сиволов - "(", ")", "-" при достижении
        //определенной длинны символов
        //иначе продолжать выводить цифра в поле
        switch (currLen) {
          case 1:
            return (this.phone = convertToPhoneFormat(this.phone, symbolPhone.openBracket));
          case 5:
            return (this.phone = convertToPhoneFormat(this.phone, symbolPhone.closeBracket));
          case 9:
            return (this.phone = convertToPhoneFormat(this.phone));
          case 12:
            return (this.phone = convertToPhoneFormat(this.phone));
          default:
            return this.phone;
        }

        function allowValidSymbol(subject) {
          const regex = /\d|[()-]/g;
          let found = subject.match(regex);
          if (found === null) {
            found = 0;
          }
          const regexLen = /\d/g;
          //Номер телефона должен пройти проверку в шаблоне (regex)
          //и введенные пользователем символы должны быть только цифры (11 цифр из 15 сиволов в поле)
          if (
            found.length !== subject.length ||
            (subject.length === 15 && subject.match(regexLen).length < 11)
          ) {
            return (subject = subject.slice(0, -1));
          }
          return subject;
        }

        function convertToPhoneFormat(subject, symbol = symbolPhone.dash) {
          //Если символы в поле стираются пользователем
          if (prevLen > currLen) {
            return subject.slice(0, -1);
          }
          if (subject === "") {
            return subject;
          }
          return (subject += symbol);
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
    width: 15em;
    @media (max-width: map-get($breack-point, mobile)) {
      width: 100%;
    }
    legend {
      position: absolute;
      top: -1.7em;
      padding: 0;
      font-size: 1.05rem;
    }
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
    top: 3.5em;
    font-size: 0.8rem;
    line-height: 12px;
    color: red;
    @media (max-width: map-get($breack-point, mobile)) {
      top: 3.5em;
      font-size: 0.75rem;
    }
  }
  .counter {
    position: absolute;
    top: 3.5em;
    right: 0;
    font-size: 0.8rem;
  }
</style>
