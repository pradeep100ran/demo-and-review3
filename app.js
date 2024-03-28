function watchlist_delete_details_hide(){
const boxes = document.querySelectorAll('.hide_first');
boxes.forEach(box => {
//box.style.visibility = 'hidden';
box.style.visibility = 'hidden';
});
}


function bottom(){
websocket_root();
var data='<div id="watchlist" class="bottom100 bottom201">Watchlist</div><div id="orders" class="bottom100 bottom201">Orders</div><div id="position" class="bottom100 bottom201">Position</div><div id="profile" class="bottom100 bottom201">Profile</div>';
document.getElementById('bottom').innerHTML=data;
bottom_tab_class_switch(active_bottom_tab,active_bottom_tab);

}
function bottom_tab_class_switch(old_tab,new_tab){
class_switcher(old_tab,'bottom200','bottom201');
class_switcher(new_tab,'bottom201','bottom200');
active_bottom_tab=new_tab;
localStorage.setItem("active_bottom_tab",new_tab);
}
function parent(x){
var y=document.getElementById(x);
if(y!=null){
  y=y.parentElement.id;
}
if(y==null){
    y='';
}
return y;
}
function class_switcher(element,old_class,new_class){
document.getElementById(element).classList.remove(old_class);
document.getElementById(element).classList.add(new_class);
}


function topper(tab){
if(active_mini_token.length>=1){
smart_websocket_subscribe('mini','unsubscribe',active_mini_token);
}
if(active_full_token.length>=1){
smart_websocket_subscribe('full','unsubscribe',active_full_token);
}
active_mini_token=[];
mini_websocket_token=[];
spotvix_websocket_token=[];
full_websocket_token=[];



//alert(full_subscribe_token_list);


if(active_bottom_tab=='watchlist'){
if(tab==undefined){
    tab=active_watchlist;
}
document.getElementById('top').innerHTML=watchlist;
top_tab_class_switch(active_watchlist,tab);
active_watchlist=tab;
var x=watchlist_full_data_loader_server();
document.getElementById('main').innerHTML=x;
}

if(active_bottom_tab=='orders'){
document.getElementById('top').innerHTML=orders;
top_tab_class_switch('order_history','order_history');
order_history_root();
}


if(active_bottom_tab=='position'){
if(tab==undefined){
    tab=active_position;
}
document.getElementById('top').innerHTML=position;
top_tab_class_switch(active_position,tab);
active_position=tab;


x=position_loader();
//var x=position_index()+total_pnl()+''+open_position();
document.getElementById('main').innerHTML=x;
//subscriber();
}


if(active_bottom_tab=='profile'){
profilee();
//var xx=profile_section_handler();
//document.getElementById('top').innerHTML=profile;
//top_tab_class_switch(active_profile,tab);
//document.getElementById('main').innerHTML=xx;
}


}
function top_tab_class_switch(old_tab,new_tab){
class_switcher(old_tab,'top200','top201');
class_switcher(new_tab,'top201','top200');
}

function scroll(val){
const elmnt = document.getElementById("top");
elmnt.scroll({
          left:val,
          behavior: 'smooth'
      });   
  }
function top_tab_auto_scroll(){
var xx=ids(active_watchlist);
if(xx!=null){
xx=xx.offsetLeft;
scroll(xx-150);
}
}


function hide(a){
var x = document.getElementById(a);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }  
}



function hider(a){
var x = document.getElementById(a);
  if (x.style.display === "none") {
    x.style.display = "none";
  } else {
    x.style.display = "none";
  }  
}


function shower(a){
var x = document.getElementById(a);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "block";
  }  
}

function id_finder(){
var ids = [];
var children = document.getElementById("top").children;
for (var i = 0, len = children.length ; i < len; i++) {
    children[i].className = 'new-class';
    ids.push(children[i].id);
}
alert(ids);
}