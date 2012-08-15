function MDb(){
	var db = Ti.Database.open('MyMaryKayDb');
	
    db.execute("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, \
                                                                    order_number INTEGER, \
                                                                    order_time NUMERIC, amount NUMERIC, \
                                                                    name TEXT, surname TEXT, second_name TEXT,\
                                                                    phone TEXT, email TEXT, city TEXT, \
                                                                    postindex TEXT, address TEXT \
                                                                    )");
    db.execute("CREATE TABLE IF NOT EXISTS order_items (id INTEGER PRIMARY KEY AUTOINCREMENT, \
                                                                            iid INTEGER, \
                                                                            oid INTEGER, \
                                                                            cnt INTEGER)");
    db.execute("CREATE TABLE IF NOT EXISTS cart_items (id INTEGER PRIMARY KEY AUTOINCREMENT, \
                                                                            iid INTEGER, \
                                                                            cnt INTEGER)");
    db.execute("CREATE TABLE IF NOT EXISTS goods (iid INTEGER PRIMARY KEY, \
                                                                cname TEXT)");
	
	db.close();
	
	
	this.db = db;
	
	return this;
};

MDb.prototype.open = function(itemId) {
	this.db = Ti.Database.open('MyMaryKayDb');
};

MDb.prototype.addItemToCart = function(itemId, name) {
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
        this.db.execute("INSERT INTO goods (iid, cname) VALUES (?, ?)", [itemId, name]);
    }
    gquery.close();

	this.db.close();
};


MDb.prototype.getItemsFromCart = function() {
    this.open();
	var model = [];
    var rows = this.db.execute("SELECT i.iid as iid, i.cnt as cnt , g.cname as cname FROM cart_items i, goods g where g.iid=i.iid");
	while (rows.isValidRow()){
		var rowData = {};
        rowData.cname = rows.fieldByName('cname');
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