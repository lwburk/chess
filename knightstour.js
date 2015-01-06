// generate an empty board of size n
function generateEmptyBoard(n) {
    var row = [];
    n = n + 2;
    for (var i = 0; i < (n * (n + 2)); i++) {
        row.push((i < (n * 2) || i > (n * n) || !(i % n) || i % n == (n - 1)) ? 
                 -1 : 
                 new Square(i, false, n - 2));
    }
    return row;
}

// converts an index in a mailbox of size n into its corresponding value in algebraic notation
function i2an(i, n) {
    return 'abcdefghijklmnopqrstuvwxyz' [(i % (n + 2)) - 1] + ((n + 2) - Math.floor(i / (n + 2)));
}

// converts a position in algebraic notation into its location in the mailbox
function an2i(square, n) {
    return 'abcdefghijklmnopqrstuvwxyz'.indexOf(square[0]) + 1 + (n + 2 - square[1]) * (n + 2);
}

function Square(i, visited, n) {
    this.name = i2an(i, n);
    this.i = i;
    this.visited = visited;
    this.w = null;
}

function knightMoves(square, board, n, follow) {
    var moves = [];
    [
        n,
        n + 4,
        2 * n + 3,
        2 * n + 5
    ].forEach(function(offset) {
        [
            square.i + offset,
            square.i - offset
        ].forEach(function(pos) {
            var move = board[pos];
            if (move !== -1 && move && move.visited === false) {
                if (follow) {
                    move.w = knightMoves(move, board, n, false).length;
                }
                moves.push(move);
            }
        });
    });
    return moves.sort(function(a, b) {
        return a.w - b.w;
    });
}

function tour(n, square) {
    
    var board = generateEmptyBoard(n);
    var startingSquare = board[an2i(square, n)];

    return (function move(square, progress) {
        square.visited = true;
        progress.push(square);
        if (progress.length >= (n * n)) {
            return progress;
        }
        var moves = knightMoves(square, board, n, true);
        for (var i = 0; i < moves.length; i++) {
            var result = move(moves[i], progress);
            if (result) {
                return result;
            }
        }
        square.visited = false;
        progress.pop();
        return null;
    })(startingSquare, []);
}

var startTime = new Date();
console.log(tour(8, "d4"));
console.log(new Date() - startTime);

