const STOCKFISH = window.STOCKFISH;

class Stockfish {
    // static propTypes = {
    //     children: {
    //         onMove: PropTypes.func,
    //         game: PropTypes.any
    //     }
    // };

    constructor(game) {
        if (Stockfish._instance) {
            // throw new Error("Singleton classes can't be instantiated more than once.")
            return Stockfish._instance;
        }
        Stockfish._instance = this;

        // function engineGame() {

        const options = {};

        /// We can load Stockfish via Web Workers or via STOCKFISH() if loaded from a <script> tag.
        let engine =
            typeof STOCKFISH === "function"
                ? STOCKFISH()
                : new Worker(options.stockfishjs || "stockfish.js");
        let evaler =
            typeof STOCKFISH === "function"
                ? STOCKFISH()
                : new Worker(options.stockfishjs || "stockfish.js");
        let engineStatus = {};
        let playerColor = "black";

        // do not pick up pieces if the game is over
        // only pick up pieces for White

        function uciCmd(cmd, which) {
            console.log('UCI: ' + cmd);

            (which || engine).postMessage(cmd);
        }
        uciCmd("uci");

        function get_moves() {
            let moves = "";
            let history = game.history({ verbose: true });

            for (let i = 0; i < history.length; ++i) {
                let move = history[i];
                moves +=
                    " " + move.from + move.to + (move.promotion ? move.promotion : "");
            }

            return moves;
        }

        function prepareMove() {
            //   stopClock();
            let turn = game.turn() === "w" ? "white" : "black";
            if (!game.game_over()) {
                // if (turn === playerColor) {
                if (turn !== playerColor) {
                    // playerColor = playerColor === 'white' ? 'black' : 'white';
                    uciCmd("position startpos moves" + get_moves());
                    uciCmd("position startpos moves" + get_moves(), evaler);
                    uciCmd("eval", evaler);
                    uciCmd("go 10 depth");

                    // isEngineRunning = true;
                }
            }
        };

        evaler.onmessage = function (event) {
            let line;
            console.log("evaler: ", evaler);


            if (event && typeof event === "object") {
                line = event.data;
            } else {
                line = event;
            }

            console.log('evaler: ' + line);

            /// Ignore some output.
            if (
                line === "uciok" ||
                line === "readyok" ||
                line.substr(0, 11) === "option name"
            ) {
                return;
            }
        };

        engine.onmessage = event => {
            let line;

            if (event && typeof event === "object") {
                line = event.data;
            } else {
                line = event;
            }
            console.log('Reply: ' + line);
            if (line === "uciok") {
                engineStatus.engineLoaded = true;
            } else if (line === "readyok") {
                engineStatus.engineReady = true;
            } else {
                let match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
                /// Did the AI move?
                if (match) {
                    // isEngineRunning = false;
                    game.move({ from: match[1], to: match[2], promotion: match[3] });
                    this.setState({ fen: game.fen() });
                    prepareMove();
                    uciCmd("eval", evaler);
                    console.log("eval: ", evaler);
                    //uciCmd("eval");
                    /// Is it sending feedback?
                } else if (
                    (match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/))
                ) {
                    engineStatus.search = "Depth: " + match[1] + " Nps: " + match[2];
                }

                /// Is it sending feed back with a score?
                if ((match = line.match(/^info .*\bscore (\w+) (-?\d+)/))) {
                    let score = parseInt(match[2], 10) * (game.turn() === "w" ? 1 : -1);
                    /// Is it measuring in centipawns?
                    if (match[1] === "cp") {
                        engineStatus.score = (score / 100.0).toFixed(2);
                        /// Did it find a mate?
                    } else if (match[1] === "mate") {
                        engineStatus.score = "Mate in " + Math.abs(score);
                    }

                    /// Is the score bounded?
                    if ((match = line.match(/\b(upper|lower)bound\b/))) {
                        engineStatus.score =
                            ((match[1] === "upper") === (game.turn() === "w")
                                ? "<= "
                                : ">= ") + engineStatus.score;
                    }
                }
            }
            // displayStatus();
        };

        // }
        // this.engineGame = engineGame();

    }


    getEval() {
        console.log("oh no")
        this.prepareMove();

        return "uhh";
    }
}

export default Stockfish;
