
$(function() {
  // テキスト取得
  var xhr = new XMLHttpRequest();
  var right = 0;
  var width = window.innerWidth - 13;
  var wrap_w = 0;
  var threshold = width * 0.2;

  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        text = xhr.response;
        writer();
      }
  }

  xhr.open('GET', '/data/chumon.txt');
  xhr.send('');

  function writer() {
    text = text.split('\n\n');
    text.forEach(function(e) {
      $('<p>&nbsp&nbsp'+e+'</p>').appendTo('#wrapper');
       wrap_w = $('#wrapper').width()
    });
  }

  // スワイプ判定
  var _dir, position;

  function getPos(event) {
    return event.originalEvent.touches[0].pageX;
  }

  function move(dir) {
    if (dir == 'right' && right <= -width) {
      right += width;
    } else if (dir == 'left' && right >= -wrap_w+width) {
      right -= width;
    }
    _dir = '';
    $('#wrapper').animate({'right': right}, 500);
  }

  $('body').on('touchstart', function(event) {
    pos = getPos(event);
  });
  $('body').on('touchmove', function(event) {
    if (pos - getPos(event) > threshold) {
      _dir = 'right';
    } else if (pos - getPos(event) < -threshold) {
      _dir = 'left';
    }
  });
  $('body').on('touchend', function() {
    move(_dir);
  });

  // サイドのコントローラー
  $('#left').on('click', function() {
    move('left');
  });
  $('#right').on('click', function() {
    move('right');
  });

  $('#if-mobile').on('click', function() {
    $(this).remove();
  });
});
