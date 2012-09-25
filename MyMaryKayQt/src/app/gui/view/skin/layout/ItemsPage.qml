import QtQuick 1.0
import com.nokia.symbian 1.0

import "code.js" as Code
import "myDB.js" as Mdb
import "engine.js" as Engine

Page {
    id: itemsPage
    property int categoryId: 0

    Rectangle{
        anchors.fill: parent
        color: '#F2797F'

        ListModel {
            id: listModel
        }

        Component{
            id: delegate
            Rectangle{
                color: '#fff'
                height: cnameText.height + descriptionText.height + 20
                width: parent.width
                radius: 10
                Text{
                    id: cnameText
                    anchors.right: parent.right
                    anchors.left: parent.left
                    anchors.top: parent.top
                    anchors.margins: 10
                    color: '#FF1170'
                    text: cname
                    font.bold: true
                    wrapMode: Text.WordWrap
                }
                Text{
                    id: descriptionText
                    anchors.right: parent.right
                    anchors.left: parent.left
                    anchors.bottom: parent.bottom
                    anchors.margins: 10
                    color: '#555'
                    text: annotation
                    wrapMode: Text.WordWrap
                }
                MouseArea{
                    anchors.fill: parent
                    onClicked: {
                        getItem(iid);
                    }
                }
            }
        }

        ListView{
            anchors.top: parent.top
            anchors.left: parent.left
            anchors.right: parent.right
            anchors.bottom: parent.bottom
            model: listModel
            delegate: delegate
            anchors.margins: 10
            spacing: 10
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

    function getCategoriesCallback(data){
        indicator.visible = false;
        indicator.running = false;
        for(var i = 0; i < data.length; i++){
            console.log(data[i]);
            listModel.append(data[i]);
        }
    }

    onStatusChanged: {
        console.log('ItemsPage onStatusChanged: ' + status);
        if(status == 2){            
            var url = Engine.getUrlStart() + "/shop/m/items/" + itemsPage.categoryId + "/";
            listModel.clear();
            console.log(url);
            Code.getJSON(url, getCategoriesCallback);
            indicator.visible = true;
            indicator.running = true;

        }
    }
}
