var random = Math.floor(Math.random() * 1000);
var className = $("table td").attr('red');
var $table = $("table");
var $cells = $("table").find("td");
var i = 0;
var interval;
var difficulty = 2500;
var player = 0;
var computer = 0;
var player_name;

var obj;

var data = [];

var today;
var date;
var time;


var active = true;

$("#table td").click(function () {
  if ($(this).hasClass('blue') == true) {
    $(this).addClass("green").removeClass("blue");
    player++;
  }
})

var func = function () {
  today = new Date;
  time = today.format("h:MM:ss TT");
  
  if (i > 0 && $cells.eq(i - 1).hasClass('blue') == true) {
    $cells.eq(i - 1).addClass("red").removeClass("blue")
    computer++;
  }
  if (player <= $cells.length / 2 && computer <= $cells.length / 2) {
    $cells.eq(i).addClass('blue');
    i++;
  }
  else {
    player_name = $.trim($("#name").val());
    if (player > $cells.length / 2) {
      $(".message").find("p").text(player_name + " won!");

      obj = {};

      obj['name'] = player_name;
      obj['time'] = time;
      data.unshift(obj);
    }
    else if (computer > $cells.length / 2) {
      $(".message").find("p").text(player_name + " lose!");

      obj = {};

      obj['name'] = "Computer AI";
      obj['time'] = time;
      data.unshift(obj);
    }

    $('.leaderboard .container').html("");

    for (var j = 0; j < data.length; j++) {
      $('.leaderboard .container').append('<div class = "grid"><div>'+data[j].name+'</div><div class="right">'+data[j].time+'</div></div>')
    }

    clearInterval(interval);
    $("#btn").text("PLAY AGAIN");
    active = true;
  }
  if (player == $cells.length / 2 && computer == $cells.length / 2) $(".message").find("p").text("Draw!");
}

$('#easy').click(() => {
  difficulty = 1500;
  $('#dropdownMenuButton').text("Easy");
});
$('#normal').click(() => {
  difficulty = 1000;
  $('#dropdownMenuButton').text("Normal");
});
$('#hard').click(() => {
  difficulty = 500;
  $('#dropdownMenuButton').text("Hard");
});

var button_event = $('#btn').click(function () {

  if (!active) {
    return;
  }
  active = false;

  $("#table td").removeClass("red");
  $("#table td").removeClass("green");
  player = 0;
  computer = 0;
  i = 0;
  for (let i = $cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [$cells[i], $cells[j]] = [$cells[j], $cells[i]];
  }
  if (($('#dropdownMenuButton').text() == "Easy" || $('#dropdownMenuButton').text() == "Normal"
    || $('#dropdownMenuButton').text() == "Hard")
    && $('#name').val() != "") {
    interval = setInterval(func, difficulty);
  }
  else {
    alert('Authorize first!');
    active = true;
  }
  player = 0;
  computer = 0;

});
