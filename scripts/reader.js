
$(function() {
  var xhr = new XMLHttpRequest();
  var right = 0;
  var width = window.innerWidth;
  console.log(width);

  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        text = xhr.response;
        writer();
      }
  }

  xhr.open('GET', '/data/chumon.txt');
  xhr.send('');

  function writer() {
    text = text.split('\n');
    text.forEach(function(e) {
      $('<p>&nbsp'+e+'</p>').appendTo('#wrapper');
    });
  }

  $('body').on('touchstart', onTouchStart); //指が触れたか検知
  $('body').on('touchmove', onTouchMove); //指が動いたか検知
  $('body').on('touchend', onTouchEnd); //指が離れたか検知
  var direction, position;

  //スワイプ開始時の横方向の座標を格納
  function onTouchStart(event) {
    position = getPosition(event);
    direction = ''; //一度リセットする
  }

  //スワイプの方向（left／right）を取得
  function onTouchMove(event) {
    if (position - getPosition(event) > 70) { // 70px以上移動しなければスワイプと判断しない
      direction = 'left'; //左と検知
    } else if (position - getPosition(event) < -70){  // 70px以上移動しなければスワイプと判断しない
      direction = 'right'; //右と検知
    }
  }

  function onTouchEnd(event) {
    if (direction == 'right'){
      if (right > -$('#wrapper').width()) {
        right -= width;
        $('#wrapper').animate({'right': right}, 500);
      }
    } else if (direction == 'left'){
      if (right <= -width) {
        right += width;
        $('#wrapper').animate({'right': right}, 500);
      }
    }
  }

  //横方向の座標を取得
  function getPosition(event) {
    return event.originalEvent.touches[0].pageX;
  }
});
