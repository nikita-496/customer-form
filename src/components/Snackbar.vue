<template>
  <div v-if="isSuccess" class="success-snackbar">
    <div class="text">
      <h3>Форма отправлена</h3>
      <span @click="$emit('close', 'success')">&#10006;</span>
      <p>Новый клиент успешно создан</p>
    </div>
  </div>
  <div v-else-if="isError" class="error-snackbar">
    <div class="text">
      <h3>Форма не прошла валидацию</h3>
      <span @click="$emit('close', 'error')">&#10006;</span>
      <p>Заполните, пожалуйста, <br />все обязательные поля*</p>
    </div>
    <!-- <div class="supporting-text"></div>-->
  </div>
</template>

<script>
  export default {
    props: {
      isSuccess: { type: Boolean, require: true },
      isError: { type: Boolean, require: true },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../scss/_vars.scss";
  .success-snackbar,
  .error-snackbar {
    position: fixed;
    top: 1em;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 1px 5px 0 rgba(0, 0, 0, 0.12);
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    min-height: 40px;
    overflow: hidden;
    width: 400px;
    z-index: 1;
    background: #1d993a;
    border-radius: 5px;
    @media (max-width: map-get($breack-point, mobile)) {
      width: 300px;
    }
    .text {
      position: relative;
      text-align: center;
      color: #fff;
      h3,
      p {
        margin: 0.6em;
      }
      h3 {
        margin-bottom: 0;
      }
      span {
        position: absolute;
        right: 0.5em;
        bottom: 5em;
        font-size: 0.9rem;
        color: rgb(255, 255, 255);
        cursor: pointer;
      }
    }
    .supporting-text {
      color: rgba(0, 0, 0, 0.54);
      font-size: 13px;
      line-height: 18px;
      overflow: hidden;
      padding: 16px;
      width: 90%;
    }
  }
  .success-snackbar {
    .text {
      span {
        position: absolute;
        right: 0.5em;
        bottom: 3.6em;
        font-size: 0.9rem;
        color: rgb(255, 255, 255);
        cursor: pointer;
      }
    }
  }
  .error-snackbar {
    background: #d32f2f;
  }
</style>
