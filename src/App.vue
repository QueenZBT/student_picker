<template>
  <div id="app">
    <div class="wrap">
      <div class="blue-sphere"></div>
      <div class="container">
        <router-link to="/students">
          <h3 class="title">学生名单</h3>
        </router-link>&nbsp;
        <router-link to="/">
          <h3 class="title">开始抽选</h3>
        </router-link>&nbsp;
        <router-link to="/history">
          <h3 class="title">抽中历史</h3>
        </router-link>&nbsp;
      </div>
      <router-view></router-view>
      <h3 class="authorship">Betty·Sequoia</h3>
    </div>


  </div>
</template>

<script>


export default {
  name: 'App',

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  appearance: none;
  -webkit-appearance: none;
}

img,
a {
  -webkit-touch-callout: none
}

:root {
  font-size: 16px;
}

#app {
  font-family: Avenir;
  padding: 1.25rem;
  border-radius: 1.25rem;
  background-color: #e5e9ec;
  width: 100%;
  max-width: 100vw;
  min-width: 100vw;
  height: 100%;
  min-height: 100vh;


}

.title {
  display: inline-block;
  padding: 0 0.3125rem;
  font-size: 1.2rem;
}

@media screen and (max-width:768px) {
  :root {
    font-size: 0.875rem;
  }
}

/* 媒体查询：超小屏幕 */
@media screen and (max-width: 480px) {
  :root {
    font-size: 0.75rem;
  }
}





.wrap {
  position: relative;

  width: 70%;
  border: 0.0625rem solid #ccc;
  border-radius: 1.25rem;
  box-shadow: 0.0625rem 0.0625rem 0.0625rem #ccc;
  margin: 6.25rem auto;
  text-align: center;
  background-color: #fff;
  padding: 1.25rem;
}

.blue-sphere {
  position: absolute;
  top: -1.5625rem;
  left: 5rem;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
  background: radial-gradient(circle at 70% 30%, #4daaff, #0d2e70);
  box-shadow: -0.625rem 0.9375rem 1.875rem rgba(0, 0, 0, 0.2);
}

.container {
  margin-top: 1.875rem;
}



a {
  text-decoration: none;
  color: #380cef;
  /* font-size: 26px; */
  font-weight: 700;
}

.wrap .authorship {
  font-family: 'Montserrat', sans-serif;
  color: #6f7c98;
  margin-top: 1.25rem;
}

/* 3. 弹性单位应用 */
input,
textarea,
p {
  font-size: 1rem;
  /* 文字大小随根字体变化 */
  /* padding: 0.5rem 1rem; */
  /* 内边距弹性化 */
  width: 100%;
  /* 宽度占满父容器 */
  max-width: 200px;
  /* 限制最大宽度 */
  box-sizing: border-box;
}
</style>
