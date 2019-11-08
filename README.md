# node-red-contrib-home
Home automation system on Node-RED with reusable nodes, flows and subflows

## quickstart

- Node-RED
- Custom Devices
- Commercial Devices

## intro
Node-RED is a great tool, launchpad, framework ... for many things. Based on javascript and node.js. In my third attempt to build my home automation system the goal is to be

- well documented
- reusable
- stable
- easy to maintain
- easy to backup and restore
- easy to upgrade

I used openHAB before and I really liked it. Great support for hundreds of devices due to bindings, great support, tunneled access via myOpenHAB and other features. The biggest drawbacks for me was:

- it is based on java. As I have no java knowledge and I'm not willing to dig deeper into it.
- so I'm totally dependent on others code with no chance to contribute.
- never got familiar with xcode the script language rules are based upon
- strongly based on linux with less support for windows
- hard to maintain, backup, restore and upgrade

## goals

- build reusable nodes and subflows
- configurable via an ui (currently standard Node-RED dashboard)
- all configurations should be possible form the flow editor (not inside some obscure code hidden in function nodes)
- modular design
- based on a easy to maintain database (currently the global/flow context store)
- more as time goes by ;)