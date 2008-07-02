window.onload = function() {
	document.body.oncontextmenu = function() {

	}
	document.body.oncontrolselect = function() {
		return false;
	}
	document.body.onselect = function(){return false;}
	document.onselectionchange = function(){
		document.selection.empty();
		return false;
	}
}
if(window.addEventListener) {
	window.addEventListener("load",init,false);
} else {
	window.attachEvent("onload",init);
}
function init(e) {
	if(window.addEventListener) {
	document.addEventListener("mousedown",e_mousedown,false);
	document.addEventListener("mousemove",e_mousemove,false);
	document.addEventListener("mouseup",e_mouseup,false);	/**/
	} else {
		document.attachEvent("onmousedown",e_mousedown);
		document.attachEvent("onmousemove",e_mousemove);
		document.attachEvent("onmouseup",e_mouseup);
	}
}
var start = {};
var processing = 0;
function e_mousedown(e) {
	e = e||window.event;
	start.x = e.clientX;
	start.y = e.clientY;
	processing = 1;
	locate_selection(e.clientX,e.clientY);
	sys_log(start.x + "," +start.y+","+e.button + " < " + e.which + " charCode:"+e.detail);
}

function e_mouseup(e) {
	e = e||window.event;
	processing = 0;
}
/**
 *@description 4个方向
 */
function e_mousemove(e) {
	e = e||window.event;
	var end = {};
	if(processing == 1) {
		end.x = e.clientX;
		end.y = e.clientY;
		direction = coor_compare(start,end);
		resize_selection(start,end,direction);
	}
	//sys_log(start.x + "," +start.y+","+e.button + " < " + e.which + " charCode:"+e.detail);
}

/**
 *@description 比较两个坐标，确定方向
 * x+y+ - 1
 * x-y+ - 2
 * x-y- - 3
 * x+y- - 4
 */
function coor_compare(pos1,pos2) {
	if(pos2.x > pos1.x) {
		return pos2.y > pos1.y?1:4;
	} else {
		return pos2.y > pos1.y?2:3;
	}
}
/**
 * @author thankwsx@gmail.com
 * @param {Object} start 起点坐标
 * @param {Object} end 终点坐标
 * @description 调节选区大小
 */
function resize_selection(start,end,direction) {
	sys_log(start.x + " " + start.y + " " + end.x + " " + end.y+ " " + direction);
	var l,t,w,h;
	var el = document.getElementById("selection");
	var selection = el;
	sys_log(direction);
	switch(direction) {
		case 1:
			l = start.x; t = start.y;
			break;
		case 2:
			l = end.x; t = start.y;
			break;
		case 3:
			l = end.x; t = end.y;
			break;
		case 4:
			l = start.x; t = end.y;
			break;
	}
	try {
		w = Math.abs(end.x -start.x);
		h = Math.abs(end.y - start.y);
		sys_log("Left:"+l+"top:"+t +" Width:"+w+"Height:"+h);
		selection.style.left = l+'px';
		selection.style.top = t+'px';
		selection.style.width = w+'px';
		selection.style.height = h+'px';
		selection.style.cursor = 'crosshair';
		
	} catch (e) {

	}
}

function locate_selection(posX,posY) {
	var t = document.getElementById("selection");
	if( t ) {
		selection = t;
		selection.style.left = posX+'px';
		selection.style.top = posY+'px';
		selection.style.width = '1px';
		selection.style.height = '1px';
		selection.style.lineHeight = '1px';
	} else {
		var selection = document.createElement("div");
		selection.setAttribute("id","selection");
		selection.style.position = 'absolute';
		selection.style.width = '1px';	selection.style.height = '1px';
		selection.style.lineHeight = '1px';
		selection.style.background = '#ccccff';
		selection.style.opacity = 0.5;
		selection.style.fliter = 'alpha(opacity=50)';
		selection.style.border = '1px dashed #333';
		selection.style.left = posX+'px';
		selection.style.top = posY+'px';
		document.body.appendChild(selection);
	}
}
function sys_log(str) {
	var log = document.getElementById("state");
	if(log) {
		log.innerHTML = '';
		log.innerHTML = str;
	}
}
