# ESPEasy

## prebuild firmware

in the folder **firmware** you will find recent beta builds of my work. Feel free to test. Comments are always welcome

## initial config

The fastest and easiest way to do the initial config after flashing the firmware is to open your terminal and paste these commands
```
WifiSSID <your SSID>
WifiKey <your password>
Save
WifiConnect
```
with the command `ip` you can get the ip-address of your ESP8266 after wifi connect.

## log output

when everything is configured correctly you should see this in your log

```
5355 : EVENT: MQTT#Connected
5468 : C014 : autodiscover information of 4 Devices and 6 Nodes sent with no errors! (36 messages)
5476 : P086 : broadcast topic: homie/$broadcast/testBroadcast subscribed.
5480 : P086 : subscribe topic: test/homie subscribed.
```


- `C014 : autodiscover information of 4 Devices and 6 Nodes sent with no errors! (36 messages)?` shows you that the controller plugin initalized and send all collected information to the broker
- `P086 : broadcast topic: homie/$broadcast/testBroadcast subscribed.?` if you use P086 (Homie receiver) with a broadcast channel you should see the toppic here
- `P086 : subscribe topic: test/homie subscribed.` you can use P086 instead of the MQTT-receiver plugin and subscribe to any topic and receive **float** values


