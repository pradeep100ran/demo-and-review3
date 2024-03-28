<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.19.0/js/md5.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/otplib@11.0.1/otplib-browser.js" integrity="sha256-UdpRnlwCkTLWjh9uf3+MU/OvuD8Xz5jAIi4QERLNpmY=" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="variable.js"></script>
<script src="function.js"></script>
<link href="style/app.css" rel="stylesheet" />
<link href="app.css" rel="stylesheet" />
<link href="style/fn300.css" rel="stylesheet" />
<link href="style/fn500.css" rel="stylesheet" />

<script src="profile.js"></script>

<script src="script/fn300.js"></script>
<script src="script/fn500.js"></script>
<script src="app.js"></script>
<script src="script/greeks.js"></script>
<script src="watchlist.js"></script>
<script src="script/websocket4.js"></script>
<script src="position.js"></script>
<script src="order_history.js"></script>
<script src="profile.js"></script>
<script src="script/websocket.js"></script>
<script src="script/websocket2.js"></script>
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" media="screen" />

 <div id="top" class="top"></div>
<div id="notification" class="notification"></div>
<div id="main" class="main">
</div>
<div id="bottomstart">
<div id="bottom" class="bottom"></div>
</div>
<script>
function after_login(){
var active_bottom_tab='watchlist';
bottom();
topper();
}
function application(){
var login=get_local('login_status');
if(login!=1){
fn500_login_main();

hider('bottomstart');
}
if(login==1){
shower('bottomstart');
var memo=localStorage.getItem("active_bottom_tab");
active_bottom_tab=memo;
if(memo==null){
active_bottom_tab='watchlist';
}
after_login();
}
}
application();
document.addEventListener('click', function(e){
var child_id=e.target.id;
//alert(child_id);
var child_id_parent=parent(child_id);

if(child_id=='search'){
}
if(child_id_parent=='top'){
topper(child_id);
top_tab_auto_scroll();
}
if(child_id_parent=='bottom'){
bottom_tab_class_switch(active_bottom_tab,child_id);
topper();
top_tab_auto_scroll();
}
});
window.addEventListener("offline", (event) => {
internet_connection_manager(0);
});
window.addEventListener("online", (event) => {
internet_connection_manager(1);
});
</script>