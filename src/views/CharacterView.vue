<template>
  <div class="container">
    <div class="home">
      <div class="section" v-for="section, fieldname in fields" :key="fieldname">
        <div class="innersection" :id="fieldname" >
          <div v-for="field, i in section" :key="i">
            <input
              v-if="field.type === 'input'"
              :value="character?.[field.value]"
              @input="event => text = updateCharacter(field.value, event.target.value)"
              @wheel.prevent="event => text = changePoint(field.scrollable, field.value, event.target.value, event.deltaY)"
              :class="field.circle ? 'round-input' : ''"
            />
            <textarea
              v-if="field.type === 'textarea'"
              :value="character?.[field.value]"
              @click="checkMark(field.value, field.type)"
              @input="event => text = updateCharacter(field.value, event.target.value)"
            />
            <span
              v-if="field.type === 'span'"
              :value="character?.[field.value]"
              @click="checkMark(field.value, field.type)"
              v-html="field.type === 'span' ? (character?.[field.value] ? '✔' : ' ') : ''"
            />
          </div>
        </div>
      </div>
    </div>
    <Header :char="character?.name" />
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
      fields: {
        specialAbilities: [
          {type: 'textarea', value: 'specialAbilities' },
        ],
        cyphers: [
          {type: 'input', value: 'cypherlimit', scrollable: true },
          {type: 'textarea', value: 'cyphers' },
        ],
        background: [
          {type: 'textarea', value: 'background' },
        ],
        crafting: [
          {type: 'textarea', value: 'crafting' },
          {type: 'input', value: 'materials', scrollable: true, circle: true },
          {type: 'input', value: 'parts', scrollable: true, circle: true },
        ],
        basic: [
          {type: 'input', value: 'name', scrollable: true },
          {type: 'input', value: 'descriptor', scrollable: true },
          {type: 'input', value: 'type', scrollable: true },
          {type: 'input', value: 'focus', scrollable: true },
        ],
        stats: [
          {type: 'input', value: 'might', scrollable: true },
          {type: 'input', value: 'mightpool', scrollable: true, circle: true },
          {type: 'input', value: 'mightede', scrollable: true, circle: true },
          
          {type: 'input', value: 'speed', scrollable: true },
          {type: 'input', value: 'speedpool', scrollable: true, circle: true },
          {type: 'input', value: 'speededge', scrollable: true, circle: true },
          
          {type: 'input', value: 'int', scrollable: true },
          {type: 'input', value: 'intpool', scrollable: true, circle: true },
          {type: 'input', value: 'intedge', scrollable: true, circle: true },
          
          {type: 'input', value: 'armorcost', scrollable: true, circle: true },
          {type: 'input', value: 'armor', scrollable: true },
          
          {type: 'input', value: 'tier', scrollable: true },
          {type: 'input', value: 'effort', scrollable: true },
          {type: 'input', value: 'xp', scrollable: true },

          {type: 'input', value: 'recovery', scrollable: true, circle: true },
          
          {type: 'span', value: 'oneaction' },
          {type: 'span', value: 'tenmins' },
          {type: 'span', value: 'onehour' },
          {type: 'span', value: 'tenhours' },
          {type: 'span', value: 'debilitated' },
          {type: 'span', value: 'impaired' },
        ],
        skills: [
          {type: 'textarea', value: 'skills' },
        ],
        equipment: [
          {type: 'textarea', value: 'equipment' },
          {type: 'input', value: 'shins', scrollable: true, circle: true },
        ],
        attacks: [
          {type: 'textarea', value: 'attacks' },
        ],
        portrait: [
          {type: 'input', value: 'name' },
        ],
        advancement: [
          {type: 'span', value: 'increaseCApabilities' },
          {type: 'span', value: 'extraEffort' },
          {type: 'span', value: 'moveTowardPerfection' },
          {type: 'span', value: 'skillTraining' },
          {type: 'span', value: 'other' },
        ],
        notes: [
          {type: 'textarea', value: 'notes' },
        ],
        followers: [
          {type: 'textarea', value: 'followers' },
        ],
      },
      delayed: false,
    };
  },
  async mounted() {
    this.getData();
  },
  
  
  methods: {
    async getData() {
      this.character = await useLoadCharacterByCode(this.$route.params.player);
    },
    updateCharacter(slot, value){
      const payload = {...this.character};
      payload[slot] = value;
      const res = updateCharacter(slot, value, this.$route.params.player);
    },
    changePoint(scrollable, stat, value, event){
      if(!scrollable) return;
      if(this.delayed) return;
      if(!value) value = 0;
      this.delayed = true;
      const newValue = parseInt(value) + (event < 0 ? 1 : -1);
      this.updateCharacter(stat, newValue);
      setTimeout(()=>this.delayed = false, 250);
    },
    checkMark(slot, type){
      if(type !== 'span') return
      const newValue = !this.character[slot];
      this.updateCharacter(slot, newValue);
    }
  },
};
</script>

<style lang="scss" scoped>
.debug {
  position: absolute;
  top: 10px;
  left: 10px;
  border: 4px solid maroon;
  background: rgba(55, 55, 55, .95);
  color: lime;
  height: 500px;
  width: 300px;
}
.container {
  box-sizing: border-box;
  max-width: 1056px;
  min-width: 1056px;
  width: 1056px;
}

.home {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: rgba(55, 55, 55, 0);
  padding: 3em 0;
  margin: 0em;
  text-align: left;
  min-width: 1056px;
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
  div:first-of-type input{
    box-sizing: border-box;
    position: absolute;
    top: 57px;
    left: 410px;
    width: 200px;
  }
  div:nth-of-type(2) input{
    position: absolute;
    top: 136px;
    left: 405px;
    width: 100px;
    text-align: right;
  }
  div:nth-of-type(3) input{
    position: absolute;
    top: 136px;
    left: 510px;
    width: 100px;
    text-align: left;
  }
  div:nth-of-type(4) input{
    position: absolute;
    top: 200px;
    left: 410px;
    width: 170px;

  }

}


#stats{
  height: 560px;
  input{
    position: absolute;

  }

  div:first-of-type input{
    top: 241px;
    left: 447px;
    font-size: 2em;
    width: 2em;

  }
  div:nth-of-type(2) input{
    top: 235px;
    left: 383px;
  }
  div:nth-of-type(3) input{
    top: 295px;
    left: 382px;
  }
  div:nth-of-type(4) input{
    top: 368px;
    left: 447px;
    font-size: 2em;
    width: 2em;
  }
  div:nth-of-type(5) input{
    top: 360px;
    left: 382px;
  }
  div:nth-of-type(6) input{
    top: 420px;
    left: 382px;
  }
    div:nth-of-type(7) input{
    top: 495px;
    left: 445px;
    font-size: 2em;
    width: 2em;
  }
  div:nth-of-type(8) input{
    top: 487px;
    left: 382px;
  }
  div:nth-of-type(9) input{
    top: 548px;
    left: 382px;
  }
  div:nth-of-type(10) input{
    top: 391px;
    left: 580px;
  }
  div:nth-of-type(11) input{
    top: 393px;
    left: 642px;
    width: 25px;
    font-size: 1.2em;
  }
  div:nth-of-type(12) input{
    width: 50px;
    top: 640px;
    left: 393px;
    font-size: 1.2em;
    padding-bottom: 16px;
  }
  div:nth-of-type(13) input{
    width: 50px;
    top: 640px;
    left: 476px;
    font-size: 1.2em;
    padding-bottom: 16px;
  }
  div:nth-of-type(14) input{
    width: 50px;
    top: 640px;
    left: 558px;
    font-size: 1.2em;
    padding-bottom: 16px;
  }

  div:nth-of-type(15) input{
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

  div:nth-of-type(16) span{
    position: absolute;
    padding: 20px;
    top: 722px;
    left: 388px;
  }

  div:nth-of-type(17) span{
    position: absolute;
    padding: 20px;
    top: 739px;
    left: 443px;
  }

  div:nth-of-type(18) span{
    position: absolute;
    padding: 20px;
    top: 737px;
    left: 565px;
  }
  
  div:nth-of-type(19) span{
    position: absolute;
    padding: 20px;
    top: 710px;
    left: 631px;
  }

  div:nth-of-type(20) span{
    position: absolute;
    padding: 13px 30px;
    top: 584px;
    left: 619px;

  }

  div:nth-of-type(21) span{
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
  div:nth-of-type(1) textarea{
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
  div:nth-of-type(2) input{
    position: absolute;
    top: 1530px;
    left: 29px;
  }
  div:nth-of-type(3) input{
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

  div:nth-of-type(1) span{
    position: absolute;
    padding: 20px;
    top: 1388px;
    left: 387px;
  }
  
  div:nth-of-type(2) span{
    position: absolute;
    padding: 20px;
    top: 1461px;
    left: 407px;
  }
  
  div:nth-of-type(3) span{
    position: absolute;
    padding: 20px;
    top: 1532px;
    left: 503px;
  }
  
  div:nth-of-type(4) span{
    position: absolute;
    padding: 20px;
    top: 1461px;
    left: 608px;
  }
  
  div:nth-of-type(5) span{
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
