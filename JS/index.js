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

    if (Keys.right == true && x < ((window.innerWidth) / 16) - 8.5){
        x += movementSpeed;
        subCar.style.left = x + "rem";
    }

    if (Keys.up == true && y > -4.125){
        y -= movementSpeed;
        subCar.style.top = y + "rem";
    }

    if (Keys.down == true && y < ((window.innerHeight) / 16) - 14.5){
        y += movementSpeed;
        subCar.style.top = y + "rem";
    }

    if (y >= -4.5) {
        subCar.style.zIndex = 2;
    }
    if (y < -4.5) {
        subCar.style.zIndex = 0;
    }

    //If you press enter, detect if you're on a monitor, and then send you to the website the monitor represents. w3schools is used currently as a placeholder.
    if (event.keyCode == 13 && collision($(".monitor"), $("#sub-car"))) {
        if (collision($("#w3"), $("#sub-car"))){
            window.location.href = "https://www.w3schools.com/howto/howto_js_redirect_webpage.asp";
        }
    }

    
    // If the first gif is currently playing and the car is colliding with the monitor, play the second gif
    if (collision($("#sub-car"), $("#w3")) && w3MonitorGifPlaying == 1){
        $("#w3").attr("src", "Images/w3-monitor-on.gif");
        w3MonitorGifPlaying = 2;
    }
    // If the second gif is currently playing and the car is colliding with the monitor, play the first gif
    if (!collision($("#sub-car"), $("#w3")) && w3MonitorGifPlaying == 2){
        w3MonitorGifPlaying = 1;
        $("#w3").attr("src", "Images/w3-monitor-off.gif")
    }

    if (collision($("#sub-car"), $("#arrowRight"))) {
        window.location.href = "gallery.html";
    }
}

// Thanks to Ethan R. for sharing this function with me :^)
// Collision function to detect when you're on top of an object 
function collision($div1, $div2) {
    // Finds the offset from the left of the screen for the first div
    var x1 = $div1.offset().left;
    // Finds the offset from the top of the screen for the first div
    var y1 = $div1.offset().top;
    // Finds the height of the first div including margin
    var h1 = $div1.outerHeight(true);
    // Finds the width of the first div including margin
    var w1 = $div1.outerWidth(true);
    // Add the top offset and the height to find the bottom of the first div
    var b1 = y1 + h1;
    // Add the right offset and the width to find the right side of the first div
    var r1 = x1 + w1;
    // The following six lines are the same as the first couple lines but for the second div, so I'm not commenting them
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;
      
    // Compares the two sets of variables to determine whether the two divs are overlapping
    // i.e. the first one checks if div 2's y offset is greater than the bottom of div 1
    // If so, the function returns false, because the two cannot be touching if that is the case
    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    // If none of the above conditions are met, the two must be overlapping, and therefore the function returns true
    return true;
}

// The x and y variables mentioned earlier
// Why did I put these /after/ the function that used them? Idunno
var x = ((window.innerWidth / 2) / 16) - 4.5;
var y = ((window.innerHeight / 2) / 16) - 10.5;

// Variable used to tell the function which gif is currently playing
var w3MonitorGifPlaying = 1;

// Object variables for positioning on startup
var subCar = document.getElementById('sub-car');
var arrowObject = document.getElementById('arrowRight');
var monitor2 = document.getElementById('monitor2');
var monitor3 = document.getElementById('monitor3');
var w3Monitor = document.getElementById('w3');

// Set the car's default location once the webpage has loaded.
// Will probably update this later to add other object locations, such as the monitors that take you to other websites
$(function(){
    subCar.style.left = x + "rem";
    subCar.style.top = y + "rem";
    arrowObject.style.top = ((window.innerHeight / 2) / 16) - 9.25 + "rem";
    arrowObject.style.left = ((window.innerWidth / 2) / 16) - 3.25 + "rem";
    monitor2.style.right = (window.innerWidth) / 16 - 48.5 + "rem";
    monitor2.style.top = (window.innerHeight / 16) - 21 + "rem";
    monitor3.style.right = (window.innerWidth / 16) - 81 + "rem"
    monitor3.style.top = (window.innerHeight/ 16) - 21 + "rem";
    w3Monitor.style.right = (window.innerWidth / 16 - 16) + "rem";
    w3Monitor.style.top = (window.innerHeight / 16 - 21) + "rem";
})