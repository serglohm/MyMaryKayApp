function MDb(){
	var db = Ti.Database.open('MyMaryKayDb');
	
	var DB_VERSION = 2.02;
	
	db.execute("CREATE TABLE IF NOT EXISTS app_settings (sname VARCHAR(100) PRIMARY KEY, svalue TEXT)");
	
	var delete_flag = false;
	var query = db.execute("SELECT svalue FROM app_settings WHERE sname='DB_VERSION'");
    if (query.rowCount == 0){      
        delete_flag = true;
        db.execute("INSERT INTO app_settings (sname, svalue) VALUES (?, ?)", ['DB_VERSION', DB_VERSION]);
    } else {
    	var result = query.fieldByName('svalue');
    	Ti.API.log('current DBVersion = ' + result)
    	if (parseFloat(result) < DB_VERSION){
    		delete_flag = true;
    		db.execute("UPDATE app_settings SET svalue=? WHERE sname='DB_VERSION'", [DB_VERSION]);
    	}	
    }
    query.close();
	
	if(delete_flag){
		Ti.API.log('DROP TABLES');
		db.execute("DROP TABLE  favourite_items");                                                        
	    db.execute("DROP TABLE  goods");
		db.execute("DROP TABLE  orders");
		db.execute("DROP TABLE  cart_items");
		db.execute("DROP TABLE  order_items");
	}
	
	
    db.execute("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, \
                                                                    order_number INTEGER, \
                                                                    order_time NUMERIC, \
                                                                    amount NUMERIC, \
                                                                    name TEXT, last_name TEXT, second_name TEXT,\
                                                                    phone TEXT, email TEXT, city TEXT, \
                                                                    zipindex TEXT, address TEXT \
                                                                    )");
                                                                    
    db.execute("CREATE TABLE IF NOT EXISTS order_items (id INTEGER PRIMARY KEY AUTOINCREMENT, \
                                                                            iid INTEGER, \
                                                                            oid INTEGER, \
                                                                            cnt INTEGER)");
                                                                            
    db.execute("CREATE TABLE IF NOT EXISTS cart_items (id INTEGER PRIMARY KEY AUTOINCREMENT, \
                                                                            iid INTEGER, \
                                                                            cnt INTEGER)");
                                                                            
    db.execute("CREATE TABLE IF NOT EXISTS favourite_items (id INTEGER PRIMARY KEY AUTOINCREMENT, \
                                                                            iid INTEGER)");
    
    
                                                                            
	db.execute("CREATE TABLE IF NOT EXISTS goods (iid INTEGER PRIMARY KEY, \
																thumb TEXT, \
                                                                cname TEXT)");
	
	db.close();
	
	
	this.db = db;
	
	return this;
};

MDb.prototype.open = function(itemId) {
	this.db = Ti.Database.open('MyMaryKayDb');
};

MDb.prototype.addItemToFavourites = function(itemId, name, thumb) {
	this.open();
    var query = this.db.execute("SELECT id FROM favourite_items where iid = ?", [itemId]);
    if (query.rowCount == 0){      
        this.db.execute("INSERT INTO favourite_items (iid) VALUES (?)", [itemId]);
    }
    query.close();
    var gquery = this.db.execute("SELECT cname FROM goods where iid = ?", [itemId]);
    if (gquery.rowCount == 0){
        this.db.execute("INSERT INTO goods (iid, cname, thumb) VALUES (?, ?, ?)", [itemId, name, thumb]);
    }
    gquery.close();

	this.db.close();
};

MDb.prototype.cartItemsCount = function() {
	this.open();
	var result = 0;
    var query = this.db.execute("SELECT SUM(cnt) as cnt FROM cart_items");
    if (query.rowCount > 0){
        result = query.fieldByName('cnt');
	}
    query.close();	
	this.db.close();

	return result;
};


MDb.prototype.orders = function(){
	    this.open();
	var model = [];
    var rows = this.db.execute("SELECT id, datetime(order_time) as order_time FROM orders ORDER BY id DESC");

	while (rows.isValidRow()){
		var rowData = {};
        rowData.oid = rows.fieldByName('id');
        rowData.order_time = rows.fieldByName('order_time');	
		
        model.push(rowData);
        rows.next();
    }
	rows.close();

    this.db.close();
    return model;
	
};

MDb.prototype.orderCart = function(order) {
	this.open();
	var sql = "INSERT INTO orders (order_time, last_name, name, second_name, phone, email, city, zipindex, address) values (datetime('now'), ?, ?, ?, ?, ?, ?, ?, ?)"; 
	this.db.execute(sql, [order.contact_info.last_name, 
					order.contact_info.first_name, 
					order.contact_info.second_name, 
					order.contact_info.phone, 
					order.contact_info.email, 
					order.contact_info.city, 
					order.contact_info.zip, 
					order.contact_info.address]);
	var order_id = this.db.getLastInsertRowId(); 
	
	for(var i = 0; i < order.goods.length; i++){
		this.db.execute("INSERT INTO order_items (oid, iid, cnt) values (?, ?, ?)", [order_id, order.goods[i].id, order.goods[i].count]);
	}
	
    var query = this.db.execute("DELETE FROM cart_items"); 
	this.db.close();
	return order_id; 
};

MDb.prototype.itemsFromOrder = function(oid) {
    this.open();
	var model = [];
    var rows = this.db.execute("SELECT i.oid as oid, i.iid as iid, i.cnt as cnt, g.thumb as thumb, g.cname as cname FROM order_items i, goods g where g.iid=i.iid AND i.oid=?", [oid]);

	while (rows.isValidRow()){
		var rowData = {};
        rowData.cname = rows.fieldByName('cname');
        rowData.thumb = rows.fieldByName('thumb');
        rowData.oid = rows.fieldByName('oid');
        rowData.iid = rows.fieldByName('iid');
        rowData.cnt = rows.fieldByName('cnt');		
		
        model.push(rowData);
        rows.next();
    }
	rows.close();

    this.db.close();
    return model;
};


MDb.prototype.deleteFromCart = function(itemId) {
	var result = 0;
	this.open();
    var query = this.db.execute("SELECT cnt FROM cart_items where iid = ?", [itemId]);
    if (query.rowCount > 0){
        result = query.fieldByName('cnt');
        --result;
        if(result > 0){
        	this.db.execute("UPDATE cart_items SET cnt=? WHERE iid = ?", [result, itemId]);
        } else {
        	this.db.execute("DELETE FROM cart_items WHERE iid = ?", [itemId]);
        }
    }
    query.close();
   	this.db.close();
	return result;
};

MDb.prototype.deleteFromFavourites = function(itemID) {
	this.open();
    var query = this.db.execute("DELETE FROM favourite_items where iid=?", [itemID]); 
	this.db.close();
};

MDb.prototype.addItemToCart = function(itemId, name, thumb) {
	this.open();
    var query = this.db.execute("SELECT cnt FROM cart_items where iid = ?", [itemId]);
    if (query.rowCount > 0){
        var cnt = query.fieldByName('cnt');
        this.db.execute("UPDATE cart_items SET cnt=? WHERE iid = ?", [++cnt, itemId]);
    } else {      
        this.db.execute("INSERT INTO cart_items (iid, cnt) VALUES (?, 1)", [itemId]);
    }
    query.close();
    var gquery = this.db.execute("SELECT cname FROM goods where iid = ?", [itemId]);
    if (gquery.rowCount == 0){
        this.db.execute("INSERT INTO goods (iid, cname, thumb) VALUES (?, ?, ?)", [itemId, name, thumb]);
    }
    gquery.close();

	this.db.close();
};

MDb.prototype.getItemsFromFavourites = function() {
    this.open();
	var model = [];
    var rows = this.db.execute("SELECT i.iid as iid, g.thumb as thumb, g.cname as cname FROM favourite_items i, goods g where g.iid=i.iid");
	while (rows.isValidRow()){
		var rowData = {};
        rowData.cname = rows.fieldByName('cname');
        rowData.iid = rows.fieldByName('iid');	
		rowData.thumb = rows.fieldByName('thumb');	
		
        model.push(rowData);
        rows.next();
    }
	rows.close();

    this.db.close();
    return model;
};

MDb.prototype.getItemsFromCart = function() {
    this.open();
	var model = [];
    var rows = this.db.execute("SELECT i.iid as iid, i.cnt as cnt, g.thumb as thumb, g.cname as cname FROM cart_items i, goods g where g.iid=i.iid");
	while (rows.isValidRow()){
		var rowData = {};
        rowData.cname = rows.fieldByName('cname');
        rowData.thumb = rows.fieldByName('thumb');
        rowData.iid = rows.fieldByName('iid');
        rowData.cnt = rows.fieldByName('cnt');		
		
        model.push(rowData);
        rows.next();
    }
	rows.close();

    this.db.close();
    return model;
};

MDb.prototype.getItemCountInCart = function(itemId) {
    this.open();
    var result = 0;
    var query = this.db.execute("SELECT cnt FROM cart_items where iid = ?", [itemId]);
    if (query.rowCount > 0){
        var cnt = query.fieldByName('cnt');
        result = cnt;
    } 
	query.close();
    this.db.close();
    return result;
};

module.exports = MDb; 