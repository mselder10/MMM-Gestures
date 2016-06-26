#!/usr/bin/python

RED_PIN   = 17
GREEN_PIN = 22
BLUE_PIN  = 24

import subprocess
import os
import time
import sys
import termios
import tty
import pigpio
import time
import serial
from thread import start_new_thread

bright = 255
r = 255.0
g = 0.0
b = 0.0

pi = pigpio.pi()

""" If you use a ledstrip in combination with MagicMirror and pigpio uncomment next 3 here
def setLights(pin, brightness):
	realBrightness = int(int(brightness) * (float(bright) / 255.0))
	pi.set_PWM_dutycycle(pin, realBrightness)
"""


tmp = os.popen("sudo /opt/vc/bin/tvservice -s").read()
if tmp.find("off") == -1:
	print "monitor is on"
	""" If you use a ledstrip in combination with MagicMirror and pigpio uncomment here
	#setLights(RED_PIN,0)
	#setLights(GREEN_PIN,0)
	#setLights(BLUE_PIN,0)
	"""
	os.system("tvservice -o")

else:
	print "monitor is off"
	os.system("tvservice -p")
	""" If you use a ledstrip in combination with MagicMirror and pigpio uncomment uncomment here
	#setLights(RED_PIN,sys.argv[1])
	#setLights(GREEN_PIN,sys.argv[1])
	#setLights(BLUE_PIN,sys.argv[1])
	"""

pi.stop()
