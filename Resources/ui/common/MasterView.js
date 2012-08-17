//Master View Component Constructor
function MasterView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	//some dummy data for our table view
	var tableData = [
		{title:'Спецпредложения', data:'special', hasChild:true, color: '#000'},
		{title:'Каталог', data:'catalog', hasChild:true, color: '#000'},
		{title:'Корзина', data:'cart', hasChild:true, color: '#000'},
		{title:'История заказов', data:'history', hasChild:true, color: '#000'},
		{title:'Избранное', data:'favourites', hasChild:true, color: '#000'}
	];
	
	var table = Ti.UI.createTableView({
		data:tableData
	});
	self.add(table);
	
	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			name:e.rowData.title,
			data:e.rowData.data
		});
	});
	
	return self;
};

module.exports = MasterView;