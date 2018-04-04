  'use strict';
  var myImage = document.querySelector('img');
	myImage.onclick = function() {
		var mySrc = myImage.getAttribute('src');
		if(mySrc === 'images/firefox-icon.png') {
			myImage.setAttribute ('src','images/google-icon.png');
		} else {
			myImage.setAttribute ('src','images/firefox-icon.png');
		}
	}
	
var myButton = document.querySelector('button');

myButton.onclick = function() {
  setUserName();
}

//var years = prompt('Сколько вам лет?', 100);

//alert('Вам ' + years + ' лет!')