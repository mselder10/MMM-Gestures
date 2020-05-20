'use strict';

/* Magic Mirror
* Module: MMM-Gestures
*
* By Mary Stuart Elder
* Modeled after MMM-PIR-Sensor (by Paul-Vincent Roll) and MMM-gesturedetection (by Chris Linzg)
*/

const NodeHelper = require('node_helper');
const gpio = require('onoff').Gpio;
const exec = require('child_process').exec;

module.exports = NodeHelper.create({
  // Initalize
  start: function () {
    this.started = false;
  },

  // Wakes monitor/puts it to sleep
  // Input: stateString --> "off" or "on""
  setMonitorState: function (stateString) {
	if(stateString == "off") {
		exec("vcgencmd display_power 0", null);
	}
	else {
		exec("vcgencmd display_power 1", null);
	}
	
  },

  // Wakes screen (if needed), resets the screen timeout timer, and sends notification
  actionsOnGesture: function (pin, number, user) {
	self.setMonitorState("on");
	
	// Reset screen sleeping timeout
	clearTimeout(self.deactivateMonitorTimeout);
	self.deactivateMonitorTimeout = setTimeout(function() {
		self.setMonitorState("off");
	}, self.config.powerSavingDelay * 1000);
	
	// Update current user
	self.config.user = user;

	// send notification for broadcast
	console.log("Gesture GPIO:{} detected".format(pin));
	self.sendSocketNotification('GESTURE{}'.format(number), self.config.user);
  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
	if (notification === 'GESTURE_CONFIG' && this.started == false) {     
		const self = this;
		this.config = payload;

		// Swipe right to left --> show to Joe's info and wake screen
		this.ges0 = new gpio(this.config.gesture0PIN, 'in', 'rising',{ persistentWatch: true, debounceTimeout: this.config.clickDelay });
		this.ges0.watch(function(err, state) {
		  // check the state of the button
		  // 1 == pressed, 0 == not pressed
		  if(state == 1) {
			actionsOnGesture(21, 0, "Joe");
			}
		});

		// Swipe left to right --> show to Stu's info and wake screen
		this.ges1 = new gpio(this.config.gesture1PIN, 'in', 'rising',{ persistentWatch: true, debounceTimeout: this.config.clickDelay });
		this.ges1.watch(function(err, state) {
		  // check the state of the button
		  // 1 == pressed, 0 == not pressed
		  if(state == 1) {
			actionsOnGesture(20, 1, "Stu");
			}
		});

		this.started = true;
    }
  }
  
});