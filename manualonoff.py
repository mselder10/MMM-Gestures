#!/usr/bin/python

import subprocess
import sys
from thread import start_new_thread

desiredState = sys.argv[1]

if desiredState == "off":
	print "turn monitor off"
	vcgencmd display_power 0

else:
	print "turn monitor on"
	vcgencmd display_power 1