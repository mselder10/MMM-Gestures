/* Magic Mirror
* Module: MMM-Gestures
*
* By Mary Stuart Elder
* Modeled after MMM-PIR-Sensor (by Paul-Vincent Roll) and MMM-gesturedetection (by Chris Linzg)
*/

Module.register('MMM-Gestures',{
	defaults: {},
	start: function() {},
	getDom: function() {
		var element = document.createElement("div")
		element.className = "myContent"
		element.innerHTML = "Hello, World!"
		return element
	},
	// Override socket notification handler.
	socketNotificationReceived: function() {},
	
});