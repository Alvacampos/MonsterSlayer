new Vue({
  el: '#app',
  data: {
    you: 100,
    monster: 100,
    turns: [],
    show: true        
  },
  methods: {
    atkDmg(max,min) {          
      let damage = Math.floor(Math.random() * (max - min) + min);
      return damage;
    },
    monsterDmg() {
      let dmg = this.atkDmg(12,1);
      this.you = this.you - dmg;
      return dmg;
    },
    playerDmg() {
      let dmg = this.atkDmg(10,3);
      this.monster=this.monster - dmg;
      return dmg;
    },     
    whoWon() {
      if(this.you <= 0) {
        alert('GG IZI');
        this.giveUp();            
      }else if(this.monster <= 0) {
        alert('You Won!');
        this.giveUp();            
      }
    },
    playerAttack() { 
      let playerDmg = this.playerDmg();         
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits monster for ${playerDmg}`
      });
      this.monsterAttack();
      this.whoWon();        
    },
    monsterAttack() {                    
      let monsterDmg = this.monsterDmg();
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits monster for ${monsterDmg}`
      })
      this.whoWon();        
    },
    specialAttack() {          
      let yourDmg = this.atkDmg(13,6);
      this.monster=this.monster - yourDmg;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits monster for ${yourDmg}`
      })
      this.monsterAttack();
      this.whoWon();
    },
    heal() {
      this.you = this.you + 10;
      this.turns.unshift({
        isPlayer: true,
        text: `Player heals for 10`
      })
      if(this.you >= 100) {
        this.you = 100;
      }
      this.monsterAttack();
      this.whoWon();
    },
    giveUp() {
      this.you = 100;
      this.monster = 100; 
      this.turns= [];      
      this.show = !this.show;          
    }
  }           
});