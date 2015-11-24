//core library 

//create new element or MOject enhanced your DOM  element
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
					return this;

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
									addEventListener(that,keys,arguments[0][keys]);
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
						var mE=new Element('modify',that.children[i]).styler({"transition":"opacity"});
						if(isFunction(callback)){
							callback(mE);
						}
						
						children.unshift(mE);
						if(i!==0){
							mE.remove();
						}
					};
					//var opacity=true;
					
					var intraval=setInterval(function(){
						//if(opacity==true){
							//that.children[0].style.opacity=0.3;
							//opacity=false;
						//}else{
							//that.children[0].style.opacity=1;
							that.children[0].replace(children[n]);
							
							n++;
							if(n==children.length){
								n=0;
							//}
							//opacity=true;
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
			}else{
				return new Element();
			}
			
};
//Build-in Elements
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
	};


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

};
