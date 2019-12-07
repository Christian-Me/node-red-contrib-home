# mosquitto MQTT broker

## introduction

The homie convention auto discover feature is based on retained messages. The mqtt broker is therefor used as a persistance database to collect all device information and make them available when needed. It is absolutely necessary to make sure that the messages are flagged as `retained`. The mqtt specification makes a link between QoS (Quality of Service) and the retained flag. Basicity it is up to the broker what to do with messages with the retained flag set but send wis QoS 0. Some Brokers ignore the flag others like mosquitto stores the in memory but don`t write them to disk. 

## enable **retained** messages when send with QoS=0

Small microcontrollers like the esp8266 using the common *pubsub* client library is unable to send proper QoS>0 messages due to memory and performance limitations. Below you find the necessary settings in the mosquittp.conf file to enable all features you need to store retained messages with QoS=0.

Adjust max_queued_messages as you need, use mqtt-Explorer to determine how many messages needed (some devices can easily beed 50 or more messages).


```
max_queued_messages 1000
queue_qos0_messages true
autosave_interval 1800
persistence true
persistence_file mosquitto.db
```

## use mqtt explorer to check your settings
mqtt explorer is a great tool to inspect mqtt communication. Be aware! Messages in mqtt explorer seams to be "available" on the broker even if the retained flag is not set because mqtt explorer collects all available data in a convenient tree view.

Please check if the retained flag is really set

![retained message flagged correctly](.\screenshots\MQTT-Explorer-retained.png)

After restart of mqtt explorer you should immediately see the complete homie tree again. Then restart your broker and check if the data is still available.