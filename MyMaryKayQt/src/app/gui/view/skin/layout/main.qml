import QtQuick 1.0
import com.nokia.symbian 1.0

import "code.js" as Code
import "myDB.js" as Mdb
import "engine.js" as Engine

PageStackWindow {
    id: window
    showStatusBar: true
    showToolBar: true

    Component.onCompleted: {
        Mdb.openDB();
        pageStack.push(Qt.resolvedUrl("MainPage.qml"), {categoryId: 0, tools: toolBarLayout});
        //pageStack.push(Qt.resolvedUrl("ItemPage.qml"), {itemId: 0, tools: toolBarLayout});

    }

    function getCategoryItems(cid){
        pageStack.push(Qt.resolvedUrl("ItemsPage.qml"), {tools: toolBarLayout, categoryId: cid});
    }

    function getItem(iid){
        pageStack.push(Qt.resolvedUrl("ItemPage.qml"), {tools: toolBarLayout, itemId: iid});
    }


    ToolBarLayout {
        id: toolBarLayout
        ToolButton {
            flat: true
            iconSource: "toolbar-back"
            onClicked: window.pageStack.depth <= 1 ? Qt.quit() : window.pageStack.pop()
        }
        ToolButton {
            flat: true
            iconSource: "toolbar-home"//"toolbar-content-ovi-music"
            onClicked: {
                window.pageStack.push(Qt.resolvedUrl("CartPage.qml"));
            }
        }

    }



}
