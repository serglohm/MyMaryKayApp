function HistoryView(_params){
	var settings = _params.settings;
	var self = Ti.UI.createView({
		backgroundImage: settings.historyBackgroundImage
	});

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
	table.backgroundColor = 'transparent';
	table.separatorStyle = Ti.UI.iPhone.TableViewSeparatorStyle.NONE;
	table.separatorColor = 'transparent';
	self.add(table);
	
	table.addEventListener('click', function(e) {
		if(e.source.noClicked){
	
		} else { 
			Ti.App.fireEvent('app:selectOrder', {data: [e.source.itemID, itemsData[e.source.itemID]]});
		}
	});	
	
	self.addRowToTable = function(_rowdata, _data){
		var newRow = Ti.UI.createTableViewRow({
				itemID: _rowdata.oid,
				className: 'favouriteRow',
				height: '50dp',
				backgroundColor: 'transparent'
		});
		newRow.selectedBackgroundColor = 'transparent';
	
		var bckView = Ti.UI.createView({left: '5dp', top: '0dp', right: '5dp', bottom: '5dp',
			backgroundColor: '#fff',
			itemID: _rowdata.oid,
			borderRadius: 5
		});	
	
		var titleLabel = Ti.UI.createLabel({
			text: '№' + _rowdata.oid + ': ' + _rowdata.order_time,
			itemID: _rowdata.oid,			
			top: '10dp', left: '10dp', right: '10dp', bottom: '10dp',
			font: {fontSize: '15dp', fontWeight: 'bold', fontFamily: 'Arial'},
			color: "#333"			
		});
		bckView.add(titleLabel);
		newRow.add(bckView);	
			
		_data.push(newRow);
		itemsData[_rowdata.oid + ""] = _rowdata;
	};	

	self.clearTable = function(){
		tableData = [];
		table.setData([]);		
	};	
	self.updateHistory = function(){
		var model = mdb.orders();
		self.clearTable();
		var tempData = [];
		for(var i = 0; i < model.length; i++){
			self.addRowToTable(model[i], tempData);
		}
		table.setData(tempData);
	};	
	self.updateHistory();	
	
	
	return self;
	
};


module.exports = HistoryView;