function profilee(){
printer('top','');
pf100_raw_data();
}

function captcha_server(){
let xhr = new XMLHttpRequest();
xhr.open("GET", "/apis/kite-captcha.php");
response=xhr.responseText;
xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
   var response=(xhr.responseText);
var json=JSON.parse(response);
var id=json.data["id"];
captcha_id=id;
var image=json.data["image"];
Base64ToImage(image, function(img) {
printer('pf230_cap','');
document.getElementById('pf230_cap').appendChild(img);
 });
}};
xhr.send();
}



function captcha_loader(){
printer('pf230_cap','Please Wait when Loading Captcha');
captcha_server();
}


function pf100_raw_data(){
var data='<div class="pf128"><div class="pf129"><div id="pf130_profileImage" class="pf130_profile_image child"></div><div onclick="fn_pf150_logout()" id="" class="pf235_logout">Logout   <i class="fa fa-sign-out"></i></div><div class="pf130"><div class="pf130l">Name</div><div id="pf131_name" class="pf130r">Name</div></div><div class="pf130"><div class="pf130l">Number</div><div id="pf131_number" class="pf130r">Number</div></div><div class="pf130"><div class="pf130l">Email</div><div id="pf131_email" class="pf130r">Email</div></div><div class="pf130"><div class="pf130l">Broker</div><div id="" class="pf130r">Kite/Zerodha  <span class="span150remove" id="pf149_remove" onclick="pf130_remove_broker()">Remove</span><span class="span150remove" id="pf149link_again" onclick="fn_profile201()">Link Again</span></div></div><div class="pf130"><div class="pf130l">Last Linked</div><div id="broker_link_time" class="pf130r"></div></div><div class="pf130"><div class="pf130l">Link Status</div><div id="pf140link_status" class="pf130r"></div></div><div class="pf130"><div class="pf130l">Link Type</div><div id="" class="pf130r"><input class="pf130r1" type="radio" onclick="handleClick(`short`)" id="pf266_small" name="test" value="value1">24hr<input class="pf130r2" id="pf266_big" type="radio"  onclick="handleClick(`long`)"   name="test" value="value2">Auto Renew</div></div><div id="pf265_totp"><div class="pf130"><div class="pf130l">TOTP Key</div><textarea class="pf130rr1" id="kite_totp_input" onkeyup="totp_length()" rows="2" cols="50"></textarea></div><div onclick="fn_pf130totp_verify()" id="pf234button" class="pf235">Verify Key</div><div id="pf234loader" class="pf234loader"></div></div></div></div></div>';

var data1='<div class="pf128"><div class="pf129"><div id="pf130_profileImage" class="pf130_profile_image child"></div><div onclick="fn_pf150_logout()" id="" class="pf235_logout">Logout   <i class="fa fa-sign-out"></i></div><div class="pf130"><div class="pf130l">Name</div><div id="pf131_name" class="pf130r">Name</div></div><div class="pf130"><div class="pf130l">Number</div><div id="pf131_number" class="pf130r">Number</div></div><div class="pf130"><div class="pf130l">Email</div><div id="pf131_email" class="pf130r">Email</div></div><div id="pf230link_broker"></div></div></div>';
var linked_broker_name=get_local('linked_broker_name');
if(linked_broker_name==null){
linked_broker_name=0;
}
if(linked_broker_name==0){
printer('main',data1);
var raw='<div onclick="fn_profile201()" id="pf234button" class="pf235">Link Broker</div>';
printer('pf230link_broker',raw);
}
if(linked_broker_name!=0){
printer('main',data);
hider('pf265_totp');
hider('pf234loader');
var hash=get_local('kite_totp_hash');
var link_type=get_local('kite_link_type');

var link_status=get_local('broker_linked_status');
if(link_status==1){
printer('pf140link_status','<span class="pf151a">Active</span>');
hider('pf149link_again');
shower('pf149_remove');
}

if(link_status!=1){
printer('pf140link_status','<span class="pf151d">Disconnected</span>');
shower('pf149link_again');
hider('pf149_remove');
}



if(link_type=='long'){
ids('pf266_big').checked=true;
}
if(link_type!='long'){
ids('pf266_small').checked=true;
}
var verified=get_local('kite_totp_hash_verified');
if(verified==1){
 hider('pf234button');
}
if(hash!=null){
ids('kite_totp_input').value=hash;
}


var enctoken=get_local('kite_enctoken');

if(enctoken!=null){
var kite_enctoken_time=parseInt(get_local('kite_enctoken_time'));

var kite_enctoken_time2=time_to_human(new Date(kite_enctoken_time));

printer('broker_link_time',kite_enctoken_time2);

var current_time=Date.now();
var time_passed=current_time-kite_enctoken_time;
if(time_passed<=2000){
}
if(time_passed>2000){
}
}
}
var prfo =get_local('name').charAt(0);
printer('pf131_name',get_local('name'));
printer('pf131_number',get_local('number'));
printer('pf131_email',get_local('email'));
printer('pf130_profileImage',prfo);
}



function pf130_remove_broker(){
put_local('kite_enctoken','');
put_local('kite_link_type','short');
put_local('kite_totp_hash','');
put_local('kite_totp_hash_verified','0');
var x=(mini_websocket_status);
if(x==1){
socket_mini.close();
}
var y=(full_websocket_status);
if(y==1){
socket_full.close();
}
put_local('linked_broker_name',0);
application();
}



function fn_pf150_logout(){
var x=(mini_websocket_status);
if(x==1){
socket_mini.close();
}
var y=(full_websocket_status);
if(y==1){
socket_full.close();
}
localStorage.clear();
application();
}


function handleClick(value){
if(value=='short'){
put_local('kite_link_type','short');
hider('pf265_totp');
}

if(value=='long'){
ids('pf266_big').checked=false;
var ver=get_local('kite_totp_hash_verified');
if(ver!=1){
small_notification('info','First Verify Your TOTP Key');
}
shower('pf265_totp');
hider('pf234button');
if(ver==1){
put_local('kite_link_type','long');
ids('pf266_big').checked=true;
hider('pf234button');
}
}
}

function totp_length(){
shower('pf234button');
}


function fn_pf130totp_verify(){
hider('pf234button');
shower('pf234loader');
var hash=ids('kite_totp_input').value;
put_local('kite_totp_hash',hash);
fn_auto_totp();
}



function fn_auto_totp(){
var wait ='<div id="order_window"><div class="p902"><span id="loader" class="p901"></span></div>';
printer('main',wait);
var user_id=get_local('kite_user_id');
var password=get_local('kite_password');
var user_id=escape(user_id);
var password=escape(password);
let xhr = new XMLHttpRequest();
xhr.open("GET", "/apis/kite-otp.php?user_id="+user_id+"&password="+password);
response=xhr.responseText;
xhr.onreadystatechange = function () {
if (xhr.readyState === 4) {
var response=(xhr.responseText);
var json=JSON.parse(response);
var json=json.data;
var request_id=json[0].request_id;
var otp_type=json[0].otp_type;
const authenticator = otplib.authenticator;
var hash=get_local('kite_totp_hash');
var otp=(authenticator.generate(hash));
//alert(response);
fn_auto_token(user_id, request_id,otp_type,otp);
}
};
xhr.send();
}


function fn_auto_token(user_id,request_id,otp_type,otp){
var response =0;
let xhr = new XMLHttpRequest();
xhr.open("GET", "/apis/kite-token.php?user_id="+user_id+"&request_id="+request_id+"&otp_type="+otp_type+"&otp="+otp);
response=xhr.responseText;
xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
   var response=(xhr.responseText);
var json=JSON.parse(response);
var response_status=json.response_status;
if(response_status=='failed'){
pf130_remove_broker();
}
if(response_status=='success'){
var json=json.data;
var enctoken=json[0].enctoken;
var time_now=Date.now();
put_local('kite_enctoken_time',time_now);
put_local('kite_enctoken',enctoken);
put_local('kite_totp_hash_verified','1');
put_local('kite_link_type','long');
put_local('broker_linked_status','1');
}
application();
   }};
xhr.send();
}


function Base64ToImage(base64img, callback) {
    var img = new Image();
    img.onload = function() {
        callback(img);
    };
    img.src = base64img;
}
function fn_profile2011(){
var data='<div class="pf228"><div class="pf229"><div id="pf227" class="pf227image">6</div><div class="pf230"><div class="pf230l">USER ID</div><input id="pf231_id" class="pf230r"></div><div class="pf230"><div class="pf230l">Password</div><input id="pf231_password" class="pf230r"></div><div id="pf234loader" class="pf234loader"></div><div onclick="fn_pf230otp()" id="pf235" class="pf235">Get OTP</div><div class="pf230"><div class="pf230l">OTP/TOTP</div><input type="number" id="pf231_otp" class="pf230r"></div></div></div><div onclick="" class="pf235">Log Out</div>';
printer('main',data);
ids('pf231_id').value=get_local('kite_user_id');
ids('pf231_password').value=get_local('kite_password');
}
function fn_profile201(){
var data='<div class="pf228"><div class="pf229"><div class="pf230_text">Link Your Broker</div><div class="pf230"><div class="pf230l">BROKER</div><input id="" class="pf230r1" value="Kite/Zerodha" readonly></div><div class="pf230"><div class="pf230l">USER ID</div><input id="pf231_id" class="pf230r"></div><div class="pf230"><div class="pf230l">Password</div><input id="pf231_password" class="pf230r"></div><div id="pf230_capcha_hs"><div id="pf230_cap" class="pf230cap"></div><div class="pf230"><div class="pf230l">Captcha</div><input id="pf231_captcha" class="pf230r"></div></div><div id="pf234loader" class="pf234loader"></div><div onclick="fn_pf230otp()" id="pf235" class="pf235">Get OTP</div><div id="pf230_otpp"><div class="pf230"><div class="pf230l">OTP/TOTP</div><input id="pf231_otp" class="pf230r"></div></div><div onclick="fn_pf230token()" id="pf235_token" class="pf235">Submit Now</div></div></div>';
printer('main',data);
hider('pf230_capcha_hs');
if(is_captcha==1){
shower('pf230_capcha_hs');
captcha_loader();
}
hider('pf234loader');
hider('pf230_otpp');
hider('pf235_token');
ids('pf231_id').value=get_local('kite_user_id');
ids('pf231_password').value=get_local('kite_password');
}

function fn_pf230otp(){
shower('pf234loader');
hider('pf235');
var a=ids('pf231_id').value;
var b=ids('pf231_password').value;
var captcha=ids('pf231_captcha').value;
put_local('kite_user_id',a);
put_local('kite_password',b);
var user_id=escape(a);
var password=escape(b);
var response =0;
let xhr = new XMLHttpRequest();
if(is_captcha!=1){
xhr.open("GET", "/apis/kite-otp.php?user_id="+user_id+"&password="+password);
}
if(is_captcha==1){
xhr.open("GET", "/apis/kite-otp.php?user_id="+user_id+"&password="+password+"&captcha_id="+captcha_id+"&captcha="+captcha);
}
response=xhr.responseText;
xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
var response=(xhr.responseText);
var json=JSON.parse(response);
var response_status=json.response_status;
var message=json.message; 
var json=json.data;
var request_id=json[0].request_id;
var captcha=json[0].captcha;
if(captcha==1){
is_captcha=1;
}
var otp_type=json[0].otp_type;
if(response_status=='failed'){
small_notification('danger', message);
fn_profile201();
}
if(response_status=='success'){
is_captcha=0;
hider('pf230_capcha_hs');
small_notification('success', message);
ids('pf231_id').readOnly=true;
ids('pf231_password').readOnly=true;
put_local('kite_request_id',request_id);
put_local('kite_otp_type',otp_type);
hider('pf234loader');
shower('pf230_otpp');
shower('pf235');
hider('pf235');
shower('pf235_token');
 }
}};
xhr.send();
}

function fn_pf230token(){
var user_id=ids('pf231_id').value;
var request_id=get_local('kite_request_id');
var otp_type=get_local('kite_otp_type');
var otp=ids('pf231_otp').value;
var response =0;
let xhr = new XMLHttpRequest();
xhr.open("GET", "/apis/kite-token.php?user_id="+user_id+"&request_id="+request_id+"&otp_type="+otp_type+"&otp="+otp);
response=xhr.responseText;
xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
   var response=(xhr.responseText);
var json=JSON.parse(response);
var response_status=json.response_status;
var message=json.message;
if(response_status=='failed'){
small_notification('danger', message);
}
if(response_status=='success'){
fn_pf_230token_save(json);
}
   }};
xhr.send();
}
function fn_pf_230token_save(json){
var json=json.data;
var enctoken=json[0].enctoken;
var time_now=Date.now();
put_local('kite_enctoken_time',time_now);
put_local('linked_broker_name','Kite/Zerodha');
put_local('broker_linked_status','1');
put_local('kite_enctoken',enctoken);
application();
}