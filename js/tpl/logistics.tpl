<!--物流查询-->
<header class="cateHeader">
      <div class="search_back"  onclick="window.history.back()"></div>
      <a class="goodCate">物流查询</a>
      <div class="go-quick-click" id="go-quick-click">
                 <a></a>
           </div>
     </header>
     <div class="quick-go-div" id="quick-go-div">
           <ul class="botList">
                 <li>
                       <a href="/">首页</a>
                 </li>
                 <li>
                       <a href="/cart">购物车</a>
                 </li>
                 <li>
                       <a href="/user">用户中心</a>
                 </li>
                  <li>
                         <a href="logisticsAll">物流查询</a>
                  </li>
           </ul>
     </div>

<!-- 物流状态-->
<ul class="logistics-top">
      <li>
            <div class="log_img">
                  <a>
                        <img src="../css/image/kuaidi.jpg">
                  </a>
            </div>
            <p>
                  物流状态&nbsp;&nbsp;&nbsp;&nbsp;<span class="tran-state">{{=it.status}}</span>
            </p>
            <p class="waybill-num">
                  运单编号：<span>{{=it.nu}}</span>
            </p>
            <p class="Info-source">
                  信息来源：<span>{{=it.com}}</span>
            </p>
      </li>
</ul>
<p class="bot-gray"></p>
<!--订单信息-->
<div class="log-ord-info">
      <p class="logis-order">订单信息</p>
      {{? it.orderInfo.goodsArr.length===1}}
      {{~it.orderInfo.goodsArr:item}}

      <div class="log_cont">
            <div class="log-cont-img">
                  <a href="/goods/{{=item.goods_id}}.html"><img src="{{=item.goods_img}}"></a>
            </div>
            <div class="log-cont-name">
                  <p>{{=item.goods_name}}</p>
            </div>
            <div class="log-cont-num">
                  <span class="log-cont-pri">{{=item.goods_price}}</span><br>
                  <span class="log-cont-count">{{=item.goods_number}}</span>
            </div>
      </div>
      {{~}}
      {{??}}
<div class="order_Info">
          {{~it.orderInfo.goodsArr:item}}

                <div class="log_cont">
                      <div class="log-cont-img">
                            <a href="/goods/{{=item.goods_id}}.html"><img src="{{=item.goods_img}}"></a>
                      </div>
                      <div class="log-cont-name">
                            <p>{{=item.goods_name}}</p>
                      </div>
                      <div class="log-cont-num">
                            <span class="log-cont-pri">{{=item.goods_price}}</span><br>
                            <span class="log-cont-count">{{=item.goods_number}}</span>
                      </div>
                </div>
                {{~}}
        </div>
        <div class="order-amount">
            <p>共<i>2</i>件商品&nbsp;合计：<em>42.00</em>(含运费<em>0.00)</em></p>
        </div>
 {{?}}
        <p class="bot-gray"></p>
</div>
<!--物流跟踪-->
<div class="logis-box-state">
      <p class="logis-follow">物流跟踪</p>
      <ul class="logis_ul">
      {{~it.context:item:index}}
            <li>
                  <div class="logis_box{{? index===0}} logis_first{{?}}">
                        <p class="logis-state{{? index===0}} col-green{{?}}">{{=item.context}}</p>
                        <p class="logis_box_date">{{=item.time}}</p>
                  </div>
            </li>
            {{~}}
      </ul>
</div>