var mySong;
var myImage;

var analyzer;
var volumehistory = [];

var button;

function preload(){
  mySong = loadSound('./assets/New Happy Day - fennecbeats.mp3');
  myImage = loadImage('./assets/Funny_Song_o.jpg');
}

function setup() {
createCanvas(windowWidth, windowHeight);
angleMode(DEGREES);
analyzer = new p5.Amplitude();
analyzer.setInput(mySong);

button = createButton('play');
button.mousePressed(toggleSong);
button.position(width/2 - 20, height - 30);
}

function toggleSong() {
  if(!mySong.isPlaying()) {
    mySong.play();
    button.html('pause');
    button.position(width/2 - 20, height - 30);
    buttonAlign(CENTER);
  } else {
    mySong.pause();
    button.html('play');
    button.position(width/2 - 20, height - 30);
    buttonAlign(CENTER);
  }
}

function draw() {
  // if(mouseX > width/2 && mouseX > height/2) {
  //   if(mySong.isPlaying() == false) {
  //     mySong.play();
  //   }
  // } else {
  //   mySong.stop();
  // }
  var volume = analyzer.getLevel();
  volumehistory.push(volume);

  image(myImage, 0, 0, windowWidth, windowHeight);

  stroke(0);
  strokeWeight(2);
  fill(random(255), random(255), random(255));

  translate(width/2, height/2);
  beginShape();
  for(var i = 0; i < 360; i++) {
    var r = map(volumehistory[i], 0, 1, 20, 500);
    var x = r * cos(i);
    var y = r * sin(i);
    // var y = map(volumehistory[i], 0, 1, height, 0);
    vertex(x, y);
  }
  endShape();

  if(volumehistory.length > 360) {
    volumehistory.splice(0, 1);
  }
}
