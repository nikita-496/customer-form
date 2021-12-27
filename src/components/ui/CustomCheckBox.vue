<template>
  <div :class="isSingle ? 'container-single-radio' : 'container-radio'">
    <legend class="legend-radio">{{ labelName }}</legend>
    <div v-if="!isSingle" class="row-radio">
      <label class="radio-label" for="man">
        <input v-model="male" type="radio" class="input-radio" value="Мan" id="man" name="male" />
        М
      </label>
      <label class="radio-label" for="woman">
        <input
          v-model="male"
          type="radio"
          class="input-radio"
          value="Woman"
          id="woman"
          name="male"
        />
        Ж
      </label>
    </div>
    <!--Включать/Откючать чекбокс-->
    <div v-else class="row-radio">
      <input v-model="isPostSMS" type="checkbox" :value="true" class="input-radio" id="radio" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "custom-check-box",
    data() {
      return {
        isPostSMS: false,
        male: "",
      };
    },
    props: {
      isSingle: { type: Boolean },
      labelName: { type: String, require: true },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../scss/_vars.scss";
  @import "../../scss/media.scss";
  .container-radio {
    display: inline-flex;
    flex-direction: column;
    /*flex-basis: 11em;*/

    @include responsRadio();
    .legend-radio {
      margin-bottom: $mrg-label;
      @include responsLegendRadio();
    }
  }
  .container-single-radio {
    display: inline-flex;
    /*flex-basis: 15em;*/
    flex-flow: row-reverse;
  }
</style>
