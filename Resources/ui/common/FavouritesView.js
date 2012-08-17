function FavouritesView(_params) {
	var self = Ti.UI.createView();
	var engine = _params.engine;
	var mdb = _params.mdb;
	var itemsData = {};

	var tableData = [];
	
	self.addEventListener('itemSelected', function(e) {
		//lbl.text = e.name + ': ' + e.data;
	});
	
	var table = Ti.UI.createTableView({
		top: '0dp',
		bottom: '0dp',
		data: tableData
	});
	//table.separatorColor = 'transparent';
	self.add(table);
	
	table.addEventListener('click', function(e) {
		
		if(e.source.itemID == -1){
	
		} else { 
			Ti.App.fireEvent('app:selectItem', {data: [e.source.itemID, itemsData[e.source.itemID]]});
		}
	});	
	
	self.addRowToTable = function(_rowdata, _data){
		var newRow = Ti.UI.createTableViewRow({
				itemID: _rowdata.iid,
				className: 'favouriteRow',
				height: '100dp'
		});
	
		var titleLabel = Ti.UI.createLabel({
			text: _rowdata.cname,
			itemID: _rowdata.iid,			
			top: '10dp', left: '90dp', right: '10dp', bottom: '10dp',
			font: {fontSize: '15dp', fontWeight: 'bold', fontFamily: 'Arial'},
			color: "#333"			
		});
		newRow.add(titleLabel);
		
		var img = Ti.UI.createImageView({
			center: '50dp', left: '10dp',
			width: 70,
			itemID: _rowdata.iid,
			image: 'http://www.mymarykay.ru/' + _rowdata.thumb
		});
		img.defaultImage = '/images/mary_kay.png';
		newRow.add(img);		
		
			
		_data.push(newRow);
		itemsData[_rowdata.iid + ""] = _rowdata;
	};	

	self.clearTable = function(){
		tableData = [];
		table.setData([]);		
	};


	
	var model = mdb.getItemsFromFavourites();
	self.clearTable();
	var tempData = [];
	for(var i = 0; i < model.length; i++){
		self.addRowToTable(model[i], tempData);
	}
	table.setData(tempData);
	
	return self;
};

module.exports = FavouritesView;