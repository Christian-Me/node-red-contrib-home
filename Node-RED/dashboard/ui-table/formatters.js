// formatters for ui-table

// groupHeader (color & amount & plurals)
var groupHeader = function (value, count, data, group) {
    return value + "<span style='color:#d00; margin-left:10px;'>(" + count + " Thermostat"+((count>1) ? "e" : "") + "</span>";
}

// groupHeader (color an alt text for 0 value)
var groupHeader = function (value) {
    if (value>0)
        return "<span style='color:#ffffff;'>"+value+" min</span>";
    else
        return "<span style='color:#505050;'>aus</span>";
}

// add a unit
var function(cell, formatterParams, onRendered){
    return cell.getValue()+"°C";
}

// convert Number to Icons
var function(cell, formatterParams, onRendered){
    var html="<i class=\"";
    switch(cell.getValue()) {
        case 0: html+="fa fa-calendar-check-o"; break;
        case 1: html+="fa fa-hand-o-up"; break;
        case 2: html+="fa fa-suitcase"; break;
        case 3: html+="fa fa-spinner fa-spin fa-fw"; break;
    }
    html+='\"></i>';
    return html;
}