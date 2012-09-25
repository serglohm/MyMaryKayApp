// import QtQuick 1.0 // to target S60 5th Edition or Maemo 5
import QtQuick 1.0
import com.nokia.symbian 1.0

Item {
    id: rootItem
    height:  100
    width: parent.width

    Rectangle {
        anchors.top: parent.top
        anchors.horizontalCenter: parent.horizontalCenter
        height: parent.height - 10
        width: parent.width
        radius: 10
        Text {
            id: campaignDelegateName

            color: "#F2797F"
            wrapMode: Text.WordWrap

            anchors.topMargin: 10
            anchors.leftMargin: 15

            anchors.top: parent.top
            anchors.left: parent.left
            anchors.right: parent.right
            text: '<b>' + cname + '</b>'
        }

    }
}
