var canvas = $('#myCanvas')[0],
    granularity = 1,
    speed_ratio = 80,
    words = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

var Dot = function(centerX , centerY , centerZ , radius){
  var to = getArea();
  this.dx = centerX;
  this.dy = centerY;
  this.dz = centerZ;
  this.tx = to[0];
  this.ty = to[1];
  this.tz = 0;
  this.z = centerZ;
  this.x = centerX;
  this.y = centerY;
  this.dis_x = this.tx - this.dx;
  this.dis_y = this.ty - this.dy;
  this.dis_z = this.tz - this.dz;
  this.radius = radius;
  this.direction = (Math.floor(Math.random()*2)*2-0.4)*0.05;
}
Dot.prototype = {
  paint:function(){
    context.save();
    context.beginPath();
    context.arc(this.x , this.y, this.radius , 0 , 2*Math.PI);
    context.fillStyle = "rgba(50,50,50,1)";
    context.fill()
    context.restore();
  },
  ifArrival: function(){
   if(Math.abs(this.tx-this.x)<=Math.abs(this.dis_x/speed_ratio) && Math.abs(this.ty-this.y)<=Math.abs(this.dis_y/speed_ratio)){
    return true;
   }else{
    return false;
   }
  }
}

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var context = canvas.getContext('2d');
var ifDoneList = [];
words.map(function(v,i){
  ifDoneList.push(true);
})

play();

function init(ds){
  granularity = 1;
  steps = [];
  ifDone = false;
  ds.map(function(dot,i){
    steps[i] = [dot.dis_x/speed_ratio,dot.dis_y/speed_ratio,dot.dis_z/speed_ratio];
  });
}

function play(){
  ifDoneList[0] = false;
  var t = setInterval(function(){
    words.map(function(word,id){
      if(!ifDoneList[id]){
        var steps = [],
           ifDone = ifDoneList[id],
           dots;
        drawDots(getimgData(word));
        changeDots(word,id);
      }
    });
  },5000);
};

function animate(ds,id){
  var temp = true;
  ds.map(function(dot,i){
    temp &= dot.ifArrival();
    if(!dot.ifArrival()){
      dot.x += steps[i][0];
      dot.y += steps[i][1];
      dot.z += steps[i][2];
      dot.radius += dot.direction;
      if(dot.radius<0){
        dot.radius = 0;
        dot.direction = 0;
      }
    }
  })
  if(temp){
    ifDone = true;
    ifDoneList[id] = true;
    ifDoneList[(++id%26)] = false;
  }
  drawDots(ds);
}

function render(animate,dots,id){
  var t = setInterval(function(){
    animate(dots,id);
    if(ifDone){
      clearInterval(t);
    }
  },25);
}

function changeDots(word,id){
  var ds = getimgData(word);
  t = setInterval(function(){
    granularity++;
    context.clearRect(0,0,canvas.width , canvas.height);
    var temp_ds = getimgData(word);
    drawDots(temp_ds);
    if(granularity == 6){
      clearInterval(t);
      dots = temp_ds;
      init(dots);
      render(animate,dots,id);
    }
  },130);
}

function drawDots(ds){
  context.clearRect(0,0,canvas.width , canvas.height);
  ds.map(function(v,i){
    v.paint()
  })
}

function getimgData(text){
  drawText(text);
  var imgData = context.getImageData(0,0,canvas.width , canvas.height);
  context.clearRect(0,0,canvas.width , canvas.height);
  var dots = [];
  for(var x=0;x<imgData.width;x+=granularity){
    for(var y=0;y<imgData.height;y+=granularity){
      var i = (y*imgData.width + x)*4;
      if(imgData.data[i] >= 1){
        var dot = new Dot(x-3 , y-3 , 0 , 3);
        dots.push(dot);
        
      }
    }
  }
  return dots;
}

function drawText(text){
  context.save()
  context.font = "250px 微软雅黑 bold";
  context.fillStyle = "rgba(100,100,100,1)";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text , canvas.width/2 , canvas.height/2);
  context.restore();
}

function getArea(){
  areas = [
    [-Math.floor(Math.random()*canvas.width),-Math.floor(Math.random()*canvas.height)],
    [Math.floor(Math.random()*canvas.width),-Math.floor(Math.random()*canvas.height)],
    [Math.floor((Math.random()+1)*canvas.width),-Math.floor(Math.random()*canvas.height)],
    [Math.floor((Math.random()+1)*canvas.width),Math.floor(Math.random()*canvas.height)],
    [Math.floor((Math.random()+1)*canvas.width),Math.floor((Math.random()+1)*canvas.height)],
    [Math.floor(Math.random()*canvas.width),Math.floor((Math.random()+1)*canvas.height)],
    [-Math.floor(Math.random()*canvas.width),Math.floor((Math.random()+1)*canvas.height)],
    [-Math.floor(Math.random()*canvas.width),Math.floor(Math.random()*canvas.height)],
  ];
  id = Math.floor(Math.random()*8);
  return areas[id];
}