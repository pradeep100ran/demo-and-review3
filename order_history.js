function order_history_root(){
var wait ='<div id="order_window"><div class="p902"><span id="loader" class="p901"></span></div>';
document.getElementById('main').innerHTML=wait;
find_order_history_on_server();
}



function find_order_history_on_server(){
var userid=get_local('userid');
var login_hash=get_local('login_hash');
var aa=[];
aa.push({
'userid':userid,
'login_hash':login_hash
});
var aaa=JSON.stringify(aa);
smart_server('order_history',aaa,vsvs8,'');
}

function vsvs8(data){
var result="";
var response=JSON.parse(data);
//for(var i = 0; i < response.length; i++) {
    
for(var i =response.length-1; i>=0; i=i-1) {
var title=(response[i].title);
var exchange=(response[i]. exchange);
var order_type=(response[i].order_type);
var order_number=(response[i].order_number);
var time=(response[i].time);
var time=(parseInt(time)*1000)-19800000;
var time_only=time_to_human((new Date(time)),'time');
var date_only=time_to_human(new Date(time),'date');
var buy_value=(response[i].buy_value);
var sell_value=(response[i].sell_value);
var buy_quantity=(response[i].buy_quantity);
var sell_quantity=(response[i].sell_quantity);
var buy_price=((buy_value)/(buy_quantity));

if(buy_value==0){
  buy_price=0;
}
var sell_price=((sell_value)/(sell_quantity));

if(sell_value==0){
  sell_price=0;
}

var decimal=2;
if(exchange=='BCD'||exchange=='CDS'){
decimal=4;
}
buy_price=round(buy_price,decimal);
sell_price=round(sell_price,decimal);
var a=order_history_div_maker2c(title,'0');
var b=position_div_maker('0','Buy Price','price',indian(buy_price),'Sell Price','',indian(sell_price),'p710');
var c=position_div_maker('0','Buy Quantity','price',buy_quantity,'Sell Quantity','',sell_quantity,'p710');
var d=position_div_maker('0','Buy Value','price',indian(buy_value),'Sell Value','', indian(sell_value),'p710');
var e=position_div_maker('0','Order Type','price',order_type,'Order No','',order_number,'p710');
var f=position_div_maker(0,'Trade Time','time',time_only,'Trade Date','',date_only,'p710');
var data='<div class="p502">'+a+b+c+d+e+f+'</div>';
result=result+data;
}
//return result;

result='<div class="p501">'+result+'</div>';
document.getElementById('main').innerHTML=result;


}




function order_history_div_maker2c(title,token){
var outer_div_class='p507';
var inner_div_left_class='p503';
var inner_div_right_class='p505';
var inner_div_left_class1='p504';
var inner_div_right_class1='p506';
var a1='<span class="'+inner_div_left_class1+'">'+title+'</span>';
var b1='<span id="position'+token+'ltpchange" class="'+inner_div_right_class1+'"></span>';
var a='<div class="'+inner_div_left_class+'">'+a1+'</div>';
var b='<div class="'+inner_div_right_class+'">'+b1+'</div>';
var c='<div class="'+outer_div_class+'">'+a+b+'</div>';
return c;
}