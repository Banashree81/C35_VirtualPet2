var dog, happyDog, database, foodS, foodStock, feedBtn, addFoodBtn;

var fedTimeRef, lastFedTime;

var foodObj;


function preload()
{
	dogImg = loadImage('images/dogImg.png');
	happyDogImg = loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(700, 500);
	database = firebase.database();

	dog = createSprite(500,250,10,10);
	dog.addImage(dogImg);
	dog.scale = 0.4;

	//read the value of food from the database
	foodStock = database.ref('food');
	foodStock.on("value", function(data){
		foodS=data.val();		
	});

	
	//read the value of feedTime from the database
	fedTimeRef = database.ref('feedTime');
	fedTimeRef.on("value", function(data){
		lastFedTime=data.val();		
	});


	foodObj = new Food();

	feedBtn = createButton('Feed the Dog');
	feedBtn.position(600,30);
	feedBtn.mousePressed(feedDog);

	addFoodBtn = createButton('Add Food');
	addFoodBtn.position(710,30);
	
	addFoodBtn.mousePressed(addFoodStock); //cannot pass parameters in mousePressed for normal functions
	

	
  
}


function draw() {
 
  background(46, 139, 87);

	
   
  if(foodS === 0){
	dog.addImage(dogImg);
  }

  if(foodS){	
	
		foodObj.foodStock = foodS ;
		foodObj.display();	

		textSize(20);
		fill("orange")
		if(lastFedTime>=12){
			text("Last Fed: "+lastFedTime%12+ " PM", 50,50);
		}else if(lastFedTime==0){
			text("Last Fed: 12 AM", 50,50);
		}else{
			text("Last Fed:"+lastFedTime+ " AM", 50,50);
		}

		text("Food Stock :"+foodS, 50,100);
	}	

  

  

  
 
  drawSprites();
  text(mouseX+ " "+mouseY, mouseX, mouseY)
 
}


function feedDog(){
	//get the current hour from system
	var currHour = new Date().getHours();

	//check to see whether food stock never goes below zero
	if(foodObj.foodStock >0){
		//update in database
		database.ref('/').update({
			feedTime : currHour,
			food : foodObj.foodStock -1
		})
	}


	//changed the dog image to a happy one
	dog.addImage(happyDogImg);



}

function addFoodStock(){
	//console.log(foodS)
	foodS++;
	database.ref('/').update({
		food : foodS
	})
} 
