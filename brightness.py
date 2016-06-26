
import os
import sys
import termios
import tty
import pigpio
import time
from thread import start_new_thread

RED_PIN   = 17
GREEN_PIN = 22
BLUE_PIN  = 24

bright = 255
r = 255

print sys.argv[1]
	
def setLights(pin, brightness):
	realBrightness = int(int(brightness) * (float(bright) / 255.0))
	pi.set_PWM_dutycycle(pin, realBrightness)

pi = pigpio.pi()
	
setLights(RED_PIN, sys.argv[1])
setLights(GREEN_PIN, sys.argv[1])
setLights(BLUE_PIN, sys.argv[1])

time.sleep(0.5)

pi.stop()