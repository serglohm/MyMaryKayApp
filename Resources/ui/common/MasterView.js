//Master View Component Constructor
function MasterView(_params) {
	var settings = _params.settings;
	var self = Ti.UI.createView({
		backgroundImage: settings.masterBackgroundImage
	});
	
	//some dummy data for our table view
	var tableData = [
		{title:'Спецпредложения', data:'special', hasChild:true, color: '#000'},
		{title:'Каталог', data:'catalog', hasChild:true, color: '#000'},
		{title:'Контакты', data:'contacts', hasChild:true, color: '#000'}
	];
	
	var table = Ti.UI.createTableView({
		data: []
	});
	table.backgroundColor = 'transparent';
	table.separatorStyle = Ti.UI.iPhone.TableViewSeparatorStyle.NONE;
	table.separatorColor = 'transparent';	
	
	self.add(table);
	
	self.addRowToTable = function(_rowdata, _data){
		var newRow = Ti.UI.createTableViewRow({
				data: _rowdata.data,
				className: 'itemRowDp',
				height: '50dp'
		});
		newRow.backgroundColor = 'transparent';
	
		var bckView = Ti.UI.createView({left: '5dp', top: '5dp', right: '5dp', bottom: '0dp',
			backgroundColor: '#fff',
			data: _rowdata.data,
			borderRadius: 5
		});
			
		var titleLabel = Ti.UI.createLabel({
			text: _rowdata.title,
			data: _rowdata.data,	
			top: '10dp', left: '10dp', right: '10dp',
			bottom: '10dp',
			font: {fontSize: '15dp', fontWeight: 'bold', fontFamily: 'Arial'},
			color: "#333"			
		});
		bckView.add(titleLabel);
		newRow.add(bckView);
		
		_data.push(newRow);
	};	

	var tempData = []
	for(var i = 0; i < tableData.length; i++){
		self.addRowToTable(tableData[i], tempData);
	}
	table.setData(tempData);	

	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			name: e.source.title,
			data: e.source.data
		});
	});
	
	return self;
};

module.exports = MasterView;