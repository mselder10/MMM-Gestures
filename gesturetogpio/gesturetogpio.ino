/*
Two gestures are recognized by this script:
  - Swipe from right to left (GPIOOUT1 set to high)
  - Swipe from left to right (GPIOOUT2 set to high)
*/

int TRIGPIN1 = 5;
int ECHOPIN1 = 7;
int TRIGPIN2 = 12;
int ECHOPIN2 = 13;

int GPIOOUT1 = 8;
int GPIOOUT2 = 9;

const long INTERVAL = 1300;
const int RANGEMAX = 90;

bool record = false;
unsigned long previousMillis = 0;   
unsigned long recstart = 0;  
unsigned long sensor1 = 0;  
unsigned long sensor2 = 0;
long duration, duration2, cm, cm2;

bool on = false;


void setup() 
{
  Serial.begin(9600);
  Serial.println("Beginning");
  
  pinMode(GPIOOUT1, OUTPUT);
  pinMode(GPIOOUT2, OUTPUT);
  
  pinMode(TRIGPIN1, OUTPUT);
  pinMode(ECHOPIN1, INPUT);
  pinMode(TRIGPIN2, OUTPUT);
  pinMode(ECHOPIN2, INPUT);
}
 
void loop()
{
//  if (Serial.available() > 0) 
//  {
//    int inByte = Serial.read();
//
//    if(inByte == '1')
//    {
//      on = true;        
//    }
//    else if(inByte == '0')
//    {
//      on = false;  
//         
//    }    
//  }
//  Serial.println(on);
// 
//  if(on)
//  {
     
    digitalWrite(TRIGPIN1, LOW);
    delayMicroseconds(5);
    digitalWrite(TRIGPIN1, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIGPIN1, LOW);
   
    duration = pulseIn(ECHOPIN1, HIGH);
  
    digitalWrite(TRIGPIN2, LOW);
    delayMicroseconds(5);
    digitalWrite(TRIGPIN2, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIGPIN2, LOW);
      
    duration2 = pulseIn(ECHOPIN2, HIGH);
   
    // convert the time into a distance
    cm = (duration/2) / 29.1;
    cm2 = (duration2/2) / 29.1;
    Serial.println(cm);
    Serial.println(cm2);
   
    if((cm > 5 && cm < RANGEMAX) || (cm2 > 5 && cm2 < RANGEMAX))
    {
      if(!record)
      {
        recstart = millis();
        record = true;  
      }
      
    }
    
    unsigned long currentMillis = millis();
    if(cm > 5 && cm < RANGEMAX)
    {
      sensor1 = (millis() - recstart);           
    }
    
    if(cm2 > 5 && cm2 < RANGEMAX)
    {
      sensor2 = (millis() - recstart);      
    }
  
    if(millis() > (recstart + INTERVAL) && record)
    {
      record = false; 
      if((sensor2 < sensor1) && sensor1 != 0 && sensor2 !=0) 
      {
        Serial.println("GESTURE: RIGHT TO LEFT");
        digitalWrite(GPIOOUT1, HIGH);   
        delay(50);  
        digitalWrite(GPIOOUT1, LOW);
      }
      if((sensor2 > sensor1) && sensor1 != 0 && sensor2 !=0)
      {
        Serial.println("GESTURE: LEFT TO RIGHT");
        digitalWrite(GPIOOUT2, HIGH);   
        delay(50);                     
        digitalWrite(GPIOOUT2, LOW);   
      }
      /*// Debug thinx 
      Serial.print("Recstart:");
      //Serial.println(recstart);
      Serial.print("Sensor1: ");
      Serial.println(sensor1);
      Serial.print("Sensor2: ");
      Serial.pr intln(sensor2);
      */
      sensor1 = 0;
      sensor2 = 0;
      recstart = 0;
//    }
      
  }
  
}
