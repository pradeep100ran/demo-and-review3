var position_server_raw_data='';
var close_total_pnl=0;


function position_loader(){
var wait ='<div id="order_window"><div class="p902"><span id="loader" class="p901"></span></div>';
if(active_position=='open'){
find_open_position_on_server();
}

if(active_position=='close'){
find_close_position_on_server();
}
return wait;
}

function find_close_position_on_server(){
var userid=get_local('userid');
var login_hash=get_local('login_hash');
var aa=[];
aa.push({
'userid':userid,
'login_hash':login_hash
});
var aaa=JSON.stringify(aa);
smart_server('closed_position',aaa,vsvs7,'');
}


function vsvs7(response){
var a=total_pnlc();
var x=show_close_position(response);
document.getElementById('main').innerHTML=a+x;
print_total_pnls(close_total_pnl);
}



function show_close_position(data){
var response=JSON.parse(data);
var result="";
var c_pnl_pnl=0;
//for(var i = 0; i < response.length; i++) {
for(var i =response.length-1; i>=0; i=i-1) {
var title=(response[i].title);
var exchange= (response[i]. exchange);
//var token=(response[i].kite_title_hash);
var token=0;
var buy_value=(response[i].buy_value);
var sell_value=(response[i].sell_value);
var buy_quantity=(response[i].buy_quantity);
var sell_quantity=(response[i].sell_quantity);
var buy_time=response[i].buy_time;
var sell_time=response[i].sell_time;
var flow=response[i].flow;
var final_flow='';
if(flow=='BS'){
var final_flow='BUY TO SELL';
}
if(flow=='SB'){
var final_flow='SELL TO BUY';
}
var buy_time=parseInt(buy_time)*1000-19800000;
var buy_time_only=time_to_human((new Date(buy_time)),'time');
var buy_date_only=time_to_human(new Date(buy_time),'date');

var sell_time=parseInt(sell_time)*1000-19800000;
var sell_time_only=time_to_human((new Date(sell_time)),'time');
var sell_date_only=time_to_human(new Date(sell_time),'date');

var buy_price=((buy_value)/(buy_quantity));
var sell_price=(sell_value)/(sell_quantity);
var decimal=2;
if(exchange=='BCD'||exchange=='CDS'){
  decimal=4;
}
buy_price=round(buy_price,decimal);
sell_price=round(sell_price,decimal);

var pl=sell_value-buy_value;

c_pnl_pnl=c_pnl_pnl+pl;
var plc=indian(round(pl,decimal));
var a=position_div_maker2c(title,token);
var b=position_div_maker(token,'Buy Price','price',indian(buy_price),'Sell Price','',indian(sell_price),'p710');
var c=position_div_maker(token,'Buy Value','price',indian(buy_value),'Sell Value','',indian(sell_value),'p710');
var e=position_div_maker(token,'Buy Time','time',buy_time_only,'Sell Time','',sell_time_only,'p710');
var f=position_div_maker(token,'Buy Date','time',buy_date_only,'Sell Date','',sell_date_only,'p710');
var g=position_div_maker(token,'Trade Flow:','',final_flow,'','','','p710');
if(pl==0){
 tks='p707';
}
if(pl>0){
 tks='p708';
}
if(pl<0){
 tks='p709';
}

var d=position_div_maker(token,'Quantity ','price',buy_quantity,'P/L ','',plc,tks);
var data='<div class="p502">'+a+b+c+d+e+f+'</div>';
result=result+data;
}


result='<div class="p501">'+result+'</div>';
close_total_pnl=c_pnl_pnl;
return result;
}
function total_pnlc(){
var data='<div class="p510c"><div class="p511"><div id="tpnl"><span class="p512b">₹0.00</span></div></div></div>';
return data;
}
function close_position_order_div(id){
cancel_order();
printer('wl1900_order_window','');
hider('wl1900_order_window');
}

function find_open_position_on_server(){
var userid=get_local('userid');
var login_hash=get_local('login_hash');
var aa=[];
aa.push({
'userid':userid,
'login_hash':login_hash
});
var aaa=JSON.stringify(aa);
smart_server('open_position',aaa,vsvs6,'');

}


function vsvs6(response){
watchlist_server_raw_data=response;
position_server_raw_data=response;
var pod=position_sfd('Nifty 50',100);
var position_full_detail_div='<div id="p1200" class="p1200"><div class="title102xx" id="sfd">'+pod+'</div></div>';
var x=position_index()+total_pnl()+position_full_detail_div+fn_wl1900_order_window_full(1122)+open_position();
document.getElementById('main').innerHTML=x;
hider('p1200');
smart_websocket_subscribe('mini','subscribe',mini_websocket_token);
}




function fn_wl1900_order_window_full(token){
data='<div id="wl1900_order_window" class="wl1900"></div>';
return data;
}


function fn_wl1901_order_window(title,title_hash,token,lot_size,segment,exchange){
cancel_order();
old_volume=0;
var ass=document.getElementById(token+'ltpoo').innerHTML;
var asss=document.getElementById(token+'ltpooo').innerHTML;
var assss=document.getElementById(token+'ltpoooo').innerHTML;
var title_div_raw='<span>'+title+'</span><span onclick="close_position_order_div(`'+token+'`)" class = "close_button">&times;</span>';
var change_div_raw='<span class="lppx_exchange">'+exchange+'</span><span class="lppx_segment">'+segment+'</span>';
var title_div=dmk(2,'',token+'ltpt1',title_div_raw,'0.00','title','ltp');
var change_div=dmk(1,'',token+'changeltpt',change_div_raw,'0.00','','ltp_change');

var ttt1='<div id="order_fill"><div class="wl970"><div class="wl970l">Executed Quantity</div><div id="executed_quantity" class="wl970r">'+0+'</div></div><div class="wl970"><div class="wl970l">Required Quantity</div><div id="required_quantity" class="wl970r">'+required_quantity+'</div></div></div>';


var ttt2='<div class="wl900bs"><div onclick="execute_partial_order()" class="wl980l_button">EXECUTE PARTIAL ORDER</div><div  onclick="fn_wl1901_order_window(`'+title+'`,`'+title_hash+'`,`'+token+'`,`'+lot_size+'`,`'+segment+'`,`'+exchange+'`)"class="wl980r_button">CANCEL ORDER</div></div>';
var ttt3='<div class="wl970"><div id="order_cancel_time_left" class="wl970c">PLEASE WAIT...</div></div>';

var ttt='<div id="alt_order_window">'+ttt1+ttt2+ttt3+'</div>';
var v=title_div+change_div;
var a='<div id="main_order_window"><div class=""><div id="order_window"><div class="wl960"><div class="wl960l">PRICE</div><div class="wl960c">QUANTITY/LOT '+lot_size+'</div><div class="wl960r">VALUE</div></div><div class="wl960"><div class="wl960l"><input type="number" class="wl960li" id="'+token+'price" placeholder="PRICE" readonly></div><div class="wl960c"><input type="number" min="1" step="1" onkeyup="vip(`'+token+'`)" class="wl960ci" id="'+token+'quantity" placeholder="QUANTITY"></div><div class="wl960r"><input type="" class="wl960ri" id="'+token+'value" placeholder="VALUE" readonly></div></div><div class="wl900"><div class="wl900bs"><div class="wl900b"><div onclick="order_place(`'+title+'`,`'+title_hash+'`,`'+token+'`,`'+lot_size+'`,`'+segment+'`,`'+segment+'`,`'+'BUY'+'`)" class="wl900b_button">BUY</div></div><div class="wl900s"><div onclick="order_place(`'+title+'`,`'+title_hash+'`,`'+token+'`,`'+lot_size+'`,`'+segment+'`,`'+segment+'`,`'+'SELL'+'`)" class="wl900s_button">SELL</div></div></div></div></div></div></div>'+ttt;

var data='<div id="" class="wl1802">'+v+a+'</div>';

var data='<div id="" class="wl1801">'+data+'</div>';

shower('wl1900_order_window');
printer('wl1900_order_window',data);

hider('alt_order_window');
document.getElementById(token+'price').value=ass;
printer(token+'ltpt1','₹'+ass);
document.getElementById(token+'changeltpt').innerHTML='<strong>₹<span id="'+token+'ltpooo">'+asss+'</span>(<span id="'+token+'ltpoooo">'+assss+'</span>%)</strong>';
}

function position_index(){
var data='<div class="p513"><div class="p514" id="position256265ltp">NIFTY</div><div class="p515" id="position264969ltp">VIX</div><div class="p516" id="position260105ltp">BANK NIFTY</div></div>';
return data;  
}


function total_pnl(){
var data='<div class="p510"><div class="p511"><div id="tpnl"><span class="total_pnl_bazing">Total P&L</span><br><span class="p701">₹0.00</span></div></div></div>';
return data;
}

function open_position(){
var data=open_position_raw();
return data;
}

function open_position_raw(){
let token_array = new Array();
token_array.push(256265);
token_array.push(260105);
token_array.push(264969);
var response=position_server_raw_data;
var top='<div class="p501">';
var bottom='</div>';
var response=JSON.parse(response);
var result="";
//for(var i = 0; i < response.length; i++) {
for(var i =response.length-1; i>=0; i=i-1) {
var title=(response[i].title);
var title_hash=(response[i].title_hash);
var token=(response[i].kite_title_hash);
var lot_size=(response[i].lot_size);
var segment=(response[i].segment);
var exchange=(response[i].exchange);
var price=(response[i].price);
//var price_decimal=response[i].price_decimal;
if(exchange=='BCD'){
fourth_decimal_token.push(parseInt(token));
}
if(exchange=='CDS'){
seventh_decimal_token.push(parseInt(token));
}
var decimal=deci(token);
//var price=deciii(price,decimal);
var quantity=(response[i].quantity);
var pl='0.00';
token_array.push(token);
var a=position_div_maker2(title,token);
var b=position_div_maker(token,'Price','price',price,'','ltp','0.00','0');
var c=position_div_maker(token,'Quantity','quantity',quantity,'','pl',pl,'pl_pl');
var data='<div onclick="position_extra_details(`'+title+'`,`'+title_hash+'`,`'+token+'`,`'+lot_size+'`,`'+segment+'`,`'+exchange+'`)" class="p502">'+a+b+c+'</div>';
result=result+data;
}
result=top+''+result+''+bottom;
mini_websocket_token=token_array;
return result;
}

function position_div_maker2(title,token){
var outer_div_class='divide1';
var inner_div_left_class='divide_left1';
var inner_div_right_class='divide_right1';
var inner_div_left_class1='p504';
var inner_div_right_class1='p506';
var a1='<span class="'+inner_div_left_class1+'">'+title+'</span>';
var b1='<span id="position'+token+'ltpchange" class="'+inner_div_right_class1+'">0.00(0.00%)</span>';
var a='<div class="'+inner_div_left_class+'">'+a1+'</div>';
var b='<div class="'+inner_div_right_class+'">'+b1+'</div>';
var c='<div class="'+outer_div_class+'">'+a+b+'</div>';
return c;
}

function position_div_maker2c(title,token){
var outer_div_class='divide1';
var inner_div_left_class='divide_left1';
var inner_div_right_class='divide_right1';
var inner_div_left_class1='p504';
var inner_div_right_class1='p506';
var a1='<span class="'+inner_div_left_class1+'">'+title+'</span>';
var b1='<span id="position'+token+'ltpchange" class="'+inner_div_right_class1+'"></span>';
var a='<div class="'+inner_div_left_class+'">'+a1+'</div>';
var b='<div class="'+inner_div_right_class+'">'+b1+'</div>';
var c='<div class="'+outer_div_class+'">'+a+b+'</div>';
return c;
}

function position_div_maker(token,name1,name1_id,value1,name2,name2_id,value2,value2_class){
var outer_div_class='divide1';
var inner_div_left_class='p508';
var inner_div_right_class='p509';

var inner_left_div='<div class="'+inner_div_left_class+'">'+name1+'<span id="position'+token+name1_id+'" class="p710">'+value1+'</span></div>';
var inner_right_div='<div class="'+inner_div_right_class+'">'+name2+'<span id="position'+token+name2_id+'" class="'+value2_class+'">'+value2+'</span></div>';
var outer_div='<div class="'+outer_div_class+'">'+inner_left_div+inner_right_div+'</div>';
return outer_div;
}

function position_extra_details(title,title_hash,token,lot_size,segment,exchange){
var data=position_sfd(title,title_hash,token,lot_size,segment,exchange);
var datax='<div class="title102xx" id="sfd">'+data+'</div>';
document.getElementById('p1200').innerHTML=datax;
full_websocket_token=parseInt(token);
smart_websocket_subscribe('full','subscribe',full_websocket_token);
shower('p1200');
}

function position_close_div(token){
full_websocket_token=[]
smart_websocket_subscribe('full','unsubscribe',parseInt(token));
hider('p1200');
if(is_refresh_required==1){
is_refresh_required=0;


bottom_tab_class_switch(active_bottom_tab,active_bottom_tab);
topper();
top_tab_auto_scroll();



}
}



function position_sfd(title,title_hash,token,lot_size,segment,exchange){
if(exchange==segment){
segment='';
}
var title_div_raw='<span>'+title+'</span><span onclick="close_div(`'+token+'`)" class = "close_button">&times;</span>';
var change_div_raw='<span class="lppx_exchange">'+exchange+'</span><span class="lppx_segment">'+segment+'</span>';
var other_option='<div class="lppx_extra"><div onclick="fn_wl1901_order_window(`'+title+'`,`'+title_hash+'`,`'+token+'`,`'+lot_size+'`,`'+segment+'`,`'+exchange+'`)" class="lppx_trade">TRADE</div><div onclick="fn_wl1600_option_chain('+token+')" class="lppx_trade1">OPTION CHAIN</div><div onclick="fn_wl1600_option_chain('+token+')" class="lppx_trade2">CHART</div></div>';

var title_div_raw='<span>'+title+'</span><span onclick="position_close_div(`'+token+'`)" class = "close_button">&times;</span>';

var title_div=dmk(2,'',token+'ltp1',title_div_raw,'0.00','title','ltp');
var change_div=dmk(1,'',token+'change1',change_div_raw,'0.00','','ltp_change');
var oh_div=dmk(1,'open'+token,'high'+token,'OPEN','HIGH');

var cl_div=dmk(1,'close'+token,'low'+token,'CLOSE','LOW');
var av_div=dmk(1,'avg_price'+token,'volume'+token,'AVG. PRICE','VOLUME');

var lu_div=dmk(1,'lcl'+token,'ucl'+token,'LCL','UCL');

var eo_div=dmk(1,'exchange_timestamp'+token,'oi'+token,'UPDATED','OI');

var internal=title_div+change_div+oh_div+cl_div+av_div+lu_div+eo_div+other_option;

var data_raw1=internal;
var data_raw2='<div class="dk2">'+market_depth(token)+'</div>';
var data='<div class="title102" id="'+token+'stock_detail_div">'+data_raw1+data_raw2+'</div>';
return data;
}