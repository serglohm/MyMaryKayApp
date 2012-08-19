function HistoryItemsView(_params) {
	var self = Ti.UI.createView();
	var engine = _params.engine;
	var mdb = _params.mdb;
	var orderID = _params.orderID;
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
		if(e.source.noClicked){
	
		} else { 
			Ti.App.fireEvent('app:selectAdvItem', {data: [e.source.itemID, itemsData[e.source.itemID], 'history']});
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
			top: '10dp', left: '90dp', right: '55dp', bottom: '10dp',
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
		
		var  countLabel = Ti.UI.createLabel({	
			font: {fontSize: '15dp', fontFamily: 'Arial'},
			color: '#FF1170',
			top: '10dp', right: '5dp', bottom: '10dp',
			width: '45dp',
			text: _rowdata.cnt + ' шт.',
			itemID: _rowdata.iid
		});
		newRow.add(countLabel);			
					
		_data.push(newRow);
		itemsData[_rowdata.iid + ""] = _rowdata;
	};	

	self.clearTable = function(){
		tableData = [];
		table.setData([]);		
	};


	self.updateHistoryItems = function(){
		var model = mdb.itemsFromOrder(orderID);
		self.clearTable();
		var tempData = [];
		for(var i = 0; i < model.length; i++){
			self.addRowToTable(model[i], tempData);
		}
		table.setData(tempData);
	};	
	self.updateHistoryItems();


			

	
	
	
	return self;
};

module.exports = HistoryItemsView;
