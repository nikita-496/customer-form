<template>
  <section class="wrapper-adress">
    <legend><span class="stage">2</span>Адресс</legend>
    <div class="row">
      <entry-field
        :isAdress="true"
        v-for="n in 2"
        :key="n"
        :identify="n === 1 ? 'sity' : 'region'"
        :labelName="n === 1 ? 'Город*' : 'Область'"
        :isRequired="n === 1 ? isRequired[0] : false"
        @createAdress="$emit('transferAdress', $event)"
      />
    </div>
    <div class="row">
      <entry-field
        :isAdress="true"
        v-for="n in 2"
        :key="n"
        :identify="n === 1 ? 'street' : 'streetAdress'"
        :labelName="n === 1 ? 'Улица' : 'Дом'"
      />
    </div>
    <div class="row">
      <entry-field
        :isAdress="true"
        v-for="n in 2"
        :key="n"
        :identify="n === 1 ? 'zipCode' : 'Country'"
        :labelName="n === 1 ? 'Индекс' : 'Страна'"
      />
    </div>
  </section>
</template>

<script>
  import EntryField from "../components/input/EntryField.vue";
  export default {
    components: { EntryField },
    props: {
      isRequired: { type: Array, require: true },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../scss/_vars.scss";
  @import "../scss/_mixins.scss";
  .wrapper-adress {
    @include wrapperStyle(0.5em);
  }
  .row {
    @include rowStyle;
    margin-bottom: 0.6em;
    @media (max-width: map-get($breack-point, mobile)) {
      margin-bottom: 1.2em;
    }
  }
  .stage {
    @include stageStyle;
  }
  legend {
    @include legendStyle;
  }
</style>
