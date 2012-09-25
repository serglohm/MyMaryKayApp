import QtQuick 1.0
import com.nokia.symbian 1.0

import "code.js" as Code
import "myDB.js" as Mdb
import "engine.js" as Engine

Page {
    id: mainPage
    property int categoryId: 0
    property Item headerItem: null

    property string campaignID: ""
    property string cname: ""

    Rectangle{
        anchors.fill: parent
        color: '#F2797F'
        Button {
            id: loadButton
            visible: false
            anchors.top: parent.top
            anchors.right: parent.right
            anchors.left: parent.left
            text: qsTr("load")

            onClicked: {
                getCategories(0);
            }
        }

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
                    color: '#333'
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
                    text: description
                    wrapMode: Text.WordWrap
                }
                MouseArea{
                    anchors.fill: parent
                    onClicked: {
                        console.log('clicked on ' + cid);
                        mainPage.cname = cname + ' ' + img;
                        if(pid > 0){
                            getCategoryItems(cid);
                        } else {
                            getCategories(cid);
                        }
                    }
                }
            }
        }

        ListView{
            anchors.top: parent.top
            anchors.left: parent.left
            anchors.right: parent.right
            anchors.bottom: parent.bottom
            anchors.margins: 10
            header: MainHeader {
                id: categoryHeader
                Component.onCompleted: {
                    headerItem = categoryHeader;
                }
            }

            model: listModel
            delegate: delegate
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

    onStatusChanged: {
        if(status == 2){
            getCategories(categoryId);
            cname = 'categoryId: ' + categoryId;
        }
    }

    function getCategoriesCallback(data){
        for(var i = 0; i < data.length; i++){
            console.log(data[i]);
            listModel.append(data[i]);
        }
        indicator.visible = false;
        indicator.running = false;
    }


    function getCategories(id){
        var url = Engine.getUrlStart() + "/shop/m/cat/" + id + "/";
        print("url = " + url);
        listModel.clear();
        indicator.running = true;
        indicator.visible = true;
        Code.getJSON(url, getCategoriesCallback);
    }

}
