function CartView(_params) {
	var engine = _params.engine;
	var mdb = _params.mdb;
	var settings = _params.settings;
	
	var self = Ti.UI.createView({
		backgroundColor: '#FF1170',
		backgroundImage: settings.cartBackgroundImage,
		backgroundRepeat: false
	});
	//var v = Ti.UI.createView();

	var itemsData = {};

	var tableData = [];
	
	self.addEventListener('itemSelected', function(e) {
		//lbl.text = e.name + ': ' + e.data;
	});
	
	var table = Ti.UI.createTableView({
		top: '0dp', left: 0,
		bottom: '60dp',
		
		data: tableData
	});
	//table.backgroundImage = '/iphone/Default.png'
	//table.separatorColor = 'transparent';
	//table.backgroundRepeat = false;
	table.backgroundColor = 'transparent';
	table.separatorStyle = Ti.UI.iPhone.TableViewSeparatorStyle.NONE;
	table.color = 'transparent';
	self.add(table);
	
	table.addEventListener('click', function(e) {
		
		if(e.source.noClicked){
	
		} else { 
			Ti.App.fireEvent('app:selectAdvItem', {data: [e.source.itemID, itemsData[e.source.itemID], 'cart']});
		}
	});	
	
	self.addRowToTable = function(_rowdata, _data){
		var newRow = Ti.UI.createTableViewRow({
				itemID: _rowdata.iid,
				className: 'cartRow',
				color: 'transparent',
				top: 10,
				height: '70dp'
				
		});
		newRow.backgroundLeftCap = 10;
		newRow.backgroundColor = 'transparent';
		newRow.selectedBackgroundColor = 'transparent';
		
		var bckView = Ti.UI.createView({left: 5, top: 5, right: 5, bottom: 0,
				borderRadius: 5,
				itemID: _rowdata.iid,
				backgroundColor: '#fff'
			});
		
		//newRow.setIndentionLevel
	
		var titleLabel = Ti.UI.createLabel({
			text: _rowdata.cname,
			itemID: _rowdata.iid,			
			top: '10dp', left: '10dp', right: '110dp', bottom: '10dp',
			font: {fontSize: '15dp', fontWeight: 'bold', fontFamily: 'Arial'},
			color: "#333"			
		});
		bckView.add(titleLabel);

		var countLabel = Ti.UI.createLabel({	
			font: {fontSize: '15dp', fontFamily: 'Arial'},
			color: '#555',	
			top: '10dp', right: '40dp', bottom: '10dp',
			width: '60dp',
			text: _rowdata.cnt + ' шт.',
			itemID: _rowdata.iid
		});
		bckView.add(countLabel);
			
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
			var result = mdb.deleteFromCart(e.source.itemID);
			if(result){
				e.row.children[0].children[1].text = result + ' шт.';
			} else {
				table.deleteRow(e.index);
			}
			var cartCnt = mdb.cartItemsCount();
			Ti.App.fireEvent('app:cartBadge', {data: cartCnt});
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


	self.updateCartItems = function(){
		var model = mdb.getItemsFromCart();
		self.clearTable();
		var tempData = [];
		for(var i = 0; i < model.length; i++){
			self.addRowToTable(model[i], tempData);
		}
		table.setData(tempData);
	};
	self.updateCartItems();
	
	var buttonsView = Ti.UI.createView({
      left: 0, bottom: 0,
      width: Ti.UI.SIZE,
      height: '65dp'
    });
	
	var orderButton = Ti.UI.createButton({	
		font: {fontSize: '20dp', fontFamily: 'Arial'},
		top: '10dp', bottom: '15dp',
		left: '10dp', right: '10dp',
		//backgroundColor : '',
		color: '#555',
		title: 'Оформить заказ'
	});
	orderButton.addEventListener('click', function(e){		
		Ti.App.fireEvent('app:makeOrder', {data: "0"});
	});
	buttonsView.add(orderButton);
	self.add(buttonsView);	

	
	return self;
};

module.exports = CartView;