  'use strict';
var show_button = document.getElementById('showBtn');
	show_button.onclick = function() {
		var side_a = document.getElementById('sideA').value;
		var side_b = document.getElementById('sideB').value;
		var side_c = document.getElementById('sideC').value;

		detectTriangle(side_a, side_b, side_c);
	}

// Clear All button
var clear_button = document.getElementById('clearBtn');
if (clear_button) {
  clear_button.onclick = function() {
    document.getElementById('sideA').value = '';
    document.getElementById('sideB').value = '';
    document.getElementById('sideC').value = '';
    document.getElementById('msg').innerHTML = '';
    document.getElementById('msg').className = 'result-msg';
    resetCards();
    clearCanvas();
  }
}

function detectTriangle(side_a, side_b, side_c) {
    var a = parseInt(side_a);
	var b = parseInt(side_b);
	var c = parseInt(side_c);

	checkStringValues(a, b, c);

    var myImage = document.querySelector('img#logo');
    var message = document.getElementById('msg');

    if(!checkSidesOfTriangle(side_a, side_b, side_c)){
      resetCards();
      clearCanvas();
      return;
    }

    if(a===b && b===c) {
      myImage.setAttribute('src', '../../images/triangles/triangle-1.png');
      message.innerHTML = "It's an equilateral triangle!";
      message.className = "msg-correct";
      writeScenarios("Positive case: 'equilateral' triangle")
    } else if ((a==b && a!=c) || (b==c && b!=a) || (a==c && a!=b)) {
      myImage.setAttribute('src', '../../images/triangles/triangle-2.png');
      message.innerHTML = "It's an isosceles triangle!";
      message.className = "msg-correct";
      writeScenarios("Positive case: 'isosceles' triangle")
    } else if ((Math.sqrt((a * a) + (b * b))==c) || (Math.sqrt((b * b) + (c * c))==a)) {  //here bug!!!  -->  3, 5, 4
      myImage.setAttribute('src', '../../images/triangles/triangle-4.png');
      message.innerHTML = "It's an right angled triangle!";
      message.className = "msg-correct";
      writeScenarios("Positive case: 'right angled' triangle")
    } else {
      myImage.setAttribute('src', '../../images/triangles/triangle-3.png');
      message.innerHTML = "It's an scalene triangle!"; // here bug color is not set to green after red
      writeScenarios("Positive case: 'scalene' triangle")
    }

    // Update result cards and draw triangle
    updateCards(a, b, c);
    drawTriangleCanvas(a, b, c);
}

function checkSidesOfTriangle(side_a, side_b, side_c) {
    var myImage = document.querySelector('img');
    var message = document.getElementById('msg');
    if(side_a.indexOf('script') !== -1 || side_b.indexOf('script') !== -1) { // not all fields and not all injections are taken into account
          myImage.setAttribute('src', '../../images/triangles/triangle-0.png');
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
  myImage.setAttribute('src', '../../images/triangles/triangle-0.png');
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

// ====== UI EXTRAS: result cards + canvas ======

function updateCards(a, b, c) {
  // Angles using law of cosines
  var angleA = Math.round(Math.acos((b*b + c*c - a*a) / (2*b*c)) * 180 / Math.PI * 100) / 100;
  var angleB = Math.round(Math.acos((a*a + c*c - b*b) / (2*a*c)) * 180 / Math.PI * 100) / 100;
  var area = Math.round((0.5 * a * b) * 10) / 10;
  var perimeter = Math.round((a + b + c) * 10) / 10;

  setCard('cardA', a);
  setCard('cardB', b);
  setCard('cardC', c);
  setCard('cardAngleA', isNaN(angleA) ? '—' : angleA + '°');
  setCard('cardAngleB', isNaN(angleB) ? '—' : angleB + '°');
  setCard('cardArea', isNaN(area) ? '—' : area);
  setCard('cardPerimeter', perimeter);
}

function setCard(id, val) {
  var el = document.getElementById(id);
  if (el) el.textContent = val;
}

function resetCards() {
  ['cardA','cardB','cardC','cardAngleA','cardAngleB','cardArea','cardPerimeter'].forEach(function(id) {
    setCard(id, '—');
  });
}

function clearCanvas() {
  var canvas = document.getElementById('triangleCanvas');
  if (!canvas) return;
  canvas.style.display = 'none';
  var placeholder = document.getElementById('trianglePlaceholder');
  if (placeholder) placeholder.style.display = 'flex';
}

function drawTriangleCanvas(a, b, c) {
  var canvas = document.getElementById('triangleCanvas');
  if (!canvas || !canvas.getContext) return;

  // Compute angles
  var angleC_rad = Math.acos((a*a + b*b - c*c) / (2*a*b));
  if (isNaN(angleC_rad)) return;

  var placeholder = document.getElementById('trianglePlaceholder');
  canvas.style.display = 'block';
  if (placeholder) placeholder.style.display = 'none';

  var W = canvas.offsetWidth || 480;
  var H = canvas.offsetHeight || 260;
  canvas.width = W;
  canvas.height = H;

  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  // Scale triangle to fit
  var scale = Math.min((W - 120) / Math.max(a, b, c), (H - 80) / Math.max(a, b, c)) * 0.9;
  var sa = a * scale;
  var sb = b * scale;

  // Place C at bottom-left, A at bottom-right, B at top
  var cx = 60, cy = H - 48;
  var ax = cx + sb, ay = cy;
  var bx = cx, by = cy - sa;

  // Blue glow style
  ctx.strokeStyle = '#4d6fe0';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#4d6fe0';
  ctx.shadowBlur = 8;
  ctx.fillStyle = 'rgba(77, 111, 224, 0.07)';

  // Draw filled triangle
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Right angle marker at C
  var markerSize = 10;
  ctx.shadowBlur = 0;
  ctx.strokeStyle = '#4d6fe0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx + markerSize, cy);
  ctx.lineTo(cx + markerSize, cy - markerSize);
  ctx.lineTo(cx, cy - markerSize);
  ctx.stroke();

  // Labels
  ctx.shadowBlur = 0;
  ctx.font = 'bold 12px Open Sans, sans-serif';
  ctx.fillStyle = '#4d9eff';

  // Vertex labels
  ctx.textAlign = 'center';
  ctx.fillText('B (' + Math.round(Math.acos((a*a + c*c - b*b)/(2*a*c)) * 180/Math.PI * 100)/100 + '°)', bx, by - 10);
  ctx.fillText('C (90°)', cx - 16, cy + 18);
  ctx.fillText('A (' + Math.round(Math.acos((b*b + c*c - a*a)/(2*b*c)) * 180/Math.PI * 100)/100 + '°)', ax + 10, ay + 18);

  // Side labels
  ctx.font = '11px Open Sans, sans-serif';
  ctx.fillStyle = '#6a9fd8';
  // side a (vertical, left)
  ctx.fillText('a', cx - 18, (cy + by) / 2);
  ctx.fillText('(' + a + ')', cx - 18, (cy + by) / 2 + 14);
  // side b (horizontal, bottom)
  ctx.fillText('b', (cx + ax) / 2, cy + 16);
  ctx.fillText('(' + b + ')', (cx + ax) / 2, cy + 30);
  // side c (hypotenuse)
  var midCx = (ax + bx) / 2 + 16;
  var midCy = (ay + by) / 2;
  ctx.fillText('c', midCx, midCy);
  ctx.fillText('(' + c + ')', midCx, midCy + 14);
}
