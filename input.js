export default class InputHandler{
  constructor(){
    this.lastkey = "";
    window.addEventListener('keydown', function(e){
      console.log(e.key);
      switch(e.key){
        case "ArrowUp":
          this.lastkey = "PRESS up";

      }
    
    });
    window.addEventListener('keyup', function(e){
      switch(e.key){
        case "ArrowUp":
          this.lastkey = "RELEASE up";

      }
    
    });
  }

}