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
}

MEngine.prototype.postData = function(uri, params, callback){    
          
    var xhr = Titanium.Network.createHTTPClient();    
    xhr.onerror = function(e){
    	Ti.API.log('onerror: ' + JSON.stringify(e));
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
    xhr.send(JSON.stringify(params));
}

module.exports = MEngine; 
 