<template>
  <div class="wrapper">
    <legend><span class="stage">1</span>Персональные данные клиента</legend>
    <div class="row">
      <entry-field
        v-for="n in 3"
        :key="n"
        :identify="n === 1 ? 'firstName' : n === 2 ? 'lastName' : 'patronymic'"
        :labelName="n === 1 ? 'Имя*' : n === 2 ? 'Фамилия*' : 'Отчество'"
        :isPersonal="true"
        :isRequired="n === 1 ? isRequired[0] : n === 2 ? isRequired[1] : false"
        @createName="$emit('transferName', $event)"
        @createLastName="$emit('transferLastName', $event)"
      />
    </div>
    <div class="row row-flex">
      <entry-field
        identify="date"
        labelName="Дата рождения*"
        :date="true"
        :isRequired="isRequired[2]"
        @createDate="$emit('transferDate', $event)"
      />
      <custom-check-box labelName="Пол" />
    </div>
    <div class="row row-flex">
      <div class="wrapper-phone">
        <legend>Номер Телефона*</legend>
        <phone-field
          identify="phoneNumber"
          labelName="Пример: 7(892)540-20-01"
          :isRequired="isRequired[3]"
          @create-phone="$emit('transfer', $event)"
        />
      </div>
      <custom-check-box labelName="Не отправлять СМС" :isSingle="true" />
    </div>
    <div class="row row-flex">
      <div>
        <custom-select
          :selectOptions="selectOptions1"
          :defaultMultiValue="selected1"
          @select="optionMultiSelect"
          :isMultiSelect="true"
        />
      </div>
      <div>
        <custom-select
          :selectOptions="selectOptions2"
          :defaultValue="selected2"
          @select="optionSelect"
        />
      </div>
    </div>
  </div>
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
          return;
        }
        let newSelected = this.selected1.filter((s) => s !== "Группа клиентов");
        newSelected.push(option.value);
        this.selected1 = newSelected;
      },
      optionSelect(option) {
        this.selected2 = option.value;
      },
      /*transferToForm(event) {

        alert(event);
      },*/
    },
  };
</script>

<style lang="scss" scoped>
  @import "../scss/_vars.scss";
  @import "../scss/_mixins.scss";
  .wrapper {
    @include wrapperStyle(1em);
    .row {
      display: flex;
      margin-bottom: 1em;
    }
    .row-flex {
      display: flex;
      justify-content: space-between;
      .wrapper-phone {
        width: 50%;
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
