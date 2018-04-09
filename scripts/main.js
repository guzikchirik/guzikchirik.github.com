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

var show_search_button = document.getElementById('show_search');
	show_search_button.onclick = function() {
		var search_block =  document.getElementById('expected_element');
		var computedStyle = getComputedStyle(search_block);			 
		if(computedStyle.display === 'none') {		
			setTimeout(function() { search_block.style.display="block" }, 3000);	
		} else {
			setTimeout(function() { search_block.style.display="none" }, 3000);			
		}
	}	