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
    flex: 1;
    align-items: center;
    position: relative;
    left: 0.6em;
    @media (max-width: map-get($breack-point, mobile)) {
      position: relative;
      top: 0.8em;
      .legend-radio {
        margin-bottom: 0.25em;
      }
    }
    @include responsRadio();
  }
  .container-single-radio {
    display: inline-flex;
    flex: 1;
    align-items: center;
    flex-flow: row-reverse;
    .legend-radio {
      margin-bottom: 0.2em;
      font-size: 1.05rem;
      @include responsLegendRadio();
    }
    @media (max-width: map-get($breack-point, mobile)) {
      position: relative;
      top: 1em;
      .row-radio {
        position: relative;
        top: 0.1em;
      }
    }
    @include responsRadio();
  }
  .input-radio {
    margin: 0em 0.25em;
  }
</style>
