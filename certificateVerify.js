'use strict'
$(function () {
    var loadCetificate = function () {
        var certificateNo = getQueryString("certificateNo");
        certificateNo = encodeURIComponent(certificateNo); 
        ajaxRequest({
            url: host + "/GetCertificateForVerify",
            data: { "certificateNo": certificateNo },
            type: "get",
            async: true,
            cache: false,
            success: function (jdata) {
                if (jdata.code != 200) {
                    var $divCerificateInfo = $("#divCerificateInfo");
                    $divCerificateInfo.empty();
                    $divCerificateInfo.append($('<p style="color:red;"></p>').text(jdata.msg));
                    return false;
                }
                loadCertificateInfo(jdata.data);
            }
        });



        var loadCertificateInfo = function (data) {
            var $divCerificateInfo = $("#divCerificateInfo");
            $divCerificateInfo.empty();
            $divCerificateInfo.append("<h2>证书信息</h2>");
            $divCerificateInfo.append("<br/>");
            $divCerificateInfo.append($('<img  style="width: 100px; height: 120px;" />').attr("src", data.filePath));
            $divCerificateInfo.append("<br/>");
            $divCerificateInfo.append("<br/>");
            $divCerificateInfo.append($('<p></p>').text("姓名:" + data.employeeName));
            $divCerificateInfo.append($('<p></p>').text("性别:" + data.sex));
            $divCerificateInfo.append($('<p></p>').text("出生年月:" + data.birthDay));
            $divCerificateInfo.append($('<p></p>').text("身份证号:" + data.idNumber));
            $divCerificateInfo.append($('<p></p>').text("工种:" + data.typeOfWork));
            $divCerificateInfo.append($('<p></p>').text("操作类别:" + data.operationClass));
            //$divCerificateInfo.append($('<p></p>').text("企业名称:" + data.enterpriseName));
            $divCerificateInfo.append($('<p></p>').text("证书编号:" + data.certificateNo));
            $divCerificateInfo.append($('<p></p>').text("证书有效期:" + data.endCertificateDate));
            $divCerificateInfo.append($('<p></p>').text("批准日期:" + data.createDate));
            $divCerificateInfo.append($('<p></p>').text("证书状态:" + data.certificateStatus));
            if (data.certificateRemark) {
                $divCerificateInfo.append($('<p></p>').text(data.remark));
                $divCerificateInfo.append($('<p style="color:red;"></p>').text(data.certificateRemark));
            }
        }

        //var data = {
        //    employeeName: "王桂鑫",
        //    filePath:'http://www.eanguan.com:10051/CertificateVerify/GetPhoto?certificateId=972500',
        //    sex: "男",
        //    birthday: "2001-03-11",
        //    idNumber: "422822200103115010",
        //    job: "安全员",
        //    title4Technical: "/",
        //    enterpriseName: "通山县路路通养护工程有限责任公司",
        //    certificateNo: "鄂建安C3（2020）0000299",
        //    endCertificateDate: "2023-03-24",
        //    createDate: "2021-06-23",
        //    certificateStatus: "正常",
        //    remark: "11",
        //    certificateRemark: "22"
        //};
        //loadCertificateInfo(data);

    };


    //页面加载时运行
    $(document).ready(function () {
        loadCetificate();
    });

})
