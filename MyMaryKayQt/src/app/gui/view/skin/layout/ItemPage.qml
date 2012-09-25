import QtQuick 1.0
import com.nokia.symbian 1.0

import "code.js" as Code
import "myDB.js" as Mdb
import "engine.js" as Engine

Page {
    id: itemPage
    property int itemId: 0
    Rectangle{
        anchors.fill: parent
        color: '#F2797F'
        Flickable{
            anchors.fill: parent
            contentHeight: productItem.height + 20
            flickableDirection: Flickable.VerticalFlick
            Rectangle {
                id: productItem
                color: "#fff"
                radius: 10
                anchors.top: parent.top
                anchors.left: parent.left
                anchors.right: parent.right
                anchors.margins: 10
                height: cnameText.height +
                        itemImage.height +
                        annotationText.height +
                        priceText.height +
                        basketButton.height +
                        descriptionText.height +
                        6*20
                Text{
                    id: cnameText
                    text: ''
                    anchors.top: parent.top
                    anchors.left: parent.left
                    anchors.right: parent.right
                    anchors.margins: 10
                    wrapMode: Text.WordWrap
                    color: '#FF1170'
                    font.bold: true
                    font.pixelSize: 30
                }
                Image{
                    id: itemImage
                    fillMode: Image.PreserveAspectFit
                    anchors.top: cnameText.bottom
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.margins: 10
                    smooth: true
                    height: 200

                }
                Text{
                    id: annotationText
                    text: ""
                    anchors.top: itemImage.bottom
                    anchors.left: parent.left
                    anchors.right: parent.right
                    anchors.margins: 10
                    wrapMode: Text.WordWrap
                    color: '#333'
                }
                Text{
                    id: priceText
                    text: ""
                    anchors.top: annotationText.bottom
                    anchors.left: parent.left
                    anchors.right: parent.right
                    anchors.margins: 10
                    wrapMode: Text.WordWrap
                    font.pixelSize: 30
                    color: '#FF1170'
                }
                Button{
                    id: basketButton
                    text: "В корзину"
                    anchors.top: priceText.bottom
                    anchors.left: parent.left
                    anchors.right: parent.right
                    anchors.margins: 10
                    //color: '#FF1170'
                    onClicked: {
                        Mdb.addItemToCart(itemPage.itemId, cnameText.text);
                        var cnt = Mdb.getItemCountInCart(itemPage.itemId);
                        basketButton.text = 'В корзину (' + cnt + ')';
                    }
                }
                Text{
                    id: descriptionText
                    text: description
                    anchors.top: basketButton.bottom
                    anchors.left: parent.left
                    anchors.right: parent.right
                    anchors.margins: 10
                    wrapMode: Text.WordWrap
                    color: '#333'
                }
            }
        }

        BusyIndicator {
            id: indicator
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.verticalCenter: parent.verticalCenter
            running: false
            width: parent.width / 3
            height: parent.width / 3
            visible: false
            z: 2
        }



    }
    function getItemCallback(data){
        indicator.visible = false;
        indicator.running = false;
        console.log(data);
        cnameText.text = data.cname;
        annotationText.text = data.annotation;
        descriptionText.text = data.description;
        priceText.text = "Цена " + data.price + " руб.";
        itemImage.source = Engine.getUrlStart2() + '/' + data.img;
        var cnt = Mdb.getItemCountInCart(itemPage.itemId);
        if(cnt){
            basketButton.text = 'В корзину (' + cnt + ')';
        }
        basketButton.visible = true;
    }


    onStatusChanged: {
        if(status == 2){            
            var url = Engine.getUrlStart() + "/shop/m/item/" + itemPage.itemId + "/";

            console.log('url' + url);

            Code.getJSON(url, getItemCallback);
            indicator.visible = true;
            indicator.running = true;
            basketButton.visible = false;
            return;
            var str = '{"orig_url":"./cosmetics/make-up/basis/basis_215.html","img":"/netcat_files/173/122/h_376457cb5462530fb23d329893a6f84a","description":"Полупрозрачная, шелковистая, нежная, как дуновение ветра. Эта компактная пудра создаст легкое, незаметное покрытие, которое защитит вашу кожу в течение дня и позволит ей надолго сохранить матовый оттенок. Она помогает визуально уменьшить морщинки, придает коже сияние и, кроме того, обеспечивает контроль за жирностью кожи на протяжении 8 часов! ","cname":"Минеральная компактная пудра Mary Kay<sup>®</sup>","price":"410","cid":"9","annotation":"Mary Kay<sup>®</sup> Sheer Mineral Pressed Powder,  9&nbsp;g","iid":"12"}';
            var data = 0;
            try{
                data = eval('(' + str + ')');
            } catch(e){
                console.log(Code.obj2json(e));
            }
            getItemCallback(data);
        }
    }
}

