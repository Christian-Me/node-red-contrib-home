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
// format bytes to KB
function (value) {
    if (value>0) return "<span style='color:#FFFFFF;'>"+(value/1024).toFixed(2)+" kB</span>"; 
    else return; 
}

// format seconds to days, hours:minutes:minutes
var function(cell, formatterParams, onRendered){
    var pad = function (num) {
        return ("0"+num).slice(-2);
    };
    var secs = cell.getValue();
    return pad(secs)+"s";
}

// last seen formatter
var function(cell, formatterParams, onRendered){
    var pad = function (num) {
        return ("0"+num).slice(-2);
    };
    var secs = Number(cell.getValue());
    if (Number.isNaN(secs)) return "n/a";
    var minutes = Math.floor(secs / 60);
    secs = secs%60;
    var hours = Math.floor(minutes/60);
    minutes = minutes%60;
    var days = Math.floor(hours/24);
    hours = hours%24;
    if (days>0)
        return days+"d "+pad(hours)+":"+pad(minutes);
    else
        return pad(hours)+":"+pad(minutes)+":"+pad(secs);
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

// display icon form cell value
function(cell, formatterParams, onRendered) {
    var icon = cell.getValue();
    if (icon===undefined && typeof icon !== "string") return;
    var html = icon;
    if (icon.startsWith('fa')) {
        html = "<i class=\"";
        html+= icon;
        html+= '\"></i>'; 
    }
    return html; 
}

// format a complete row
function(row){
    var data = row.getData();
    switch (data.$state) {
        case "lost":
            row.getElement().style.backgroundColor = "#9e2e66";
            row.getElement().style.color = "#a6a6a6";
            break;
        case "sleeping":
            row.getElement().style.backgroundColor = "#336699";
            break;
        case "disconnected":
            row.getElement().style.backgroundColor = "#cc3300";
            row.getElement().style.color = "#a6a6a6";
            break;
        case "alert":
            row.getElement().style.backgroundColor = "#A6A6DF";
            break;
        case "init":
            row.getElement().style.backgroundColor = "#f2f20d";
            break;
        case "ready":
            row.getElement().style.backgroundColor = "";
            row.getElement().style.color = "";
            break;
        }
}