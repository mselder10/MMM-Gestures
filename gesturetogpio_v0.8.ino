
int TRIGPINUS1 = 6;    
int ECHOPINUS1 = 7;    
int TRIGPINUS2 = 12;    
int ECHOPINUS2 = 13;  

int GPIOOUT1 = 2;
int GPIOOUT2 = 3;
int GPIOOUT3 = 4;
int GPIOOUT4 = 8;

int LED1 = 10;
int LED2 = 11;

const long INTERVAL = 1300;
const int RANGEMAX = 25;

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
  
  pinMode(GPIOOUT1, OUTPUT);
  pinMode(GPIOOUT2, OUTPUT);
  pinMode(GPIOOUT3, OUTPUT);
  pinMode(GPIOOUT4, OUTPUT);
  
  pinMode(TRIGPINUS1, OUTPUT);
  pinMode(ECHOPINUS1, INPUT);
  pinMode(TRIGPINUS2, OUTPUT);
  pinMode(ECHOPINUS2, INPUT);

  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
}

 
void loop()
{
  if (Serial.available() > 0) 
  {
    int inByte = Serial.read();

    if(inByte == '1')
    {
      on = true;        
    }
    else if(inByte == '0')
    {
      on = false;  
         
    }    
  }
 
  if(on)
  {
     
    digitalWrite(TRIGPINUS1, LOW);
    delayMicroseconds(5);
    digitalWrite(TRIGPINUS1, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIGPINUS1, LOW);
   
    duration = pulseIn(ECHOPINUS1, HIGH);
  
    digitalWrite(TRIGPINUS2, LOW);
    delayMicroseconds(5);
    digitalWrite(TRIGPINUS2, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIGPINUS2, LOW);
      
    duration2 = pulseIn(ECHOPINUS2, HIGH);
   
    // convert the time into a distance
    cm = (duration/2) / 29.1;
    cm2 = (duration2/2) / 29.1;
   
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
      digitalWrite(LED1, HIGH);                  
    }
     else
    {
      digitalWrite(LED1, LOW);
    }
    
    if(cm2 > 5 && cm2 < RANGEMAX)
    {
      sensor2 = (millis() - recstart);
      digitalWrite(LED2, HIGH);             
    }
    else
    {
      digitalWrite(LED2, LOW);
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
      if(sensor1 == 0 && sensor2 != 0)
      {
        Serial.println("GESTURE: HOLD LEFT");
        digitalWrite(GPIOOUT3, HIGH);   
        delay(50);                       
        digitalWrite(GPIOOUT3, LOW); 
      }
      if(sensor2 == 0 && sensor1 != 0) 
      {
        Serial.println("GESTURE: HOLD RIGHT");
        digitalWrite(GPIOOUT4, HIGH);   
        delay(50);                  
        digitalWrite(GPIOOUT4, LOW);  
     
      
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
    }
      
  }
  
}
