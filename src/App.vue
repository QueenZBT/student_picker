<template>
  <div id="app">
    <div class="wrap">
      <div class="blue-sphere"></div>
      <div class="container">
        <router-link to="/students">学生名单</router-link>&nbsp;
        <router-link to="/">开始抽选</router-link>&nbsp;
        <router-link to="/history">抽中历史</router-link>&nbsp;
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

#app {
  font-family: Avenir;
  padding: 20px;
  border-radius: 20px;
  background-color: #e5e9ec;
  height: 1000px;


}

.wrap {
  position: relative;
  width: 760px;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 1px 1px 1px #ccc;
  margin: 100px auto;
  text-align: center;
  background-color: #fff;
  padding: 20px;


}

.blue-sphere {
  position: absolute;
  top: -25px;
  left: 80px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(circle at 70% 30%, #4daaff, #0d2e70);
  box-shadow: -10px 15px 30px rgba(0, 0, 0, 0.2);
}

.container {
  margin-top: 30px;
}



a {
  text-decoration: none;
  color: #380cef;
  font-size: 26px;
  font-weight: 700;
}

.wrap .authorship {
  font-family: 'Montserrat', sans-serif;
  color: #6f7c98;
}
</style>
