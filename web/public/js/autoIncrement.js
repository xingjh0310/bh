
$("#amount_input").bind("blur", function() {
    var amount = $("#amount_input").val();
    /*var memberAmount = $('#plueaccount').attr("_balance");//账户余额*/
    var amountJoin = $('#plueinput').attr("_amountJoin");//还需金额
    var smallAmount = $('#plueinput').attr("_minInvest"); //最小金额
    var bigAmount =  $('#plueinput').attr("_maxInvest");  //最大金额
    var amountJoin = $("#plueinput").attr("_amountJoin");
    if(amount==""){
        $("#errHtml").html("投标金额不能为空！")
        $("#errHtml").css("display","block")
        $("#amount_input").val(smallAmount);
        $("#amount_input").keyup();
    }else {
        /*$('.btn_tz').removeClass('disabled_btn');
        $('.btn_tz').attr("disabled", false);*/
        if((/^(\+|-)?\d+$/.test( amount )) && amount > 0){
            if(parseFloat(amount) < parseFloat(smallAmount)){
                $("#errHtml").css("display","block")
                $("#errHtml").html(smallAmount+"元起投，且以"+smallAmount+"整数倍递增!")
                $("#amount_input").val(smallAmount);
                $("#amount_input").keyup();
            }

            else if(parseFloat(bigAmount) < parseFloat(amount) && parseFloat(amountJoin) < parseFloat(amount) && parseFloat(amountJoin) > parseFloat(bigAmount)){
                $("#errHtml").css("display","block")
                $("#errHtml").html('最大投标金额为'+bigAmount+'元')
                $("#amount_input").val( parseInt(bigAmount));
                $("#amount_input").keyup();
            }
            else if(parseFloat(bigAmount) < parseFloat(amount) && parseFloat(amountJoin) < parseFloat(amount) && parseFloat(amountJoin) < parseFloat(bigAmount)){
                $("#errHtml").css("display","block")
                $("#errHtml").html('剩余投标金额为'+amountJoin+'元')
                $("#amount_input").val( parseInt(amountJoin));
                $("#amount_input").keyup();
            }
            else if(parseFloat(bigAmount) < parseFloat(amount) && parseFloat(amountJoin) > parseFloat(amount)){
                $("#errHtml").css("display","block")
                $("#errHtml").html('最大投标金额为'+bigAmount+'元')
                $("#amount_input").val( parseInt(bigAmount));
                $("#amount_input").keyup();
            }
            else if(parseFloat(bigAmount) >= parseFloat(amount) && parseFloat(amountJoin) < parseFloat(amount)){
                $("#errHtml").css("display","block")
                $("#errHtml").html('剩余投标金额为'+amountJoin+'元')
                $("#amount_input").val( parseInt(amountJoin));
                $("#amount_input").keyup();
            }
            else if(parseFloat(bigAmount) < parseFloat(amount) && parseFloat(amountJoin) == parseFloat(bigAmount)){
                $("#errHtml").css("display","block")
                $("#errHtml").html('剩余投标金额为'+amountJoin+'元')
                $("#amount_input").val( parseInt(amountJoin));
                $("#amount_input").keyup();
            }
            else if(amount%smallAmount!='0'){
                $("#errHtml").css("display","block")
                $("#errHtml").html(smallAmount+"元起投，且以"+smallAmount+"整数倍递增!")
                // 将投资金额设置为1000的整数倍
                $("#amount_input").val( parseInt(amount/smallAmount) * smallAmount);
                $("#amount_input").keyup();
            }
            else{
                $("#errHtml").css("display","none")
                $("#errHtml").html('')
                $("#amount_input").keyup();
            }
            $("#amount_input").keyup();
        }else{
            $("#errHtml").css("display","block")
            $("#errHtml").html(smallAmount+"元起投，且以"+smallAmount+"整数倍递增!");
            $("#amount_input").val(smallAmount);
            $("#amount_input").keyup();
        }
    }
   /* var rel = /^(?:0\.\d{1,2}|(?!0)\d+(?:\.\d{1,2})?)$/;
    if(rel.test(amount)==false){
        alert("请输入投标金额！");
        $("#amount_input").val(smallAmount);
    }*/
    console.log($("#amount_input").val())
    console.log(amount)
});


//金额加减
var oPlus=document.getElementById('plus');
var oJian=document.getElementById('jian');
var oText=document.getElementById('amount_input');


oJian.onclick=function(){
    var smallAmount = parseInt($('#plueinput').attr("_minInvest")); //最小金额
    var oFvalue=parseInt(oText.value);
    $("#errHtml").css("display","none")
    $("#errHtml").html('')
    if(oFvalue>smallAmount){
        // add by sunyang 20150424 嘉利宝5000起投
        /*if(oFvalue == 5000 && parseInt($("#smallAmount").val()) == 5000){
            this.style.backgroundPosition='0px -43px';
            return;
        }*/
        if(oFvalue%smallAmount=='0'){
            oFvalue-=smallAmount;
            oText.value = oFvalue;

            // 调用投标金额事件，判断抵用券是否可以使用
            $("#amount_input").change();


            // add by lizhi 20141030 如果值小于最大金额（加号按钮颜色改变为可用）
            oFvalue = parseInt(oText.value);
            if (oFvalue = parseInt($('#plueinput').attr("_maxInvest"))) {
                oJian.style.backgroundColor='#ff8200';
                oPlus.style.backgroundColor='#ff8200';
            }
        }else{
            $("#errHtml").html(smallAmount+"元起投，且以"+smallAmount+"整数倍递增!");
        }
    }else{
        this.style.backgroundColor='#999';
    }
    $("#amount_input").keyup();
    if(parseInt(oText.value) <= parseInt($('#plueinput').attr("_minInvest"))){
        oJian.style.backgroundColor='#999';
    }
};
/*
var smallAmount = parseInt($('#plueinput').attr("_minInvest")); //最小金额
var smallAmount = parseInt($("#plueinput").attr("_autoIncrement"));//递增金额
var oFvalue=parseInt(oText.value);
*/

/*oJian.onmouseover=function(){
    this.style.backgroundColor='#ff8200';
};*/
/*oJian.onmouseout=function(){
    var smallAmount = parseInt($('#plueinput').attr("_minInvest")); //最小金额
    var oFvalue=parseInt(oText.value);
    if(oFvalue<=smallAmount){
        this.style.backgroundColor='#999';
    }else{
        this.style.backgroundColor='#ff8200';
    }

};*/
oPlus.onclick=function(){
    var smallAmount = parseInt($('#plueinput').attr("_minInvest")); //最小金额
    var bigAmount = $('#plueinput').attr("_maxInvest");
    var amountJoin = $('#plueinput').attr("_amountJoin");
    var oFvalue=parseInt(oText.value);
    $("#errHtml").css("display","none")
    $("#errHtml").html('')
    if(oFvalue<bigAmount){
       if(oFvalue%smallAmount=='0'){
            oFvalue+=smallAmount;
            oText.value = oFvalue;
           oPlus.style.backgroundColor='#ff8200';
            $("#amount_input").change();
            if (oFvalue>=amountJoin){
                $("#amount_input").val( parseInt(amountJoin));
                oPlus.style.backgroundColor='#999';
            }
           /*if (oFvalue==bigAmount){
               oPlus.style.backgroundColor='#999';
               oJian.style.backgroundColor='#ff8200';
           }*/
           if(oFvalue > smallAmount){
               oJian.style.backgroundColor='#ff8200';
           }

       }else{
           $("#errHtml").html(smallAmount+"元起投，且以"+smallAmount+"整数倍递增!");
        }

    }else{
        this.style.backgroundColor='#999';
    }
    $("#amount_input").keyup();
    if(parseInt(oText.value) == parseInt($('#plueinput').attr("_maxInvest"))){
        oPlus.style.backgroundColor='#999';
    }

};

