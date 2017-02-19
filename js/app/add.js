// 初始化
mui.init();

mui.plusReady(function(){
	
});

var ValueTypeName = ["支出", "收入"];
var nCurType = 0;

// 支出分类
var nPayGenre = 0;
var nPayDetail = 0;
//var itemOut = document.getElementById("itemOut");
var inputMoney = document.getElementById("inputMoney");
/////////////////////////////////////////////////////////
//支出
/////////////////////////////////////////////////////////
//支出分类级联
var payClassifyPicker = new mui.PopPicker({
	// 二级联动
	layer: 2
});

payClassifyPicker.setData(payClassifyData);
var showPayClassifyPickerButton = document.getElementById('showPayClassifyPicker');
showPayClassifyPickerButton.addEventListener('tap', function(event) {
	payClassifyPicker.show(function(items) {
		//返回 false 可以阻止选择框的关闭
		//return false;
	});
}, false);

//账户分类
var accountClassifyPicker = new mui.PopPicker({
	// 二级联动
	layer: 2
});

accountClassifyPicker.setData(accountClassifyData);
var showAccountClassifyPickerButton = document.getElementById('showAccountClassifyPicker');
showAccountClassifyPickerButton.addEventListener('tap', function(event) {
	accountClassifyPicker.show(function(items) {
		//返回 false 可以阻止选择框的关闭
		//return false;
	});
}, false);

var btnPickDate = document.getElementById("btnPickDate");
btnPickDate.addEventListener('tap', function() {
	var dDate = new Date();
	dDate.setFullYear(2014, 7, 16);
	var minDate = new Date();
	minDate.setFullYear(2010, 0, 1);
	var maxDate = new Date();
	maxDate.setFullYear(2016, 11, 31);
	plus.nativeUI.pickDate(function(e) {
		var d = e.date;
//		info.innerText = '您选择的日期是:' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
		btnPickDate.textContent = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
	}, function(e) {
//		info.innerText = "您没有选择日期";
	}, {
		title: "请选择日期",
		date: dDate,
		minDate: minDate,
		maxDate: maxDate
	});
})

/////////////////////////////////////////////////////////
// 收入
/////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////
// 保存
var btnSaveValue = document.getElementById('btnSaveValue');
btnSaveValue.addEventListener('tap', function(event) {
	console.log(ValueTypeName[nCurType] + ": ")
	var fMoney = 0.0;
	if(inputMoney.value)
		fMoney = parseFloat(inputMoney.value);
	console.log("金额：" + fMoney);
	console.log("分类：");
}, false);