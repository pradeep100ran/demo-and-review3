function small_notification(nclass,title){
shower('notification');
var notification_class='alert-'+nclass;
var alt='<div id="notification_outer_div" class="alert '+notification_class+'"><span onclick="close_notification()" class="divide_rrr">&#x2716;</span><div><strong id="order_status"></strong>'+title+'</div></div>';
document.getElementById('notification').innerHTML=alt;
setTimeout(function() {
    var notificationDiv = document.getElementById('notification');
    if (notificationDiv) {
      notificationDiv.innerHTML = '';
    }
  }, 2000);
}

function show_notification(response){
hider('notification');
shower('notification');
var json=JSON.parse(response);
var json=json.data;
json.forEach(function(item) {
var notification_title=item.order_status;
var received_data='<div class="divide_lllrrr"><span class="divide_lll_title">'+item.title+'</span></div><div class="divide_lllrrr"><span class="divide_lll">ORDER NO='+item.order_number+'</span><span class="divide_rrr">ORDER TYPE='+item.order_type+'</span></div>'+'<div class="divide_lllrrr"><span class="divide_lll">BUY QUANTITY='+item.buy_quantity+'</span><span class="divide_rrr">SELL QUANTITY='+item.sell_quantity+'</span></div>'+'<div class="divide_lllrrr"><span class="divide_lll">BUY VALUE='+item.buy_value+'</span><span class="divide_rrr">SELL VALUE='+item.sell_value+'</span></div>'+'<div class="divide_lllrrr"><span class="divide_lll_title">TIME='+item.time+'</span></div>';

notification_class='alert-into';
final_svg='';
if(notification_title=='SUCCESS'){
 notification_class='alert-success';
 final_svg=success_svg;
if(active_bottom_tab=='position'){
is_refresh_required=1;
}
}
if(notification_title=='FAILED'){
 notification_class='alert-danger';
final_svg=fail_svg;
}

var data2='<div id="notification_outer_div" class="alert '+notification_class+'"><span onclick="close_notification()" class="divide_rrr">&#x2716;</span><div><strong id="order_status">'+notification_title+'</strong>'+received_data+'</div></div>';
//var old_data=ids('notification').innerHTML;
document.getElementById('notification').innerHTML=final_svg+data2;
navigator.vibrate([100,50,100,50]);
audio.play();
});
}


function get_local(key){
return localStorage.getItem(key);
}
function put_local(key,value){
localStorage.setItem(key,value);
}
function printer(id,data){
var k=ids(id);
if(k!=null){
k.innerHTML=data;
}
}
function ids(id){
var x=document.getElementById(id);
return x;
}
function round(value,decimal){
if(decimal==''||decimal==undefined||decimal==null){
    decimal=2;
}
//value=value.toFixed(decimal);
value=Number(value).toFixed(decimal);
 return value;
}

function round2(value){
var new_value=(Math.round(value * 100) / 100).toFixed(2);
return new_value;
}


function deci(instrument_token){
var decimal=2;
if(fourth_decimal_token.includes(parseInt(instrument_token))){
decimal=4;
}
if(seventh_decimal_token.includes(parseInt(instrument_token))){
decimal=7;
}
return decimal;
}


function decii(response,decimal){
if(decimal==2){
response=((response)/100).toFixed(2);
}
if(decimal==4){
response=((response)/10000).toFixed(4);
}
if(decimal==7){
response=((response)/10000000).toFixed(4);
}
return response;
}
function deciii(response,decimal){
if(decimal==2){
response=(response).toFixed(2);
}
if(decimal>2){
response=(response).toFixed(4);
}
return response;
}


function indian(num) {
 input = num;
 var n1, n2;
 num = num + '' || '';
 n1 = num.split('.');
 n2 = n1[1] || null;
 n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
 num = n2 ? n1 + '.' + n2 : n1;
 return num;
}


function time_to_human(tod,scope) {
  //var month_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
 var month_arr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];
  const today =tod;
  var year = today.getFullYear();
  var month =month_arr[today.getMonth()];
  var day = today.getDate();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  var meridian = h >= 12 ? "PM" : "AM";
  h = h % 12;
  h = h ? h : 12;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
var time_date = h + ":" + m + ":" + s + " " + meridian +'  '+ day+'-'+month+'-'+year;
var time_only = h + ":" + m + ":" + s + " " + meridian;
var date_only =day+'-'+month+'-'+year;
//alert(date_only);
  if(scope=='time'){
  return time_only;
 }
 if(scope=='date'){
  return date_only;
 }
  if(scope==undefined){
  return time_date;
 }
}





function vip(id){
var ltp=document.getElementById(id+'price').value;
//alert(id);
var q=document.getElementById(id+'quantity').value;
if(q==null||q==""||q==undefined){
    q=0;
}

var decimal=deci(id);
var value=deciii(q*ltp,decimal);
//var value=round(q*ltp,decimal);
document.getElementById(id+'value').value=value;
}


function expose(id){
var w = document.getElementById(id+'segment');
if (w.style.visibility == 'hidden') {
   // w.style.visibility = 'visible';
}
else{
  //w.style.visibility = 'hidden'; 
}
    
    
var x = document.getElementById(id+'delete');
var y = document.getElementById(id+'details');
if (x.style.visibility == 'hidden') {
    x.style.visibility = 'visible';
    y.style.visibility = 'visible';
  } else {
    x.style.visibility = 'hidden';
    y.style.visibility = 'hidden';
  }
}

function dmk(class_type,left_id,right_id,left_value,right_value,left_class,right_class){
if(class_type==1){
x='inline_div';
y='divide_l ';
z='divide_r ';
}
if(class_type==2){
x='inline_div1';
y='divide_title ';
z='divide_ltp ';
}

if(left_id==null){
    left_id='';
}
if(right_id==null){
    right_id='';
}
if(left_value==null){
    left_value='';
}
if(right_value==null){
    right_value='';
}
if(left_class==null){
    left_class='';
}
if(right_class==null){
    right_class='';
}
var data='<div class="'+x+'"><div id="'+left_id+'" class="'+y+left_class+'">'+left_value+'</div><div id="'+right_id+'" class="'+z+right_class+'">'+right_value+'</div></div>';
return data;
}





function smart_server(url,aaa,callbck,extra_data){
let xhr = new XMLHttpRequest();
xhr.open("POST", "/apis/action.php?action="+url,true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(aaa);
var res= xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
var response=(xhr.responseText);
callbck(response,extra_data);
}
};
}


$(document).keyup(function(event) {
var rrr=document.getElementById('search_wl');
if(rrr!=null){
find = $('#search_wl').val();
if(find==''){
hider('result');
}
if(find.length<3){
hider('result');
}
if(find!=''){
if(find.length>=3){
shower('result');
server2s(find); 
}
}
}
}
);