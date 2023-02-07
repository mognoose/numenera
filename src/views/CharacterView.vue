<template>
  <div class="container" :style="cssProps">
    <!-- <h1 style="font-size: 5px; border: 1px solid maroon;">
      {{ `${character?.name} is a ${character?.descriptor} ${character?.type} who ${character?.focus}` }}
    </h1> -->
    <div class="home">
      <div class="section">
        <div class="inner-section" id="specialAbilities">
            <textarea :value="character?.specialAbilities" @input="event => text = updateCharacter('specialAbilities', event.target.value)" />
        </div>
        <div class="inner-section" id="cyphers">
            <input :value="character?.cypherlimit" @input="event => text = updateCharacter('cypherlimit', event.target.value)">
            <textarea :value="character?.cyphers" @input="event => text = updateCharacter('cyphers', event.target.value)" />
        </div>
                    
        <div class="inner-section" id="background">
            <textarea :value="character?.background" @input="event => text = updateCharacter('background', event.target.value)" />
        </div>
                    
        <div class="inner-section" id="crafting">
            <textarea :value="character?.crafting" @input="event => text = updateCharacter('crafting', event.target.value)" />
            <input class="round-input" :value="character?.materials" @input="event => text = updateCharacter('materials', event.target.value)">
            <input class="round-input" :value="character?.parts" @input="event => text = updateCharacter('parts', event.target.value)">
        </div>
      </div>
      <div class="section">
        <div class="inner-section" id="basic">
            <input :value="character?.name" @input="event => text = updateCharacter('name', event.target.value)">
            <input :value="character?.descriptor" @input="event => text = updateCharacter('descriptor', event.target.value)">
            <input :value="character?.type" @input="event => text = updateCharacter('type', event.target.value)">
            <input :value="character?.focus" @input="event => text = updateCharacter('focus', event.target.value)">
        </div>
        <div class="inner-section" id="stats">
            <input :value="character?.might" @input="event => text = updateCharacter('might', event.target.value)">
            <input class="round-input" :value="character?.mightpool" @input="event => text = updateCharacter('mightpool', event.target.value)">
            <input class="round-input" :value="character?.mightedge" @input="event => text = updateCharacter('mightedge', event.target.value)">
            <input :value="character?.speed" @input="event => text = updateCharacter('speed', event.target.value)">
            <input class="round-input" :value="character?.speedpool" @input="event => text = updateCharacter('speedpool', event.target.value)">
            <input class="round-input" :value="character?.speededge" @input="event => text = updateCharacter('speededge', event.target.value)">
            <input :value="character?.int" @input="event => text = updateCharacter('int', event.target.value)">
            <input class="round-input" :value="character?.intpool" @input="event => text = updateCharacter('intpool', event.target.value)">
            <input class="round-input" :value="character?.intedge" @input="event => text = updateCharacter('intedge', event.target.value)">

            <input class="round-input" :value="character?.armorcost" @input="event => text = updateCharacter('armorcost', event.target.value)">
            <input :value="character?.armor" @input="event => text = updateCharacter('armor', event.target.value)">

            <input :value="character?.tier" @input="event => text = updateCharacter('tier', event.target.value)">
            <input :value="character?.effort" @input="event => text = updateCharacter('effort', event.target.value)">
            <input :value="character?.xp" @input="event => text = updateCharacter('xp', event.target.value)">

            <input class="round-input" :value="character?.recovery" @input="event => text = updateCharacter('recovery', event.target.value)">

            <span @click="updateCharacter('oneaction', !character.oneaction)">{{ character.oneaction ? '✔' : ' ' }}</span>
            <span @click="updateCharacter('tenmins', !character.tenmins)">{{ character.tenmins ? '✔' : ' ' }}</span>

            <span @click="updateCharacter('onehour', !character.onehour)">{{ character.onehour ? '✔' : ' ' }}</span>
            <span @click="updateCharacter('tenhours', !character.tenhours)">{{ character.tenhours ? '✔' : ' ' }}</span>

            <span @click="updateCharacter('impaired', !character.impaired)">{{ character.impaired ? '✔' : ' ' }}</span>
            <span @click="updateCharacter('debilitated', !character.debilitated)">{{ character.debilitated ? '✔' : ' ' }}</span>
          
          </div>
            
          <div class="inner-section" id="portrait">
            <input :value="character?.name" @input="event => text = updateCharacter('name', event.target.value)">
          </div>
            
          <div class="inner-section" id="advancement">
            <span @click="updateCharacter('increaseCapabilities', !character.increaseCapabilities)">{{ character.increaseCapabilities ? '✔' : ' ' }}</span>
            <span @click="updateCharacter('extraEffort', !character.extraEffort)">{{ character.extraEffort ? '✔' : ' ' }}</span>
            
            <span @click="updateCharacter('moveTowardPerfection', !character.moveTowardPerfection)">{{ character.moveTowardPerfection ? '✔' : ' ' }}</span>

            <span @click="updateCharacter('skillTraining', !character.skillTraining)">{{ character.skillTraining ? '✔' : ' ' }}</span>
            <span @click="updateCharacter('other', !character.other)">{{ character.other ? '✔' : ' ' }}</span>

          </div>
        </div>
        <div class="section">
          <div class="inner-section" id="skills">
            <textarea :value="character?.skills" @input="event => text = updateCharacter('skills', event.target.value)" />
            </div>
          <div class="inner-section" id="equipment">
            <textarea :value="character?.equipment" @input="event => text = updateCharacter('equipment', event.target.value)" />
            <input class="round-input" :value="character?.shins" @input="event => text = updateCharacter('shins', event.target.value)">
        </div>
        <div class="inner-section" id="attacks">
            <textarea :value="character?.attacks" @input="event => text = updateCharacter('attacks', event.target.value)" />
        </div>
        <div class="inner-section" id="notes">
            <textarea :value="character?.attacks" @input="event => text = updateCharacter('attacks', event.target.value)" />
        </div>
        <div class="inner-section" id="followers">
            <textarea :value="character?.followers" @input="event => text = updateCharacter('followers', event.target.value)" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { useLoadCharacterByCode, updateCharacter } from "@/firebase";

export default {
  name: "CharacterView",
  components: {
    Header,
  },
  data() {
    return {
      character: {},
      cssProps: {
        minHeight: "100vh",
        backgroundSize: `cover`,
        backgroundPosition: `center`,
        backgroundAttachment: "fixed",
      },
    };
  },
  mounted() {
    this.getCharSheet();
  },

  
  methods: {
    async getCharSheet() {
      this.character = await useLoadCharacterByCode(this.$route.params.player);
    },
    updateCharacter(slot, value){
      const payload = {...this.character};
      payload[slot] = value;
      const res = updateCharacter(slot, value, this.$route.params.player);
      console.log(res);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  width: 1056px;
}

.home {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: rgba(55, 55, 55, 0);
  padding: 3em 0;
  margin: 0em;
  text-align: left;
  width: 1056px;
}
.section{
  width: auto;
}
.inner-section {
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0);
}

.round-input{
    border: 3px solid rgb(120, 23, 90);
    position: absolute;
    top: 461px;
    left: 25px;
    width: 35px;
    border: 3px solid rgba(255, 255, 255, 0);
    border-radius: 50%;
    height: 35px;
}
.round-input:hover{
    border: 3px solid rgb(120, 23, 90);
}

#specialAbilities{
  height: 400px;
  textarea{
    position: absolute;
    top: 65px;
    left: 50px;
    border: 0px;
    height: 350px;
    width: 270px;
    text-align: left;
    font-family: "Cuprum", sans-serif;

  }
}

#cyphers{
  border: 4px solid var(--fg-primary);
  height: 400px;
  input{
    position: absolute;
    top: 461px;
    left: 25px;
    width: 35px;
    border: 3px solid rgba(255, 255, 255, 0);
    border-radius: 50%;
    height: 35px;
  }
  input:hover{
    border: 3px solid rgb(120, 23, 90);
  }
  textarea{
    position: absolute;
    top: 530px;
    left: 50px;
    border: 0px;
    height: 250px;
    width: 270px;
    text-align: left;
    font-family: "Cuprum", sans-serif;

  }
}

#basic{
  height: 13rem;
  input{
    font-weight: bold;
  }
  input:first-of-type{
    box-sizing: border-box;
    position: absolute;
    top: 57px;
    left: 410px;
    width: 200px;
  }
  input:nth-of-type(2){
    position: absolute;
    top: 136px;
    left: 405px;
    width: 100px;
    text-align: right;
  }
  input:nth-of-type(3){
    position: absolute;
    top: 136px;
    left: 510px;
    width: 100px;
    text-align: left;
  }
  input:nth-of-type(4){
    position: absolute;
    top: 200px;
    left: 410px;
    width: 170px;

  }

}


#stats{
  border: 4px solid var(--fg-primary);
  height: 560px;
  input{
    position: absolute;

  }

  input:first-of-type{
    top: 241px;
    left: 447px;
    font-size: 2em;
    width: 2em;

  }
  input:nth-of-type(2){
    top: 235px;
    left: 383px;
    
  }
  input:nth-of-type(3){
    top: 295px;
    left: 382px;
  }
  input:nth-of-type(4){
    top: 368px;
    left: 447px;
    font-size: 2em;
    width: 2em;
  }
  input:nth-of-type(5){
    top: 360px;
    left: 382px;
  }
  input:nth-of-type(6){
    top: 420px;
    left: 382px;
  }
    input:nth-of-type(7){
    top: 495px;
    left: 445px;
    font-size: 2em;
    width: 2em;
  }
  input:nth-of-type(8){
    top: 487px;
    left: 382px;
  }
  input:nth-of-type(9){
    top: 548px;
    left: 382px;
  }
  input:nth-of-type(10){
    top: 391px;
    left: 580px;
  }
  input:nth-of-type(11){
    top: 393px;
    left: 642px;
    width: 25px;
    font-size: 1.2em;
  }
  input:nth-of-type(12){
    width: 50px;
    top: 640px;
    left: 393px;
    font-size: 1.2em;
    padding-bottom: 16px;
  }
  input:nth-of-type(13){
    width: 50px;
    top: 640px;
    left: 476px;
    font-size: 1.2em;
    padding-bottom: 16px;
  }
  input:nth-of-type(14){
    width: 50px;
    top: 640px;
    left: 558px;
    font-size: 1.2em;
    padding-bottom: 16px;
  }

  input:nth-of-type(15){
    top: 732px;
    left: 489px;
  }

  span{
    display: block;
    width: 10px;
    height: 10px;
    cursor: pointer;
    border-radius: 50%;
  }

  span:nth-of-type(1){
    position: absolute;
    padding: 20px;
    top: 722px;
    left: 388px;
  }

  span:nth-of-type(2){
    position: absolute;
    padding: 20px;
    top: 739px;
    left: 443px;
  }

  span:nth-of-type(3){
    position: absolute;
    padding: 20px;
    top: 737px;
    left: 565px;
  }
  
  span:nth-of-type(4){
    position: absolute;
    padding: 20px;
    top: 710px;
    left: 631px;
  }

  span:nth-of-type(5){
    position: absolute;
    padding: 13px 30px;
    top: 584px;
    left: 619px;

  }

  span:nth-of-type(6){
    position: absolute;
    padding: 13px 30px;
    top: 536px;
    left: 619px;
  }

  span:hover{
    background-color: rgba(255, 255, 255, .45);
    box-shadow: 0 0 20px 15px rgba(255, 255, 255, .45);
  }

}

#skills{
  height: 400px;
  textarea{
    position: absolute;
    top: 75px;
    left: 725px;
    border: 0px;
    height: 220px;
    width: 270px;
    text-align: left;
    font-family: "Cuprum", sans-serif;

  }
}

#equipment{
  height: 400px;
  textarea{
    position: absolute;
    top: 385px;
    left: 725px;
    border: 0px;
    height: 200px;
    width: 270px;
    text-align: left;
    font-family: "Cuprum", sans-serif;
  }
  input{
    position: absolute;
    top: 301px;
    left: 960px;
  }
}


#attacks{
  height: 400px;
  textarea{
    position: absolute;
    top: 645px;
    left: 745px;
    border: 0px;
    height: 120px;
    width: 270px;
    text-align: left;
    font-family: "Cuprum", sans-serif;

  }
}

#background {
  height: 400px;

  textarea {
    text-transform: none;
    position: absolute;
    top: 878px;
    left: 50px;
    border: 0px;
    height: 310px;
    width: 275px;
    text-align: left;
    font-family: "Cuprum", sans-serif;
  }
}

#crafting {
  textarea {
    position: absolute;
    top: 1245px;
    left: 70px;
    text-transform: none;
    border: 0px;
    height: 280px;
    width: 260px;
    text-align: left;
    font-family: "Cuprum", sans-serif;
  }
  input:nth-of-type(1){
    position: absolute;
    top: 1530px;
    left: 29px;
  }
  input:nth-of-type(2){
    position: absolute;
    top: 1528px;
    left: 276px;
  }
}

#portrait {
  height: 565px;
  input{
    position: absolute;
    top: 815px;
    left: 447px;
  }
}

#advancement{
  height: 230px;

  span{
    display: block;
    width: 10px;
    height: 10px;
    cursor: pointer;
    border-radius: 50%;
  }

  span:nth-of-type(1){
    position: absolute;
    padding: 20px;
    top: 1388px;
    left: 387px;
  }
  
  span:nth-of-type(2){
    position: absolute;
    padding: 20px;
    top: 1461px;
    left: 407px;
  }
  
  span:nth-of-type(3){
    position: absolute;
    padding: 20px;
    top: 1532px;
    left: 503px;
  }
  
  span:nth-of-type(4){
    position: absolute;
    padding: 20px;
    top: 1461px;
    left: 608px;
  }
  
  span:nth-of-type(5){
    position: absolute;
    padding: 20px;
    top: 1388px;
    left: 621px;
  }

  span:hover{
    background-color: rgba(255, 255, 255, .45);
    box-shadow: 0 0 20px 15px rgba(255, 255, 255, .45);
  }

}

#notes {
  textarea {
    position: absolute;
    top: 900px;
    left: 720px;
    text-transform: none;
    border: 0px;
    height: 370px;
    width: 260px;
    text-align: left;
    font-family: "Cuprum", sans-serif;
  }
}

#followers {
  textarea {
    position: absolute;
    top: 1320px;
    left: 720px;
    text-transform: none;
    border: 0px;
    height: 240px;
    width: 260px;
    text-align: left;
    font-family: "Cuprum", sans-serif;
  }
}

textarea:hover {
  box-shadow: inset 0 0 30px rgba(120, 23, 90, 0.15);

}


// 
// MOBILE VERSION TODO
// 


@media only screen and (max-width: 10px) {
  .home{
    grid-template-columns: 1fr;
    padding: 3em 0;
    background-color: rgba(255, 255, 255, .5);
    backdrop-filter: blur(20px);
  }
  .inner-section{
    background-color: rgba(55, 55, 55, .5);
  }
}
</style>
