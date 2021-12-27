<template>
  <div :class="isSingle ? 'container-single-radio' : 'container-radio'">
    <legend class="legend-radio">{{ labelName }}</legend>
    <div v-if="!isSingle" class="row-radio">
      <input type="radio" class="input-radio" id="radio" name="male" />
      <label class="radio-label" for="radio">М</label>
      <input type="radio" class="input-radio" id="radio" name="male" />
      <label class="radio-label" for="radio">Ж</label>
    </div>
    <!--Включать/Откючать чекбокс-->
    <div v-else class="row-radio">
      <input type="radio" class="input-radio" id="radio" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "custom-check-box",
    props: {
      isSingle: { type: Boolean },
      labelName: { type: String, require: true },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../scss/_vars.scss";
  .container-radio {
    display: inline-flex;
    flex-direction: column;
    flex-basis: 11em;
    .legend-radio {
      margin-bottom: $mrg-label;
    }
  }
  .container-single-radio {
    display: inline-flex;
    flex-basis: 15em;
    flex-flow: row-reverse;
  }
</style>
