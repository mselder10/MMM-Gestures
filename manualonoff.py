#!/usr/bin/python

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

pi = pigpio.pi()
desiredState = sys.argv[1]

tmp = os.popen("sudo /opt/vc/bin/tvservice -s").read()
if tmp.find("off") == -1:
	print "monitor is on"
	if desiredState == "off":
		print "turn it off"
		os.system("tvservice -o")

else:
	print "monitor is off"
	if desiredState == "on":
		print "turn it on"
		os.system("tvservice -p")

pi.stop()
