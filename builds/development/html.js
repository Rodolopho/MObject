//Time and event are key to make doc live ....whem time and event start to work with each ither then it will be very easy 
//handle lots of ui based graphic elafullasion that what we goona do next

//helper functions
function isArray(s) {
  		return Object.prototype.toString.call(s) === '[object Array]'; 
};
function isHTMLElement(e){
		if(e.nodeName){
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
function AddEventListner(element,eventName,functionName){
		if(element.addEventListener){
			//hurry your broweser support it
			element.addEventListener(eventName,functionName,false);
			return true;
		}else{
			//older ie broweser
			element.attachEvent("on"+eventName,functionName);
			return true;
		}
		
	};
//end of helpers-------------------------------------------------------------------------------------------------------

var wrapper=function(parent,child){};//wrappers wrap and element it can be called anywhere between parent and child node
//Analog Positioning absolute and fixed popsout from normal document flow but relative follows it space as normal d
//document flow no matter whete its position takes it 
 var circularpositioning; //get the math on radius or eclipse to define position of elemnet in a time
 var rectangularPositioning;//
 var starPositioning;//star like posiotion movementary
 var positionalChaing; //one after another
var BarellEffect;//watch it
var feed={
	type:"text",//image/video/element/
	style:"some style",
	status:"dynamic",//static
	data:{
		text:"",
		link:""
	}
}
var slider=function(parentElement,effect,time){
	
};
feed={}

//append return parent or return append on true;
//-----------------------------------Main()----------------------------------------------------------------
var Elements=function(number,element,func){
			returnArray=[];
		for (var i=0; i<number; i++) {
			if(isArray(element)){
				var ele=new Element(element[0],element[1]);
			}else{
				var ele=new Element(element);
			}
			if(func){
				func(ele,i+1);
			}
			returnArray.push(ele);
			
		};
		return returnArray;
};
//modification to current element
var modifyElement=function(selector,object){
	var element;
			if(isString(selector)){
				 element=document.querySelector(selector);
			}else if(isHTMLElement(selector)){
				
				element=selector;
			}
			if(element){
				return new Element('modify',element,object);
			}
			
};
var Element=function(){
			//argument passed 
			var args=arguments;
			if(args[0]=='modify'){
				this.element=args[1];
				Array.prototype.shift.call(args);
				Array.prototype.shift.call(args);
			}else{

			//create a new dom element
			this.element=document.createElement((function(){
					       if(args.length && typeof(args[0])=='string'){
					       	return args[0];
					       }else{return  'div';};
							})());
			}
			//intialiazation of attribute for new dom element 
			for (var i=0; i<args.length ; i++) { 
				var each=args[i]
				if(typeof(each)==='object'){
					for (keys in each) {
						if(keys==='text'){
							var text=document.createTextNode(each[keys]);
							this.element.appendChild(text);
							continue;
						}
						this.element.setAttribute(keys,each[keys]);
					}
				}
			}
			//adding Method to get and set attributes with single method :attr()
			this.element.attr=function(a,b,c){
				if(arguments.length>1){
					//this is to set
					this.attr.set(a,b,c);
					return true;

				}else{
					//get the attri
					 return this.attr.get(a);

				}
			};
			var that=this.element;
			function idasvar(){
				if(that.id && !window[that.id] ){
				 window[that .id]=that;
			}
			};
			this.element.attr.del=function(attr){
							that.removeAttribute(attr);
							return that;
			};
			//getting attributes 
			this.element.attr.get=function(attribute){
							if(that.getAttribute(attribute)){
								return that.getAttribute(attribute);
							}else{
								console.log("The element has no attribut called "+attribute);
							}
							
					};
			//setting or appending attributes andvalue a shouls return true on test to append		
			this.element.attr.set=function(attribute,value,a){
							if(arguments[2]){
								value=that.attr.get(attribute)+" "+value;
								that.setAttribute(attribute,value);
								idasvar();
								return that;
							}else{
								that.setAttribute(attribute,value);	
								return that;
							}
							
						};
			//append("h1",{text:'hello'})	for multiple entery append({"h1":{text:'hello'},"h2":{text:"hi"},.....})		
			this.element.append=function(){
				if(isHTMLElement(arguments[0])){
					that.appendChild(arguments[0]);
					if(arguments[1]==true){return arguments[0];}
				}else{
				if(typeof(arguments[0])==='object'){
					for (keys in arguments[0]) {
						var newElement=new Element(keys,arguments[0][keys])
						that.appendChild(newElement);
					}

				}else{ 
					 if(arguments){
					 	var newElement=new Element(arguments[0],arguments[1]);
					 	that.appendChild(newElement);
					 }
					 if(arguments.length==3 && arguments[2]==true){
					 	return newElement;
					 }
				 }
				 }
				 return that;
			};	
			//this will apend itself to give element either pass id or element
			this.element.appendTo=function(id){
				if(arguments){
					if(typeof (arguments[0])==='object'){
						var to=arguments[0];
					}else{
						var to=document.getElementById(id);
					}
				}
					 that.oldParent=that.parentNode;
					 to.appendChild(that);
					 return that;
				
			};		
			//cannot use style coz its native style so use styler instead			
			this.element.styler=function(obj){
					if(arguments){
							if(typeof(arguments[0])==='object'){
								for (keys in arguments[0]) {
									that.style[keys]=arguments[0][keys];
								}
							}
						

								
							}
							return that;
			};			
			this.element.event=function(obj){
							if(arguments){
								
							if(typeof(arguments[0])==='object'){
								for (keys in arguments[0]) {
									AddEventListner(that,keys,arguments[0][keys]);
								}
							}
						

								
							}
							return that;
			};	
			//either pass "text" or regexp /(text)/ and return the span.selectText that wrap selected text 
			this.element.selectText=function(match){
				if(typeof match == "object"){
					that.innerHTML=that.innerHTML.replace(match,'<span class="selectText" id="selectText">$1</span>');
						var span= modifyElement("selectText");
						span.id="";
						return span;
					}else{
						that.innerHTML=that.innerHTML.replace(match,"<span class='selectText' id='selectText'>"+match+"</span>");
						var span= modifyElement("selectText");
						span.id="";
						return span;
					}
						
			}	
			this.element.cond=function(statement,action){
						console.log(statement);
						if(statement){
							//var exection= new Function(satement,action) //last argument is always body of fn
							eval('that' +"." +action);
						}
						return that;

			};			
			this.element.remove=function(){
						 that.oldParent=that.parentNode;
				        that.parentNode.removeChild(that);
				      
				        return that;
			};
			this.element.replace=function(newElement){
					 that.oldParent=that.parentNode;
					that.parentNode.replaceChild(newElement,that);
					return newElement;
			};		
			this.element.oldDate=[];
			this.element.changeData=function(newData){
				//
			}
			this.element.effect={
				rotate:function(time,callback,effect){
					var children=[];
					var n=1;
					for (var i = that.children.length - 1; i >= 0; i--) {
						var mE=new Element('modify',that.children[i]);
						if(isFunction(callback)){
							callback(mE);
						}
						
						children.unshift(mE);
						if(i!==0){
							mE.remove();
						}
					};
					
					var intraval=setInterval(function(){
							that.children[0].replace(children[n]);
							children[n].event({mouseover:function(){clearInterval(intraval)},
											});
							n++;
							if(n==children.length){
								n=0;
							}
					},time)
					
				},
				slide:function(){

				},

				
			}			
			//return instance as a newely created DOm element	
			idasvar();
			return this.element;	
}

var Head={
	head:document.getElementsByTagName('head')[0],
	title:function(title){ document.title=title; return Head;},
	meta:function(arg){
			if(isArray(arg)){
				arg.forEach(function(e){
					Head.head.appendChild(new Element("meta",e));
				});
			}else{
				Head.head.appendChild(new Element("meta",arg));
			}
			return Head;
		}
	}
var Body=function(){

}


var Foot={
	html:document.getElementsByTagName('html')[0],
	
	script:function(arg){
			if(isArray(arg)){
				arg.forEach(function(e){
					var scripts=new Element("script",e).attr.del('event');
					 //scripts.removeAttribute('event');
					Foot.html.appendChild(scripts);
				});
			}else{
				var scripts=new Element("script",arg).attr.del('event');
					//scripts.removeAttribute('event');
				Foot.html.appendChild(scripts);
			}
			return Foot;

		}	

}
var Ajax=function(callback){
	var newRequest;
	if(window.XMLHttpRequest){
		newRequest=new XMLHttpRequest();
	}else if(window.ActiveXobject){
		newRequest=new ActiveXobject("Microsoft.XMLHTTP");

	}
	newRequest.onreadystatechange=callback(newRequest);

}; 
//var Olddate={elmnet,origin,que};
var statue,move;// wait and or go;
/*var xSetInterval=function(function()){
				var clock=0,
				var clockInterval=setInterval(function(){ clock+=100;

				},100);
				var timeLine=,
				start().at(200,function()).at(300,function(){}).at(end);
				startTime=0
				pausedTime;
				stopTime;

}*/
var xInterval={
	clock:0,
	timeLine:{},
	setClock:function(time){xInterval.clock=time},
	state:null,
	clockInterval:function(){
			var that=this;
			var interval=setInterval(function(){
			that.clock+=100;
			if(that.timeLine.hasOwnProperty(that.clock)){
				console.log('we haver at'+that.clock);
					if(isFunction(that.timeLine[that.clock])){
					that.timeLine[that.clock](interval,that.setClock);
					}
				}
			},100)
			this.state="running";
			return interval;
		},
	at:function(time,callback){
		if(arguments.length==1 && isObject(arguments[0])){
			for (keys in arguments[0]){
				this.timeLine[keys]=arguments[0][keys];
			}
		}else{

			this.timeLine[time]=callback;
			return this;
		}
		
	},
};

var validation=function(value,validexpression,onerror,onsuccess){
				
				if(value.match(validexpression)){
					onsuccess();
					return true;
				}else{
					onerror();
					return false;
				}
}
var aElement=function(){
	//ascyonics element
}
// element.changedate=function(){
// 	this.oldDate.push(this.child);
// 	this.child=newdata;

// }
/*--------------------------------String---------------------------------*/


/*---------------------------------element--------------------------------*/