{{? it.length>0}}
      {{~ it:item}}
          {{? item.goodsArr.length===1}}
          <div class="sea-log-box">
                  <div class="log-top">
                        <span class="lef-span">优德医药网</span>
                        <span class="rig-span">待收货</span>
                  </div>
                  {{~ item.goodsArr:item2}}
                  <div class="log-lookInfo">
                        <div class="log-img">
                              <a href="goods/{{=item2.goods_id}}.html"><img src="{{? item2.mgoods_img===''}}{{=item2.goods_img}}{{??}}{{=item2.mgoods_img}}{{?}}"></a>
                        </div>
                        <div class="log-name-info">
                              <p>{{=item2.goods_name}}</p>
                              <p class="pay_Info">实付款：<span>{{=item.order_amount}}</span>(共<i>{{=item.allNum}}</i>件)</p>
                        </div>
                  </div>
                 {{~}}
                  <div class="sea-btn-box">
                                         <a class="com-goods" onclick="affirmOrder(this,{{=item.order_id}})>确认收货</a>
                                         <a class="look_log"  href="/logistics/{{=item.order_id}}">查看物流</a>
                                   </div>
                  <div class="clear"></div>
            </div>
          {{??}}
            <div class="sea-log-box">
                  <div class="log-top">
                        <span class="lef-span">优德医药网</span>
                        <span class="rig-span">待收货</span>
                  </div>
                  <div class="more_shop clearfix">
                    {{? item.goodsArr.length<=3}}
                       {{~ item.goodsArr:item2}}
                           <a href="/goods/{{=item2.goods_id}}.html"><img src="{{? item2.mgoods_img===''}}{{=item2.goods_img}}{{??}}{{=item2.mgoods_img}}{{?}}"></a>
                       {{~}}
                       {{??}}
                         <div class="swiper-container swiper-container2">
                                 <div class="swiper-wrapper">
                                 {{~ item.goodsArr:item2}}
                                     <div class="swiper-slide"><img src="{{? item2.mgoods_img===''}}{{=item2.goods_img}}{{??}}{{=item2.mgoods_img}}{{?}}"></div>
                                 {{~}}
                                 </div>
                           </div>
                     {{?}}
                  </div>
                  <p class="money-pay">实付款：<span>{{=item.order_amount}}</span>(共<i>{{=item.allNum}}</i>件)</p>
                  <div class="sea-btn-box">
                        <a class="com-goods" onclick="affirmOrder(this,{{=item.order_id}})">确认收货</a>
                        <a class="look_log" href="/logistics/{{=item.order_id}}">查看物流</a>
                  </div>
                  <div class="clear"></div>
            </div>
            {{?}}
        {{~}}
        {{??}}
        <!--无物流信息-->
        <div class="no-visit">
            <div class="empty_visit taCenter">
                <div class="img_visit">
                    <img src="/image/none.png">
                </div>
                <p>您的订单中没有物流信息</p>
                <div class="go_home"><a href="/" class="bule_btn">去逛逛</a></div>
            </div>
        </div>
        {{?}}