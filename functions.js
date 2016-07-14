// Tic Tac Toe
var tictactoe = (function() {
  console.log("game started");
  // Constants
  var X = 'X',
      O = 'O',
      BLANK = ' ';

  // Variables
  var currentplayer = X,
      moves = 0,
      board = [ BLANK, BLANK, BLANK, BLANK, BLANK,
                BLANK, BLANK, BLANK, BLANK ];

  var setMessage = function( msg ) {
    $( '#message' ).html( msg );
  };

  var switchPlayer = function() {

    if( currentplayer === X ){
      currentplayer =  O;
    } else {
       currentplayer = X;
    }
    setMessage( 'Player: ' + currentplayer + ' "s turn' );
  };

  var nextMove = function( index ) {
    if ( board[ index ] === BLANK ) {
      return true;
    } else {
      setMessage( 'click on an empty box' );
      return false;
    }
  };

  var makeMove = function( $box, index ) {
    board[ index ] = currentplayer;
    $box.html( currentplayer );
    moves++;
  };

  // Check if the game is over. If a player has won, return the 3 squares
  // on which the win occurred as an array. If the game is a draw, return
  // true; if the game is not over, return false
  var gameOver = function() {
    var winningCombo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                              [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        winIndex = -1;
    $.each( winningCombo, function( index, winCombination ) {
      if( allEqual( winCombination ) ){
        winIndex = index;
        return false;
      }
    });
    if( winIndex !== -1 ) {
      return winningCombo[ winIndex ];
    } else if ( moves === 9 ) {
      return true; // Draw
    } else {
      return false;
    }
  };

  // Check if the board pieces at 3 board indexes are the same (that is,
  // if they are all X or all O)
  var allEqual = function( indexes ) {
    return ( board[ indexes[0] ] === board[ indexes[1] ] ) &&
           ( board[ indexes[0] ] === board[ indexes[2] ] ) &&
           ( board[ indexes[0] ] !== BLANK );
  };

  // Handle the end of the game by setting and displaying an appropriate
  // message (including the winning formation, if one exists), then
  // allowing the user to play again
  var gameEnded = function( endingCombo ) {
    var endMessage;

    if( $.isArray(endingCombo) ){
      endMessage = 'Player ' + currentplayer + ' Wins';
      showWinCombo( endingCombo );
    } else {
      endMessage = 'Draw!';
    }
    $( '#message' ).addClass( 'end-message' );
    setMessage( endMessage );

    // Turn off gameboard click listener
    $('.container').off('click');
    $( '#clear' ).show().on( 'click', function() {
        location.reload();
    });

  };

  // Add a class to highlight the squares that form a winning formation
  var showWinCombo = function( formation ) {
    $.each( formation, function( index, winPosition ) {
      $( '.box' ).eq( winPosition ).addClass(' winCombo ');
    });
  };

  // Main controller to run the game
  var start = function( $box ) {
    var index = +$box.attr( 'id' );

    if( nextMove( index ) ){
      makeMove( $box, index );
      var winningFormation = gameOver();
      if   ( winningFormation ) {

        gameEnded( winningFormation );
      }else {
        switchPlayer();
      }

    }
  };

  return { start: start };

})();

$( document ).ready( function() {
  $( '.container' ).on( 'click', '.box', function() {
    tictactoe.start( $(this) );
  });
});
