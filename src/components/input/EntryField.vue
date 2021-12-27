<template>
  <div class="field-wrapper">
    <div v-if="date" class="date">
      <label class="label-date" for="identify">{{ labelName }}</label>
      <input
        v-model="dateValue"
        id="identify"
        type="date"
        :class="isRequired ? 'is-date-error' : 'date-input'"
        v-on:blur="$emit('createDate', [dateValue, identify])"
      />
      <!-- <input
        v-else
        v-model="dateValue"
        id="identify"
        type="date"
        class="date-input"
        v-on:blur="$emit('createGetDate', dateValue, identify)"
      />-->
    </div>

    <!--1 Stage Personal-->
    <div v-if="isPersonal" class="form-control">
      <!--<input
        v-if="identify === 'firstName'"
        v-model="$v.firstName.$model"
        v-on:blur="$emit('createName', [firstName, identify])"
        type="text"
        :id="identify"
        :class="$v.firstName.$error || isRequired[0] ? 'is-error' : 'form-input'"
        autocomplete="off"
        placeholder=" "
      />
      <input
        v-if="identify === 'lastName'"
        v-model="$v.lastName.$model"
        v-on:blur="$emit('createLastName', [lastName, identify])"
        type="text"
        :id="identify"
        :class="$v.lastName.$error || isRequired[1] ? 'is-error' : 'form-input'"
        autocomplete="off"
        placeholder=" "
      />
      <input
        v-else
        v-model="$v.patronymic.$model"
        type="text"
        :id="identify"
        :class="$v.patronymic.$error ? 'is-error' : 'form-input'"
        autocomplete="off"
        placeholder=" "
      />-->
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
        v-model="$v.adress.$model"
        type="text"
        :id="identify"
        v-on:blur="$emit('createAdress', [adress, identify])"
        :class="$v.value.$error || isRequired ? 'is-error' : 'form-input'"
        autocomplete="off"
        placeholder=" "
      />
      <label :for="identify" class="form-label">{{ labelName }}</label>
      <span
        v-if="$v.adress.$dirty && !$v.adress.processAlphaRegion && identify !== 'streetAdress'"
        class="error-message"
        >Поле {{ labelName }} должно состоять из букв</span
      >
      <!--<span
        v-if="
          $v.value.$dirty &&
          !$v.value.numeric &&
          (identify === 'streetAdress' || identify === 'zipCode')
        "
        class="error-message"
        >Поле {{ labelName }} должно состоять из цифр</span
      >-->
    </div>

    <!--3 Stage Pasport-->
    <div v-if="isPassport" class="form-passport">
      <input
        v-model="$v.value.$model"
        type="text"
        :id="identify"
        :class="$v.value.$error ? 'is-error' : 'form-input'"
        autocomplete="off"
        placeholder=" "
      />
      <label :for="identify" class="form-label">{{ labelName }}</label>
      <span
        v-if="$v.value.$dirty && !$v.value.processAlphaRegion && identify !== 'streetAdress'"
        class="error-message"
        >Поле {{ labelName }} должно состоять из букв</span
      >
      <span
        v-if="
          $v.value.$dirty && !$v.value.numeric && (identify === 'series' || identify === 'number')
        "
        class="error-message"
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
        adress: "",
        dateValue: "",
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
      value: {
        numeric,
      },
    },
    /*computed: {
      required() {
        if (this.labelName[this.labelName.length - 1] === "*") {
          return true;
        }
        return false;
      },
    },*/
  };
</script>

<style lang="scss" scoped>
  @import "../../scss/_vars.scss";
  @import "../../scss/_mixins.scss";
  .date {
    width: 50%;
    .label-date {
      margin-bottom: $mrg-label;
    }
  }
  .form-control,
  .form-adress,
  .form-passport {
    display: inline-block;
    position: relative;
    width: 10rem;
    height: 3em;
    &:not(:first-child) {
      margin-left: 0.3em;
    }
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
