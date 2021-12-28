<template>
  <div :class="isPersonal ? 'personal-wrapper' : 'field-wrapper'" :id="'wrapper-' + identify">
    <div v-if="date" class="date">
      <label class="date-label" for="identify">{{ labelName }}</label>
      <input
        v-model="strValue"
        :id="identify"
        type="date"
        :class="isRequired ? 'is-date-error' : 'date-input'"
        v-on:blur="$emit('createDate', [strValue, identify])"
      />
    </div>

    <!-------------1 Stage Personal------------------------->
    <div v-if="isPersonal" class="form-personal">
      <input
        v-model="$v.personalValue.$model"
        v-on:blur="$emit('createLastName', [personalValue, identify])"
        type="text"
        :id="identify"
        :class="$v.personalValue.$error || isRequired ? 'is-error' : 'form-input'"
        autocomplete="off"
        placeholder=" "
      />
      <label :for="identify" class="form-label">{{ labelName }}</label>
      <span
        v-if="
          $v.personalValue.$dirty && !$v.personalValue.minLength && !$v.personalValue.processAlpha
        "
        class="error-message"
        >Поле {{ labelName }} должно быть более 2 символов и состоять из букв</span
      >
      <span v-else-if="$v.personalValue.$dirty && !$v.personalValue.minLength" class="error-message"
        >Поле {{ labelName }} должно быть более 2 символов</span
      >
      <span
        v-else-if="$v.personalValue.$dirty && !$v.personalValue.processAlpha"
        class="error-message"
        >Поле {{ labelName }} должно состоять из букв</span
      >
    </div>

    <!-----------------------2 Stage Adress--------------------->
    <div v-if="isAdress" class="form-adress">
      <input
        v-if="identify !== 'streetAdress' && identify !== 'zipCode'"
        v-model="$v.adress.$model"
        type="text"
        :id="identify"
        v-on:blur="$emit('createAdress', [adress, identify])"
        :class="$v.adress.$error || isRequired ? 'is-error' : 'form-input'"
        autocomplete="off"
        placeholder=" "
      />
      <input
        v-else
        v-model="$v.numValue.$model"
        type="text"
        :id="identify"
        :class="$v.numValue.$error ? 'is-error' : 'form-input'"
        autocomplete="off"
        placeholder=" "
      />
      <label :for="identify" class="form-label">{{ labelName }}</label>
      <span
        v-if="
          $v.adress.$dirty &&
          !$v.adress.processAlphaRegion &&
          (identify !== 'streetAdress' || identify !== 'zipCode')
        "
        class="error-message"
        >Поле {{ labelName }} должно состоять из букв</span
      >
      <span
        v-if="
          $v.numValue.$dirty &&
          !$v.numValue.numeric &&
          (identify === 'streetAdress' || identify === 'zipCode')
        "
        class="error-message"
        >Поле {{ labelName }} должно состоять из цифр</span
      >
    </div>

    <!---------------------------3 Stage Document----------------->
    <div v-if="isPassport" class="form-document">
      <input
        v-if="identify !== 'series' && identify !== 'number'"
        v-model="$v.strValue.$model"
        type="text"
        :id="identify"
        :class="$v.strValue.$error ? 'is-error' : 'form-input'"
        autocomplete="off"
        placeholder=" "
      />
      <input
        v-else
        v-model="$v.numValue.$model"
        type="text"
        :id="identify"
        :class="$v.numValue.$error ? 'is-error' : 'form-input'"
        autocomplete="off"
        placeholder=" "
      />
      <label :for="identify" class="form-label">{{ labelName }}</label>
      <span
        v-if="
          $v.strValue.$dirty &&
          !$v.strValue.processAlpha &&
          (identify !== 'series' || identify !== 'number')
        "
        class="error-message"
        >Поле {{ labelName }} должно состоять из букв</span
      >
      <span v-if="$v.numValue.$dirty && !$v.numValue.numeric" class="error-message"
        >Поле {{ labelName }} должно состоять из цифр</span
      >
    </div>
  </div>
</template>

<script>
  import { validationMixin } from "vuelidate";
  import { minLength, numeric } from "vuelidate/lib/validators";
  import { processAlpha, processAlphaRegion } from "../../validators";

  export default {
    name: "entry-field",
    props: {
      date: { type: Boolean },
      identify: { type: String, require: true },
      labelName: { type: String, require: true },
      isAdress: { type: Boolean },
      isPersonal: { type: Boolean },
      isPassport: { type: Boolean },
      isRequired: { type: Boolean },
    },
    data() {
      return {
        personalValue: "",
        strValue: "",
        adress: "",
        numValue: "",
      };
    },
    mixins: [validationMixin],
    validations: {
      personalValue: {
        minLength: minLength(2),
        processAlpha,
      },
      adress: {
        processAlphaRegion,
      },
      strValue: {
        processAlpha,
      },
      numValue: {
        numeric,
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../scss/_vars.scss";
  @import "../../scss/_mixins.scss";
  @import "../../scss/media.scss";

  .personal-wrapper,
  .field-wrapper {
    &:nth-child(2) {
      margin-left: 0.1em;
    }
    &:last-child {
      margin-left: 0.5em;
    }
  }

  .date {
    width: 100%;
    .label-date {
      margin-bottom: $mrg-label;
    }
  }
  .form-personal,
  .form-adress,
  .form-document {
    display: inline-block;
    position: relative;
    width: 10em;
    height: 3em;
    @media (max-width: map-get($breack-point, mobile)) {
      width: 12em;
    }
  }
  .form-adress {
    width: 15em;
    @media (max-width: map-get($breack-point, mobile)) {
      width: 12em;
    }
  }
  .form-document {
    width: 15em;
    @media (max-width: map-get($breack-point, mobile)) {
      width: 12em;
    }
  }

  /*---------------------------1 Stage-----------------------------*/
  #wrapper-lastName {
    margin: 0em;
    flex-basis: 100%;
    width: 100%;
    .form-personal {
      width: 100%;
      margin-bottom: 0.3rem;
    }
  }
  #wrapper-firstName,
  #wrapper-patronymic {
    flex: 1;
  }
  #wrapper-firstName .form-personal,
  #wrapper-patronymic .form-personal {
    width: 100%;
  }
  #wrapper-date {
    flex: 1;
  }
  .form-input,
  .date-input {
    @include formInputStyle(true);
  }
  .date-input {
    position: static;
    font-size: 0.9rem;
  }
  .form-label {
    @include formLabelStyle();
  }
  .date-label {
    font-size: 1.05rem;
    position: relative;
    top: -0.3em;
  }
  .form-input:focus ~ .form-label,
  .form-input:not(:placeholder-shown).form-input:not(:focus) ~ .form-label {
    @include toUpLabel();
  }
  .is-error {
    @include formInputStyle(false);
  }
  .is-date-error {
    @include formInputStyle(false);
  }
  .is-date-error {
    position: static;
    font-size: 0.9rem;
  }
  .is-error:focus ~ .form-label,
  .is-error:not(:placeholder-shown).is-error:not(:focus) ~ .form-label {
    @include toUpLabel();
  }
  .error-message {
    position: absolute;
    top: 3.4em;
    font-size: 0.8rem;
    line-height: 12px;
    color: red;
    @media (max-width: map-get($breack-point, mobile)) {
      top: 3.5em;
      font-size: 0.75rem;
    }
  }

  /*---------------------------3 Stage-----------------------------*/
  #wrapper-getDate,
  #wrapper-get {
    margin: 0em;
  }
  #wrapper-get {
    flex: 1;
    .form-document {
      width: 100%;
    }
  }
</style>
