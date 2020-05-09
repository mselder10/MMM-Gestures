'use strict';

const NodeHelper = require('node_helper');
const gpio = require('onoff');
const exec = require('child_process').exec;


module.exports = NodeHelper.create({
  start: function () {
    this.started = false;
	
  },
  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
	const self = this;
    if (notification === 'GESTURE_CONFIG' && this.started == false) {     
		const self = this
		
		this.config = payload
		var GPIO0 = require('onoff').Gpio,
		geszero = new GPIO0(this.config.gesture0PIN, 'in', 'rising',{ persistentWatch: true, debounceTimeout: this.config.clickDelay });
		
		geszero.watch(function(err, state) {
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
		var GPIO1 = require('onoff').Gpio,
		gesone = new GPIO1(this.config.gesture1PIN, 'in', 'rising',{ persistentWatch: true, debounceTimeout: this.config.clickDelay });
		
		gesone.watch(function(err, state) {
		  // check the state of the button
		  // 1 == pressed, 0 == not pressed
		  if(state == 1) {
			// send notification for broadcast
			self.sendSocketNotification('GESTURE1', true);
			
			console.log("Gesture GPIO:20 detected");
			
			}
		

		});    
		var GPIO2 = require('onoff').Gpio,
		gestwo = new GPIO2(this.config.gesture2PIN, 'in', 'rising',{ persistentWatch: true, debounceTimeout: this.config.clickDelay });
		
		gestwo.watch(function(err, state) {
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
		var GPIO3 = require('onoff').Gpio,
		gesthree = new GPIO3(this.config.gesture3PIN, 'in', 'rising',{ persistentWatch: true, debounceTimeout: this.config.clickDelay });
		
		gesthree.watch(function(err, state) {
		  // check the state of the button
		  // 1 == pressed, 0 == not pressed
		  if(state == 1) {
			// send notification for broadcast
			
			self.sendSocketNotification('GESTURE3', true);
			console.log("Gesture GPIO:12 detected");
			
			
			}
		

		});    
		

		this.started = true
    };
  }
  
});