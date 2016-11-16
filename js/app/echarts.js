mui.init({
				swipeBack:true //启用右滑关闭功能
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
			// 柱状图
//			var barChart = echarts.init(byId('barChart'));
//			barChart.setOption(getOption('bar'));
//			var lineChart = echarts.init(byId('lineChart'));
//			lineChart.setOption(getOption('line'));
			// 线图用数据库数据
			getData();
			
			// 饼图
			var pieChart = echarts.init(byId('pieChart'));
			pieChart.setOption(getOption('pie'));
			byId("echarts").addEventListener('tap',function(){
				var url = this.getAttribute('data-url');
				plus.runtime.openURL(url);
			},false);
			
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
                   	tx.executeSql('select * from testTable',[],
                   	function (tx, results) {
	                   	var len = results.rows.length;
						for (i = 0; i < len; i++){
							x_arr.push(results.rows.item(i).name);
							y_arr.push(results.rows.item(i).value);
//							console.log(results.rows.item(i).name + "---" + results.rows.item(i).value);
						}
						
						getChartOption(x_arr, y_arr);
               	  	},
               	  	function (tx, error){
               	  		console.log("getData error!");
		        	});
		      })
			}