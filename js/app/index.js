// 初始化
mui.init();

var main = null;
var showMenu = false;
var menu = null;
var selectType = "";

// 所有方法都放到这里
mui.plusReady(function(){
	// 初始化数据库
	initDatabase();
	
	// 侧滑菜单
	main = plus.webview.getWebviewById(plus.runtime.appid);
	var menuoptions = {
		url: 'views/menu.html',
		id: 'menu',
		styles : {
			left:0,
			width:'70%',
			zindex:-1
		}
	};
	menu = mui.preload(menuoptions);
//	$(document).off('tap', '.btnMenu').on('tap', '.btnAdd', opMenu);
//	document.on('tap', '.btnAdd', tstAddData);
//	mui('.mui-plus').on('tap', '.btnAdd', tstAddData);
	mui('.mui-bar').on('tap', '.btnMenu', opMenu);
	main.addEventListener('maskClick', opMenu);
	mui.menu = opMenu;
	
//	tstPicker();
	// 退出
//	mui.back = function(){
//		if($('.adda').is(':hidden')){
//			hideAdd();	
//		}else if(showMenu){
//			closeMenu();
//		}else{
//			qiao.h.exit();
//		}
//	};
	
});

// menu
function opMenu(){
	if(showMenu){
		closeMenu();
	}else{
		openMenu();
	}
	loadValue();
}

function openMenu(){
	menu.show('none', 0, function() {
		main.setStyle({
			mask: 'rgba(0,0,0,0.4)',
			left: '70%',
			transition: {
				duration: 150
			}
		});

		showMenu = true;
	});
}
function closeMenu(){
	main.setStyle({
		mask: 'none',
		left: '0',
		transition: {
			duration: 100
		}
	});
	
	showMenu = false;
	setTimeout(function() {
		menu.hide();
	}, 300);
}

// set color
//function setColor(color){
//	if(mui.os.ios && color) plus.navigator.setStatusBarBackground(color);
//}

mui('body').on('shown', '.mui-popover', function(e) {
//	console.log('shown', e.detail.id);//detail为当前popover元素
});
mui('body').on('hidden', '.mui-popover', function(e) {
//	console.log('hidden', e.detail.id);//detail为当前popover元素
});
	
function newaddEvent(){
	console.log("newaddEvent");
	if (selectType == "")
	{
		mui.toast("不允许为空");
		return false;
	}
	console.log(selectType);	
	
	// 存数据库
//	add(selectType, 10);
}

//////////////////////////////////////////////////////////////
// 数据库操作
function getDatabase() {
	//@参数1：数据库名称
	//@参数2：版本号
	//@参数3：对数据库的描述
	//@参数4：设置数据的大小
	//@参数5：回调函数
    return openDatabase("accountdb", "1.0", "localdb", 1024*1024);
}

function initDatabase(){
	console.log("init Database ... ");
    var db = getDatabase()
    db.transaction(function(tx){
    	var tableName = "account";
    	var cols = [];
    	cols["Genre"] = "INT";
    	cols["Detail"] = "INT";
    	cols["AccountGenre"] = "INT";
    	cols["AccountDetail"] = "INT";
    	cols["Value"] = "INT";
    	cols["Desc"] = "TEXT";
    	cols["Time"] = "INT";
    	var sqlCols = "";
    	var i = 1;
    	
    	for (key in cols){
    		var typeStr = cols[key];
    		sqlCols += key + " " + typeStr;
    		if (i < 7)
    			sqlCols += ", ";
    		++i;
    	}
    	
    	sqlCols += ");";
//  	sqlCols += " primary key(Genre, Detail, AccountGenre, AccountDetail))";

    	var sql = "CREATE TABLE IF NOT EXISTS " + tableName + " (" + sqlCols;
    	console.log(sql);
    	var result = tx.executeSql(sql);
    	console.log("result = " + result);
    	
//  	result = tx.executeSql("CREATE TABLE IF NOT EXISTS testTable (name TEXT, value INT, primary key (name))");
//  	console.log("result = " + result);
    });
}

function insert(genre, detail, accountGenre, accountDetail, value, desc){
    var db = getDatabase();
    var res = true;
    db.transaction(function(tx){
    	var time = new Date().getTime();
    	var data = [genre, detail, accountGenre, accountDetail, value, desc, time];
    	console.log(data);
//  	console.log(typeof time);
        tx.executeSql('INSERT INTO account VALUES (?,?,?,?,?,?,?);', data,
	        function(tx,results){
	        	console.log("insert Success!")
	        },function (tx, error){
	            res = false;
	            console.log("insert error!")
	        }
        );
    })

    return res;
}

function update(cname, cvalue){
    var db = getDatabase();
    var res = true;
    db.transaction(function(tx){
        tx.executeSql('UPDATE testTable SET value = ? WHERE name = ?;',[cvalue, cname],
	        function(tx,results){
				console.log("update successed.");
	        },function (tx, error){
	            res = false;
	        }
        );
    })

    return res;
}

function select(cname){
    var db = getDatabase();
	var value = 0;
    db.transaction(function(tx){
        tx.executeSql('SELECT value from testTable WHERE name = ?;',[cname],
	        function(tx,results){
	        	var len = results.rows.length;
	        	if (len > 0){
					value = results.rows.item(0).value;
//					console.log("len=" + len + ", value = " + value);
				}
	        },function (tx, error){
	        }
        );
    })
	console.log("value = " + value);
    return value;
}

function add(cname, cvalue){
    var db = getDatabase();
	var value = 0;
    db.transaction(function(tx){
        tx.executeSql('SELECT value from testTable WHERE name = ?;',[cname],
	        function(tx,results){
	        	var len = results.rows.length;
	        	console.log("len = " + len);
	        	if (len > 0){	// update database
	        		console.log("add --> update database");
					value = results.rows.item(0).value;
					console.log("len=" + len + "," + value);
					// 上面得到的value是string类型
					console.log(typeof(value));
					value = Number(value) + Number(cvalue);
					update(cname, value);
				}
	        	else{			// insert database
	        		console.log("add --> insert database.");
	        		insert(cname, Number(cvalue));
	        	}
	        },function (tx, error){
//				console.log("error ..................");
	        }
        );
    })
	console.log("value = " + value);
    return value;
}

function loadValue(){
	console.log("loadValue ... ");
    var db = getDatabase();
    db.transaction(function(tx){
    	tx.executeSql('SELECT * FROM account', [], 
    	function (tx, results) {
//  		var htmlList = new Array();
		    var len = results.rows.length;
		    console.log("len = " + len);
		    for (i = 0; i < len; i++){
				console.log(results.rows.item(i).AccountGenre + ", " + results.rows.item(i).AccountDetail + ", " + 
				results.rows.item(i).Value + ", " + results.rows.item(i).Desc);
		    }
		},
    	function (tx,error){
    	  	console.log("loadValue error.");
    	});
		
	})
}

function clearTable()
{
	var db = getDatabase();
    db.transaction(function(tx){
    	tx.executeSql('DELETE FROM account', [], 
    	function (tx, results) {
    		console.log("Delete Table Success!" + results.rows.length)
		    var len = results.rows.length;
		    for (i = 0; i < len; i++){
				console.log(results.rows.item(i).name + ", " + results.rows.item(i).value);
		    }
		},
    	function (tx,error){
    	  	console.log("loadValue error.");
    	});
		
	})
    
    deleteTable();
}

function deleteTable()
{
	var db = getDatabase();
    db.transaction(function(tx){
    	tx.executeSql('DROP TABLE account'
    	, [],
    	function (tx, results) {
			console.log("Drop Table Success!")
		},
    	function (tx,error){
			console.log("Drop Table Error!")
    	}
    	);
		
	})
}
/////////////////////////////////////////////////////////
// test
function tstPicker(){
	//普通示例
	var userPicker = new mui.PopPicker();
	userPicker.setData([
		{
		value: '直接访问',
		text: '直接访问'
		}, 
		{
			value: '邮件营销',
			text: '邮件营销'
		}, 
		{
			value: '联盟广告',
			text: '联盟广告'
		}, 
		{
			value: '视频广告',
			text: '视频广告'
		}, 
		{
			value: '搜索引擎',
			text: '搜索引擎'
		}, 
	]);

	var pick = document.getElementById('showPicker');
	pick.addEventListener('tap', function(event) {
		userPicker.show(function(items) {
//			userResult.innerText = JSON.stringify(items[0]);
			//返回 false 可以阻止选择框的关闭
//			console.log(JSON.stringify(items[0]));
//			console.log(items[0].value);
			selectType = items[0].text;
			
			// test
			select(selectType);
		});
	}, false);
}



function tstAddData()
{
	console.log("tstAddData .....................");
	
//	大类:
//	0: 一般
//	
//	细类:
//	0: 一般
//	
//	账户大类:
//	0: 现金
//		细类:
//		0: 现金
//	1: 金融账户
//		细类:
//		0: 银行卡
//		1: 存折
//		2: 信用卡
//		3: 公积金
//	2: 虚拟账户
//		细类: 
//		0: 支付宝
//		1: 余额宝
//		2: 微信钱包
//	3: 
//账户细类:
//0: 现金
//1: 银行卡
//2: 存折
//3: 信用卡
//4: 公积金
//5: 支付宝
//6: 余额宝
//7: 微信钱包

	
	var arrData = [
		// 现金
		{
			genre: 0,
			detail: 0,
			agenre: 0,
			adetail: 0,
			value: 270,
			desc: '现金'
		}, 
		// 交行
		{
			genre: 0,
			detail: 0,
			agenre: 1,
			adetail: 1,
			value: 5149.87,
			desc: '交行'
		}, 
		{
			genre: 0,
			detail: 0,
			agenre: 1,
			adetail: 1,
			value: 1008.57,
			desc: '建行'
		}, 
		{
			genre: 0,
			detail: 0,
			agenre: 1,
			adetail: 1,
			value: 273,
			desc: '工行'
		},
		{
			genre: 0,
			detail: 0,
			agenre: 1,
			adetail: 3,
			value: -2278.10,
			desc: '信用卡'
		}, 
		{
			genre: 0,
			detail: 0,
			agenre: 6,
			adetail: 1,
			value: 12297.36,
			desc: '余额宝'
		}, 
		{
			genre: 0,
			detail: 0,
			agenre: 2,
			adetail: 7,
			value: 469,
			desc: '微信钱包'
		}, 
		{
			genre: 0,
			detail: 0,
			agenre: 1,
			adetail: 4,
			value: 5328,
			desc: '公积金'
		}
	]
	for (var i = 0; i < arrData.length; i++)
	{
		var genre = arrData[i].genre;
		var detail = arrData[i].detail; 
		var accounttGenre = arrData[i].agenre;
		var accountDetail = arrData[i].adetail;
		var value = arrData[i].value;
		var desc = arrData[i].desc;
		insert(genre, detail, accounttGenre, accountDetail, value, desc);
	}
}

// 账户细类:
function getAccountDetailName(ID)
{
	var arrName = [
		"现金",			// 0: 现金,
		"银行卡",			// 1: 银行卡,
		"存折",			// 2: 存折,
		"信用卡",			// 3: 信用卡,
		"公积金",			// 4: 公积金,
		"支付宝",			// 5: 支付宝,
		"余额宝",			// 6: 余额宝,
		"微信钱包"			// 7: 微信钱包
	];
	return arrName[ID];
}
