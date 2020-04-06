const pluginName="resetCounter";
const triggerProperty="uptime";

var status = {fill:"red",shape:"dot",text: "payload="+msg.payload};
// only trigger if msg.state exits and contains the property $name as a unique identifier
if (msg.hasOwnProperty("state") && msg.state.$name!==undefined && msg.state.$name!=="") {
    // if the plugin needs to save context data
    var deviceName = msg.state.$name;
    var tableData = context.get("tableData","file");
    if (tableData===undefined) {
        tableData={};
        context.set("tableData",tableData,"file");
    }
    // if the plugin only reacts on certain values (i.e. uptime)
    if (msg.state.hasOwnProperty(triggerProperty)) {
        if (!tableData.hasOwnProperty(deviceName)) {
            tableData[deviceName]={
                "resetTotal":0,
                "totalRuntime":0
            }
        }
        var tableRow=tableData[deviceName];
        var success=false;
        
        // -------------------------------------------------
        
        if (tableRow.hasOwnProperty["lastUptime"]) {
            var dateNow=date.now();
            if (msg.state.uptime < tableRow.lastUptime) {
                if (tableRow.hasOwnProperty("resetLast")) {
                    tableRow.resetPeriodLast =dateNow-tableRow.resetLast;
                    tableRow.totalRuntime += tableRow.resetPeriodLast;
                }
                if (tableRow.resetTotal>0) {
                    tableRow.resetAverage = Math.floor(tableRow.totalRuntime / tableRow.resetTotal);
                    msg.state.resetAverage=tableRow.resetAverage;
                    msg.state.resetTotal=tableRow.resetTotal;
                    msg.state.resetLast=tableRow.resetLast;
                    msg.state.totalRuntime=tableRow.totalRuntime;
                }
                tableRow.resetLast=dateNow;
                ++tableRow.resetTotal;
            }
            
        } else {
            tableRow.lastUptime=msg.state.uptime;
        }
        success=true;
        // -------------------------------------------------
        
        if (success) {
            node.fill="green"
            node.text="resets="+msg.state.resetCounter;
            node.status(status);
        } else {
            node.error({"pluginName":pluginName,triggerProperty:msg.state[triggerProperty],"state":msg.state})
            node.text="Error device:"+msg.state.$name+" "+triggerProperty+"="+msg.state[triggerProperty];
            node.status(status);           
        }
    }
}
// always pass the original message (+ additional data as suitable)
return msg;