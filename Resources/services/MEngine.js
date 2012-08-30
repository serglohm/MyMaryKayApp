function MEngine(){
	this.cmds = '';
	return this;
}

MEngine.prototype.getUrlStart = function(){    
	return "http://www.mymarykay.ru";
};
	
MEngine.prototype.getData = function(uri, callback, errorcallback){    
          
    var xhr = Titanium.Network.createHTTPClient();    
    xhr.onerror = function(e){
    	if(errorcallback){
    		errorcallback(e);
    	}
    	Ti.API.log('onerror: ' + JSON.stringify(e));
   	};
     
    var cmdUrl = this.getUrlStart() + uri;
    
    Ti.API.log("cmdUrl: " + cmdUrl); 
     
    xhr.open("GET", cmdUrl);         
    xhr.onload = function(){
        if(this.status == '200'){
            if(this.readyState == 4){
                var response = JSON.parse(this.responseText);
                callback(response);
            }            
        }                      
    };                  
    xhr.send();
};

MEngine.prototype.postRawData = function(uri, params, callback, errorcallback){    
          
    var xhr = Titanium.Network.createHTTPClient();    
    xhr.onerror = function(e){
    	if(errorcallback){
    		errorcallback(e);
    	}
		Ti.API.log('error: ' + JSON.stringify(e));
    	Ti.API.log(cmdUrl);
		Ti.API.log(params);
   	};
     
    var cmdUrl = this.getUrlStart() + uri; 
     
    xhr.open("POST", cmdUrl);         
    xhr.onload = function(){
        if(this.status == '200'){
            if(this.readyState == 4){
                var response = JSON.parse(this.responseText);
                callback(response);
            }            
        }                      
    };                  
    xhr.send(params);
};


MEngine.prototype.postData = function(uri, params, callback, errorcallback){        
    this.postRawData(uri, JSON.stringify(params), callback, errorcallback);
};

module.exports = MEngine; 
 