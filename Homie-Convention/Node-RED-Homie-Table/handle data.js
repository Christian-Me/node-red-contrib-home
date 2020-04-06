var status = {fill:"red",shape:"dot",text: "payload"};
var tableData = context.get("tableData");
if (tableData===undefined) {
    tableData={};
    context.set("tableData",tableData);
}

var tableConfig = context.get("tableConfig","file");
if (tableConfig===undefined) {
    tableConfig={};
    context.set("tableConfig",tableConfig,"file");
}

// function to merge partial data into existing table row
var mergeObject = function (destination, source) {
    for (let currentSource in source) {
        if (source.hasOwnProperty(currentSource))
            destination[currentSource]= source[currentSource];
    }    
};

var command="addData";
if (msg.hasOwnProperty("state")) {
    
    // store data for later recovery
    if (tableData.hasOwnProperty(msg.state.$name)) {
        command="updateData";
    } else {
        tableData[msg.state.$name]={};
    }
    if (!tableData[msg.state.$name].hasOwnProperty("state")) tableData[msg.state.$name].state={};
    mergeObject(tableData[msg.state.$name].state,msg.state);
    
    // build command to update add or update data on ui-table
    msg.payload={
        "command":command,
        "arguments": [[msg.state]],
        "returnPromise": false
    };
    status.fill="green";
    status.text=msg.state.$name+" ";
    status.text+=(command==="addData") ? "added" : "updated";
    node.status(status);
    return msg;
} if (msg.payload==="connect" || msg.payload==="change" || (msg.hasOwnProperty("payload") && msg.payload.hasOwnProperty("command"))) { 
    //process commands
    if (msg.payload.hasOwnProperty("command")) {
        switch(msg.payload.command) {
            case 'delete':
                if (tableConfig.hasOwnProperty(msg.payload.object)) {
                    delete tableConfig[msg.payload.object];
                    status.fill="green";
                    status.text=msg.payload.object+" deleted";
                } else {
                    status.fill="yellow";
                    status.text=msg.payload.object+" undefined";
                }
                break;
            case 'updateColumn':
                let property=msg.payload.column;
                msg.payload={
                    "command":"updateData",
                    "arguments": [[]],
                    "returnPromise": false
                };
                for (let device in tableData) {
                    if (tableData[device].state.hasOwnProperty(property)) {
                        let line = {}
                        line.$name=tableData[device].state.$name;
                        line[property]=tableData[device].state[property];
                        msg.payload.arguments[0].push(line);
                    }
                }
                node.warn(msg.payload);
                status.text+=property+" updated";
                node.status(status);
                return msg;
            default:
                status.text="unknown command "+msg.payload.command;
                break;
        }
        node.status(status);
    }
    
    // crawl through tabulator arrays and updated user defined values
    var crawlTabulator = function (columns,match,config,property) {
        for (let column of columns) {
            if (column.hasOwnProperty("columns")) {
                crawlTabulator(column.columns,match,config,property)
            } else if (config.hasOwnProperty(column[match])) column[property]=config[column.field];
        }
    }
    
    if (tableConfig.hasOwnProperty("columnWidths") && msg.hasOwnProperty("ui_control")) {
        crawlTabulator(msg.ui_control.tabulator.columns,"field",tableConfig.columnWidths,"width");
    }
    
    // sort columns
    if (tableConfig.hasOwnProperty("columns") && msg.hasOwnProperty("ui_control") && msg.ui_control.hasOwnProperty("tabulator")) {
        var addedColumns = 0;
        var sortColumnsByLayout = function (sortColumns, columnsLayout, targetColumns) {
            for (var layoutColumn=0;  layoutColumn<columnsLayout.length; layoutColumn++) {
                for (var sortColumn in sortColumns) {
                    if (sortColumns[sortColumn].hasOwnProperty("columns")) {
                        targetColumns.push({"title":sortColumns[sortColumn].title, "columns":[]});
                        sortColumnsByLayout(sortColumns[sortColumn].columns,columnsLayout,targetColumns[targetColumns.length-1].columns);
                        layoutColumn=addedColumns; // jump forward after childes added
                    } else {
                        if (columnsLayout[layoutColumn].field===sortColumns[sortColumn].field){
                            targetColumns.push(sortColumns[sortColumn]);
                            addedColumns++;
                            break;
                        }
                    }
                }
            }
        }                 
        var newColumns=[];
        sortColumnsByLayout(msg.ui_control.tabulator.columns,tableConfig.columns,newColumns);
        msg.ui_control.tabulator.columns=newColumns;
    }

    // restore stored lines after connect
    msg.payload=[];
    for (let device in tableData) {
        msg.payload.push(tableData[device].state);
    }
    
    status.fill="blue";
    status.text+=" "+msg.payload.length+" devices restored";
    node.status(status);
    return msg;
} if (msg.hasOwnProperty("ui_control")) {
    // callback from tabulator
    status.fill="blue";
    status.text="unknown callback";
    switch(msg.ui_control.callback) {
        case "columnResized": // save new column width
            if (tableConfig.columnWidths===undefined) tableConfig.columnWidths={};
            tableConfig.columnWidths[msg.ui_control.columnWidths.field]=msg.ui_control.columnWidths.width;
            status.text=msg.ui_control.columnWidths.field+"="+msg.ui_control.columnWidths.width+"px";
            break;
        case "columnMoved": // save new column order
            if (tableConfig.columns===undefined) tableConfig.columns=[];
            tableConfig.columns=msg.ui_control.columns;
            status.text="new column order";
            break;
    }
    node.status(status);
    return;
}
// nothing to do bejond this point
status.text+=" ["+msg.payload+"]";
node.status(status);
return;

var crawlTabulator = function (columns,match,config,property) {
    for (let column of columns) {
        if (column.hasOwnProperty("columns")) {
            crawlTabulator(column.columns,match,config,property);
        } else if (config.hasOwnProperty(column[match])) column[property]=config[column.field];
    }
};