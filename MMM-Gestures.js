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
		
		// Swipe right to left --> update modules with Joe's info
		if (notification === 'GESTURE0') {
			this.pressed0 = true;
			this.sendNotification("SHOW_ALERT", {type: "notification", title:"Joe", message:"Joe's Profile"});
			MM.getModules().withClass(['calendar', 'MMM-Traffic']).enumerate(function(module) {
                module.hide(1000, function() {
                    //Module hidden.
                });
            });
			MM.getModules().withClass(['calendar2', 'MMM-Traffic2']).enumerate(function(module) {
                module.show(1000, function() {
                    //Module shown.
                });
            });
        }

		// Swipe left to right --> update modules with Stu's info
		if (notification === 'GESTURE1') {
			this.pressed1 = true;
			this.sendNotification("SHOW_ALERT", {type: "notification", title:"Stu", message:"Stu's Profile"}); 
			MM.getModules().withClass(['calendar2', 'MMM-Traffic2']).enumerate(function(module) {
                module.hide(1000, function() {
                    //Module hidden.
                });
            });
			MM.getModules().withClass(['calendar', 'MMM-Traffic']).enumerate(function(module) {
                module.show(1000, function() {
                    //Module shown.
                });
            });
        }			
	},
	start: function() {
		this.pressed0 = false;
		this.pressed1 = false;
		this.sendSocketNotification('GESTURE_CONFIG', this.config);
		Log.info('Starting module: ' + this.name);
	},
	
	
});