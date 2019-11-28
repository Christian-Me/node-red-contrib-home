# mosquitto MQTT broker

Enable **retained** messages when send wis QOS=0

```
max_queued_messages 1000
queue_qos0_messages true
autosave_interval 1800
persistence true
persistence_file mosquitto.db
```
