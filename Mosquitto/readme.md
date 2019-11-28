# mosquitto MQTT broker

Enable **retained** messages when send with QoS=0
This is nessesary to store configuration data on the mqtt server even when a small micro like the esp8266 using the common pubsub client lib is unable to send proper QoS>0 messages due to memory and performance limitations.
Adjust max_queued_messages as you need, use mqtt-Explorer to determine how many messages needed (some devices can easily beed 50 or more messages).


```
max_queued_messages 1000
queue_qos0_messages true
autosave_interval 1800
persistence true
persistence_file mosquitto.db
```
