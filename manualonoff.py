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

tmp = os.popen("sudo /opt/vc/bin/tvservice -s").read()
if tmp.find("off") == -1:
	print "monitor is on, turn it off"
	os.system("tvservice -o") # Turns monitor off

else:
	print "monitor is off, turn it on"
	os.system("tvservice -p")

pi.stop()
