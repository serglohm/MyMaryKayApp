function OrderView(_params){
	var self = Ti.UI.createView();
	var engine = _params.engine;
	var mdb = _params.mdb;
	var itemsData = {};

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

	self.createTextLabel = function(text){
		return Ti.UI.createLabel({
			text: text,	
			top: '10dp', left: '10dp', right: '10dp',
			font: {fontSize: '15dp', fontWeight: 'bold', fontFamily: 'Arial'},
			color: '#FF1170'		
		});
	};

	self.createTextField = function(value){
		return Ti.UI.createTextField({
			value: value,
			font: {fontSize: '15dp', fontWeight: 'bold', fontFamily: 'Arial'},
			top: '0dp', bottom: '0dp', left: '10dp', right: '10dp', height: '30dp',
			borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	       	returnKeyType: Titanium.UI.RETURNKEY_DONE,
	       	keyboardType:Titanium.UI.KEYBOARD_DEFAULT
		});
	};


	view.add(self.createTextLabel('Фамилия'));
	var surnameField = self.createTextField('Фамилия');
	view.add(surnameField);

	view.add(self.createTextLabel('Имя'));
	var nameField = self.createTextField('Имя');
	view.add(nameField);
	
	view.add(self.createTextLabel('Отчество'));
	var secondnameField = self.createTextField('Отчество');
	view.add(secondnameField);	

	view.add(self.createTextLabel('Телефон'));
	var phoneField = self.createTextField('8 903 123 45 67');
	view.add(phoneField);

	view.add(self.createTextLabel('Email'));
	var emailField = self.createTextField('name@email.ru');
	view.add(emailField);

	view.add(self.createTextLabel('Индекс'));
	var zipField = self.createTextField('123456');
	view.add(zipField);
	
	view.add(self.createTextLabel('Город'));	
	var cityField = self.createTextField('Москва');
	view.add(cityField);

	view.add(self.createTextLabel('Адрес'));
	var addressField = self.createTextField('ул. Тверская, д. 7');
	view.add(addressField);	

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
		color: '#FF1170',
		title: 'Оформить заказ'
	});
	orderButton.addEventListener('click', function(e){



		var order = {};
		order.goods = [];
		var model = mdb.getItemsFromCart();
		for(var i = 0; i < model.length; i++){
			order.goods.push({id: model[i].iid, count: model[i].cnt});
		}
		
		order.contact_info = {};
		order.contact_info.last_name = surnameField.value;
		order.contact_info.first_name = nameField.value;
		order.contact_info.second_name = secondnameField.value;	
		order.contact_info.phone = phoneField.value;
		order.contact_info.email = emailField.value;
		order.contact_info.city = cityField.value;
		order.contact_info.zip = zipField.value;
		order.contact_info.address = addressField.value;
		
		if(0){
			engine.postRawData('shop/m/order/', 'order_data=' + JSON.stringify(order), function(data){
				if(data == '1'){
					Ti.App.fireEvent('app:completeOrder', {data: order});
				}
			});
		} else {
			Ti.App.fireEvent('app:completeOrder', {data: order});
		}

	});
	buttonsView.add(orderButton);
	view.add(buttonsView);
		
	return self; 
};

module.exports = OrderView;
