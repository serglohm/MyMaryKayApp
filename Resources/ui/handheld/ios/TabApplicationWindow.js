function TabApplicationWindow(_params){
	
	var MasterView = require('ui/common/MasterView'),
		CategoryView = require('ui/common/CategoryView'),
		CartView = require('ui/common/CartView'),
		FavouritesView = require('ui/common/FavouritesView'),
		HistoryView = require('ui/common/HistoryView'),
		HistoryItemsView = require('ui/common/HistoryItemsView'),
		OrderView = require('ui/common/OrderView'),
		ItemsView = require('ui/common/ItemsView'),
		ItemView = require('ui/common/ItemView');
			
	var engine = _params.engine;	
	var mdb = _params.mdb;
	
	var self = Titanium.UI.createTabGroup({id:'tabGroup1'});
	

	var masterView = new MasterView(),
		categoryView = new CategoryView({engine: _params.engine, categoryID: 0});
		
	var masterContainerWindow = Ti.UI.createWindow({
		title: 'MyMaryKay'
	});
	masterContainerWindow.add(masterView);
	
	var categoryContainerWindow = Ti.UI.createWindow({
		title: 'Product Details'
	});
	categoryContainerWindow.add(categoryView);


	masterView.addEventListener('itemSelected', function(e) {
		if(e.data == 'cart'){
			self.setActiveTab(1);
			
		} else if(e.data == 'favourites') {
			var tempView;
			tempView = new FavouritesView({engine: engine, mdb: mdb});		
	
			var tempWindow = Ti.UI.createWindow({
				title: e.name
			});	
			var tempContainerView = Ti.UI.createView({layout: "vertical"});
			tempContainerView.add(tempView);
			tempWindow.add(tempContainerView);
			
			Titanium.UI.currentTab.open(tempWindow,{animated:true});
		
		} else {
			categoryContainerWindow.title = e.name;
			tab1.open(categoryContainerWindow, {animated:true});
		}
	});	

	var tab1 = Titanium.UI.createTab({
		icon:'/images/tabs/KS_nav_ui.png',
		id:'tab1',
		window: masterContainerWindow
	});
	var cartView = new CartView({engine: engine, mdb: mdb});	
	
	var cartWindow = Ti.UI.createWindow({
		title: 'Корзина'
	});	
	var cartContainerView = Ti.UI.createView({layout: "vertical"});
	cartContainerView.add(cartView);
	cartWindow.add(cartContainerView);

	var cartTab = Titanium.UI.createTab({
		icon: '/images/tabs/KS_nav_ui.png',
		titleid: 'Корзина',
		window: cartWindow
	});

	var cartCnt = mdb.cartItemsCount();
	if (cartCnt > 0){
		cartTab.badge = cartCnt;		
	} else {
		cartTab.badge = null;		
	}	
	
	self.addTab(tab1);
	self.addTab(cartTab);


	var favouritesView = new FavouritesView({engine: engine, mdb: mdb});		
	var favouritesWindow = Ti.UI.createWindow({
		title: 'Избранное'
	});	
	var favouritesContainerView = Ti.UI.createView({layout: "vertical"});
	favouritesContainerView.add(favouritesView);
	favouritesWindow.add(favouritesContainerView);	
	var favouritesTab = Titanium.UI.createTab({
		icon: '/images/tabs/KS_nav_ui.png',
		titleid: 'Избранное',
		window: favouritesWindow
	});
	self.addTab(favouritesTab);	


	var historyView = new HistoryView({engine: engine, mdb: mdb});		
	var historyWindow = Ti.UI.createWindow({
		title: 'Заказы'
	});	
	var historyContainerView = Ti.UI.createView({layout: "vertical"});
	historyContainerView.add(historyView);
	historyWindow.add(historyContainerView);	
	var historyTab = Titanium.UI.createTab({
		icon: '/images/tabs/KS_nav_ui.png',
		titleid: 'Заказы',
		window: historyWindow
	});
	self.addTab(historyTab);	

	self.addEventListener('open',function(){
		Titanium.UI.setBackgroundColor('#fff');
	});

	self.setActiveTab(1);	

	Ti.App.addEventListener('app:addItemToFavourites', function(e){
		favouritesView.updateFavouritesItems();
	});

	Ti.App.addEventListener('app:addItemToCart', function(e){
		cartView.updateCartItems();
		var cartCnt = mdb.cartItemsCount();
		if (cartCnt > 0){
			cartTab.badge = cartCnt;		
		} else {
			cartTab.badge = null;		
		}
	});

	Ti.App.addEventListener('app:cartBadge', function(e){
		var cartCnt = e.data;
		if (cartCnt > 0){
			cartTab.badge = cartCnt;		
		} else {
			cartTab.badge = null;		
		}
	});

	Ti.App.addEventListener('app:selectItem', function(e) {
		var tempView = new ItemView({engine: engine, mdb: mdb, itemID: e.data[0]});			
		var tempWindow = Ti.UI.createWindow({
			title: e.data[1].cname
		});	
		var tempContainerView = Ti.UI.createView({layout: "vertical"});
		tempContainerView.add(tempView);
		tempWindow.add(tempContainerView);
		tab1.open(tempWindow, {animated:true});		
	});
	
	Ti.App.addEventListener('app:selectCategory', function(e) {
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

		tab1.open(tempWindow, {animated:true});			
	});	
	
	Ti.App.addEventListener('app:makeOrder', function(e) {
		var tempView = new OrderView({engine: engine, mdb: mdb});

		var tempWindow = Ti.UI.createWindow({
			title: 'Заказ'
		});	
		var tempContainerView = Ti.UI.createView({layout: "vertical"});
		tempContainerView.add(tempView);
		tempWindow.add(tempContainerView);

		cartTab.open(tempWindow, {animated:true});			
		
	});
	
	Ti.App.addEventListener('app:completeOrder', function(e){
		var order_id = mdb.orderCart(e.data);
		historyView.updateHistory();
	});

	Ti.App.addEventListener('app:selectOrder', function(e){		
		var tempView = new HistoryItemsView({engine: engine, mdb: mdb, orderID: e.data[0]});			
		var tempWindow = Ti.UI.createWindow({
			title: 'Заказ №' + e.data[0]
		});	
		var tempContainerView = Ti.UI.createView({layout: "vertical"});
		tempContainerView.add(tempView);
		tempWindow.add(tempContainerView);

		historyTab.open(tempWindow, {animated: true});

	});
	
	Ti.App.addEventListener('app:selectAdvItem', function(e) {
		var tempView = new ItemView({engine: engine, mdb: mdb, itemID: e.data[0]});			
		var tempWindow = Ti.UI.createWindow({
			title: e.data[1].cname
		});	
		var tempContainerView = Ti.UI.createView({layout: "vertical"});
		tempContainerView.add(tempView);
		tempWindow.add(tempContainerView);

		if(e.data[2] == 'cart'){
			cartTab.open(tempWindow, {animated:true});	
		} else if(e.data[2] == 'favourites'){
			favouritesTab.open(tempWindow, {animated: true});
		} else if(e.data[2] == 'history'){
			historyTab.open(tempWindow, {animated: true});
		}
	});	
	
	return self; 
};

module.exports = TabApplicationWindow;