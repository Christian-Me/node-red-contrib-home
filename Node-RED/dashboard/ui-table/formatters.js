// formatters for ui-table

// groupHeader (color & amount & plurals)

var groupHeader = function (value, count, data, group) {return value + "<span style='color:#d00; margin-left:10px;'>(" + count + " Thermostat"+((count>1) ? "e" : "") + "</span>";}

var groupHeader = function (value) {
    if (value>0)
        return "<span style='color:#ffffff;'>"+value+" min</span>";
    else
        return "<span style='color:#505050;'>aus</span>";
}

var function(cell, formatterParams, onRendered){
    return cell.getValue()+"°C";
}