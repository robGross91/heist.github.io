window.onload = function()
{
    var globalClock = document.getElementById("clock");
	var alert = document.getElementById("alert");
	
	var policeProbability = 20;
	var civProbability = 20;
	
	var pause = 0;
	
	alert.style.visibility = "hidden";
	
	
	// tick the clock over, tick indicated how many ms per tick:
	var tick = 1000;
	setInterval(function(){ 
		if (pause == 0) {
			// tick:
			globalClock.innerHTML = parseInt(globalClock.innerHTML) + 1;
			
			// check if alert will occur:
			var roll = Math.random() * 100;
			
			if (roll < policeProbability) {
				// police event triggered
				policeTrigger();
			}
			else {
				var roll = Math.random() * 100;
				if (roll < civProbability) {
					civTrigger();
				}
			}
		}
	}, tick);
	

	function policeTrigger() {
		alert.style.visibility = "visible";
		alert.innerHTML = "POLICE!";
		
		pause = 1;
	}
	
	function civTrigger() {
		alert.style.visibility = "visible";
		alert.innerHTML = "CIVILLIAN!";
		
		pause = 1;
	}
	
	// this triggers when the alert has been clicked on and resolved:
	alert.onclick = function() {
		if (pause == 1) {
			pause = 0;
			alert.style.visibility = "hidden";
		}
	}
	
}
