window.onload = function()
{
    	var globalClock = document.getElementById("clock");
	var alert = document.getElementById("alert");
	
	var policeProbability = 15;
	var civProbability = 20;
	
	// these measure the last time a police or civ alert happened
	var lastPolice = -1000;
	var lastCiv = -1000;
	
	// cooldown clock for alerts
	var policeCooldown = 5;
	var civCooldown = 5;
	
	// check if game is currently paused
	var pause = 0;
	
	// alertPhase affects frequency of police alerts
	var alertPhase = document.getElementById("alertPhase");
	
	var policeSound = new Audio("./resources/police.wav");
	var civSound = new Audio("./resources/civ.wav");
	var alertSound = new Audio("./resources/alertUp.wav");
	policeSound.volume = 0.7;
	alertSound.volume = 0.4;
	
	
	// these three variables affect alertPhase timing
	var alert2Time = 10;
	var alert3Time = 20;
	var alert4Time = 30;
	var alertPhaseSwitches = [alert2Time, alert3Time, alert4Time];
	
	alert.style.visibility = "hidden";
	
	
	// tick the clock over, tick indicated how many ms per tick:
	var tick = 1000;
	setInterval(function(){ 
		if (pause == 0) {
			// tick:
			globalClock.innerHTML = parseInt(globalClock.innerHTML) + 1;
			
			// check if alert will occur:
			var policeRoll = Math.random() * 100;
			
			// check if alert phase is switching:
			if (parseInt(globalClock.innerHTML) == alertPhaseSwitches[parseInt(alertPhase.innerHTML) - 1]) {
				alertSound.play();
				alertPhase.innerHTML = parseInt(alertPhase.innerHTML) + 1;
				policeProbability = policeProbability * 1.5;
				policeTrigger();
			}
			else if ((policeRoll < (policeProbability)) && (parseInt(globalClock.innerHTML) > (lastPolice + policeCooldown))) {
				// police event triggered
				policeTrigger();
			}
			else {
				var civRoll = Math.random() * 100;
				if ((civRoll < civProbability) && (parseInt(globalClock.innerHTML) > (lastCiv + civCooldown))) {
					civTrigger();
				}
			}
		}
	}, tick);
	

	function policeTrigger() {
		policeSound.play();
		alert.style.visibility = "visible";
		alert.innerHTML = "POLICE!";
		
		lastPolice = parseInt(globalClock.innerHTML)
		
		pause = 1;
	}
	
	function civTrigger() {
		civSound.play();
		alert.style.visibility = "visible";
		alert.innerHTML = "CIVILIAN!";
		
		lastCiv = parseInt(globalClock.innerHTML);
		
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
