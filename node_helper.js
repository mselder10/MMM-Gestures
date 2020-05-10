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
  start: function () {
    this.started = false;
  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
	if (notification === 'GESTURE_CONFIG' && this.started == false) {     
		const self = this;
		this.config = payload

		this.geszero = new gpio(this.config.gesture0PIN, 'in', 'rising',{ persistentWatch: true, debounceTimeout: this.config.clickDelay });
		this.geszero.watch(function(err, state) {
		  // check the state of the button
		  // 1 == pressed, 0 == not pressed
		  if(state == 1) {
			// send notification for broadcast
			
			console.log("Gesture GPIO:21 detected");
			self.config.brightness += 51;
			if(self.config.brightness == 306 ) self.config.brightness = 0;
			self.sendSocketNotification('GESTURE0', self.config.brightness);
			}
		});

		this.gesone = new gpio(this.config.gesture1PIN, 'in', 'rising',{ persistentWatch: true, debounceTimeout: this.config.clickDelay });
		this.gesone.watch(function(err, state) {
		  // check the state of the button
		  // 1 == pressed, 0 == not pressed
		  if(state == 1) {
			// send notification for broadcast
			self.sendSocketNotification('GESTURE1', true);
			
			console.log("Gesture GPIO:20 detected");
			
			}
		});    

		// Originally - hold left meant power on/off (toggled). Since it acts like a button, after being turned off, it must turn back on
		// Here - when movement isn't detected for awhile, want to trigger script, then AGAIN when movement IS detected. --> Keep a "sleep" state?
		// So - "gestwo" becomes "movement has been detected in this time period"

		this.gestwo = new gpio(this.config.gesture2PIN, 'in', 'rising',{ persistentWatch: true, debounceTimeout: this.config.clickDelay });
		this.gestwo.watch(function(err, state) {
		  // check the state of the button
		  // 1 == pressed, 0 == not pressed
		  if(state == 1) {
			// send notification for broadcast
			self.sendSocketNotification('GESTURE2', true);
			
			console.log("Gesture GPIO:16 detected");
			// Turn monitor on/off
			exec("python /home/pi/MagicMirror/modules/MMM-gesturedetecion/manualonoff.py " + self.config.brightness, null);
			}
		});

		this.started = true
    };
  }
  
});