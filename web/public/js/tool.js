$(function(){
$("input.num1").bind("keyup blur", function(){
var value = $(this).val();
$(this).val(value.replace(/[^\.\d]/g,''));
});

$("input.num2").bind("keyup blur", function(){
var value = $(this).val();
$(this).val(value.replace(/[^\d]/g,''));
});

$(".compute").keyup(computeFun);	
$("#repayType").change(computeFun);	
$("input:radio").click(function(){
if ($("#radio2").attr("checked")) {
$("#repayType").attr("disabled", "disabled");
} else {
$("#repayType").removeAttr("disabled");
}

computeFun();
});

$("#checkbox1").click(function(){
$("#checkbox1").attr("checked", "checked");
$("#checkbox2").removeAttr("checked");
computeFun();
});

$("#checkbox2").click(function(){
$("#checkbox2").attr("checked", "checked");
$("#checkbox1").removeAttr("checked");
computeFun();
});
});

function computeFun(){
var totalYearRate, yearRate, monthRate, prize, fee, money, earnMoney;
    	var display;
    	var limitTime, season;
    	
totalYearRate = 0;
yearRate = parseFloat($("#yearRate").val());
if ($("#checkbox2").attr("checked")) yearRate = yearRate * 365;
prize = parseFloat($("#prize").val());
fee =  parseFloat($("#fee").val() / 100);
limitTime =  parseFloat($("#limitTime").val());
money = parseFloat($("#money").val());
yearRate = yearRate * (1 - fee);

if ($("#radio1").attr("checked") && yearRate > 0 && limitTime > 0) {
if ($("#repayType").val() == 1) {
totalYearRate = 24.00 * prize / (limitTime + 1) + yearRate;
earnMoney = (money * yearRate / 1200 * Math.pow((1 + yearRate / 1200), limitTime) /(Math.pow((1 + yearRate / 1200),limitTime)- 1) * limitTime - money + money * prize / 100);
} 

else if ($("#repayType").val() == 2) {
season = Math.ceil(limitTime / 3);
     				earnMoney = money * yearRate * (1 + season) / 800 + money * prize / 100;
     				totalYearRate = (yearRate * 3 + 24 * prize /(limitTime/3+1)) / 3;
} 

else if ($("#repayType").val() == 3) {
earnMoney = money * yearRate * limitTime / 1200 + money * prize / 100;
     				totalYearRate = (yearRate * limitTime + 12 * prize) / limitTime;
} 

else if ($("#repayType").val() == 4) {
earnMoney = money * yearRate * limitTime / 1200 + money * prize / 100;
     				totalYearRate = yearRate + prize * 12 / limitTime;
} 

$("#totalYearRate").html(Math.round(totalYearRate*100)/100);
$("#monthRate").html(Math.round(totalYearRate/12*100)/100);
$("#earnMoney").html(Math.round(earnMoney*100)/100);
$("#prizeMoney").html(Math.round(money*prize) / 100);
}

if ($("#radio2").attr("checked") && yearRate > 0 && limitTime > 0) {
totalYearRate = yearRate + prize / limitTime * 360;
monthRate = totalYearRate / 12;
earnMoney = money * yearRate * limitTime / 36000 + money * prize / 100;

$("#totalYearRate").html(Math.round(totalYearRate*100)/100);
$("#monthRate").html(Math.round(totalYearRate/12*100)/100);
$("#earnMoney").html(Math.round(earnMoney*100)/100);
$("#prizeMoney").html(Math.round(money*prize) / 100);
}
}