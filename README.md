# MMM-gesturedetection
This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). It can monitor GPIO interrupts. I used a pi together with an Arduino and 2x HC-SR04 ultrasonic sensor to detect hand gestures and apply changes in MagicMirror UI.
In this version 4 GPIO pins are connected directly to Arduino. Two pins execute a python script. The other two pins hide and show some MagicMirror modules. 
Special thanks goes to [Paviro](https://github.com/paviro) and [ptrbld](https://github.com/ptrbld) as this module is based on [PIR-Sensor](https://github.com/paviro/MMM-PIR-Sensor) and [MMM-Button](https://github.com/ptrbld/MMM-Button).



## Installation
1. Connect HC-SR04 and LEDs to Arduino and connect Arduino to Pi [Breadboard prototype](http://i.imgur.com/wyho6zg.png)
2. Flash Arduino with gesturedection.ino
3. (optional) connect RGB-LED Strip to Pi
4. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/crshx/MMM-gesturedetection`. A new folder will appear navigate into it.
5. Execute `npm install` to install the node dependencies.
6. (optional) uncomment lines for LED Strip


## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-gesturedetection',
		config: {
			// See 'Configuration options' for more information.
		}
	}
]
````

## Configuration options

The following properties can be configured:


<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>gesturePin</code></td>
			<td>The pin your gesture wire is connected to.<br>
				<br><b>Possible values:</b> <code>int</code>
				<br><b>Default value:</b> <code>5</code>
			</td>
		</tr>
		<tr>
			<td><code>gestureDelay</code></td>
			<td>The time in miliseconds before another gesture is recognized<br>
				<br><b>Possible values:</b> <code>int</code>
				<br><b>Default value:</b> <code>500</code>
			</td>
		</tr>
	</tbody>
</table>

## Developer Notes


## Dependencies
- [onoff](https://www.npmjs.com/package/onoff) (installed via `npm install`)

The MIT License (MIT)
=====================

Copyright © 2016 

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**