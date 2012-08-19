function MEngine(){
	this.cmds = '';
	return this;
}

MEngine.prototype.getData = function(uri, callback){    
          
    var xhr = Titanium.Network.createHTTPClient();    
    xhr.onerror = function(e){
    	Ti.API.log('onerror: ' + JSON.stringify(e));
   	};
     
    var cmdUrl = 'http://www.mymarykay.ru' + uri; 
     
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

MEngine.prototype.postRawData = function(uri, params, callback){    
          
    var xhr = Titanium.Network.createHTTPClient();    
    xhr.onerror = function(e){
    	
		Ti.API.log('error: ' + JSON.stringify(e));
    	Ti.API.log(cmdUrl);
		Ti.API.log(params);
   	};
     
    var cmdUrl = 'http://www.mymarykay.ru/' + uri; 
     
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


MEngine.prototype.postData = function(uri, params, callback){        
    this.postRawData(uri, JSON.stringify(params), callback);
};

module.exports = MEngine; 
 