class Food{
    constructor(){
        this.foodStock = 0;       
        this.image = loadImage('images/Milk.png');
    }

    getFoodStock(){}


    /*updateFoodStock(){}
    
    deductFood(){}*/

    display(){
        var x = 80, y = 100;

        //console.log(this.foodStock)

       // imageMode(CENTER)
       if(this.foodStock===0){
        image(this.image, 150,220,70,70);
       }else  if(this.foodStock!== 0){
       
            for (let index = 0; index < this.foodStock; index++) {
               
                if(index%10===0){
                   
                    x = 80;
                    y = y+50;
                }
                
                image(this.image, x,y,50,50);
                x=x+30;
            }
        }

    }
}
