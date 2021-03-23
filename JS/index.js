var subCar = document.getElementById('sub-car');

// Used so I don't have to type out which key is pressed or remember codes every time
// I didn't use it very consistently though, so I still ended up having to remember codes :^)
// [internalized pain in spanish]
var Keys = {
    up: false,
    down: false,
    left: false,
    right: false,
} 

// How many "pixels" to move each time a button is pressed. One "pixel" is 0.25rem.
var movementSpeed = 0.5;

// Detect if a key is pressed. Normally I'd just detect which key is pressed using event.keyCode, but this lets me have two keys pressed at the same time, so you can move diagonally.
// This will also be useful when I get around to making diagonal sprites
function getKeyPressed(kc) {
    if (kc == 37) {Keys.left = true;}
    else if (kc == 38) {Keys.up = true;}
    else if (kc == 39) {Keys.right = true;}
    else if (kc == 40) {Keys.down = true;}
}

// Detects whether you've stopped pressing a key.
function getKeyUnpressed(kc) {
    if (kc == 37) {setTimeout(function(){Keys.left = false}, 0);}
    else if (kc == 38) {setTimeout(function(){Keys.up = false}, 0);}
    else if (kc == 39) {setTimeout(function(){Keys.right = false}, 0);}
    else if (kc == 40) {setTimeout(function(){Keys.down = false}, 0);}
}

// This changes the direction the 'car' is facing. If it's just horizontal, the image is flipped using a class;
// If it's from horizontal to vertical or switching vertical directions, the image source is changed and the class is changed to fit the new direction and make sure things don't move around when they shouldn't.
function changeImage(){
    if($("#sub-car").hasClass("flipped") != true && event.keyCode == 37){
        $("#sub-car").addClass("flipped");
        $("#sub-car").addClass("charObjectH");
        $("#sub-car").removeClass("charObjectV");
        $("#sub-car").attr("src", "Images/sub-car-horizontal.gif");
    } else if (event.keyCode == 39){
        $("#sub-car").removeClass("flipped");
        if($("#sub-car").attr("src") != "Images/sub-car-horizontal.gif") {$("#sub-car").attr("src", "Images/sub-car-horizontal.gif")}
        $("#sub-car").addClass("charObjectH");
        $("#sub-car").removeClass("charObjectV");
    } else if ($("#sub-car").attr("src") != "Images/sub-car-south.gif" && event.keyCode == 38){
        $("#sub-car").removeClass("flipped");
        $("#sub-car").attr("src", "Images/sub-car-south.gif");
        $("#sub-car").removeClass("charObjectH");
        $("#sub-car").addClass("charObjectV");
    } else if ($("#sub-car").attr("src") != "Images/sub-car-north.gif" && event.keyCode == 40){
        $("#sub-car").removeClass("flipped");
        $("#sub-car").attr("src", "Images/sub-car-north.gif");
        $("#sub-car").removeClass("charObjectH");
        $("#sub-car").addClass("charObjectV");
    }

    // Increment or decrement the x or y variable by the movement speed and then set the location of the car to the new value of x or y
    if (Keys.left == true && x >= 0){
        x -= movementSpeed;
        subCar.style.left = x + "rem";
    }

    if (Keys.right == true && x < ((window.innerWidth) / 16) - 22.5){
        x += movementSpeed;
        subCar.style.left = x + "rem";
    }

    if (Keys.up == true && y > -4.125){
        y -= movementSpeed;
        subCar.style.top = y + "rem";
    }

    if (Keys.down == true && y < ((window.innerHeight) / 16) - 10.5){
        y += movementSpeed;
        subCar.style.top = y + "rem";
    }

    if (y >= -4.5) {
        subCar.style.zIndex = 2;
    }
    if (y < -4.5) {
        subCar.style.zIndex = 0;
    }

    //If you press enter, detect if you're on a monitor platform, and then send you to the website the monitor represents. w3schools is used currently as a placeholder.
    if (event.keyCode == 13 && y >= -2 && y <= -0.5 && x >= 1 && x <= 22.5) {
        window.location.href = "https://www.w3schools.com/howto/howto_js_redirect_webpage.asp"
    }
}

// The x and y variables mentioned earlier
// Why did I put these /after/ the function that used them? Idunno
var x = ((window.innerWidth / 2) / 16) - 20;
var y = ((window.innerHeight / 2) / 16) - 5;

// Experimenting with canvas
/*var ctx = document.getElementById("canvas").getContext('2d');
var img = new Image;
img.onload = function() {
    ctx.drawImage(img, 10, 10);
}
img.src = "Images/sub-car-horizontal.gif";*/

//Set the car's default location. Will probably update this later to add other object locations, such as the monitors that take you to other websites
$(function(){
    subCar.style.left = x + "rem";
    subCar.style.top = y + "rem";
})