<template>
  <div>
    <legend v-if="isMultiSelect">Группа критериев</legend>
    <legend v-else>Лечащий врач</legend>
    <div class="select">
      <p :class="isVisible ? 'title-active' : 'title'" @click="isVisible = !isVisible">
        {{ isMultiSelect ? defaultMultiValue.join(" ") : defaultValue }}
        <span :class="isVisible ? 'toggle-open' : 'toggle-close'"></span>
      </p>

      <div :class="isVisible ? 'options-active' : 'options'" v-if="isVisible">
        <p v-for="option in selectOptions" :key="option.value" @click="selectOption(option)">
          {{ option.value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "custom-select",
    props: {
      isMultiSelect: { type: Boolean },
      isPaspport: { type: Boolean },
      selectOptions: {
        type: Array,
        default() {
          return [];
        },
      },
      defaultValue: {
        type: String,
        default() {
          return "";
        },
      },
      defaultMultiValue: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() {
      return {
        isVisible: false,
      };
    },
    methods: {
      selectOption(option) {
        this.$emit("select", option);
        this.isVisible = false;
      },
      hideSelect() {
        this.isVisible = false;
      },
    },
  };
</script>

<style lang="scss">
  @import "../../scss/_vars.scss";
  legend {
    margin-bottom: $mrg-label;
  }
  .select,
  .multi-select {
    position: relative;
    width: 200px;
  }
  .title,
  .title-active {
    border: 1px solid #dbe2ea;
    border-radius: 5px;
    padding: 0.5em;
    font-size: 0.8rem;
    cursor: pointer;
    &:hover {
      border-color: $clr-primary-light;
    }
  }
  .select p {
    margin: 0;
    .toggle-close,
    .toggle-open {
      position: absolute;
      top: 0.7em;
      right: 0.8em;
      &::before {
        display: inline-block;
        content: "\25BD";
        color: $clr-primary;
      }
    }
    .toggle-open {
      top: 0.6em;
      &::before {
        content: "\25B3";
      }
    }
  }
  .options,
  .options-active {
    border: 1px solid #dbe2ea;
    border-radius: 5px;
    position: absolute;
    top: 2.1em;
    right: 0;
    z-index: 1;
    width: 100%;
  }
  .title-active,
  .options-active {
    border: 1px solid $clr-primary;
  }
  .options p,
  .options-active p {
    background: $clr-body-form;
    font-size: 0.8rem;
    margin: 0;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    padding-left: 0.5em;
    color: $clr-placeholder;

    &:hover {
      cursor: pointer;
      background-color: rgba(235, 244, 248, 1);
      color: rgba(44, 39, 56, 1);
    }
  }
</style>
