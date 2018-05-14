
$(function() {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        text = xhr.response;
        writer();
      }
  }

  xhr.open('GET', '/data/chumon.txt');
  xhr.send('');

  function writer() {
    $('p#main').text(text);
  }
});
