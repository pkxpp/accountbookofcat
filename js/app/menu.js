var aniShow = "slide-in-right";
			mui.plusReady(function () {
			})
		
			mui('.mui-table-view').on('tap', 'a', function() {
				var id = this.getAttribute("href");
				var type = this.getAttribute("open-type");
				var href = this.href;
				console.log(111)
				if(type=="common"){
					var webview_style = {
						popGesture: "close"
					};
					mui.openWindow({
						id: id,
						url: href,
						styles: webview_style,
						show: {
							aniShow: aniShow
						},
						waiting: {
							autoShow: false
						}
					});
				}
			});
			function closeMenu()
			{
				console.log('2222222222222222222');
			}
			
			function quitApp(){
				if(mui.os.android){
					plus.runtime.quit();
				}else{
					mui.alert("请点击home键退出")
				}
			}