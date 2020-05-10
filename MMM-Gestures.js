/* Magic Mirror
* Module: MMM-Gestures
*
* By Mary Stuart Elder
* Modeled after MMM-PIR-Sensor (by Paul-Vincent Roll) and MMM-gesturedetection (by Chris Linzg)
*/

Module.register('MMM-Gestures',{
	defaults: {
		gesture0PIN: 21,
		gesture1PIN: 20,
		//time in miliseconds before another button click is recognized 
		clickDelay: 200,	
		//time in seconds before screen times out when no gesture is made
		powerSavingDelay: 60,
		user: "Stu",
	},
	// Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
		
		// Swipe right to left --> switch to Joe's info
		if (notification === 'GESTURE0') {
			this.pressed0 = true;
			this.sendNotification("SHOW_ALERT", {type: "notification", title:"GES0(HR)", message:"brightness:" + payload%10});
			this.sendNotification("BRIGHTNESS", payload, this.name);
        }

		// Swipe left to right --> switch to Stu's info
		if (notification === 'GESTURE1' && !this.pressed1) {
			this.pressed1 = true;
			this.sendNotification("SHOW_ALERT", {type: "notification", title:"GES1(HL)", message:"hide Wunderlist"}); 
			MM.getModules().withClass('MMM-Wunderlist').enumerate(function(module) {
                module.hide(1000, function() {
                    //Module hidden.
                });
            });
			           
        }
		else if (notification === 'GESTURE1' && this.pressed1) { 
			this.pressed1 = false;
			this.sendNotification("SHOW_ALERT", {type: "notification", title:"GES1(HL)", message:"show Wunderlist"});
			MM.getModules().withClass('MMM-Wunderlist').enumerate(function(module) {
                module.show(1000, function() {
                    //Module hidden.
                });
            });
   
		}

		// No gesture in awhile? Turn monitor off

		// Gesture when screen was asleep? Turn monitor on
		
		if (notification === 'GESTURE2' && !this.pressed2) {
			this.pressed2 = true;
			this.sendNotification("SHOW_ALERT", {type: "notification", title:"GES2(RL)", message:"monitor off"}); 
			
        }
		else if (notification === 'GESTURE2' && this.pressed2) { 
			this.pressed2 = false;
			this.sendNotification("SHOW_ALERT", {type: "notification", title:"GES2(RL)", message:"monitor on"});
			
   
		}
		if (notification === 'GESTURE3') {
			this.sendNotification("SHOW_ALERT", {type: "notification", title:"GES3(LR)", message:"Video"}); 
			this.sendNotification("VIDEO", true);
			
			
            MM.getModules().exceptWithClass(['clock','currentweather']).enumerate(function(module) {
                module.hide(1000, function() {
                    //Module hidden.
                });
            });
			
            
        }
					
	},
	notificationReceived: function(notification, payload, sender) {
		//register MMM-Button click
		if (notification == 'VIDEO_STOP') {
				MM.getModules().exceptWithClass(['clock','currentweather']).enumerate(function(module) {
                module.show(1000, function() {
                    //Module hidden.
                });
            });
			
			
		}
		if (notification == "BRIGHTNESS") {
			this.config.brightness = payload;
			Log.info(this.name + " received " + notification + " and set brightness to " + this.config.brightness);
			this.sendSocketNotification("BRIGHTNESS", payload);
			//Log.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name);
		} 
	},

	

	start: function() {
		this.pressed0 = false;
		this.pressed1 = false;
		this.pressed2 = false;
		this.pressed3 = false;
		this.sendSocketNotification('GESTURE_CONFIG', this.config);
		Log.info('Starting module: ' + this.name);
	},
	
	
});