<template>
  <section class="wrapper-document">
    <legend><span class="stage">3</span>Документы клиента</legend>
    <div class="row-fist">
      <custom-select
        :selectOptions="selectOptions2"
        :defaultValue="selected2"
        :isPaspport="true"
        :isRequired="isRequired[0]"
        @select="optionSelect"
      />
      <entry-field
        identify="getDate"
        labelName="Дата выдачи*"
        :date="true"
        :isRequired="isRequired[1]"
        @createDate="$emit('transferGetDate', $event)"
      />
    </div>

    <div class="row-second">
      <entry-field
        v-for="n in 2"
        :key="n"
        :identify="n === 1 ? 'series' : 'number'"
        :labelName="n === 1 ? 'Серия' : 'Номер'"
        :isPassport="true"
      />
    </div>
    <div class="row-last">
      <entry-field identify="get" labelName="Кем выдан" :isPassport="true" />
    </div>
  </section>
</template>

<script>
  import EntryField from "../components/input/EntryField.vue";
  import CustomSelect from "../components/ui/CustomSelect.vue";
  export default {
    components: { EntryField, CustomSelect },
    props: {
      isRequired: { type: Array, require: true },
    },
    data() {
      return {
        identify: "typeDoc",
        selectOptions2: [
          { name: "option 1", value: "Паспорт" },
          { name: "option 2", value: "Свидетельство о рождении" },
          { name: "option 3", value: "Вод.удостоверение" },
        ],
        selected2: "Тип документа",
      };
    },
    methods: {
      optionSelect(option) {
        this.selected2 = option.value;
        this.$emit("transferSelect", [this.selected2, this.identify]);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../scss/_vars.scss";
  @import "../scss/_mixins.scss";
  @import "../scss/media.scss";
  .wrapper-document {
    @include wrapperStyle(0.4em);
    .row-fist {
      display: flex;
      flex-direction: column;
      margin-bottom: 1.7em;
    }
    .row-second {
      @include rowStyle;
      margin-bottom: 0.8em;
      @media (max-width: map-get($breack-point, mobile)) {
        margin-bottom: 1.1em;
      }
    }
    .row-last {
      display: flex;
      margin-bottom: 1em;
      flex: 1;
      @include responsRow;
      @media (max-width: map-get($breack-point, mobile)) {
        margin-bottom: 2em;
      }
    }
    .stage {
      @include stageStyle;
    }
  }
  legend {
    @include legendStyle;
  }
</style>
