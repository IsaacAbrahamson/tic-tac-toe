const X = "X";
const O = "O"
var inGame = false;
var computer;
var user;

function newGame() {
    $(".cell").each(function (i) {
        $(this).removeClass('taken');
        $(this).removeClass(user.side);
        $(this).removeClass(computer.side);
        $(this).text('');
    });

    inGame = false;
    computer = null;
    user.turn = null;

    changePage('.side-select');
}

var User = function (turn, side) {
    this.win = false;
    this.turn = turn;
    this.side = side;
};

User.prototype.winGame = function () {
    alert('You win!');
    newGame();
}

User.prototype.checkWin = function () {
    // horizontal
    if ($('.1').hasClass(this.side) && $('.2').hasClass(this.side) && $('.3').hasClass(this.side)) {
        this.win = true;
    }
    else if ($('.4').hasClass(this.side) && $('.5').hasClass(this.side) && $('.6').hasClass(this.side)) {
        this.win = true;
    }
    else if ($('.7').hasClass(this.side) && $('.8').hasClass(this.side) && $('.9').hasClass(this.side)) {
        this.win = true;
    }

    // vertical
    else if ($('.1').hasClass(this.side) && $('.4').hasClass(this.side) && $('.7').hasClass(this.side)) {
        this.win = true;
    }
    else if ($('.2').hasClass(this.side) && $('.5').hasClass(this.side) && $('.8').hasClass(this.side)) {
        this.win = true;
    }
    else if ($('.3').hasClass(this.side) && $('.6').hasClass(this.side) && $('.9').hasClass(this.side)) {
        this.win = true;
    }

    // diagonal
    else if ($('.1').hasClass(this.side) && $('.5').hasClass(this.side) && $('.9').hasClass(this.side)) {
        this.win = true;
    }
    else if ($('.7').hasClass(this.side) && $('.5').hasClass(this.side) && $('.3').hasClass(this.side)) {
        this.win = true;
    }

    else {
        setTimeout(function () { computer.move() }, 500);
    }
}

var Computer = function (turn, side) {
    this.win = false;
    this.turn = turn;
    this.side = side;
};

Computer.prototype.winGame = function () {
    alert('Computer wins!');
    newGame();
}

Computer.prototype.checkWin = function () {
    // horizontal
    if ($('.1').hasClass(this.side) && $('.2').hasClass(this.side) && $('.3').hasClass(this.side)) {
        this.win = true;
    }
    else if ($('.4').hasClass(this.side) && $('.5').hasClass(this.side) && $('.6').hasClass(this.side)) {
        this.win = true;
    }
    else if ($('.7').hasClass(this.side) && $('.8').hasClass(this.side) && $('.9').hasClass(this.side)) {
        this.win = true;
    }

    // vertical
    else if ($('.1').hasClass(this.side) && $('.4').hasClass(this.side) && $('.7').hasClass(this.side)) {
        this.win = true;
    }
    else if ($('.2').hasClass(this.side) && $('.5').hasClass(this.side) && $('.8').hasClass(this.side)) {
        this.win = true;
    }
    else if ($('.3').hasClass(this.side) && $('.6').hasClass(this.side) && $('.9').hasClass(this.side)) {
        this.win = true;
    }

    // diagonal
    else if ($('.1').hasClass(this.side) && $('.5').hasClass(this.side) && $('.9').hasClass(this.side)) {
        this.win = true;
    }
    else if ($('.7').hasClass(this.side) && $('.5').hasClass(this.side) && $('.3').hasClass(this.side)) {
        this.win = true;
    }
}

Computer.prototype.move = function () {
    for (var num = 1; num <= 9; num++) {
        var cell = "." + num.toString();
        if (!$(cell).hasClass('taken')) {
            $(cell).addClass('taken ' + this.side);
            $(cell).text(this.side);
            break;
        }
    }

    this.checkWin();
    if (this.win) {
        setTimeout(function () { computer.winGame() }, 500)
    }
    else {
        user.turn = true;
        this.turn = false;
    }
}

function changePage(page) {
    var currentPage = $(".page").not(".hidden-top");
    currentPage.addClass('hidden-bottom');

    currentPage.hide();
    currentPage.removeClass('hidden-bottom');
    currentPage.addClass('hidden-top');

    // next page
    $(page).removeClass('hidden-top');
    currentPage.show();
}

function fullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
    else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    }
    else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    }
    else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
}

$(document).ready(function () {
    $('.start button').click(function () {
        changePage(".side-select");
    });

    $('.side-select a').click(function () {
        changePage(".game");
        inGame = true;

        if ($(this).text() == X) {
            user = new User(true, X);
            computer = new Computer(false, O);
        }
        else if ($(this).text() == O) {
            user = new User(false, O);
            computer = new Computer(true, X);
            setTimeout(function () { computer.move() }, 500);
        }
    });

    $('.cell').hover(function () {
        if ($(this).hasClass('taken')) return;
        if (user.turn) $(this).text(user.side);
    }, function () {
        if ($(this).hasClass('taken')) return;
        $(this).text('');
    });

    $('.cell').click(function () {
        if ($(this).hasClass('taken') || !user.turn) return;

        $(this).text(user.side);
        $(this).addClass('taken ' + user.side);
        user.checkWin();
        if (user.win) {
            setTimeout(function () { user.winGame() }, 500)
        }
        else {
            user.turn = false;
            computer.turn = true;
        }
    });
});