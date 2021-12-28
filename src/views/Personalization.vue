<template>
  <section class="wrapper-personal">
    <legend><span class="stage">1</span>Персональные данные клиента</legend>
    <div class="fisrt-row">
      <entry-field
        v-for="n in 3"
        :key="n"
        :identify="n === 1 ? 'lastName' : n === 2 ? 'firstName' : 'patronymic'"
        :labelName="n === 1 ? 'Фамилия*' : n === 2 ? 'Имя*' : 'Отчество'"
        :isPersonal="true"
        :isRequired="n === 1 ? isRequired[0] : n === 2 ? isRequired[1] : false"
        @createName="$emit('transferName', $event)"
        @createLastName="$emit('transferLastName', $event)"
      />
    </div>
    <div class="second-row">
      <entry-field
        identify="date"
        labelName="Дата рождения*"
        :date="true"
        :isRequired="isRequired[2]"
        @createDate="$emit('transferDate', $event)"
      />
      <custom-check-box labelName="Пол" />
    </div>
    <div class="third-row">
      <phone-field
        identify="phoneNumber"
        labelName="Пример: 7(892)540-20-01"
        :isRequired="isRequired[3]"
        @create-phone="$emit('transfer', $event)"
      />
      <custom-check-box labelName="Не отправлять СМС" :isSingle="true" />
    </div>
    <div class="last-row">
      <custom-select
        :selectOptions="selectOptions1"
        :defaultMultiValue="selected1"
        :isMultiSelect="true"
        :isRequired="isRequired[4]"
        @select="optionMultiSelect"
      />
      <custom-select
        :selectOptions="selectOptions2"
        :defaultValue="selected2"
        @select="optionSelect"
      />
    </div>
  </section>
</template>

<script>
  import EntryField from "../components/input/EntryField.vue";
  import PhoneField from "../components/input/PhoneField.vue";
  import CustomCheckBox from "../components/ui/CustomCheckBox.vue";
  import CustomSelect from "../components/ui/CustomSelect.vue";
  export default {
    components: { EntryField, CustomCheckBox, CustomSelect, PhoneField },
    props: {
      isRequired: { type: Array, required: true },
    },
    data() {
      return {
        identify: "multi",
        selectOptions1: [
          { name: "option 1", value: "VIP" },
          { name: "option 2", value: "Проблемные" },
          { name: "option 3", value: "ОМС" },
          { name: "option 4", value: "Очистить" },
        ],
        selectOptions2: [
          { name: "option 1", value: "Иванов" },
          { name: "option 2", value: "Захаров" },
          { name: "option 3", value: "Чернышева" },
        ],
        selected1: ["Группа клиентов"],
        selected2: "Лечащий врач",
      };
    },
    methods: {
      optionMultiSelect(option) {
        if (this.selected1.includes(option.value)) {
          return;
        }
        if (option.value === "Очистить") {
          this.selected1 = ["Группа клиентов"];
          this.$emit("transferMultiSelect", ["", this.identify]);
          return;
        }
        let newSelected = this.selected1.filter((s) => s !== "Группа клиентов");
        newSelected.push(option.value);
        this.selected1 = newSelected;
        this.$emit("transferMultiSelect", [this.selected1, this.identify]);
      },
      optionSelect(option) {
        this.selected2 = option.value;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../scss/_vars.scss";
  @import "../scss/_mixins.scss";
  @import "../scss/media.scss";
  .wrapper-personal {
    @include wrapperStyle(0.05em);
    .fisrt-row {
      @include rowStyle;
    }
    .second-row,
    .third-row {
      display: flex;
      margin-bottom: 3.2em;
      @include responsRow;
      @media (max-width: map-get($breack-point, mobile)) {
        margin-bottom: 4.5em;
      }
    }
    .third-row {
      margin-bottom: 1.6em;
      @media (max-width: map-get($breack-point, mobile)) {
        margin-bottom: 3em;
      }
    }
    .last-row {
      display: flex;
      margin-bottom: 1em;
      @include responsRow;
    }
    .stage {
      @include stageStyle;
    }
  }
  legend {
    @include legendStyle;
  }
</style>
