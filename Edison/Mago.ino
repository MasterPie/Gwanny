
#include <Wire.h>
#include <PixyI2C.h>
#include "Adafruit_Thermal_Galileo.h"
#include "weather.h"
#include "delivery.h"
#include "contacts.h"
#include "news-events.h"


Adafruit_Thermal_Galileo printer;
PixyI2C pixy;


void setup()
{
  Serial.begin(9600);
  Serial.print("Starting...\n");
  printer.begin();
  pixy.init();
  printer.justify('L');
  setupWifi();
}

void setupWifi()
{
  system("/home/edison/setupWifi.py");
}


void loop() 
{ 
  static int i = 0;
  int j;
  uint16_t blocks;
  char buf[32]; 
  
  blocks = pixy.getBlocks();
  
  
  if (blocks)
  {
    i++;
    
    if (i%50==0)
    {
      sprintf(buf, "Detected %d:\n", blocks);
      //Serial.print(buf);
      for (j=0; j<blocks; j++)
      {
        sprintf(buf, "  block %d: ", j);
        //Serial.print(buf); 
        pixy.blocks[j].print();
        
        if (pixy.blocks[j].width *pixy.blocks[j].height > 1500 ){
        int msg = pixy.blocks[j].signature;
        char scall[100]; 

      Serial.println("****DETECTED****");
      //msg = 1; //REMOVE!!
      sprintf(scall,"/home/edison/mago_api.py %d > /home/edison/output.html", msg);
      system(scall);      
      Serial.print("Success!! ");
      Serial.println(scall);
      
      printResponse();        
      }
        
      
      
      
    }
  }  
}
}

void printResponse()
{
 FILE *f;
 f = fopen("/home/edison/output.html", "r");
 char c;
 while ((c = fgetc(f)) != EOF) {
   if (c=='^'){
     c = fgetc(f);
     switch(c){
        case 'L':
        printer.setSize('L');
       break;
       case 'M':
       printer.setSize('M');
       break;
      case 'S':
      printer.setSize('S');
     break;
     case 'I':
     printer.inverseOn();
     break;
     case 'i':
     printer.inverseOff();
     
     break;
     case 'D':
     printer.doubleWidthOn();
     break;
     case 'd':
     printer.doubleWidthOff();
     break;
     
     case 'B':
     printer.boldOn();
     break;
     
     case 'b':
     printer.boldOff();
     break;

     case 'U':
     printer.underlineOn();
     break;
     
     case 'u':
     printer.underlineOff();
     break;

     case 'C':
     printer.justify('C');
     break;

     case 'V':
     printer.justify('R');
     break;

     case 'X':
     printer.justify('L');
     break;


     
     default:
     break;
 
       
     }
     
   }else if (c=='[' ){
    c = fgetc(f);
    switch(c){
     case '2':
     printer.printBitmap(weather_width, weather_height, weather_data);
    break;
   case '7':
   printer.printBitmap(contacts_width, contacts_height, contacts_data);
  break;
 case '5':
 printer.printBitmap(delivery_width, delivery_height, delivery_data);
break;
case '6':
printer.printBitmap(news_width, news_height, news_data);
break;

    }
     
     
   }else
    printer.print(c);
   
 }
 
 printer.feedRows(5);
 
  
}

