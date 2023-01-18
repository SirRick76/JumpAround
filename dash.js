/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDHT= canvas.widht= 800;
const CANVAS_HEIGHT= canvas.height= 700;
let gameSpeed = 2;
const numberofEnemies = 500;
const enemiesArray = []
let timeTonextEnemy=0;
let EnemyInterval=3000;
let lasttime=0;
let score=0;
ctx.font = '50px Impact';
let gameOver= false;

function sound(){
let sound = new Audio('jump.mp3');
sound.play();
}




//import {particlesJS} from '.particles.js'
particlesJS.load('particles-js', '/package.json', function() {
    console.log('callback - particles.js config loaded');
    
  });


//function playAudio(){
   // let beat = new Audio('JumpAround.mp3');
    //beat.play();
    //beat.volume = 0.01;
//}


const backgroundLayer1 = new Image();
backgroundLayer1.src = 'layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'layer-5.png';
const enemyImage = new Image();
enemyImage.src= 'cube.png'; 
const playerImage = new Image();
playerImage.src ='character.png';
const reset = new Image();
reset.src = 'restart.png';
reset.id = "reset";


class InputHandler{
    constructor(){
      this.keys = [];
      window.addEventListener('keydown', e=> {
       if ((e.key === 'ArrowUp') && this.keys.indexOf(e.key) === -1 ){
        this.keys.push(e.key);
       }});
       window.addEventListener('keyup', e=> {
        if (e.key === 'ArrowUp'){
         this.keys.splice(this.keys.indexOf(e.key),1);
        }});
    }
}


class Layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y= 0;
        this.widht= 1500;
        this.height = 700;
        this.x2 = this.widht;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if(this.x <= -this.widht){
        this.x = this.widht + this.x2 -this.speed;
         }
         if(this.x2 <= -this.widht){
            this.x2 = this.widht + this.x -this.speed;
        }
        this.x =Math.floor(this.x - this.speed);
        this.x2 =Math.floor(this.x2 - this.speed);


    }
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.widht,this.height);
        ctx.drawImage(this.image,this.x2,this.y,this.widht,this.height);

    }
};

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gameObjects=[layer1,layer2,layer3,layer4,layer5];


class Enemy{
    constructor(){
        this.x=1000;
        this.y=536;
        this.widht=50;
        this.height=50;
        this.speed = Math.random()* 4 + 2;
        
        
    }
    update(){
        this.x-= this.speed;
        
        
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x + this.widht/2,this.y+this.height/2,this.widht/2,0,Math.PI * 2);
        ctx.drawImage(enemyImage,this.x,this.y,this.widht,this.height);
    }
};


const input = new InputHandler();

console.log(enemiesArray);



class character{
    constructor(gameHeight){
        this.gameHeight=this.gameHeight
        this.x=0;
        this.y=539;
        this.widht=50;
        this.height=50;
        this.speed=0; 
        this.velocityY = 0;
        this.vy = 0;
        this.weight = 1;
        

    }
    update(input,enemiesArray,sound) {
        
        
        //collision detection
        enemiesArray.forEach(enemy=>{
            const dx = enemy.x - this.x;
            const dy = enemy.y - this.y;
            const distance = Math.sqrt(dx* dx + dy* dy);
            if (distance < enemy.widht/2 + this.widht/2){
                gameOver = true;
            }
        })
        //jump
        if (input.keys.indexOf('ArrowUp')>-1 && this.onGround()){
            this.vy-= 20;
            sound();
            score++;
            
        }
        this.y+= this.vy;
        if(!this.onGround()){
            this.vy += this.weight;
        } else {
            this.vy = 0;

        }
        if(this.y > 538) this.y = 539
        
    
      }
    
    draw(){
        ctx.strokeRect(this.x+5,this.y+5,this.widht-10 ,this.height-10);
        ctx.drawImage(playerImage,this.x,this.y,this.widht,this.height);
        
    }
    onGround(){
        return this.y >= 538;
    }
};
const character1= new character(character)



function drawScore(){
    var highscore = localStorage['Highscore'];   
    ctx.textAlign = 'center';
    ctx.fillStyle= 'white';
    ctx.fillText('Score: ' +  score , 240, 75);
    ctx.fillStyle= 'black';
    ctx.fillText('Score: ' +  score , 240, 72);
    ctx.fillStyle= 'white';
    ctx.fillText('Highscore: ' +  highscore , 240 , 160);
    ctx.fillStyle= 'black';
    ctx.fillText('Highscore: ' +  highscore , 240, 157);
    

};

function displayStatusCheck(){
    
    if(gameOver){
        ctx.textAlign = 'center';
        ctx.fillStyle= 'white';
        ctx.fillText('Game Over,try again!',canvas.width/2+3,350);
        ctx.fillStyle= 'black';
        ctx.fillText('Game Over,try again!',canvas.width/2,347);
        
        addEventListener('click', function() {
        window.location.reload();});;
        
        

      
    }
    
};

function highscore(){
    var highscore = localStorage['Highscore'];
    if(score>highscore){ 
        localStorage['Highscore'] = score;
        console.log(highscore);
    }
};





function animate(timestamp){
    ctx.clearRect(0, 0, CANVAS_WIDHT, CANVAS_HEIGHT);
    gameObjects.forEach(object=>{
    object.update();
    object.draw();
    });
    character1.update(input,enemiesArray,sound);
    character1.draw();    
    let deltatime = timestamp- lasttime;
    lasttime= timestamp;
    timeTonextEnemy += deltatime;
    if (timeTonextEnemy>EnemyInterval){
        enemiesArray.push(new Enemy());
        timeTonextEnemy = 0;
    };
    enemiesArray.forEach(enemy =>{
    enemy.update();
    enemy.draw();
    });
    

    displayStatusCheck();
    drawScore();
    if(!gameOver){
        requestAnimationFrame(animate);
        highscore();
        
    }
}
animate(0);