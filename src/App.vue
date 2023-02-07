<template>
  <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cuprum:wght@400;700&display=swap");

$fg-primary: rgb(120, 23, 90);
$fg-secondary: rgba(70, 12, 52, 0.5);
$fg-light: rgb(255, 255, 255);

$bg-primary: rgb(45, 45, 57);
$bg-secondary: rgba(150, 159, 220, 0.1);
$bg-light: rgba(150, 173, 220, 0.4);

$shadow: rgba(0, 0, 0, 0.5);
$dark: rgb(40, 40, 40);
$highlight: rgba(125, 173, 225, 0.5);

html,
body {
  margin: 0;
  padding: 0;
  background-color: $bg-primary;
  font-family: "Cuprum", sans-serif;
}

#app {
  overflow-y: hidden;
  overflow-x: scroll;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $fg-primary;
  background-image: url("~@/assets/sheet.png");
  background-size: 100% auto;
  background-position: top;
  background-repeat: no-repeat;
  height: 1632px;
  width: 1056px;
}
.container{
  width: 1056px;
  height: 100vh;
}
.blur-bg{
  background: rgba(255, 255, 255, .15);
  backdrop-filter: blur(50px);
}
.form-group {
  margin: 1em;
  display: grid;
}

.form-control {
  margin: 0.5em;
}

.mt-2 {
  margin-top: 2em;
}

button,
input,
textarea {
  margin: 2px;
  padding: 0.5em;
  border: 2px solid $fg-primary;
  color: $fg-primary;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 5px;
  font-family: "Cuprum", sans-serif;
  text-transform: uppercase;
  text-align: center;
}

button {
  cursor: pointer;
  text-transform: uppercase;
  background-color: $bg-secondary;
  box-shadow: 0 0 10px $shadow;
  transition: 200ms;
}

button:hover {
  background-color: $bg-light;
  color: $fg-light;
  box-shadow: 0 0 10px $highlight;
}

button:disabled {
  background-color: $bg-secondary;
  color: $dark;
  border: 2px solid $dark;
}

input {
  margin: 1em;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 0px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 3px solid rgba(0, 0, 0, 0);
  transition: 200ms;
}

input:hover {
  // box-shadow: 0 0 10px $shadow;
  border-bottom: 3px solid rgba(70, 12, 52, 0.5);

}

input:focus {
  outline-width: 0;
  box-shadow: 0 0 10px $bg-secondary;
}

table {
  border-collapse: collapse;
}

th {
  border-bottom: 2px solid $fg-primary;
  padding: 0.25em 1em;
}

td {
  border-bottom: 1px solid $fg-secondary;
  padding: 0.25em 1em;
}

::-webkit-scrollbar-track {
  background: whitesmoke;
}
 
::-webkit-scrollbar-thumb {
  background: $fg-primary; 
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: $fg-secondary; 
}
</style>
