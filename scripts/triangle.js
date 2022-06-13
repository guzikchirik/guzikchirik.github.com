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

	checkStringValues(a, b, c);

    var myImage = document.querySelector('img');
    var message = document.getElementById('msg');

    if(!checkSidesOfTriangle(side_a, side_b, side_c)){
      return;
    }

    if(a===b && b===c) {
      myImage.setAttribute('src', '../images/triangles/triangle-1.png');
      message.innerHTML = "It's an equilateral triangle!";
      message.className = "msg-correct";
      writeScenarios("Positive case: 'equilateral' triangle")
    } else if ((a==b && a!=c) || (b==c && b!=a) || (a==c && a!=b)) {
      myImage.setAttribute('src', '../images/triangles/triangle-2.png');
      message.innerHTML = "It's an isosceles triangle!";
      message.className = "msg-correct";
      writeScenarios("Positive case: 'isosceles' triangle")
    } else if ((Math.sqrt((a * a) + (b * b))==c) || (Math.sqrt((b * b) + (c * c))==a)) {  //here bug!!!  -->  3, 5, 4
      myImage.setAttribute('src', '../images/triangles/triangle-4.png');
      message.innerHTML = "It's an right angled triangle!";
      message.className = "msg-correct";
      writeScenarios("Positive case: 'right angled' triangle")
    } else {
      myImage.setAttribute('src', '../images/triangles/triangle-3.png');
      message.innerHTML = "It's an scalene triangle!"; // here bug color is not set to green after red
      writeScenarios("Positive case: 'scalene' triangle")
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

	if(!isNaN(a) && !isNaN(b) && isNaN(c)) {
	  writeBugs("Field 'C' don't have isNaN check");
	}
	if (Math.sqrt((a * a) + (c * c))==b) {
	    writeBugs("It is 'right angled' triangle!");
	}

	if(a<0 || b<0 || c<0) {
	  writeScenarios("Negative case: One side of the triangle is negative")
	  return false;
	} else 	if(isNaN(a) && isNaN(b) && isNaN(c)) {
            writeErrorMsg("Fields cannot be empty!");
            writeScenarios("Negative case: All fields are EMPTY");
            return false;
    } else 	if(isNaN(a) || isNaN(b)) {   //here bug!!!  -->  isNaN(c)
            writeErrorMsg("Fields cannot be empty!");
            writeScenarios("Negative case: One of the fields is EMPTY");
            return false;
    } else if ((a+b <= c) || (a+c <= b) || (c+b <= a)) {
           writeErrorMsg("Such a triangle doesn't exist! A side of a triangle cannot be greater than the sum of the lengths of the other two sides!");
           writeScenarios("Negative case: Triangle doesn't exist!");
           return false;
    } else if ((a+b <= c) || (a+c <= b) || (c+b <= a)) {
                writeErrorMsg("Such a triangle doesn't exist! A side of a triangle cannot be greater than the sum of the lengths of the other two sides!");
                 return false;
    }

    return true;
}

function writeErrorMsg(msg) {
  var myImage = document.querySelector('img');
  var message = document.getElementById('msg');
  myImage.setAttribute('src', '../images/triangles/triangle-0.png');
  message.className = "msg-error";
  message.innerHTML = msg;
}

function writeBugs(bug) {
    var bugs = document.getElementById('bugsDesc');
    var previous = bugs.innerHTML;
        if(!previous.includes(bug)) {
          if(isEmptyOrSpaces(previous)) {
            bugs.innerHTML = bug;
          } else {
            bugs.innerHTML = previous + "<br>" + bug;
          }
        }
}

function writeScenarios(scenario) {
    var scenarios = document.getElementById('scenariosDesc');
    var previous = scenarios.innerHTML;
    if(!previous.includes(scenario)) {
      if(isEmptyOrSpaces(previous)) {
        scenarios.innerHTML = scenario;
      } else {
        scenarios.innerHTML = previous + "<br>" + scenario;
      }
    }
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

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

function checkStringValues(var1, var2, var3){
  if(isStringValue(var1) || isStringValue(var2) || isStringValue(var3)){
    writeBugs("The form doesn't work with string data");
  }
}

function isStringValue(myVar) {
  if (typeof myVar === 'string' || myVar instanceof String)
    return true;
  else {
    return false;
  }
}
