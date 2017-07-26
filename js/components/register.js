/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
define([
    'jquery',
    'utilTool',
    'infoChannel'
], function (jquery, UtilTool, InfoChannel) {
    var url = configData.dataHost + '/user.php';//设置url
//返回
    $('[data-attach-point=gb]').on('click', function () {
        window.history.back();
    });
//手机号验证
    $('[data-attach-point=telephone]').on('focus', function () {
        $(this).next().hide();
        $('[data-attach-point=err]').text('');
    }).on('blur', function () {
        var self = this;
        var k = $(this).val();
        if (k !== "") {
            if (UtilTool.checkPhone(k)) {
                $(this).next().hide();
                var param = {
                    action: 'reg_checkNumber',
                    mobile: k
                };
                InfoChannel.getDataByAjax(url, param, function (data) {
                    if (!data.flag) {
                        $(self).next().show();
                        $('[data-attach-point=err]').text('此号码已注册');
                        $('[data-attach-point=get]').addClass('gray-but');
                        $('[data-attach-point=get]').attr("disabled", 'disabled');
                    } else {
                        $('[data-attach-point=get]').removeClass('gray-but');
                        $('[data-attach-point=get]').removeAttr("disabled");
                    }
                });
            } else {
                $(this).next().show();
                $('[data-attach-point=err]').text('号码不合法');
                $('[data-attach-point=get]').addClass('gray-but');
                $('[data-attach-point=get]').attr("disabled", 'disabled');
            }
        } else {
            $(this).next().show();
            $('[data-attach-point=err]').text('手机号码不能为空');
            $('[data-attach-point=get]').addClass('gray-but');
            $('[data-attach-point=get]').attr("disabled", 'disabled');
        }

    });
//获取验证码
    $('[data-attach-point=get]').on('click', function () {
        var self = this;
        var vl = $('[data-attach-point=telephone]').val();
        var param = {
            action: 'reg_code',
            mobile: vl
        };
        InfoChannel.getDataByAjax(url, param, function (data) {
            var ms = $('[data-attach-point=ms]');
            ms.text('');
            if (data.flag){//设置倒计时
                countDown(self);
            }
            ms.text(data.msg);
        });
    });

//倒计时
    function countDown(self){
        var clock = '';
        var nums = 60;
        $(self).attr("disabled", 'disabled');//将按钮置为不可点击
        $(self).text(nums + '秒后可重新获取');
        $(self).addClass('gray-but');
        clock = setInterval(doLoop, 1000); //一秒执行一次
        function doLoop() {
            nums--;
            if (nums > 0) {
                $(self).text(nums + '秒后可重新获取');
            } else {
                clearInterval(clock); //清除js定时器
                $(self).removeAttr("disabled");
                $(self).text('获取验证码');
                $(self).removeClass('gray-but');
                nums = 60; //重置时间
            }
        }
    };
//验证框获得焦点
    $('[data-attach-point=PIN]').on('focus', function () {
        $('[data-attach-point=ms]').text('');
    });

//下一步
    $('[data-attach-point=nt]').on('click', function () {
        var mobile = $('[data-attach-point=telephone]').val();
        var messagecode = $('[data-attach-point=PIN]').val();
        var param = {
            action: 'reg_checkMessage',
            mobile: mobile,
            messagecode: messagecode
        };
        InfoChannel.getDataByAjax(url, param, function (data) {
            if (data.flag) {
                $('[data-attach-point=one]').hide();
                $('[data-attach-point=two]').show();
                $("[data-attach-point=tel]").html(mobile.substring(0, 3) + "****" + mobile.substring(7, 11));//设置手机号
            } else {
                $('[data-attach-point=ms]').text('验证码错误');
            }
        });
    });

//设置密码
    var regu = /^.{6,20}$/;
    var re = new RegExp(regu);
    $('[data-attach-point=pw]').on('focus', function () {
        $('[data-attach-point=pwErr]').text('');
    }).on('blur', function () {
        var pw = $(this).val();
        if (!re.test(pw)) {
            $('[data-attach-point=pwErr]').text('请输入6-20位字符或数字组合');
        };
    });
//设置密码框的显示与隐藏
    $('[data-attach-point=on]').on('click', function () {//显示
        $(this).hide();
        $('[data-attach-point=off]').show();
        $('[data-attach-point=pw]').attr('type', 'password');
    });
    $('[data-attach-point=off]').on('click', function () {//隐藏
        $(this).hide();
        $('[data-attach-point=on]').show();
        $('[data-attach-point=pw]').attr('type', 'text');
    });
//提交
    $('[data-attach-point=sub]').on('click', function () {
        var ts = $('[data-attach-point=pwErr]').text();//提示
        var ps = $('[data-attach-point=pw]').val();//密码
        var mobile = $('[data-attach-point=telephone]').val();//手机号
        var param = {
            action: 'register',
            mobile: mobile,
            sid: $.cookie("sid"),
            pwd: ps
        };
        if(ts === '' && ps !== ""){
            InfoChannel.getDataByAjax(url, param, function (data) {
                if(data.flag = 'true'){
                    $.cookie("uid", data.userId, {path: '/'});
                    $.cookie("uname", data.userName, {path: '/'});
                    window.location.href = '/';//跳转到首页
                }
            });
        } else {
            return false;
        }
    });


//***************加载优化配置文件****************
//require(['libConfig']);
})