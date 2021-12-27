<!--Еще раз протетсировать валидацию и разобраться сней. Особеннополя во 2 и 3 шаге-->

<template>
  <div :class="isPersonal ? 'personal-wrapper' : 'field-wrapper'" :id="identify">
    <div v-if="date" class="date">
      <label class="label-date" for="identify">{{ labelName }}</label>
      <input
        v-model="strValue"
        id="identify"
        type="date"
        :class="isRequired ? 'is-date-error' : 'date-input'"
        v-on:blur="$emit('createDate', [strValue, identify])"
      />
    </div>

    <!--1 Stage Personal-->
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
      <span v-if="$v.personalValue.$dirty && !$v.personalValue.minLength" class="error-message"
        >Поле {{ labelName }} должно быть более 2 символов</span
      >
      <span v-if="$v.personalValue.$dirty && !$v.personalValue.processAlpha" class="error-message"
        >Поле {{ labelName }} должно состоять из букв</span
      >
    </div>

    <!--2 Stage Adress-->
    <div v-if="isAdress" class="form-adress">
      <input
        v-if="identify !== 'streetAdress' && identify !== 'zipCode'"
        v-model="$v.strValue.$model"
        type="text"
        :id="identify"
        v-on:blur="$emit('createAdress', [strValue, identify])"
        :class="$v.strValue.$error || isRequired ? 'is-error' : 'form-input'"
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

    <!--3 Stage Pasport-->
    <div v-if="isPassport" class="form-passport">
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
          !$v.strValue.processAlphaRegion &&
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
    &:not(:first-child) {
      margin-left: 1.5em;
      @include responsfield;
    }
  }
  .date {
    /*width: 60%;*/
    width: 100%;
    .label-date {
      margin-bottom: $mrg-label;
    }
  }
  .form-personal,
  .form-adress,
  .form-passport {
    display: inline-block;
    position: relative;
    width: 10rem;
    height: 3em;
  }

  /*---------------------------1 Stage-----------------------------*/

  #lastName {
    @include responsOrder;
    .form-personal {
      @include responsLastNameField;
    }
  }
  #date {
    /*margin-left: 45px;
    margin-right: 50px;*/
    width: 130px;
  }
  .form-adress {
    flex-basis: 250px;
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
    top: 3em;
    font-size: 0.8rem;
    color: red;
  }
</style>
