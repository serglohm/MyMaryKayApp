function ApplicationWindow(_params) {
	var MasterView = require('ui/common/MasterView'),
		CategoryView = require('ui/common/CategoryView'),
		CartView = require('ui/common/CartView'),
		FavouritesView = require('ui/common/FavouritesView'),
		ItemsView = require('ui/common/ItemsView'),
		ItemView = require('ui/common/ItemView');
		
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});

	var engine = _params.engine;	
	var mdb = _params.mdb;	
		
	var masterView = new MasterView(),
		categoryView = new CategoryView({engine: _params.engine, categoryID: 0});
		
	var masterContainerWindow = Ti.UI.createWindow({
		title:'MyMaryKay'
	});
	masterContainerWindow.add(masterView);
	
	var categoryContainerWindow = Ti.UI.createWindow({
		title:'Product Details'
	});
	categoryContainerWindow.add(categoryView);
	
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);
	
	masterView.addEventListener('itemSelected', function(e) {
		if(e.data == 'cart'){
			var tempView = new CartView({engine: engine, mdb: mdb});	
			
			var tempWindow = Ti.UI.createWindow({
				title: e.name
			});	
			var tempContainerView = Ti.UI.createView({layout: "vertical"});
			tempContainerView.add(tempView);
			tempWindow.add(tempContainerView);
			
			navGroup.open(tempWindow);
		} else if(e.data == 'favourites') {
			var tempView = new FavouritesView({engine: engine, mdb: mdb});		
			var tempWindow = Ti.UI.createWindow({
				title: e.name
			});	
			var tempContainerView = Ti.UI.createView({layout: "vertical"});
			tempContainerView.add(tempView);
			tempWindow.add(tempContainerView);
		} else {
			categoryContainerWindow.title = e.name;
			navGroup.open(categoryContainerWindow);
		}
	});
	
	Ti.App.addEventListener('app:selectCategory', function(e) {
		Ti.API.log(e.data[1]);
		
		var tempView;
		if(e.data[1].pid){
			tempView = new ItemsView({engine: engine, categoryID: e.data[0]});	
		} else {
			tempView = new CategoryView({engine: engine, categoryID: e.data[0]});
		}
	
		var tempWindow = Ti.UI.createWindow({
			title: e.data[1].cname
		});	
		var tempContainerView = Ti.UI.createView({layout: "vertical"});
		tempContainerView.add(tempView);
		tempWindow.add(tempContainerView);
		
		navGroup.open(tempWindow);			
	});	
	
	Ti.App.addEventListener('app:selectItem', function(e) {
		var tempView = new ItemView({engine: engine, mdb: mdb, itemID: e.data[0]});			
		var tempWindow = Ti.UI.createWindow({
			title: e.data[1].cname
		});	
		var tempContainerView = Ti.UI.createView({layout: "vertical"});
		tempContainerView.add(tempView);
		tempWindow.add(tempContainerView);
		navGroup.open(tempWindow);			
	});		
	
	
	return self;
};

module.exports = ApplicationWindow;
