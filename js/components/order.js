/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
define([
	  'jquery',
	  'infoChannel',
	  'dropload',
	  'swiper',
	  'cookie.',
	  'doT',
	  'utilTool',
	  'text!tpl/orderList.tpl',
	  'text!tpl/orderState.tpl',
	  'text!tpl/orderNull.tpl'

], function (jquery, InfoChannel, dropload,swiper, cookie, doT, utilTool, orderTpl, orderStateTpl, orderNullTpl) {
	  var listTemp = doT.template(orderTpl);//doT编译模版
	  var stateTemp = doT.template(orderStateTpl);//doT编译模版
	  var nullTemp = doT.template(orderNullTpl);//doT编译模版
	  var name = utilTool.GetUrlPara();
	  var uid=$.cookie("uid");
	  var param = {
			uid: uid
	  };
	  switch (name) {
			case "os":
				  param.action = "os";
				  break;
			case "wp":
				  param.action = "wp";
				  break;
			case "wc":
				  param.action = "wc";
				  break;
			case "wr":
					param.action = "wr";
					break;
			default:
				  param.action = "os";
	  }
	  var flag = {
			all: false,//所有订单已加载完
			waitPay: false,//待付款订单已加载完
			waitConfirm: false,//待收货订单已加载完
			waitRate: false////待评价订单已加载完
	  }
	  var url = configData.dataHost + '/my.php';//设置url
	  var num=Math.floor($(window).width()/78);//计算slide数量
	  var width=num*78;//计算slide总长度
	  var allList = $('[data-attach-point=allList]'),//获取DOM
			  all = null,
			  waitPay = null,
			  waitConfirm = null,
			  waitRate = null,
			  waitPayList = $('[data-attach-point=waitPayList]'),
			  waitConfirmList = $('[data-attach-point=waitConfirmList]'),
			  waitRateList = $('[data-attach-point=waitRateList]'),
			  orderState = $("[data-attach-point=order-state]");
	  InfoChannel.getDataByAjax(url, param, function (data) {
			if(data.seo) {
				  utilTool.renderKeyWords(data.seo);
			}
			orderState.html(stateTemp(data.osNum));
			all = $('[data-attach-point=all]');
			waitPay = $('[data-attach-point=waitPay]');
			waitConfirm = $('[data-attach-point=waitConfirm]');
			waitRate = $('[data-attach-point=waitRate]');
			if (param.action === "os") {
				  all.parent("li").addClass("active");
			} else if (param.action === "wp") {
				  waitPay.parent("li").addClass("active");
			} else if (param.action === "wc") {
				  waitConfirm.parent("li").addClass("active");
			} else if (param.action === "wr") {
				  waitRate.parent("li").addClass("active");
			}
	  });
	  var pageSizeAll = 1;
	  var pageSizeWp = 1;
	  var pageSizeWc = 1;
	  var pageSizeWr = 1;
	  var first = true;
	  var dropload = $("[data-attach-point=order-list]").dropload({
			scrollArea: window,
			domDown: {
				  domClass: 'dropload-down',
				  domRefresh: '<div class="dropload-refresh">加载中...</div>',
				  domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
				  domNoData  : '<div class="dropload-noData"></div>'
			},
			loadDownFn: function (me) {
				  $(".dropload-down").show();
				  if (param.action === "os") {
						var paramAll = {
							  action: "os",
							  p: pageSizeAll,
							  uid: uid
						};

						InfoChannel.getDataByAjax(url, paramAll, function (data) {
							  if (data.oslist.length === 0) {
									flag.all = true;
									dropload.lock();
									dropload.noData();
									if(pageSizeAll===1){
										allList.html(nullTemp);
									}
									else{
									allList.append('<div class="dropload-down" ><div class="dropload-noData"><div class="no-data1" data-attach-point="none" style=""> <div class="no-data-content"> <p> 没有啦 </p> </div> </div></div></div></div>');
									}
							  } else {
									allList.append(listTemp(data.oslist));
									pageSizeAll = pageSizeAll + 1;
									if (data.oslist.length < 10) {
										  flag.all = true;
										  dropload.lock();
										  dropload.noData();
										  allList.append('<div class="dropload-down" ><div class="dropload-noData"><div class="no-data1" data-attach-point="none" style=""> <div class="no-data-content"> <p> 没有啦 </p> </div> </div></div></div></div>');
									}

									var mySwiper = new Swiper('[data-attach-point=allList] .swiper-container2',{
										  slidesPerView : num,
										  width:width,
										  spaceBetween : 10
									})
							  }
							  me.resetload();// 每次数据加载完，必须重置
						});
				  }
				  else if (param.action === "wp") {
						var paramAll = {
							  action: "wp",
							  p: pageSizeWp,
							  uid: uid
						};

						InfoChannel.getDataByAjax(url, paramAll, function (data) {
							  if (data.oslist.length === 0) {
									flag.waitPay = true;
									dropload.lock();
									dropload.noData();
									if(pageSizeWp===1){
										  waitPayList.html(nullTemp)  ;
									}
									else {
										  waitPayList.append('<div class="dropload-down" ><div class="dropload-noData"><div class="no-data1" data-attach-point="none" style=""> <div class="no-data-content"> <p> 没有啦 </p> </div> </div></div></div></div>');
									}
							  } else {
									waitPayList.append(listTemp(data.oslist));
									pageSizeWp = pageSizeWp + 1;
									if (data.oslist.length < 10) {
										  flag.waitPay = true;
										  dropload.lock();
										  dropload.noData();
										  waitPayList.append('<div class="dropload-down" ><div class="dropload-noData"><div class="no-data1" data-attach-point="none" style=""> <div class="no-data-content"> <p> 没有啦 </p> </div> </div></div></div></div>');
									}
									var mySwiper2 = new Swiper('[data-attach-point=waitPayList] .swiper-container2',{
										  slidesPerView : 5,
										  width:390,
										  spaceBetween : 10
									})


							  }
							  me.resetload();	// 每次数据加载完，必须重置
						});
				  }
				  else if (param.action === "wc") {
						var paramAll = {
							  action: "wc",
							  p: pageSizeWc,
							  uid: uid
						};

						InfoChannel.getDataByAjax(url, paramAll, function (data) {
							  if (data.oslist.length === 0) {
									flag.waitConfirm = true;
									dropload.lock();
									dropload.noData();
									if(pageSizeWc===1){
										  waitConfirmList.html(nullTemp)  ;
									}
									else {
										  waitConfirmList.append('<div class="dropload-down" ><div class="dropload-noData"><div class="no-data1" data-attach-point="none" style=""> <div class="no-data-content"> <p> 没有啦 </p> </div> </div></div></div></div>');
									}
							  } else {
									waitConfirmList.append(listTemp(data.oslist));
									pageSizeWc = pageSizeWc + 1;
									if (data.oslist.length < 10) {
										  flag.waitConfirm = true;
										  dropload.lock();
										  dropload.noData();
										  waitConfirmList.append('<div class="dropload-down" ><div class="dropload-noData"><div class="no-data1" data-attach-point="none" style=""> <div class="no-data-content"> <p> 没有啦 </p> </div> </div></div></div></div>');
									}

									var mySwiper3 = new Swiper('[data-attach-point=waitConfirmList] .swiper-container2',{
										  slidesPerView : 5,
										  width:390,
										  spaceBetween : 10
									})

							  }
							  me.resetload();// 每次数据加载完，必须重置
						});
				  }
				  else if (param.action === "wr") {
						var paramAll = {
							  action: "wr",
							  p: pageSizeWr,
							  uid: uid
						};

						InfoChannel.getDataByAjax(url, paramAll, function (data) {
							  if (data.oslist.length === 0) {
									flag.waitRate = true;
									dropload.lock();
									dropload.noData();
									if(pageSizeWr===1){
										  waitRateList.html(nullTemp)  ;
									}
									else {
										  waitRateList.append('<div class="dropload-down" ><div class="dropload-noData"><div class="no-data1" data-attach-point="none" style=""> <div class="no-data-content"> <p> 没有啦 </p> </div> </div></div></div></div>');
									}
							  } else {
									waitRateList.append(listTemp(data.oslist));
									pageSizeWr = pageSizeWr + 1;
									if (data.oslist.length < 10) {
										  flag.waitRate = true;
										  dropload.lock();
										  dropload.noData();
										  waitRateList.append('<div class="dropload-down" ><div class="dropload-noData"><div class="no-data1" data-attach-point="none" style=""> <div class="no-data-content"> <p> 没有啦 </p> </div> </div></div></div></div>');
									}
									var mySwiper4 = new Swiper('[data-attach-point=waitRateList] .swiper-container2',{
										  slidesPerView : 5,
										  width:390,
										  spaceBetween : 10
									})
							  }
							  me.resetload();// 每次数据加载完，必须重置
						});
				  }
			}
	  });
	  window.allList = function () {
			var oLi = all.parents("li");
			oLi.siblings("li").removeClass("active");
			oLi.addClass('active');
			allList.siblings("div").hide();
			allList.show();
			param.action = "os";
			if (!flag.all) {
				  // 解锁
				  dropload.unlock();
				  dropload.noData(false);
			} else {
				  // 锁定
				  dropload.lock('down');
				  dropload.noData();
			}
			dropload.resetload();
	  }
	  //待付款
	  window.waitPayList = function () {
			var oLi = waitPay.parents("li");
			oLi.siblings("li").removeClass("active");
			oLi.addClass('active');
			waitPayList.siblings("div").hide();
			waitPayList.show();
			param.action = "wp";
			if (!flag.waitPay) {
				  // 解锁
				  dropload.unlock();
				  dropload.noData(false);
			} else {
				  // 锁定
				  dropload.lock('down');
				  dropload.noData();
			}
			dropload.resetload();
	  }

	  //待收货
	  window.waitConfirmList = function () {
			var oLi = waitConfirm.parents("li");
			oLi.siblings("li").removeClass("active");
			oLi.addClass('active');
			waitConfirmList.siblings("div").hide();
			waitConfirmList.show();
			param.action = "wc";
			if (!flag.waitConfirm) {
				  // 解锁
				  dropload.unlock();
				  dropload.noData(false);
			} else {
				  // 锁定
				  dropload.lock('down');
				  dropload.noData();
			}
			dropload.resetload();
	  }

	  //待评价
	  window.waitRateList = function () {
			var oLi = waitRate.parents("li");
			oLi.siblings("li").removeClass("active");
			oLi.addClass('active');
			waitRateList.siblings("div").hide();
			waitRateList.show();
			param.action = "wr";
			if (!flag.waitRate) {
				  // 解锁
				  dropload.unlock();
				  dropload.noData(false);
			} else {
				  // 锁定
				  dropload.lock('down');
				  dropload.noData();
			}
			dropload.resetload();
	  }

	  var  paramOpe={};
	  paramOpe.uid=uid;

	  //删除订单
	   window.deleteOrder=function(that,oid){
			paramOpe.oid=oid;
			paramOpe.action="del";
			 $("#tophis").html("您确定要删除此订单吗？");
			$("#top").show();
			$("#below").show();
			$("#ok").off("click").on('click',function(event){
				  InfoChannel.getDataByAjax(url, paramOpe, function (data) {
						if(data.flag){
							  orderState.html(stateTemp(data.osNum));
							  $(that).parents("[data-attach-point=orderListOne]").remove();
						}
						$("#top").hide();
						$("#below").hide();
				  });
			})
	  };

	  //取消订单
	  window.cancelOrder=function(that,oid){
			paramOpe.oid=oid;
			paramOpe.action="cancel_order";
			$("#tophis").html("您确定要取消此订单吗？");
			$("#top").show();
			$("#below").show();
			$("#ok").off("click").on('click',function(event){
				  InfoChannel.getDataByAjax(url, paramOpe, function (data) {
						if(data.flag){
                            window.location.href="/order/"+param.action;
						}
				  });
			})
	  };

	  //确认收货
	  window.affirmOrder=function(that,oid){
			paramOpe.oid=oid;
			paramOpe.action="affirm_received";
			$("#tophis").html("您确定要确认收货吗？");
			$("#top").show();
			$("#below").show();
			$("#ok").off("click").on('click',function(event){
				  InfoChannel.getDataByAjax(url, paramOpe, function (data) {
						if(data.flag){
							  window.location.href="/order/"+param.action;
						}
				  });
			})
	  };

	  //再次购买
	  window.goBuyAgain=function(oid){
			paramOpe.oid=oid;
			paramOpe.action="goCart";
				  InfoChannel.getDataByAjax(url, paramOpe, function (data) {
						if(data.flag){
							  window.location.href="/cart";
						}
				  });
	  };
	  //是否能评价
	  window.isEvaluate=function(oid){
			InfoChannel.getDataByAjax(url,{action:"ToComment",uid:uid,oid:oid},function(data){
						if(data.flag===1){
                             $("#common-div").show().fadeOut(2000);
						}else{
                             window.location.href="/evaluate/"+oid;
						}
			});
	  };
	  $("#cancel").on('click',function(){
			$("#top").hide();
			$("#below").hide();
	  });
	  //显示更多
	  $("#go-quick-click").click(function(event){
			$("#quick-go-div").slideToggle();
			event.stopPropagation();
	  });
	  $("body").click(function(){
			if($("#quick-go-div").css("display")=="block"){
				  $("#quick-go-div").slideUp();
			}
	  });

	  utilTool.goTop();//回到顶部
	  //!************************加载优化配置文件***************************************************
	  //require(['libConfig']);*/
})