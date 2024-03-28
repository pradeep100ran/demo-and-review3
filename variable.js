var audio = new Audio('/style/notification/order.mp3');
//------------------------//
var mini_websocket_status='0';
var full_websocket_status='0';
var active_mini_token=[];
var active_full_token=[];
var mini_websocket_token=[];
var spotvix_websocket_token=[];
var full_websocket_token=[];

var full_raw_token=[];
var spotvix_raw_token=[];
var greeks_websocket_token=[];
var fourth_decimal_token=[];
var seventh_decimal_token=[];
var old_volume=0;
var required_quantity=0;
var should_count_volume=0;
var hold_order=[];
var volume_updated_time=0;
//--------------------------//

var active_bottom_tab='watchlist';
var active_watchlist='wl1';
var active_position='open';
var watchlist='<div id="wl1" class="top100 top201">Watchlist 1</div><div id="wl2" class="top100 top201">Watchlist 2</div><div id="wl3" class="top100 top201">Watchlist 3</div><div id="wl4" class="top100 top201">Watchlist 4</div><div id="wl5" class="top100 top201">Watchlist 5</div>';
var orders='<div id="order_history" class="top100 top201">Orders History</div>';
var position='<div id="close" class="top100 top201">Closed</div><div id="open" class="top100 top201">Open</div>';
var profile='';
//////////////////////////
var watchlist_server_raw_data='';
var modi=[];
var fd='';
var is_refresh_required=0;
var is_captcha=0;
var captcha_id='';
var success_svg='<svg viewBox="0 0 22 22" aria-hidden="true" class="abc r-4qtqp9 r-yyyyoo r-axlblu r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr" data-testid="verificationBadge"><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>';

var fail_svg='<svg viewBox="0 0 16 16" class="abcd"><path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" fill="red"></path> <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" fill="red"></path></svg>';
