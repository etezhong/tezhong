(function () {

    var regVerify = function (type, checkString) {

        //验证手机号码
        var _regPhoneNumber = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/

        //验证邮箱格式
        var _regMailAddress = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/

        //验证密码
        var _regPassword = /^[A-Za-z0-9]{6,}$/;

        //验证不可为空
        var _regNotNull = /\S/;

        //验证必须是数字
        var _regNumber = /^[0-9]*.*[0-9]*$/;

        //验证必须是非负整数
        var _regNotNegativeInteger = /^[0-9]*[0-9]*$/;

        var regString = "";
        var result = false;


        //枚举type类型
        if (type) {
            type = type.toString().toLowerCase();
        }
        switch (type) {
            case "mobilephone":
                regString = _regPhoneNumber;
                break;
            case "email":
                regString = _regMailAddress;
                break
            case "password":
                regString = _regPassword;
                break;
            case "notempty":
                regString = _regNotNull;
                break;
            case "number":
                regString = _regNumber;
                break;
            case "int":
                regString = _regNotNegativeInteger;
                break;
            default:
                return false;

        }

        //通过验证时
        if (regString.test(checkString)) {
            result = true;
        }
        return result;

    }

    var verifyForm = function ($form, errCallback) {
        var $arrInput = $form.find("input,textarea,select");
        for (var i = 0; i < $arrInput.length; i++) {
            var $input = $($arrInput[i]);
            var verifyTypes = $input.data("verify");

            if (!verifyTypes || "" == $.trim(verifyTypes) || $input.prop("disabled")) {
                continue;
            }

            var verifyFlag = verifyInput($input, errCallback)
            if (!verifyFlag) {
                return verifyFlag;
            }
        }
        return true;
    }

    var verifyInput = function ($input, errCallback) {
        var result = true;

        var verifyTypes = $input.data("verify");
        var errorMessage = $input.data("verify-errormessage");

        var arrTypes = verifyTypes.split(',');
        for (var t = 0; t < arrTypes.length ; t++) {
            var verifyFlag = regVerify(arrTypes[t], $input.val());
            if (false == verifyFlag) {
                if (errCallback && "function" == typeof (errCallback)) {
                    errCallback($input);
                } else {
                    alert(errorMessage);
                }
                result = verifyFlag;
            }
        }
        return result;
    }

    var jqGridAutoWidth = function () {
        var $gridWp = $(".ui-jqgrid");
        $gridWp.css("width", "100%");
        $(".ui-jqgrid-view", $gridWp).css("width", "100%");
        $(".ui-jqgrid-hdiv", $gridWp).css("width", "100%");
        $(".ui-jqgrid-htable", $gridWp).css("width", "100%");
        $(".ui-jqgrid-btable", $gridWp).css("width", "100%");
        $(".ui-jqgrid-pager", $gridWp).css("width", "100%");
        $(".ui-jqgrid-bdiv", $gridWp).css("width", "100%").css("padding-right", "20px");
        $(".ui-jqgrid-hbox", $gridWp).css("width", "100%");

    }

    //重置Pager按钮
    var updatePagerIcons = function (table) {
        var replacement =
        {
            'ui-icon-seek-first': 'ace-icon fa fa-angle-double-left bigger-140',
            'ui-icon-seek-prev': 'ace-icon fa fa-angle-left bigger-140',
            'ui-icon-seek-next': 'ace-icon fa fa-angle-right bigger-140',
            'ui-icon-seek-end': 'ace-icon fa fa-angle-double-right bigger-140'
        };
        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
            var icon = $(this);
            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

            if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
        })
    }

    var setInputAsDatePlug = function (input) {
        input.datetimepicker({
            minView: "month",
            format: 'yyyy-mm-dd',
            autoclose: true,
            todayBtn: true,
            language: "zh-CN"
        });
        input.prop("readonly", true);
    }

    var setInputAsDatetimePlug = function (input, format) {
        var formatOpt = {
            format: 'yyyy-mm-dd hh:ii:ss',
            todayBtn: true,
            language: "zh-CN"
        };
        if (format) {
            formatOpt.format = format;
        }
        input.datetimepicker(formatOpt);
    }

    var setGridHeight = function (gridID) {
        if (gridID) {
            gridID = gridID.replace("#", "");
        }
        var windowHeight = $(window).height();
        var $gview = $("#gview_" + gridID);
        if ($gview.length > 0) {
            var gbody = $gview.find(".ui-jqgrid-bdiv");
            var gbodyTop = gbody.length > 0 ? gbody.offset().top : 0;
            gbody.height(windowHeight - gbodyTop - 80);
        }
    }


    var certConnect = function (certId) {

        var certCtl = document.getElementById(certId)

        var result = certCtl.connect();

        return result

    }

    var certDisonnect = function (certId) {

        var certCtl = document.getElementById(certId)

        var result = certCtl.disconnect();

        return result

    }

    var certRead = function (certId) {

        //try
        //{
        //    var certCtl = document.getElementById(certId)
        //    var strReadResult = certCtl.ReadCard();
        //    var result = {};
        //    if (strReadResult == "0") {
        //        result.PartyName = certCtl.Name;
        //        result.Gender = certCtl.Sex;
        //        result.Nation = certCtl.Nation;
        //        result.BornDay = certCtl.Born;
        //        result.CertAddress = certCtl.Address;
        //        result.CertNumber = certCtl.CardNo;
        //        result.CertOrg = certCtl.IssuedAt;
        //        result.EffDate = certCtl.EffectedDate;
        //        result.ExpDate = certCtl.ExpiredDate;
        //        result.SamId = certCtl.SAMID;
        //        result.PictureFilePath = certCtl.Pic;
        //        result.PictureBase64 = certCtl.Picture;
        //    }
        //    return result;
        //}
        //catch(ex)
        //{
        //    alert("请使用IE浏览器,进行实名认证");
        //}

        try {
            var result = {};
            var certCtl = document.getElementById(certId);
            var connectResult = certCtl.connect();
            var objconnectResult = toJson(connectResult);
            if (objconnectResult.resultFlag == 0) {
                var strReadResult = certCtl.readCert();
                var objReadResult = toJson(strReadResult);
                var strSamID = certCtl.getSAMID();
                var objSamID = toJson(strSamID);

                if (objReadResult.resultFlag == 0) {
                    result.PartyName = objReadResult.resultContent.partyName;
                    result.Gender = objReadResult.resultContent.gender;
                    result.Nation = objReadResult.resultContent.nation;
                    result.BornDay = objReadResult.resultContent.bornDay.toString();
                    result.BornDay = result.BornDay.substring(0, 4) + "年" + result.BornDay.substring(4, 6) + "月" + result.BornDay.substring(6, 8) + "日";
                    result.CertAddress = objReadResult.resultContent.certAddress;
                    result.CertNumber = objReadResult.resultContent.certNumber;
                    result.CertOrg = objReadResult.resultContent.certOrg;
                    result.EffDate = objReadResult.resultContent.effDate.toString();
                    result.EffDate = result.EffDate.substring(0, 4) + "." + result.EffDate.substring(4, 6) + "." + result.EffDate.substring(6, 8);
                    result.ExpDate = objReadResult.resultContent.expDate.toString();
                    if (result.ExpDate.length == 8) {
                        result.ExpDate = result.ExpDate.substring(0, 4) + "." + result.ExpDate.substring(4, 6) + "." + result.ExpDate.substring(6, 8);
                    } else {
                        result.ExpDate = "长期";
                    }
                    result.SamId = objSamID.samid;
                    //result.PictureFilePath = objReadResult.resultContent.Pic;
                    result.PictureBase64 = objReadResult.resultContent.identityPic;
                }
            }
            certCtl.disconnect();
            return result;
        }
        catch (ex) {
            alert("请使用IE浏览器,进行实名认证");
        }
    }

    var openRead = function (callback) {
        $.ajax({
            url: "http://localhost:19196/OpenDevice",
            type: "get",
            async: true,
            dataType: "json",
            timeout: 5000, //超时时间设置，单位毫秒
            success: function (data, status, response) {
                if (data.resultFlag != 0) {
                    callback(500, data.errorMsg+",请检查设备连接");
                } else {
                    callback(200,null);
                }
            },
            complete: function (XMLHttpRequest, status) {
                if (status == "error") {
                    //alert("实名认证驱动3.0未安装或服务未启动");
                    callback(401, "实名认证驱动3.0未安装或服务未启动");
                }
            }
        });
    }



    var getSamId = function () {
        var samid = null;
        $.ajax({
            url: "http://localhost:19196/getsamid",
            type: "get",
            async: false,
            dataType: "json",
            timeout: 5000, //超时时间设置，单位毫秒
            success: function (data, status, response) {
                console.log(data);
                console.log(status);
                samid = data.samid;
            },
            error: function (data, status, response) {
            },
            complete: function (XMLHttpRequest, status) {
                console.log(XMLHttpRequest);
                console.log(status);
                if (status == 'timeout') {//超时,status还有success,error等值的情况
                    alert("超时");
                }
              
            }
        });
        return samid;
    }

    var getReadInfo = function (async, callback) {
        if (async) {
            async = true;
        }
        var result = {};
        $.ajax({
            url: "http://localhost:19196/readcard",
            type: "get",
            async: async,
            dataType: "json",
            timeout: 5000, //超时时间设置，单位毫秒
            success: function (data, status, response) {
                console.log(data);
                console.log(status);
                console.log("读取身份证信息1");
                result.PartyName = data.partyName;
                result.Gender = data.gender;
                result.Nation = data.nation;
                result.BornDay = data.bornDay.toString();
                result.BornDay = result.BornDay.substring(0, 4) + "年" + result.BornDay.substring(4, 6) + "月" + result.BornDay.substring(6, 8) + "日";
                result.CertAddress = data.certAddress;
                result.CertNumber = data.certNumber;
                result.CertOrg = data.certOrg;
                result.EffDate = data.effDate.toString();
                result.EffDate = result.EffDate.substring(0, 4) + "." + result.EffDate.substring(4, 6) + "." + result.EffDate.substring(6, 8);
                result.ExpDate = data.expDate.toString();
                if (result.ExpDate.length == 8) {
                    result.ExpDate = result.ExpDate.substring(0, 4) + "." + result.ExpDate.substring(4, 6) + "." + result.ExpDate.substring(6, 8);
                } else {
                    result.ExpDate = "长期";
                }
                result.SamId = getSamId();
                //result.PictureFilePath = objReadResult.resultContent.Pic;
                result.PictureBase64 = data.identityPic;
                if (async) {
                    var response = {
                        code: data.resultFlag,
                        msg: data.errorMsg,
                        data: result
                    };
                    callback(response);
                }
                
            }
        });
        return result;
    }



    function showErrMsg(errMsg) {
        $("#mdlMain_errMsg").find("[name='errMsgContent']").text(errMsg);
        $("#mdlMain_errMsg").modal("toggle");
    }

    function toJson(str)
    {
        return eval('('+str+')');  	
    }

    this.regVerify = regVerify;
    this.jqGridAutoWidth = jqGridAutoWidth;
    this.updatePagerIcons = updatePagerIcons;
    this.setInputAsDatePlug = setInputAsDatePlug;
    this.setInputAsDatetimePlug = setInputAsDatetimePlug;
    this.verifyForm = verifyForm;
    this.verifyInput = verifyInput;
    this.setGridHeight = setGridHeight;
    this.certConnect = certConnect;
    this.certDisonnect = certDisonnect;
    this.certRead = certRead;

    this.openRead = openRead;
    this.getReadInfo = getReadInfo;
    this.showErrMsg = showErrMsg;

}).call(this)