const STOCKFISH = window.STOCKFISH;

class Stockfish {

    constructor(game, setEvalScore, setEvalText) {
        if (Stockfish._instance) {
            return Stockfish._instance;
        }
        Stockfish._instance = this;

        const options = {};

        /// We can load Stockfish via Web Workers or via STOCKFISH() if loaded from a <script> tag.
        let evaler =
            typeof STOCKFISH === "function"
                ? STOCKFISH()
                : new Worker(options.stockfishjs || "/stockfish.js");

        //Set variables to the class
        this.game = game;
        this.evaler = evaler;

        this.uciCmd("uci");

        evaler.onmessage = event => {
            this.handleEvalerMessage(event, setEvalScore, setEvalText)
        };

        evaler.onerror = event => {
            console.log("Evaler error: ", event);
        }
    }

    handleEvalerMessage(event, setEvalScore, setEvalText) {
        let line;

        if (event && typeof event === "object") {
            line = event.data;
        } else {
            line = event;
        }
        // console.log('Reply: ' + line);
        if (line !== "uciok" || line !== "readyok") {
            let match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
            /// Did the AI move?

            /// Is it sending feed back with a score?
            if ((match = line.match(/^info .*\bscore (\w+) (-?\d+)/))) {
                let score = parseInt(match[2], 10) * (this.game.turn() === "w" ? 1 : -1);

                /// Is it measuring in centipawns?
                if (match[1] === "cp") {
                    const evalScore = (score / 100.0).toFixed(2);
                    setEvalScore(evalScore);
                    setEvalText((score / 100.0).toFixed(1));

                    /// Did it find a mate?
                } else if (match[1] === "mate") {
                    const evalScore = 1000 * (this.game.turn() === "w" ? 1 : -1) * parseFloat(match[2]);
                    setEvalScore(evalScore);
                    setEvalText("M" + Math.abs(score));
                }
            }
        }
    };

    uciCmd(cmd) {
        const evaler = this.evaler;

        // console.log('UCI: ' + cmd);
        evaler.postMessage(cmd);
    }

    getEval() {
        const game = this.game;
        this.uciCmd("stop");

        if (!game.game_over()) {
            this.uciCmd("position fen " + game.fen());
            this.uciCmd("go depth 15");
        }
    }
}

export default Stockfish;
