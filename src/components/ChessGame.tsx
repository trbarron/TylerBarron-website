import React, { Component } from 'react';

declare global {
  interface Window {
    firebase: any;
    Chess: any;
    ChessBoard: any;
  }
}

interface GameProps {
  match: {
    params: {
      token: string;
    };
  };
}

interface GameState {
  token: string;
  moves?: string[];
  p1_token?: string;
  p2_token?: string;
  turnText?: string;
  statusText?: string;
}

const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

export default class Game extends Component<GameProps, GameState> {

  private engine: any;
  private board?: any;

  constructor(props: GameProps) {
    super(props);
    this.state = { token: props.match.params.token };
    this.engine = new window.Chess();
  }

  render() {
    return (
      <div className='view row'>
        <div className='column column-50'>
          <div id='game-board'></div>
        </div>
        <div className='column column-50'>
          <div className="links">
            <div>Player 1: <a target="_blank" href={domain() + "/#/" + this.state.p1_token}>{domain()}/#/{this.state.p1_token}</a></div>
            <div>Player 2: <a target="_blank" href={domain() + "/#/" + this.state.p2_token}>{domain()}/#/{this.state.p2_token}</a></div>
          </div>
          <blockquote>
            <h5 className='turn'>{ this.state.turnText }</h5>
            <h5 className='status'>{ this.state.statusText }</h5>
          </blockquote>
          <p className='history'>{ history(this.state.moves) }</p>
        </div>
      </div>
    );
  }

  componentDidMount(): void {
    listenForUpdates(this.state.token, (id, game) => {
      this._updateBoard(id, game);
      this._updateInfo(game);
    });
  }

  private _updateInfo(game: any): void {
    const engine = this.engine;
    const playerNum = figurePlayer(this.state.token, game);
    this.setState({
      moves: game.moves ? game.moves.split(",") : [],
      p1_token: game.p1_token,
      p2_token: game.p2_token,
      turnText: turnText(playerNum, isMyTurn(playerNum, engine.turn())),
      statusText: statusText(engine.turn(), engine.in_checkmate(), engine.in_draw(), engine.in_check())
    });
  }

  private _updateBoard(id: string, game: any): void {
    const playerNum = figurePlayer(this.state.token, game);
    this.engine.load(game.fen || INITIAL_FEN);

    if (!this.board) {
      this.board = this._initBoard(id, game);
      this.board.position(this.engine.fen());
    } else if (isMyTurn(playerNum, this.engine.turn())) {
      this.board.position(this.engine.fen());
    }
  }

  private _initBoard(id: string, game: any): any {
    const token = this.state.token;
    const engine = this.engine;
    const playerNum = figurePlayer(token, game);
    const config = {
      draggable: true,
      pieceTheme: "https://s3-us-west-2.amazonaws.com/chessimg/{piece}.png",
      onDragStart: onDragStart,
      onDrop: onDrop,
      onSnapEnd: onSnapEnd
    };

    const board = window.ChessBoard('game-board', config);
    if (playerNum === 2) {
      board.orientation('black');
    }
    return board;

    function onDragStart(source: string, piece: string) {
      return !engine.game_over() &&
        isMyTurn(playerNum, engine.turn()) &&
        allowMove(engine.turn(), piece);
    }

    function onDrop(source: string, target: string) {
      const m = engine.move({
        from: source,
        to: target,
        promotion: 'q'
      });
      if (m === null) return "snapback";

      game.fen = engine.fen();
      game.moves = pushMove(game.moves, `${m['from']}-${m['to']}`);

      games(id).set(game);
    }

    function onSnapEnd() {
      return board.position(engine.fen());
    }
  }
}

function history(moves: string[] = []): JSX.Element[] {
  return moves.map((m, idx) => <span key={m}>{idx + 1}) {m}</span>);
}

function listenForUpdates(token: string, cb: (id: string, game: any) => void): void {
  const db = window.firebase.database().ref("/games");
  ["p1_token", "p2_token"].forEach((name) => {
    const ref = db.orderByChild(name).equalTo(token);
    ref.on('value', (ref: any) => {
      const [id, game] = parse(ref.val());
      if (!id) return;
      cb(id, game);
    });
  });
}

function parse(tree: any): [string, any] {
  if (!tree) return ["", {}];
  const keys = Object.keys(tree);
  const id = keys[0];
  const game = tree[id];
  return [id, game];
}

function games(id: string) {
  return window.firebase
    .database()
    .ref(`/games/${id}`);
}

function domain(): string {
  const { hostname, port } = window.location;
  if (port) {
    return `http://${hostname}:${port}`;
  } else {
    return `http://${hostname}`;
  }
}

function pushMove(moves: string, move: string): string {
  if (!moves) {
    return [move].join(",");
  } else {
    const arr = moves.split(",");
    return [...arr, move].join(",");
  }
}

function isMyTurn(playerNum: number, turn: string): boolean {
  return (playerNum === 1 && turn === 'w') || (playerNum === 2 && turn === 'b');
}

function allowMove(turn: string, piece: string): boolean {
  if (turn === 'w' && piece.search(/^b/) !== -1) {
    return false;
  } 
  if (turn === 'b' && piece.search(/^w/) !== -1) {
    return false;
  }
  return true;
}

function figurePlayer(token: string, { p1_token, p2_token }: any): number {
  if (token === p1_token) {
    return 1;
  } else if (token === p2_token) {
    return 2;
  } else {
    return 0;
  }
}

function turnText(playerNum: number, isMyTurn: boolean): string {
  if (playerNum > 0) {
    if (isMyTurn) {
      return "Your Turn";
    } else {
      return "Waiting for opponent's move...";
    }
  } else {
    return "View Only";
  }
}

function statusText(turn: string, in_mate: boolean, in_draw: boolean, in_check: boolean) {
  const moveColor: string = turn === 'b' ? "Black" : "White";
  if (in_mate)
    return `Game Over, ${moveColor} is in checkmate`;
  else if (in_draw)
    return 'Game over, drawn position';
  else if (in_check)
    return `${moveColor} is in check!`;
  else
    return "";
}