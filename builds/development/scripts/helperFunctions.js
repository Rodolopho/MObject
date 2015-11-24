//Helper function for building app

function addEventListener(element,eventName,functionName){
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

//Extended interval(xIntarval)
var xInterval=function(callback,time){
	  var x={
	clock:0,
	timeLine:{},
	clockUnit:100,
	time:function(){return time|x.clockUnit},
	interval:null,
	setClock:function(time){x.clock=time},
	state:'paused',
	start:function(){
		if(this.state==='paused'){
			this.clock=0;
			this.clockInterval();
			this.state='running';
		}
		return this;
	},
	pause:function(){
		//console.log("paused")
		if(this.state==='running'){
			clearInterval(this.interval);
			this.state='paused';
		}
		return this;
	},
	resume:function(){
		//console.log("resume")
		if(this.state==='paused'){
			this.clockInterval();
			this.state='running'
		}
		return this;
	},
	clockInterval:function(){
			var that=this;
			var interval=setInterval(function(){
				if(isFunction(callback)){
					callback();
				}
				if(isNotEmpty(that.timeLine)){

			that.clock+=100;
			if(that.timeLine.hasOwnProperty(that.clock)){
				//console.log('we have at'+that.clock);
					if(isFunction(that.timeLine[that.clock])){
					that.timeLine[that.clock](interval,that.setClock);
					}
				}
			 }
			},this.time())
			this.state="running";
			this.interval=interval;
			return this;
		},
	at:function(time,callback){
		if(arguments.length==1 && isObject(arguments[0])){
			for (keys in arguments[0]){
				this.timeLine[keys]=arguments[0][keys];
			}
		}else{

			this.timeLine[time]=callback;
			
		}
		return this;
		
	}
};
return this.x=x;
};
//eoxInterval	
var xxInterval=function(callback,time){
	var x={
	timeLine:{},
	interval:null,
	state:'paused',
	start:function(){
		if(this.state==='paused'){
			this.clockInterval();
			this.state='running';
		}
		return this;
	},
	pause:function(){
		//console.log("paused")
		if(this.state==='running'){
			clearInterval(this.interval);
			this.state='paused';
		}
		return this;
	},
	resume:function(){
		//console.log("resume")
		if(this.state==='paused'){
			this.clockInterval();
			this.state='running'
		}
		return this;
	},
	clockInterval:function(){
			var that=this;
			var interval=setInterval(function(){
				if(isFunction(callback)){
					callback();
				}
				if(isNotEmpty(that.timeLine)){


			//that.clock+=100;
			for (keys in that.timeLine ){
				if(isFunction(that.timeLine[keys])){
					setTimeout(that.timeLine[keys],keys)
				}
			}
			 }
			},time);
			this.state="running";
			this.interval=interval;
			return this;
		},
	at:function(time,callback){
		if(arguments.length==1 && isObject(arguments[0])){
			for (keys in arguments[0]){
				this.timeLine[keys]=arguments[0][keys];
			}
		}else{

			this.timeLine[time]=callback;
		}
		return this;
		
	}
};
return this.x=x;
};
	
