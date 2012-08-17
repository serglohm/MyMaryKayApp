function ItemView(_params) {
	var self = Ti.UI.createView();
	var engine = _params.engine;
	var mdb = _params.mdb;
	var itemID = _params.itemID;
	var itemData = {};

    var scrollView = Ti.UI.createScrollView({
      left: 0, top: 0, right: 0, bottom: 0,
      contentWidth: 'auto',
      contentHeight: 'auto',
      showVerticalScrollIndicator: true,
      showHorizontalScrollIndicator: true,
    });
    self.add(scrollView);
    
    var view = Ti.UI.createView({
      left: 0, top: 0,
      height: Ti.UI.SIZE,
      width: 'auto',
      layout: 'vertical'
    });
    scrollView.add(view);

	var titleLabel = Ti.UI.createLabel({
		text: '',	
		top: '10dp',	
		left: '10dp', right: '10dp',
		font: {fontSize: '15dp', fontWeight: 'bold', fontFamily: 'Arial'},
		color: '#FF1170'		
	});
	view.add(titleLabel);

	var imgView = Ti.UI.createImageView({
		left: '10dp', right: '10dp'
	});	
	imgView.defaultImage = '/images/mary_kay.png';
	view.add(imgView);

	var priceLabel = Ti.UI.createLabel({	
		font: {fontSize: '20dp', fontFamily: 'Arial'},
		color: '#FF1170',
		left: '10dp', right: '10dp',
		text: ''
	});
	view.add(priceLabel);

	var annotaionLabel = Ti.UI.createLabel({	
		font: {fontSize: '15dp', fontFamily: 'Arial'},
		color: "#555",
		left: '10dp', right: '10dp',
		text: ''
	});
	view.add(annotaionLabel);


	var buttonsView = Ti.UI.createView({
      left: 0, top: 0,
      width: Ti.UI.SIZE,
      height: '60dp'
    });
	
	var cartButton = Ti.UI.createButton({	
		font: {fontSize: '20dp', fontFamily: 'Arial'},
		top: '10dp',
		left: '10dp', right: '70dp',
		//backgroundColor : '',
		color: '#FF1170',
		title: 'Добавить в корзину'
	});
	cartButton.addEventListener('click', function(e){
		mdb.addItemToCart(itemID, itemData.cname, itemData.thumb);
		cartButton.title = 'В корзину (' + mdb.getItemCountInCart(itemID) + ')';
	});

	var favouriteButton = Ti.UI.createButton({	
		font: {fontSize: '20dp', fontFamily: 'Arial'},
		top: '10dp',
		width: '50dp', right: '10dp',
		//backgroundColor : '',
		color: '#FF1170',
		title: 'F'
	});	
	favouriteButton.addEventListener('click', function(e){
		mdb.addItemToFavourites(itemID, itemData.cname, itemData.thumb);
		cartButton.title = 'В корзину (' + mdb.getItemCountInCart(itemID) + ')';
	});	
	
	buttonsView.add(cartButton);
	buttonsView.add(favouriteButton);
	view.add(buttonsView);
	

	var descriptionLabel = Ti.UI.createLabel({	
		font: {fontSize: '15dp', fontFamily: 'Arial'},
		color: "#555",
		top: '10dp',
		left: '10dp', right: '10dp',
		text: ''
	});
	view.add(descriptionLabel);
	
	
    
    var spaceView = Ti.UI.createView({
      right: 0, left: 0,
      height: '20dp'
    });
    view.add(spaceView);	
	
	self.setItemData = function(data){
		Ti.API.log(data);
		itemData = data;
		annotaionLabel.text = data.annotation;
		descriptionLabel.text = data.description;
		titleLabel.text = data.cname;
		cartButton.title = 'В корзину (' + mdb.getItemCountInCart(itemID) + ')';
		priceLabel.text = 'Цена: ' + data.price + ' руб.';
		imgView.image = 'http://www.mymarykay.ru/' + data.img;
	};


	self.itemCallback = function(data){
		self.setItemData(data);
	}	
	
	engine.getData('/shop/m/item/' + itemID + '/', self.itemCallback);
	
	return self;
};

module.exports = ItemView;
