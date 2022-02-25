  'use strict';
var show_button = document.getElementById('showBtn');
	show_button.onclick = function() {
		var side_a = document.getElementById('sideA').value;
		var side_b = document.getElementById('sideB').value;
		var side_c = document.getElementById('sideC').value;

		detectTriangle(side_a, side_b, side_c);
	}

function detectTriangle(side_a, side_b, side_c) {
    var a = parseInt(side_a);
	var b = parseInt(side_b);
	var c = parseInt(side_c);
    var myImage = document.querySelector('img');
    var message = document.getElementById('msg');

    if(!checkSidesOfTriangle(side_a, side_b, side_c)){
      return;
    }

    if(a===b && b===c) {
      myImage.setAttribute('src', '../images/triangles/triangle-1.png');
      message.innerHTML = "It's an equilateral triangle!";
      message.className = "msg-correct";
    } else if ((a==b && a!=c) || (b==c && b!=a) || (a==c && a!=b)) {
      myImage.setAttribute('src', '../images/triangles/triangle-2.png');
      message.innerHTML = "It's an isosceles triangle!";
      message.className = "msg-correct";
    } else if ((Math.sqrt((a * a) + (b * b))==c) || (Math.sqrt((b * b) + (c * c))==a)) {  //here bug!!!  -->  3, 5, 4
      myImage.setAttribute('src', '../images/triangles/triangle-4.png');
      message.innerHTML = "It's an right angled triangle!";  // here bug color is not set to green after red
    } else {
      myImage.setAttribute('src', '../images/triangles/triangle-3.png');
      message.innerHTML = "It's an scalene triangle!";
      message.className = "msg-correct";
    }
}

function checkSidesOfTriangle(side_a, side_b, side_c) {
    var myImage = document.querySelector('img');
    var message = document.getElementById('msg');
    if(side_a.indexOf('script') !== -1 || side_b.indexOf('script') !== -1) { // not all fields and not all injections are taken into account
          myImage.setAttribute('src', '../images/triangles/triangle-0.png');
          message.innerHTML = "Sql-injections are forbidden!";
          message.className = "msg-error";
          return false;
    }
    var a = parseInt(side_a);
	var b = parseInt(side_b);
	var c = parseInt(side_c);

    if(isNaN(a) || isNaN(b)) {   //here bug!!!  -->  isNaN(c)
            myImage.setAttribute('src', '../images/triangles/triangle-0.png');
            message.className = "msg-error";
            message.innerHTML = "Fields cannot be empty!";
            return false;
    } else if ((a+b <= c) || (a+c <= b) || (c+b <= a)) {
           myImage.setAttribute('src', '../images/triangles/triangle-0.png');
           message.className = "msg-error";
           message.innerHTML = "Such a triangle doesn't exist! A side of a triangle cannot be greater than the sum of the lengths of the other two sides!";
            return false;
    } else if ((a+b <= c) || (a+c <= b) || (c+b <= a)) {
                myImage.setAttribute('src', '../images/triangles/triangle-0.png');
                message.className = "msg-error";
                message.innerHTML = "Such a triangle doesn't exist! A side of a triangle cannot be greater than the sum of the lengths of the other two sides!";
                 return false;
         }

    return true;
}

function drawTriangle() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var context = canvas.getContext('2d');

    context.beginPath();
    context.moveTo(75,75);
    context.lineTo(10,75);
    context.lineTo(10,25);
    context.fill();
  }
}
