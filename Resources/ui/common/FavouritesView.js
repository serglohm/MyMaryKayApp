function FavouritesView(_params) {
	var settings = _params.settings;
	var self = Ti.UI.createView({
		backgroundImage: settings.favouritesBackgroundImage
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
			Ti.App.fireEvent('app:selectAdvItem', {data: [e.source.itemID, itemsData[e.source.itemID], 'favourites']});
		}
	});	
	
	self.addRowToTable = function(_rowdata, _data){
		var newRow = Ti.UI.createTableViewRow({
				itemID: _rowdata.iid,
				className: 'favouriteRow',
				height: '100dp',
				backgroundColor: 'transparent'
		});
		newRow.backgroundColor = 'transparent';
		newRow.selectedBackgroundColor = 'transparent';
	
		var bckView = Ti.UI.createView({left: '5dp', top: '0dp', right: '5dp', bottom: '5dp',
			backgroundColor: '#fff',	
			itemID: _rowdata.iid,
			borderRadius: 5
		});		
	
		var titleLabel = Ti.UI.createLabel({
			text: _rowdata.cname,
			itemID: _rowdata.iid,			
			top: '10dp', left: '90dp', right: '55dp', bottom: '10dp',
			font: {fontSize: '15dp', fontWeight: 'bold', fontFamily: 'Arial'},
			color: "#333"			
		});
		bckView.add(titleLabel);
		
		var img = Ti.UI.createImageView({
			center: '50dp', left: '10dp',
			width: 70,
			itemID: _rowdata.iid,
			image: engine.getUrlStart() + '/' + _rowdata.thumb
		});
		img.defaultImage = '/iphone/applelogo.png';
		bckView.add(img);	
		
		var deleteView = Ti.UI.createView({
			center: '50dp', right: '0dp', width: '55dp', height: '55dp',
			noClicked: true,			
			itemID: _rowdata.iid,	
			backgroundColor: 'transparent'
		});
		var deleteImg = Ti.UI.createImageView({
			left: '10dp', right: '10dp', width: '25dp', height: '25dp',
			image: '/images/minus.png',
			noClicked: true,
			itemID: _rowdata.iid,			
			checked: false
		});
		deleteView.addEventListener('click', function(e){
			mdb.deleteFromFavourites(e.source.itemID);
			table.deleteRow(e.index);
			//self.updateFavouritesItems();
		});
		deleteView.add(deleteImg);
		bckView.add(deleteView);
					
		newRow.add(bckView);
			
		_data.push(newRow);
		itemsData[_rowdata.iid + ""] = _rowdata;
	};	

	self.clearTable = function(){
		tableData = [];
		table.setData([]);		
	};


	self.updateFavouritesItems = function(){
		var model = mdb.getItemsFromFavourites();
		self.clearTable();
		var tempData = [];
		for(var i = 0; i < model.length; i++){
			self.addRowToTable(model[i], tempData);
		}
		table.setData(tempData);
	};	
	self.updateFavouritesItems();
	
	return self;
};

module.exports = FavouritesView;