//test the element 

function isArray(s) {
  		return Object.prototype.toString.call(s) === '[object Array]'; 
};
function isHTMLElement(e){
		if(e.nodeName){//bug in direct return so use check and var tocompare
			var tocompare=e.nodeName[0]+e.nodeName.substr(1).toLowerCase();
			return Object.prototype.toString.call(e) === '[object HTML'+tocompare+'Element]';
		}
	
		  return false;
};
function isObject(e){
		 return Object.prototype.toString.call(e) === '[object Object]';
};
function isFunction(e){
	return Object.prototype.toString.call(e) === '[object Function]';
};
function isRegExp(e){
	return Object.prototype.toString.call(e) === '[object RegExp]';
};
function isString(e){
	return Object.prototype.toString.call(e) === '[object String]';
};
function isDate(e){
	return Object.prototype.toString.call(e) === '[object Date]';
};
function isNumber(e){
	return Object.prototype.toString.call(e) === '[object Number]';
};
function isNotEmpty(e){//only for object
	return Object.keys(e).length;

};