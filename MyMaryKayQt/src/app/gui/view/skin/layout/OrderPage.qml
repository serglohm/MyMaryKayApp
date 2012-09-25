// import QtQuick 1.0 // to target S60 5th Edition or Maemo 5
import QtQuick 1.0
import com.nokia.symbian 1.0

import "code.js" as Code
import "myDB.js" as Mdb
import "engine.js" as Engine

Page {
    id: orderPage
    property int categoryId: 0
    property variant orderModel: null
    Component.onCompleted: {
        orderModel = new Object();
        orderModel = Mdb.getLastOrder(orderModel);
        userName.text = orderModel.name;
        userSurname.text = orderModel.surname;
        userSecondname.text = orderModel.secondname;
        userEmail.text = orderModel.email;
        userCity.text = orderModel.city;
        userAddress.text = orderModel.address;
    }
    Rectangle{
        anchors.fill: parent
        color: '#F2797F'
    }

    Flickable
    {
        id: flickContent
        anchors.top: parent.top
        anchors.bottom: parent.bottom
        anchors.right: parent.right
        anchors.left: parent.left
        clip: true
        contentHeight: columnRect.height + 20
        Rectangle {
            anchors.left: parent.left
            anchors.right: parent.right
            anchors.top: parent.top
            height: columnContent.children.length * 70 + 20
            id: columnRect
            anchors.margins: 10
            radius: 10
            Column {
                anchors.fill: parent
                anchors.margins: 10
                id: columnContent
                spacing: 5
                Text {
                    text: "Имя:"
                }
                TextArea {
                    id: userName
                    anchors.right: parent.right
                    anchors.left: parent.left
                    wrapMode: Text.WordWrap

                }
                Text {
                    text: "Фамилия:"
                }
                TextArea {
                    id: userSurname
                    anchors.right: parent.right
                    anchors.left: parent.left

                }
                Text {
                    text: "Отчество:"
                }
                TextArea {
                    id: userSecondname
                    anchors.right: parent.right
                    anchors.left: parent.left

                }
                Text {
                    text: "Эл. почта:"
                }
                TextArea {
                    id: userEmail
                    anchors.right: parent.right
                    anchors.left: parent.left

                }
                Text {
                    text: "Город:"
                }
                TextArea {
                    id: userCity
                    anchors.right: parent.right
                    anchors.left: parent.left

                }
                Text {
                    text: "Адрес:"
                }
                TextArea {
                    id: userAddress
                    anchors.right: parent.right
                    anchors.left: parent.left

                }
                Button {
                    id: sendOrderButton
                    anchors.right: parent.right
                    anchors.left: parent.left
                    text: "Оформить"
                }
            }
        }
    }

    tools: ToolBarLayout {
        id: orderToolbar
        ToolButton {
            flat: true
            iconSource: "toolbar-back"
            onClicked: window.pageStack.depth <= 1 ? Qt.quit() : window.pageStack.pop()
        }
    }

}
