
function getUrlStart(){
    return 'http://www.mymarykay.ru'
}

function getUrlStart2(){
    return 'http://www.mymarykay.ru'
}


function getCategoriesCallback(data){
    console.log(data);
}

function getCategories(){
    var url = "http://kupihleba.ru/cgi-bin/mmk.cgi";
    Code.getJSON(url, getCategoriesCallback);
}

function sendOrder(){
    /*
    var order = {"goods":[
                             {"id": 1062, "count": 1},
                             {"id": 1063, "count": 2},
                             {"id": 1064, "count": 3}
                         ],
                 "contact_info": {
                    "first_name":"Иван",
                    "second_name":"Иванович",
                    "last_name":"Иванов",
                    "city":"Волгоград",
                    "email":"gonzy@list.ru",
                    "phone":"+79012223344",
                    "zip":"400100",
                    "address":"ул.Иванова,
                     д.1. кв.2",
                    "payment":"2",
                    "delivery":"2",
                    "delivery_cost":"500"
                }
            };
    */
}
