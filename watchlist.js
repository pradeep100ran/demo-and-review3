setInterval(function(){ 
if(required_quantity==0){
 return;
}
var old_time=volume_updated_time;
var new_time=Math.floor(Date.now()/1000);
if(old_time!=0){
var t=new_time-old_time;
var limit=20;
var remaining=limit-t;
var msg='';
if(remaining>=limit-10){
msg ='PLEASE WAIT <br> WHILE WE ARE TRYING TO EXECUTE YOUR ORDER';
}
if(remaining<limit-10){
var executed_quantity=ids('executed_quantity').innerHTML;
if(executed_quantity<=0){
msg='NO QUANTITY IS EXECUTED <br> ORDER WILL BE CANCELLED AFTER '+remaining+' SEC';
}
if(executed_quantity>0){
msg='PARTIAL ORDER WITH  QUANTITY <br> WILL BE EXECUTED IF NO MORE QUANTITY EXECUTED IN '+remaining+' SEC';
}
}
printer('order_cancel_time_left', msg);

if(remaining<=0){
execute_partial_order();
cancel_order();
}

}
},1000);


function cancel_order(){
old_volume=0;
required_quantity=0;
executed_quantity=0;
should_count_volume=0;
hold_order=[];
volume_updated_time=0;
}



function execute_partial_order(){
var quantity=ids('executed_quantity').innerHTML;

place_order_after_quantity_fill(quantity);
}


function fn_wl1600_option_chains(instrument_token){
//option_chain_server(instrument_token);
}

function fn_wl1600_option_chain(instrument_token){
//data='<div class="wl2800"><div class="wl2800_l">123227339262627228272627</div><div class="wl2800_c">5775673637</div><div class="wl2800_r"><div class="wl2800_r0"><div class="wl2800_r1">r1</div><div class="wl2800_r2">r2</div><div class="wl2800_r3">r3</div></div><div class="wl2800_r0"><div class="wl2800_r1">r21</div><div class="wl2800_r2">r22</div><div class="wl2800_r3">r33</div></div><div class="wl2800_r0"><div class="wl2800_r1">r51</div><div class="wl2800_r2">r52</div><div class="wl2800_r3">r53</div></div></div></div>';
//printer('wl2800_option_chain',data);

shower('notification');
var notification_class='alert-info';
var notification_data='Coming Soon';
var alt='<div id="notification_outer_div" class="alert '+notification_class+'"><span onclick="close_notification()" class="divide_rrr">&#x2716;</span><div><strong id="order_status"></strong>'+notification_data+'</div></div>';
document.getElementById('notification').innerHTML=alt;

}





function option_chain_after_server_response(response){
var strike_price_list=[];
var response=JSON.parse(response);
for(var i = 0; i < response.length; i++){
var title=(response[i].title);
//alert(title);
var title_hash=(response[i].title_hash);
var token=(response[i].kite_title_hash);
var strike=(response[i].strike);
strike_price_list.push(parseInt(strike));
}
var unique= Array.from(new Set(strike_price_list));
unique.sort();
var unique=unique.sort(function(a, b){return a - b});
alert(unique);
var k=0;
var data='';
while(k<unique.length){
data=data+'<div class="wl2800"><div class="wl2800_l">12322</div><div class="wl2800_c">'+unique[k]+'</div><div class="wl2800_r"><div class="wl2800_r0"><div class="wl2800_r1">r1</div><div class="wl2800_r2">r2</div><div class="wl2800_r3">r3</div></div></div></div>';
k++;
}
printer('wl2800_option_chain',data);
}



function option_chain_server(instrument_token){
var response =0;
let xhr = new XMLHttpRequest();
xhr.open("GET", "/apis/option_chain.php? instrument_token="+instrument_token);
response=xhr.responseText;
xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
var response=(xhr.responseText);
option_chain_after_server_response(response);
   }};
xhr.send(1,1,1);
}






function watchlist_full_data_loader_server(){
var wait ='<div id="order_window"><div class="p902"><span id="loader" class="p901"></span></div>';
var aa=[];
var userid=get_local('userid');
var login_hash=get_local('login_hash');
aa.push({
'userid':userid,
'login_hash':login_hash});
var aaa=JSON.stringify(aa);
smart_server('get_watchlist',aaa,vsvs);
return wait;
}

function vsvs(response){
watchlist_server_raw_data=response;
watchlist_full_data_loader();
watchlist_delete_details_hide();
smart_websocket_subscribe('mini','subscribe',mini_websocket_token);  
}



function watchlist_full_data_loader(){
var search_box_watchlist='<input autocomplete="off" placeholder="Search" type="search" id="search_wl" class="watchlist_search_tab"/>';
var search_result_div='<div class="search_result" id="result"></div>';
var instrument_full_detail_div='<div id="title102xxx" class="title102xxx"><div class="title102xx" id="sfd"></div></div>';
document.getElementById('main').innerHTML=search_box_watchlist+search_result_div+instrument_full_detail_div+fn_wl1800_order_window_full(1122)+fn_wl2800_option_chain()+watchlist_raw();
hider('wl1800_order_window');
hider('result');
hider('title102xxx');
}


function watchlist_raw(){
let token_array = new Array();
var x='';
var response=watchlist_server_raw_data;
var response=JSON.parse(response);
var result="";
for(var i = 0; i < response.length; i++) {
var title=(response[i].title);
var title_hash=(response[i].title_hash);
var token=(response[i].kite_title_hash);
var strike=(response[i].strike);
var lot_size=(response[i].lot_size);
var instrument_type=(response[i].instrument_type);
var segment=(response[i].segment);
var exchange=(response[i]. exchange);
var expiry_timestamp=(response[i].expiry_timestamp);
var spot_token=(response[i].spot_token);
var wl_id=(response[i].watchlist_id);
var price_decimal=response[i].price_decimal;
if(exchange=='BCD'){
fourth_decimal_token.push(parseInt(token));
}
if(exchange=='CDS'){
seventh_decimal_token.push(parseInt(token));
}
var filter=active_watchlist.replace(/\D/g, "");
if(filter==wl_id){
token_array.push(parseInt(token));
var data='<div id="'+title_hash+'" onclick="expose(`'+title_hash+'`)" class="title2"><div class="inline-div"><span id="" class="strike_price_title divide_l5">'+title+'</span><span id="'+token+'ltp" class="divide_r5">LTP=₹<strong>0.00</strong></span></div><br><div class="inline-div"><div class="divide_l5"><div id="" class="inline-div1"><span id="'+title_hash+'segment" class="divide_segment divide_l1">'+segment+'</span><span id="'+title_hash+'delete" onclick="ktdt(`'+token+'`,`'+title_hash+'`)" class="hide_first divide_l1">Delete</span><span id="'+title_hash+'details" onclick="explore_stock(`'+title+'`,`'+title_hash+'`,`'+token+'`,`'+strike+'`,`'+lot_size+'`,`'+instrument_type+'`,`'+segment+'`,`'+exchange+'`,`'+expiry_timestamp+'`,`'+spot_token+'`,`'+price_decimal+'`)" class="hide_first divide_r1">Details</span></div></div><span id="'+token+'ltp_change" class="divide_r5">Change=₹<strong>0.00</strong></span></div></div>' ;
x=x+data;
}
}
mini_websocket_token=token_array;
data=x;

var data='<div id="watch" class="w100"><br>'+data+'<br></div>';
return data;
}



function pkk(arr,value){
value=(parseInt(value,10));
var k=0;
var ind=-1;
while(k<arr.length){
if(arr[k].id==value){
 ind=k;
}
k++;
}
if(ind!==-1){
arr.splice(ind,1);
}
return arr;
}


function ktdt(token,title_hash){

var k=(watchlist_server_raw_data);
var k=JSON.parse(k);
var f =k.filter(function(el) { return el.title_hash !=title_hash; }); 
watchlist_server_raw_data=JSON.stringify(f);
var token=parseInt(token);
s1200_server_watchlist_update(1,'remove',title_hash,token);
}



function close_div(id){
smart_websocket_subscribe('full','unsubscribe',parseInt(id));
printer('wl1800_order_window','');
hider('wl1800_order_window');
var new_id=id+'stock_detail_div';
hider(new_id);
var x=pkk(modi,id);
modi=x;
if (modi === undefined || modi.length == 0) {
var a=spotvix_websocket_token.filter( function( el ) {
  return !mini_websocket_token.includes(el);
});
smart_websocket_subscribe('mini','unsubscribe',a);
hider('title102xxx');
}
}


function close_order_div(id){
cancel_order();
printer('wl1800_order_window','');
hider('wl1800_order_window');
}


function fn_wl1800_order_window_full(token){
data='<div id="wl1800_order_window" class="wl1800"></div>';
return data;
}

function fn_wl2800_option_chain(){
data='<div id="wl2800_option_chain" class=""></div>';
return data;
}


function fn_wl1801_order_window(title,title_hash,token,lot_size,segment,exchange){
cancel_order();
//var volume=((ids('volume'+token).innerHTML).replace(/[^0-9]/g, ''));
old_volume=0;
var ass=document.getElementById(token+'ltpoo').innerHTML;
var asss=document.getElementById(token+'ltpooo').innerHTML;
var assss=document.getElementById(token+'ltpoooo').innerHTML;
var title_div_raw='<span>'+title+'</span><span onclick="close_order_div(`'+token+'`)" class = "close_button">&times;</span>';
var change_div_raw='<span class="lppx_exchange">'+exchange+'</span><span class="lppx_segment">'+segment+'</span>';
var title_div=dmk(2,'',token+'ltpt1',title_div_raw,'0.00','title','ltp');
var change_div=dmk(1,'',token+'changeltpt',change_div_raw,'0.00','','ltp_change');

var ttt1='<div id="order_fill"><div class="wl970"><div class="wl970l">Executed Quantity</div><div id="executed_quantity" class="wl970r">'+0+'</div></div><div class="wl970"><div class="wl970l">Required Quantity</div><div id="required_quantity" class="wl970r">'+required_quantity+'</div></div></div>';


var ttt2='<div class="wl900bs"><div onclick="execute_partial_order()" class="wl980l_button">EXECUTE PARTIAL ORDER</div><div  onclick="fn_wl1801_order_window(`'+title+'`,`'+title_hash+'`,`'+token+'`,`'+lot_size+'`,`'+segment+'`,`'+exchange+'`)"class="wl980r_button">CANCEL ORDER</div></div>';
var ttt3='<div class="wl970"><div id="order_cancel_time_left" class="wl970c">PLEASE WAIT...</div></div>';

var ttt='<div id="alt_order_window">'+ttt1+ttt2+ttt3+'</div>';
var v=title_div+change_div;
var a='<div id="main_order_window"><div class=""><div id="order_window"><div class="wl960"><div class="wl960l">PRICE</div><div class="wl960c">QUANTITY/LOT '+lot_size+'</div><div class="wl960r">VALUE</div></div><div class="wl960"><div class="wl960l"><input type="number" class="wl960li" id="'+token+'price" placeholder="PRICE" readonly></div><div class="wl960c"><input type="number" min="1" step="1" onkeyup="vip(`'+token+'`)" class="wl960ci" id="'+token+'quantity" placeholder="QUANTITY"></div><div class="wl960r"><input type="" class="wl960ri" id="'+token+'value" placeholder="VALUE" readonly></div></div><div class="wl900"><div class="wl900bs"><div class="wl900b"><div onclick="order_place(`'+title+'`,`'+title_hash+'`,`'+token+'`,`'+lot_size+'`,`'+segment+'`,`'+segment+'`,`'+'BUY'+'`)" class="wl900b_button">BUY</div></div><div class="wl900s"><div onclick="order_place(`'+title+'`,`'+title_hash+'`,`'+token+'`,`'+lot_size+'`,`'+segment+'`,`'+segment+'`,`'+'SELL'+'`)" class="wl900s_button">SELL</div></div></div></div></div></div></div>'+ttt;

var data='<div id="" class="wl1802">'+v+a+'</div>';

var data='<div id="" class="wl1801">'+data+'</div>';

shower('wl1800_order_window');
//hider('order_fill');
printer('wl1800_order_window',data);

hider('alt_order_window');
//hider('main_order_window');

document.getElementById(token+'price').value=ass;
printer(token+'ltpt1','₹'+ass);
document.getElementById(token+'changeltpt').innerHTML='<strong>₹<span id="'+token+'ltpooo">'+asss+'</span>(<span id="'+token+'ltpoooo">'+assss+'</span>%)</strong>';
}

function order_place(title,title_hash,token,lot_size,segment,exchange,type){
var error_msg='';
price=document.getElementById(token+'price').value;
if(price==0){
error_msg="<strong>PLEASE NOTE</strong><br>PRICE CAN'T BE ZERO";
}
quantity=document.getElementById(token+'quantity').value;
if(quantity==0){
error_msg="<strong>PLEASE NOTE</strong><br>QUANTITY CAN'T BE ZERO";
}
if(quantity%lot_size!=0){
error_msg="<strong>PLEASE NOTE</strong><br>QUANTITY SHOUD BE IN THE MULTIPLE OF "+lot_size;
}
if(error_msg!=''){
small_notification('danger',error_msg);
}
if(error_msg==''){
shower('alt_order_window');
hider('main_order_window');
quantity_fill(1,title,title_hash,token,lot_size,segment,exchange,price,quantity,type);
}
}




function quantity_fill(basket_id,title,title_hash,token,lot_size,segment,exchange,price,quantity,type){
should_count_volume=1;
required_quantity=quantity;
old_volume=0;
printer('required_quantity', quantity);
hold_order=[];
volume_updated_time=Math.floor(Date.now()/1000);
hold_order.push({
'basket_id':basket_id,
'title':title,
'title_hash':title_hash,
'token':token,
'lot_size':lot_size,
'segment':segment,
'exchange':exchange,
'price':price,
'quantity':quantity,
'type':type
});
}

function send_order(basket_id,title_hash,price,quantity,type){
shower('notification');
var notification_class='alert-info';
var notification_data='Your Order is Processed';
var alt='<div id="notification_outer_div" class="alert '+notification_class+'"><span onclick="close_notification()" class="divide_rrr">&#x2716;</span><div><strong id="order_status"></strong>'+notification_data+'</div></div>';
document.getElementById('notification').innerHTML=alt;

var userid=get_local('userid');
var login_hash=get_local('login_hash');
var timestamp = Math.floor(Date.now() / 1000);
var price_hash=md5(price+''+timestamp);
var aa=[];
aa.push({
'userid':userid,
'login_hash':login_hash,
'basket_id':basket_id,
'title_hash':title_hash,
'price':price,
'price_hash':price_hash,
'timestamp':timestamp,
'quantity':quantity,
'type':type
});
var aaa=JSON.stringify(aa);
smart_server('new_order',aaa,vsvs3,'');
}

function vsvs3(server,response){
show_notification(server);
}


function send_orderr(basket_id,title_hash,price,quantity,type){

//var wait ='<div class="notification"><div class="notification0"><span id="loader" class=" notification1"></span></div></div>';
var wait ='<div class="alert alert-info notification0"><div class="notification1"></div></div>';
document.getElementById('notification').innerHTML=wait;

shower('notification');

var response =0;
var userid=get_local('userid');
let xhr = new XMLHttpRequest();
xhr.open("GET", "/apis/new_order_process.php?userid="+userid+"&basket_id="+basket_id+"&title_hash="+title_hash+"&price="+price+"&quantity="+quantity+"&type="+type);
xhr.onreadystatechange = function () {
if (xhr.readyState === 4) {
var response=(xhr.responseText);
//alert(response);
show_notification(response);
}
};
xhr.send();
}
function close_notification(){
//document.getElementById('notification').innerHTML='huu';
hider('notification');
}


function greeks(instrument_token){
var data='<div class="mktdpt" id="greeks"><br><table class="title102t"><thead class="title102t"><tr class=""><th class="greek_table_head">Fair Price</th><th class="greek_table_head">Delta</th><th class="greek_table_head">Theta</th></tr></thead><tbody><tr><td id="greek_price'+instrument_token+'" class="greek_table_price">0.00</td><td id="greek_delta'+instrument_token+'" class="greek_table_price">0.00</td><td id="greek_theta'+instrument_token+'"class="greek_table_price">0.00</td></tr></tbody><thead class="title102t"><tr class=""><th class="greek_table_head">Gamma</th><th class="greek_table_head">Vega</th><th class="greek_table_head">Rho</th></tr></thead><tbody><tr><td id="greek_gamma'+instrument_token+'" class="greek_table_price">0.00</td><td id="greek_vega'+instrument_token+'" class="greek_table_price">0.00</td><td id="greek_rho'+instrument_token+'"class="greek_table_price">0.00</td></tr></tbody></table></div>';
return data;
}




function server22(data){
var result='';
var matched=new Array();
var matched_final=new Array();
var resp=watchlist_server_raw_data;
var resp=JSON.parse(resp);
var filterr=active_watchlist.replace(/\D/g, "");
//alert(filterr);
for(var k = 0; k < resp.length; k++) {
var titlee_hash=resp[k].title_hash;
var watchlistt_id=resp[k].watchlist_id;
if(watchlistt_id==filterr){
 matched.push(titlee_hash);
 }
}

//alert(matched);

var response=JSON.parse(data);
for(var i = 0; i < response.length; i++) {
 var title=(response[i].title);
 var title_hash=(response[i].title_hash);
 var segment=(response[i].segment);
var exchange=(response[i].exchange);

if(segment==exchange){
  segment='';
}

//alert(exchange);
var zzz=matched.includes(title_hash);
if(zzz==true){
matched_final.push(title_hash);
}

result+='<div class="search_result_list"><div class="s1200lr"><div class="s1200l"><span>'+title+'</span></div><div class="s1200r"><input type="checkbox" ng-model="aprv" onclick="add_to_watchlist(`'+title_hash+'`)" class="s1200r_tick" id="w1200'+title_hash+'checkbox"></div></div><div class="inline-div"><div class="s1200l"><span class="s1200_divide_exchange">'+exchange+'</span><span class="s1200_divide_segment">'+segment+'</span></div></div></div>';
}
document.getElementById("result").innerHTML=result;
var kk=0;
while(kk<matched_final.length){
var kr=matched_final[kk];
//alert(kr);
document.getElementById('w1200'+kr+'checkbox').checked=true;
kk++;
}
}

function add_to_watchlist(token){
//alert(token);
//document.getElementById('w1200'+token+'checkbox').checked = true;

var a=document.getElementById('w1200'+token+'checkbox').checked;
if(a==true){
s1200_server_watchlist_update(0,'add',token,0);
}
if(a==false){
s1200_server_watchlist_update(0,'remove',token,0);
}
}


function s1200_server_watchlist_update(after_response,action,title_hash,token){
var userid=get_local('userid');
var watchlist_id=active_watchlist.replace(/\D/g, "");
var login_hash=get_local('login_hash');
var aa=[];
aa.push({
'userid':userid,
'login_hash':login_hash,
'watchlist_id':watchlist_id,
'title_hash':title_hash,
'action':action});
var aaa=JSON.stringify(aa);
var bb=[];
bb.push({
'title_hash':title_hash,
'token':token,
'after_response':after_response});
var bbb=JSON.stringify(bb);
smart_server('update_watchlist',aaa,vsvs2,bbb);
}

function vsvs2(server,response){
var response=JSON.parse(response);
for(var i = 0; i < response.length; i++){
var after_response=response[i].after_response;
var token=response[i].token;
var title_hash=response[i].title_hash;
}
if(after_response==1){
if(token!=0){
var is_found=spotvix_websocket_token.includes(token);
mini_websocket_token=mini_websocket_token.filter(e => e !== token);
if(is_found==false){
smart_websocket_subscribe('mini','unsubscribe',token);
}
hider(title_hash);
}
}
}


function server2s(find){
var response =0;
let xhr = new XMLHttpRequest();
xhr.open("GET", "/apis/search_script.php?find="+find);
response=xhr.responseText;
xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
var response=(xhr.responseText);
server22(response);
   }};
xhr.send(1,1,1);
}



function market_depth2(token){
var x=1;
var data='';
while(x<=5){
var raw_data ='<tr><td id="'+token+'mdbq'+x+'" class="buy_table_price">0</td><td id="'+token+'mdbp'+x+'" class="buy_table_price">0.00</td><td id="'+token+'mdsp'+x+'"  class="sell_table_price">0.00</td><td id="'+token+'mdsq'+x+'"class="sell_table_price">0</td></tr>';
data=data+raw_data;
x++;
}
return data;
}

function market_depth(token){
var data='<div class="mktdpt" id="mktdpt"><br><table class="title102t"><thead class="title102t"><tr class=""><th class="buy_table_head">Bid Quantity</th><th class="buy_table_head">Bid Price</th><th class="sell_table_head">Ask Price</th><th class="sell_table_head">Ask Quantity</th></tr></thead><tbody>'+market_depth2(token)+'<tr><td id="'+token+'tbq" class="tbq_tsq">00</td><td colspan="2" class="tbq_tsq">TOTAL QUANTITY</td><td id="'+token+'tsq"class="tbq_tsq">00</td></tr></tbody></table></div>';
return data;
}








function market_depthhhh(token){
var data='<div class="mktdpt" id="'+token+'market_depth_table"><br><table class="title102t"><thead class="title102t"><tr class=""><th class="buy_table_head">Bid Quantity</th><th class="buy_table_head">Bid Price</th><th class="sell_table_head">Ask Price</th><th class="sell_table_head">Ask Quantity</th></tr></thead><tbody>'+market_depth2(token)+'<tr><td id="'+token+'tbq" class="tbq_tsq">00</td><td colspan="2" class="tbq_tsq">TOTAL QUANTITY</td><td id="'+token+'tsq"class="tbq_tsq">00</td></tr></tbody></table></div>';
return data;
}



function instrument_full_detail(){
var x=JSON.stringify(modi);
var response=JSON.parse(x);
var result="";
for(var i = 0; i < response.length; i++) {
var title=(response[i].title);
var title_hash=(response[i].title_hash);
var id=(response[i].id);
var strike=(response[i].strike);
var lot_size=(response[i].lot_size);
var instrument_type=(response[i].instrument_type);
var segment=(response[i].segment);
var exchange=(response[i].exchange);
var expiry_timestamp=(response[i].expiry_timestamp);
var spot_token=(response[i].spot_token);
var price_decimal=(response[i].price_decimal);
full_raw_token.push(parseInt(id));
if(spot_token!=0&&spot_token!=null){
spotvix_raw_token.push(parseInt(spot_token));
}
var rd= instrument_full_detail_raw(title,title_hash,id,strike,lot_size,instrument_type,segment,exchange,expiry_timestamp,spot_token,price_decimal);
if(segment=='INDICES'){
var rd= instrument_full_detail_raw_indices(title,id,segment,exchange);
}
result=rd+result;
}
document.getElementById('sfd').innerHTML=result;
}



function explore_stock(title,title_hash,id,strike,lot_size,instrument_type,segment,exchange,expiry_timestamp,spot_token,price_decimal){
full_raw_token=[];
spotvix_raw_token=[];
greeks_raw_token=[];
spotvix_raw_token.push(264969);
shower('title102xxx');
var found=0;
if(modi.some(person => person.id==id)){
found=1;
}


if(found==1){
//shower('notification');
var notification_class='alert-danger';
var notification_data='Already Available in your Watchlist.';
var alt='<div id="notification_outer_div" class="alert '+notification_class+'"><span onclick="close_notification()" class="divide_rrr">&#x2716;</span><div><strong id="order_status"></strong>'+notification_data+'</div></div>';
//document.getElementById('notification').innerHTML=alt;
}


if(found==0){
modi.push({
'title':title,
'title_hash':title_hash,
'id':id,
'strike':strike,
'lot_size':lot_size,
'instrument_type':instrument_type,
'segment':segment,
'exchange':exchange,
'expiry_timestamp':expiry_timestamp,
'spot_token':spot_token,
'price_decimal':price_decimal
});
}
instrument_full_detail();


var full_unique= Array.from(new Set(full_raw_token));


var full_unique_final=full_unique.filter( function( el ) {
  return !active_full_token.includes(el);
});


var spotvix_unique= Array.from(new Set(spotvix_raw_token));
full_websocket_token=full_unique;
spotvix_websocket_token=spotvix_unique;
smart_websocket_subscribe('full','subscribe',full_websocket_token);
smart_websocket_subscribe('mini','subscribe',spotvix_websocket_token);
greeks_websocket_token=greeks_raw_token;
const box = document.getElementById(id+"stock_detail_div");
}



function instrument_full_detail_raw(title,title_hash,token,strike,lot_size,instrument_type,segment,exchange,expiry_timestamp,spot_token,price_decimal){
if(price_decimal==4){
currency_token.push(parseInt(token));
}
if(price_decimal==7){
seventh_decimal_token.push(parseInt(token));
}
var greeks_raw,greeks_rawo,spot_raw,spot_rawo,vix_raw;
greeks_raw=greeks_rawo=spot_raw=spot_rawo=vix_name=vix_class='';
if(spot_token!=0){
  spot_raw='SPOT ';
}
if(exchange=='NFO'||exchange=='NSE'||exchange=='BSE'){
vix_name='VIX';
vix_class='vixltp';
}
if(exchange==segment){
    segment='';
}
if(expiry_timestamp!=0){
greeks_raw=greeks(token);
}
if(exchange!='NFO'){
greeks_raw='';
}
if(greeks_raw!=''){
greeks_raw_token.push(parseInt(token));
}
var title_div_raw='<span>'+title+'</span><span onclick="close_div(`'+token+'`)" class = "close_button">&times;</span>';
var change_div_raw='<span class="lppx_exchange">'+exchange+'</span><span class="lppx_segment">'+segment+'</span>';
var other_option='<div class="lppx_extra"><div onclick="fn_wl1801_order_window(`'+title+'`,`'+title_hash+'`,`'+token+'`,`'+lot_size+'`,`'+segment+'`,`'+exchange+'`)" class="lppx_trade">TRADE</div><div onclick="fn_wl1600_option_chain(`'+title_hash+'`)" class="lppx_trade1">OPTION CHAIN</div><div onclick="fn_wl1600_option_chain(`'+title_hash+'`)" class="lppx_trade2">CHART</div></div>';
var title_div=dmk(2,'',token+'ltp1',title_div_raw,'0.00','title','ltp');
var change_div=dmk(1,'',token+'change1',change_div_raw,'0.00','','ltp_change');
var oh_div=dmk(1,'open'+token,'high'+token,'OPEN','HIGH');
var cl_div=dmk(1,'close'+token,'low'+token,'CLOSE','LOW');
var av_div=dmk(1,'avg_price'+token,'volume'+token,'AVG. PRICE','VOLUME');
var lu_div=dmk(1,'lcl'+token,'ucl'+token,'LCL','UCL');
var eo_div=dmk(1,'exchange_timestamp'+token,'oi'+token,'UPDATED','OI');
var vs_div=dmk(1,'','',vix_name,spot_raw,vix_class,'ltp'+spot_token+'spot');
var internal=title_div+change_div+oh_div+cl_div+av_div+lu_div+eo_div+vs_div+other_option;
var internal1=
'<div class="hide_auto">'+
dmk(1,'instrument_type'+token,'expiry_timestamp'+token,instrument_type,expiry_timestamp)+
dmk(1,'strike'+token,'',strike,'')+
dmk(1,'ltp'+token+'vix','ltp'+token+'spot','','','vixltpo','ltp'+spot_token+'spoto')+
'</div>';
var data_raw2='<div class="dk2">'+market_depth(token)+greeks_raw+'</div>';
var data='<div class="title102" id="'+token+'stock_detail_div">'+internal+internal1+data_raw2+'</div>';
return data;
}




function instrument_full_detail_raw_indices(title,token,segment,exchange){
if(exchange==segment){
    segment='';
}
var title_div_raw='<span>'+title+'</span><span onclick="close_div(`'+token+'`)" class = "close_button">&times;</span>';
var change_div_raw='<span class="lppx_exchange">'+exchange+'</span><span class="lppx_segment">'+segment+'</span>';
var title_div=dmk(2,'',token+'ltp1',title_div_raw,'0.00','title','ltp');
var change_div=dmk(1,'',token+'change1',change_div_raw,'0.00','','ltp_change');
var oh_div=dmk(1,'open'+token,'high'+token,'OPEN','HIGH');
var cl_div=dmk(1,'close'+token,'low'+token,'CLOSE','LOW');
var eo_div=dmk('1','exchange_timestamp'+token);
var internal=title_div+change_div+oh_div+cl_div+eo_div;
var data='<div class="title102" id="'+token+'stock_detail_div">'+internal+'</div>';
return data;
}