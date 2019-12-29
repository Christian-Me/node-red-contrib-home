// callbacks for ui-table
// copy paste into pre-formatter node

columnMoved = function(column, columns){
    var newColumns=[];
    columns.forEach(function (column) {
        newColumns.push({'field': column._column.definition.field, 'title': column._column.definition.title});
    });
    this.send({topic:this.config.topic,ui_control:{callback:'columnMoved',columns:newColumns}});
}

columnResized = function(column){
    var newColumns={};
    var percentFactor=1;
    var totalWidth=0;
    var lastWidth=0;
    var widthUnit='px';
    column._column.table.columnManager.columns.forEach(function (aColumn) { 
        totalWidth += aColumn.width;
        if (aColumn.definition.width.includes('%')) widthUnit='%';
    });
    if (widthUnit=='%') percentFactor=100/totalWidth;
    totalWidth=0;

    column._column.table.columnManager.columns.forEach(function (aColumn) {
        lastWidth=Math.floor(aColumn.width*percentFactor);
        newColumns[aColumn.field]=lastWidth+widthUnit;
        totalWidth+= lastWidth;
    });
    if (widthUnit=='%' && totalWidth!=100 ) {
        var keys=Object.keys(newColumns);
        newColumns[keys[keys.length-1]].widthStyled=(lastWidth+(100-totalWidth))+widthUnit;
    }
    this.send({topic:this.config.topic,ui_control:{callback:'columnResized',columnWidths:newColumns}});
}

columnResized = function(column){
    var newColumn = {
        field: column._column.field,
        visible: column._column.visible,
        width: column._column.width,
        widthFixed: column._column.widthFixed,
        widthStyled: column._column.widthStyled
    };
    this.send({topic:this.config.topic,ui_control:{callback:'columnResized',columnWidths:newColumn}});
}

// debug
columnMoved = function(column, columns){ console.log("columnMoved",this) }
columnResized = function(column){ console.log("columnResized",column,this) }

 