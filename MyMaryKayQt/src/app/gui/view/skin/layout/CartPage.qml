import QtQuick 1.0
import com.nokia.symbian 1.0

import "code.js" as Code
import "myDB.js" as Mdb
import "engine.js" as Engine

Page {
    id: cartPage
    property int categoryId: 0

    Component.onCompleted: {
        Mdb.getItemsFromCart(cartModel);
    }

    Rectangle{
        anchors.fill: parent
        color: '#F2797F'
    }
    ListModel {
        id: cartModel
    }
    ListView {
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.bottom: makeOrder.top
        anchors.margins: 10
        spacing: 5
        clip: true
        id: goodsView
        model: cartModel
        header: Item {
            id: cartHeader
            height: 70
            width: parent.width
            Rectangle {
                anchors.top: parent.top
                anchors.horizontalCenter: parent.horizontalCenter
                height: parent.height - 5
                width: parent.width
                color: "white"
                radius: 10
                Text{
                    text: "Корзина"
                    color: "#F2797F"
                    wrapMode: Text.WordWrap
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.verticalCenter: parent.verticalCenter
                }
            }
        }
        delegate: Component {
            Rectangle {
                anchors.left: parent.left
                anchors.right: parent.right
                height: goodName.height + 10
                color: "white"
                radius: 10
                Text {
                    id: goodName
                    anchors.left: parent.left
                    anchors.right: goodCount.left
                    anchors.margins: 10
                    anchors.verticalCenter: parent.verticalCenter
                    wrapMode: Text.WordWrap
                    text: cname
                }
                Text {
                    id: goodCount
                    anchors.margins: 10
                    anchors.right: parent.right
                    anchors.verticalCenter: parent.verticalCenter
                    text: cnt + ' шт.'
                    width: 70
                }
            }

        }
    }
    Button {
        id: makeOrder
        anchors.bottom: parent.bottom
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.margins: 10
        text: "Оформить заказ"
        onClicked: {
            window.pageStack.push(Qt.resolvedUrl("OrderPage.qml"));
        }
    }

    tools: ToolBarLayout {
        id: cartToolbar
        ToolButton {
            flat: true
            iconSource: "toolbar-back"
            onClicked: window.pageStack.depth <= 1 ? Qt.quit() : window.pageStack.pop()
        }
//        ToolButton {
//            flat: true
//            iconSource: "toolbar-content-ovi-music"
//            onClicked: {

//            }
//        }
    }
}
