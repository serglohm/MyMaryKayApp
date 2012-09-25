.pragma library

var _db;

function openDB(){
    console.log("openDB()");
    _db = openDatabaseSync("MyMaryKayDB", "1.0", "the Todo related Database",1000000);
    console.log("_db = " + _db);
    createTables();
}

function getAllTaskCount(){
    return getOneResultSQL("SELECT count(*) FROM tasks");
}


function taskExists(nid){
    return getOneResultParamsSQL("SELECT * FROM tasks WHERE nid=?", [nid]);
}


function getOneResultParamsSQL(sql, params){
    var result = 0;
    _db.readTransaction(
        function(tx){
            var rs = tx.executeSql(sql, params);
            if(rs.rows.length > 0) {
                result = rs.rows.item(0);
            }
        }
    );
    return result;
}

function getOneResultSQL(sql){
    var result = 0;
    _db.readTransaction(
        function(tx){
            var rs = tx.executeSql(sql);
            if(rs.rows.length > 0) {
                result = rs.rows.item(0);
            }
        }
    );
    return result;
}


/*

CREATE TABLE IF NOT EXISTS todo
                                (
                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     nid INTEGER, // id таска на сервере
                                     puid INTEGER,  // uid создателя задачи
                                     uid INTEGER, // uid исполнителя задачи
                                     message text, // название / текст задачи
                                     comment text, // описание задачи

                                     performed INTEGER, // выполнена
                                     perform_time NUMERIC,
                                     create_time NUMERIC,

                                     modify_time NUMERIC,
                                     n_modify_time NUMERIC,


                                     catid INTEGER, // id категории задачи

                                     start_time NUMERIC,
                                     end_time NUMERIC,
                                     no_time INTEGER, // 1 - бессрочная задача

                                     priority INTEGER, // приоритет задачи

                                     is_deleted INTEGER, // удалили задачу на девайсе но не удалили на
                                     delete_time NUMERIC,

                                     list_nid INTEGER, // nid родительского таска
                                     list_id INTEGER, // id родительского таска
                                     list_idx INTEGER, // порядковый номер в списке подзадач
                                     is_list INTEGER,  // это главный таск для списка задач

                                     on_home_screen INTEGER //  отображать в виджете

                                )"
*/

function addItemToCart(itemId, name) {
    _db.transaction(
        function(tx){
                    var query = tx.executeSql("SELECT cnt FROM cart_items where iid = ?", [itemId]);
                    if (query.rows.length > 0){
                        var cnt = query.rows.item(0).cnt;
                        console.log("cart: " + itemId + " count = " + cnt);
                        tx.executeSql("UPDATE cart_items SET cnt=? WHERE iid = ?", [++cnt, itemId]);
                    } else {
                        console.log("cart: " + itemId + " count = 0");
                        tx.executeSql("INSERT INTO cart_items (iid, cnt) VALUES (?, 1)", [itemId]);
                    }
                    var gquery = tx.executeSql("SELECT cname FROM goods where iid = ?", [itemId]);
                    if (gquery.rows.length == 0){
                        tx.executeSql("INSERT INTO goods (iid, cname) VALUES (?, ?)", [itemId, name]);
                    }

                }
            );
}

function getItemsFromCart(model) {
    _db.transaction(
        function(tx){
                    var query = tx.executeSql("SELECT i.iid as iid, i.cnt as cnt , g.cname as cname FROM cart_items i, goods g where g.iid=i.iid");
                    for ( var i = 0; i < query.rows.length; ++i){
                        model.append({
                                         cname: query.rows.item(i).cname,
                                         iid: query.rows.item(i).iid,
                                         cnt: query.rows.item(i).cnt
                         });
                    }
                }
                );

}

function getLastOrder(orderModel){
    orderModel.name = 'name';
    orderModel.surname = 'surname';
    orderModel.secondname = 'second_name';
    orderModel.email = 'email';
    orderModel.city = 'city';
    orderModel.address = 'address';
    return orderModel;
}

function createTables(){
    _db.transaction(
        function(tx){
            tx.executeSql("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, \
                                                                            order_number INTEGER, \
                                                                            order_time NUMERIC, amount NUMERIC, \
                                                                            name TEXT, surname TEXT, second_name TEXT,\
                                                                            phone TEXT, email TEXT, city TEXT, \
                                                                            postindex TEXT, address TEXT \
                                                                            )");
            tx.executeSql("CREATE TABLE IF NOT EXISTS order_items (id INTEGER PRIMARY KEY AUTOINCREMENT, \
                                                                                    iid INTEGER, \
                                                                                    oid INTEGER, \
                                                                                    cnt INTEGER)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS cart_items (id INTEGER PRIMARY KEY AUTOINCREMENT, \
                                                                                    iid INTEGER, \
                                                                                    cnt INTEGER)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS goods (iid INTEGER PRIMARY KEY, \
                                                                        cname TEXT)");
}
    );
}

function dropTable()
{
    _db.transaction(
            function(tx){
                tx.executeSql("DROP TABLE IF EXISTS tasks");
            }
    );
}

function readAllTasks(){
    var data = [];
    _db.readTransaction(
        function(tx){
            var rs = tx.executeSql("SELECT * FROM tasks ");
            for (var i = 0; i < rs.rows.length; i++) {
                data[i] = rs.rows.item(i);
            }
        }
    );
    return data;
}

function updateTask(taskItem){
    _db.transaction(
        function(tx){
            tx.executeSql("UPDATE tasks SET BOX = ? , done = ?, \
                          title = ?, note = ?, modified = ?  \
                          WHERE id = ?", [todoItem.box, todoItem.done, todoItem.title, todoItem.note, todoItem.modified, todoItem.id]);
        }
    );
}

function deleteTasks(id){
    _db.transaction(
        function(tx){
            tx.executeSql("DELETE FROM tasks WHERE id = ?", [id]);
        }
    );
}

function deleteAllTasks(){
    _db.transaction(
        function(tx){
            tx.executeSql("DELETE FROM tasks");
        }
    );
}

function insertTask(taskItem){
    _db.transaction(
        function(tx){
            tx.executeSql("insert into tasks ( nid, puid, uid, message, comment, performed, perform_time, create_time, modify_time, n_modify_time, catid, start_time, end_time, no_time, priority, is_deleted, delete_time, list_nid, list_id, list_idx, is_list, on_home_screen ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                          [taskItem.nid,
                           taskItem.puid, taskItem.uid, taskItem.message, taskItem.comment, taskItem.performed, taskItem.perform_time, taskItem.create_time, 0, taskItem.modify_time, taskItem.catid, taskItem.start_time, taskItem.end_time, taskItem.no_time, taskItem.priority, taskItem.is_deleted, taskItem.delete_time, taskItem.list_nid, taskItem.list_id, taskItem.list_idx, taskItem.is_list, taskItem.on_home_screen]);
        }
    );
}

function getItemCountInCart(itemId) {
    var result = 0;
    _db.transaction(
        function(tx){
            var query = tx.executeSql("SELECT cnt FROM cart_items where iid = ?", [itemId]);
            if (query.rows.length > 0){
                var cnt = query.rows.item(0).cnt;
                result = cnt;
            }
        }
    );
    return result;
}
