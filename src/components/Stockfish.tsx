declare const window: any; // declare the window object
const STOCKFISH = window.STOCKFISH;

type SetFunction = (value: any) => void;

class Stockfish {
    private static _instance: Stockfish | null = null;
    private game: any;
    private evaler: Worker | any;

    constructor(game: any, setEvalScore: SetFunction, setEvalText: SetFunction) {
        if (Stockfish._instance) {
            return Stockfish._instance;
        }
        Stockfish._instance = this;

        const options: any = {};

        let evaler: Worker | any =
            typeof STOCKFISH === "function"
                ? STOCKFISH()
                : new Worker(options.stockfishjs || "/stockfish.js");

        this.game = game;
        this.evaler = evaler;

        this.uciCmd("uci");

        evaler.onmessage = (event: MessageEvent) => {
            this.handleEvalerMessage(event, setEvalScore, setEvalText);
        };

        evaler.onerror = (event: ErrorEvent) => {
            console.log("Evaler error: ", event);
        };
    }

    handleEvalerMessage(event: MessageEvent, setEvalScore: SetFunction, setEvalText: SetFunction) {
        let line: string;

        if (event && typeof event === "object") {
            line = event.data;
        } else {
            line = event as string;
        }

        if (line !== "uciok") {
            let match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);

            if ((match = line.match(/^info .*\bscore (\w+) (-?\d+)/))) {
                const score = parseInt(match[2], 10) * (this.game.turn() === "w" ? 1 : -1);

                if (match[1] === "cp") {
                    const evalScore = (score / 100.0).toFixed(2);
                    setEvalScore(evalScore);
                    setEvalText((score / 100.0).toFixed(1));
                } else if (match[1] === "mate") {
                    const evalScore = 1000 * (this.game.turn() === "w" ? 1 : -1) * parseFloat(match[2]);
                    setEvalScore(evalScore);
                    setEvalText("M" + Math.abs(score));
                }
            }
        }
    }

    uciCmd(cmd: string) {
        this.evaler.postMessage(cmd);
    }

    getEval() {
        this.uciCmd("stop");

        if (!this.game.game_over()) {
            this.uciCmd("position fen " + this.game.fen());
            this.uciCmd("go depth 15");
        }
    }
}

export default Stockfish;
