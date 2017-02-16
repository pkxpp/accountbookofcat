// 初始化
mui.init();

mui.plusReady(function(){
	
});

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