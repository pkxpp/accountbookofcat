mui.init({
	swipeBack:true //启用右滑关闭功能
});


mui.plusReady(function(){
	// 饼图
	var pieChart = echarts.init(byId('pieChart'));
	getStatisticOfAccountDetail(pieChart);
	
	// 净资产线图
	var lineChart = echarts.init(byId('lineChart'));
	getStatisticOfNetAsset(lineChart);
});
var getOption = function(chartType) {
	var chartOption = chartType == 'pie' ? {
		calculable: false,
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: '65%',
			center: ['50%', '50%'],
			data: [{
				value: 335,
				name: '直接访问'
			}, {
				value: 310,
				name: '邮件营销'
			}, {
				value: 234,
				name: '联盟广告'
			}, {
				value: 135,
				name: '视频广告'
			}, {
				value: 1548,
				name: '搜索引擎'
			}]
		}]
	} : {
		legend: {
			data: ['蒸发量', '降水量']
		},
		grid: {
			x: 35,
			x2: 10,
			y: 30,
			y2: 25
		},
		toolbox: {
			show: false,
			feature: {
				mark: {
					show: true
				},
				dataView: {
					show: true,
					readOnly: false
				},
				magicType: {
					show: true,
					type: ['line', 'bar']
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		calculable: false,
		xAxis: [{
			type: 'category',
			data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
		}],
		yAxis: [{
			type: 'value',
			splitArea: {
				show: true
			}
		}],
		series: [{
			name: '蒸发量',
			type: chartType,
			data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
		}, {
			name: '降水量',
			type: chartType,
			data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
		}]
	};
	return chartOption;
};
var byId = function(id) {
	return document.getElementById(id);
};

function getChartOption(x_array, y_array){
	console.log("getChartOption .......................... ");
	console.log("length2: " + x_array.length + ", " + y_array.length);
	var option = {
		//legend: {
		//	data: ['打卡量']
		//},
		grid: {
			x: 35,
			x2: 10,
			y: 30,
			y2: 25
		},
		toolbox: {
			show: false,
			feature: {
				mark: {
					show: true
				},
				dataView: {
					show: true,
					readOnly: false
				},
				magicType: {
					show: true,
					type: ['line', 'bar']
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		calculable: false,
		xAxis: [{
			type: 'category',
			data: x_array
		}],
		yAxis: [{
			type: 'value',
			splitArea: {
				show: true
			},
			
		}],
		series: [{
			name: '打卡数',
			type: 'line',
			data: y_array
		}],
	};
	
	console.log("length3: " + x_array.length + ", " + y_array.length);
//				console.log("33333333333333333," + option.xAxis[0].data.length);
	var lineChart = echarts.init(byId('lineChart'));
	lineChart.setOption(option);
//				return option;
}

function getData(){
	var db = getDatabase();
	var x_arr = new Array();
	var y_arr = new Array();
	db.transaction(function(tx){
		// 这里按照金融账户子类统计select count(Value) from account group by AccountDetail;
       	tx.executeSql('select sum(Value) as total from account group by AccountDetail',[],
       	function (tx, results) {
           	var len = results.rows.length;
           	console.log("len: " + len);
			for (i = 0; i < len; i++){
//				x_arr.push(results.rows.item(i).name);
//				y_arr.push(results.rows.item(i).value);
//							console.log(results.rows.item(i).name + "---" + results.rows.item(i).value);
				console.log(results.rows.item(i).total)
			}
			
//			getChartOption(x_arr, y_arr);
   	  	},
   	  	function (tx, error){
   	  		console.log("getData error!");
    	});
  })
}

// 柱状图
//			var barChart = echarts.init(byId('barChart'));
//			barChart.setOption(getOption('bar'));
//			var lineChart = echarts.init(byId('lineChart'));
//			lineChart.setOption(getOption('line'));
// 线图用数据库数据
//getData();

// 
byId("echarts").addEventListener('tap',function(){
	var url = this.getAttribute('data-url');
	plus.runtime.openURL(url);
},false);


// 获取账户细类的统计数据
function getStatisticOfAccountDetail(pieChart){
	if(!pieChart)
		return;
	var db = getDatabase();
	var arr = new Array();
	db.transaction(function(tx){
		// 这里按照金融账户子类统计select count(Value) from account group by AccountDetail;
       	tx.executeSql('select AccountDetail, sum(Value) as total from account group by AccountDetail',[],
       	function (tx, results) {
           	var len = results.rows.length;
			for (i = 0; i < len; i++){
				var id = results.rows.item(i).AccountDetail;
				var name = getAccountDetailName(id);
				var value = results.rows.item(i).total;
				console.log("id: " + id + ", name: " + name + ", value: " + value);
				if (value <= 0)
					continue;
				arr.push({name: name, value: value});
			}
			var option = makePieOption(arr);
			pieChart.setOption(option);
   	  	},
   	  	function (tx, error){
   	  		console.log("getData error!");
    	});
  })
}


var makePieOption = function(data) {
	var chartOption = {
		calculable: false,
		series: [{
			name: '分类',
			type: 'pie',
			radius: '65%',
			center: ['50%', '50%'],
			data: data
		}]
	}
	return chartOption;
};


// 获取净资产统计数据
function getStatisticOfNetAsset(lineChart){
	if(!lineChart)
		return;
	var db = getDatabase();
	var arr = new Array();
	var curDate = new Date();
	var curYear = curDate.getFullYear();
   	// 当年的1月1日0点开始统计到次年1月1日0点
   	var endDate = new Date(curYear+1, 1, 1);
 	var endTime = endDate.getTime();
   	console.log(endTime);
	db.transaction(function(tx){
		// 获取某一年的
		var date = new Date();
		var arrAsset = new Array();			// 资产
		var arrNetAsset = new Array();		// 净资产
		var arrDebt = new Array();			// 负债
		// 12个月统计数据初始化
		for (var i = 0; i < 12; ++i) {
			arrAsset[i] = 0;
			arrNetAsset[i] = 0;
			arrDebt[i] = 0;
		}
       	tx.executeSql('select * from account where Time < ?',[endTime],
       	function (tx, results) {
           	var len = results.rows.length;
           	var sumAsset = 0;
           	var sumNetAsset = 0;
           	var sumDebt = 0;
			for (i = 0; i < len; i++){
				var time = results.rows.item(i).Time;
				var desc = results.rows.item(i).Desc;
				var value = results.rows.item(i).Value;
//				console.log(typeof time);
				var oldDate = new Date(time);
				console.log("desc: " + desc + ", time: " + oldDate.getTime() + ", value: " + value);
//				arr.push({name: name, value: value});
				var oldYear = oldDate.getFullYear();
				var oldMonth = oldDate.getMonth();
				var oldDate = oldDate.getDate();
				
				// 总统计的数值
				sumNetAsset += value;
				if (value < 0)
					sumDebt += value;
				
				// 12个月的统计分开统计；当前年之前的数据都统计在当年1月当中
				if (oldYear < curYear)
				{
					arrNetAsset[0] += value;
					if (value < 0)
						arrDebt[0] += value;
				}
				else if (oldYear == curYear && (1 <= oldMonth && oldMonth <= 12))
				{
					arrNetAsset[oldMonth-1] += value;
					if (value < 0)
						arrDebt[oldMonth-1] += value;
				}
			}
//			var option = makePieOption(arr);
//			pieChart.setOption(option);
			// 净资产 = 资产 + 负债
			for (var i = 0; i < 12; ++i) {
				console.log("month: " + (i + 1) + ", netasset: " + arrNetAsset[i] + ", debt: " + arrDebt[i]);
				var lastMonthNetAssetValue = 0;
				var lastMonthDebtValue = 0;
				if (i > 1){
					lastMonthNetAssetValue = arrNetAsset[i-1];
					lastMonthDebtValue = arrDebt[i-1];
				}	
				arrNetAsset[i] += lastMonthNetAssetValue;
				arrDebt[i] += lastMonthDebtValue;
				arrAsset[i] = arrNetAsset[i] - arrDebt[i];
			}
			var objAsset = {
				name: '资产',
				type: 'line',
				data: arrAsset
			}
			var objDebt = {
				name: '负债',
				type: 'line',
				data: arrDebt
			}
			var objNetAsset = {
				name: '净资产',
				type: 'line',
				data: arrNetAsset
			}
			
			var option = makeLineOption([objAsset, objDebt, objNetAsset]);
			lineChart.setOption(option);
   	  	},
   	  	function (tx, error){
   	  		console.log("getStatisticOfNetAsset form database error!");
    	});
  })
}

var makeLineOption = function(series) {
	if (!series)
		return;
//	if (arrData instanceof 'Array') 
//		return;

	var chartOption = {
		legend: {
			data: ['资产', '负债', '净资产']
		},
		grid: {
			x: 50,
			x2: 10,
			y: 30,
			y2: 25
		},
		toolbox: {
			show: false,
			feature: {
				mark: {
					show: true
				},
				dataView: {
					show: true,
					readOnly: false
				},
				magicType: {
					show: true,
					type: ['line', 'bar']
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		calculable: false,
		xAxis: [{
			type: 'category',
			data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
		}],
		yAxis: [{
			type: 'value',
			splitArea: {
				show: true
			}
		}],
		series: series

	};
	return chartOption;
};