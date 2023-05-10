/* 
 * Chessboard
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Square } from '@models/composite/Square';
import { Rook } from '@models/composite/pieces/Rook';
import { Knight } from '@models/composite/pieces/Knight';
import { Bishop } from '@models/composite/pieces/Bishop';
import { Queen } from '@models/composite/pieces/Queen';
import { King } from '@models/composite/pieces/King';
import { Pawn } from '@models/composite/pieces/Pawn';
import { Piece } from '@models/composite/Piece';
import { Highlight } from '@models/modular/Highlight';

type SquarePiece = Piece | null;

export class Board {
    readonly _types: string[] = ["standard", "empty"];
    private _squares : Square[];
    private _highlights : Highlight[];

    constructor(type : string) {
	switch(type){
	    case "empty":
		this._squares = new Array(64).fill(null).map(() => new Square(null));
		break;
	    case "standard":
		this._squares = new Array(64).fill(null).map(() => new Square(null));
		this._squares[0].setPiece(new Rook("black"));
		this._squares[1].setPiece(new Knight("black"));
		this._squares[2].setPiece(new Bishop("black"));
		this._squares[3].setPiece(new Queen("black"));
		this._squares[4].setPiece(new King("black"));
		this._squares[5].setPiece(new Bishop("black"));
		this._squares[6].setPiece(new Knight("black"));
		this._squares[7].setPiece(new Rook("black"));
		this._squares[8].setPiece(new Pawn("black"));
		this._squares[9].setPiece(new Pawn("black"));
		this._squares[10].setPiece(new Pawn("black"));
		this._squares[11].setPiece(new Pawn("black"));
		this._squares[12].setPiece(new Pawn("black"));
		this._squares[13].setPiece(new Pawn("black"));
		this._squares[14].setPiece(new Pawn("black"));
		this._squares[15].setPiece(new Pawn("black"));
		this._squares[56].setPiece(new Rook("white"));
		this._squares[57].setPiece(new Knight("white"));
		this._squares[58].setPiece(new Bishop("white"));
		this._squares[59].setPiece(new Queen("white"));
		this._squares[60].setPiece(new King("white"));
		this._squares[61].setPiece(new Bishop("white"));
		this._squares[62].setPiece(new Knight("white"));
		this._squares[63].setPiece(new Rook("white"));
		this._squares[48].setPiece(new Pawn("white"));
		this._squares[49].setPiece(new Pawn("white"));
		this._squares[50].setPiece(new Pawn("white"));
		this._squares[51].setPiece(new Pawn("white"));
		this._squares[52].setPiece(new Pawn("white"));
		this._squares[53].setPiece(new Pawn("white"));
		this._squares[54].setPiece(new Pawn("white"));
		this._squares[55].setPiece(new Pawn("white"));
		break;
	    default:
		throw new Error("Error on board construction, invalid board type entered");
	}
	this._highlights = new Array(64).fill(null).map(() => new Highlight("closed"));
    }

    getSquares() : Square[] {
	return this._squares;
    }

    getHighlights() : Highlight[] {
	return this._highlights;
    }
    
    getHighlight(index : number) : Highlight {
	return this._highlights[index];
    }
    
    getPiece(index : number) : SquarePiece {
	if (index < 0 || index > 63) {
	    throw new Error("trying to access invalid board index");
	}
	return this._squares[index].getPiece();
    }

}

// highlight


      /************************************************************************/

    /*
     * HIGHLIGHTING
     *
     * highlight possible moves
     */
    
    /************************************************************************/

    // handleClick() {
    // 	if (this.props.state.color === this.props.turn) {
    // 	    this.highlight();
    // 	}
    // }

    // highlight() {
    // 	const highlights = this.props.highlights.slice();
    // 	this.highlightMoves(this.props.index, highlights);
    // 	this.highlightAttacks(this.props.index, highlights);
    // 	this.highlightEnPassant(this.props.index, highlights);
	
    // 	this.props.setHighlights(highlights);
    // }

    // highlightMoves(index : number, highlights : Highlight[]) {
    // 	let position = this.state.pawn.advanceOne();
	
    // 	if (this.isValidMove(position)) {
    // 	    highlights[position].setOpen();
    // 	    position = this.state.pawn.advanceTwo();
    // 	    if (this.hasMoved(index)) {
    // 		return;
    // 	    }
    // 	    if (this.isValidMove(position)) {
    // 		highlights[position].setOpen();
    // 	    }
    // 	}
    // }

    // isValidMove(index : number) {
    // 	return this.isOnBoard(index) && !this.hasPiece(index);
    // }    

    // isOnBoard(index : number) {
    // 	return index > 0 && index < 63;
    // }   
 
    // // onWestEdge(index : number) {
    // // 	return column(index) === 0;
    // // }    

    // // onEastEdge(index : number) {
    // // 	return column(index) === BOARD_WIDTH - 1;
    // // }    

    // hasMoved(index : number) {
    // 	if (this.state.pawn.isWhite()) {
    // 	    return Math.floor(index / BOARD_WIDTH) !== 6;
    // 	}
    // 	return Math.floor(index / BOARD_WIDTH) !== 1;
    // }

    // hasPiece(index : number) {
    // 	return index > 0;
    // 	// return this.props.squares[index].piece.isNoPiece();
    // }    
	
    // highlightAttacks(currentIndex, highlights) {
    // 	let pawn = this.props.squares[currentIndex];
    // 	let direction = getDirection(pawn.color);
    // 	let targetIndex = currentIndex + (direction * BOARD_WIDTH) + 1;

    // 	if (!this.onEastEdge(currentIndex)) {
    // 	    highlights[targetIndex] = Number(this.hasPiece(targetIndex) * 2);	    
    // 	}

    // 	targetIndex = currentIndex + (direction * BOARD_WIDTH) - 1;
	
    // 	if (!this.onWestEdge(currentIndex)) {
    // 	    highlights[targetIndex] = Number(this.hasPiece(targetIndex) * 2);	    
    // 	}

    // }

    // highlightEnPassant(index, highlights) {
    // 	let pawn = this.props.squares[index];
    // 	let direction = getDirection(pawn.color);
	
    // 	// let targetMoveEast : MoveI = {
    // 	//     start: index + (direction * 2 * BOARD_WIDTH) + 1,
    // 	//     end: index + 1,
    // 	//     piece: {
    // 	// 	color: pawn.color === Color.White ? Color.Black : Color.White,
    // 	// 	piece: Piece.PawnComponent
    // 	//     } as Piece
    // 	// };

    // 	// let targetMoveWest : MoveI = {
    // 	//     start: index + (direction * 2 * BOARD_WIDTH) - 1,
    // 	//     end: index - 1,
    // 	//     piece: {
    // 	// 	color: pawn.color === Color.White ? Color.Black : Color.White,
    // 	// 	piece: Piece.PawnComponent
    // 	//     } as Piece
    // 	// };

    // 	let targetMoveEast : MoveI = {};

    // 	let targetMoveWest : MoveI = {};

    // 	if (this.props.lastMove.isEqual(targetMoveEast)) {
    // 	    let position = index + (direction * BOARD_WIDTH) + 1;
    // 	    highlights[position] = 2;
    // 	    return;
    // 	}
    // 	if (this.props.lastMove.isEqual(targetMoveWest)) {
    // 	    let position = index + (direction * BOARD_WIDTH) - 1;
    // 	    highlights[position] = 2;
    // 	}
    // }




    // highlightMoves(index : number) {
    // 	const square = this.state.squares[index];
	
    // 	switch (square.piece) {
    // 	case Piece.Pawn:
    // 	    this.highlightPawn(index);
    // 	    break;
    // 	case Piece.Knight:
    // 	    this.highlightKnight(index);
    // 	    break;
    // 	case Piece.Bishop:
    // 	    this.highlightBishop(index);
    // 	    break;
    // 	case Piece.Rook:
    // 	    this.highlightRook(index);
    // 	    break;
    // 	case Piece.Queen:
    // 	    this.highlightQueen(index);
    // 	    break;
    // 	case Piece.King:
    // 	    this.highlightKing(index);
    // 	    break;
    // 	default:
    // 	}
    // 	this.setState({
    // 	    active: true,
    // 	    selected: index
    // 	});
    // }

    // highlightBishop(index : number) {
    // 	const highlights = this.state.highlights.slice();
    // 	//northeast
    // 	for (let position = index - (BOARD_WIDTH - 1); position >= 0 && column(position) !== 0; position -= (BOARD_WIDTH - 1)) {
    // 	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
    // 		break;
    // 	    }
    // 	}
    // 	//southeast
    // 	for (let position = index + (BOARD_WIDTH + 1); position < BOARD_SIZE && column(position) !== 0; position += (BOARD_WIDTH + 1)) {
    // 	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
    // 		break;
    // 	    }
    // 	}
    // 	//southwest
    // 	for (let position = index + (BOARD_WIDTH - 1); position < BOARD_SIZE && column(position) !== BOARD_WIDTH - 1; position += (BOARD_WIDTH - 1)) {
    // 	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
    // 		break;
    // 	    }
    // 	}
    // 	//northwest
    // 	for (let position = index - (BOARD_WIDTH + 1); position >= 0 && column(position) !== BOARD_WIDTH - 1; position -= (BOARD_WIDTH + 1)) {
    // 	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
    // 		break;
    // 	    }
    // 	}

    // 	this.setState({
    // 	    highlights: highlights,
    // 	})
    // 	return highlights;

    // }


    // highlightKnight(index : number) {
    // 	const highlights = this.state.highlights.slice();
    // 	// north
    // 	// up 2, right 1
    // 	this.highlightKnightSquare(index, index - 2 * BOARD_WIDTH + 1, highlights);
    // 	// up 2, left 1
    // 	this.highlightKnightSquare(index, index - 2 * BOARD_WIDTH - 1, highlights);
    // 	// right
    // 	// right 2, up 1
    // 	this.highlightKnightSquare(index, index + 2 + 1 * BOARD_WIDTH, highlights);
    // 	// right 2, down 1
    // 	this.highlightKnightSquare(index, index + 2 - 1 * BOARD_WIDTH, highlights);
    // 	// south
    // 	// south 2, right 1
    // 	this.highlightKnightSquare(index, index + 2 * BOARD_WIDTH + 1, highlights);
    // 	// south 2, left 1
    // 	this.highlightKnightSquare(index, index + 2 * BOARD_WIDTH - 1, highlights);
    // 	// left
    // 	// left 2, up 1
    // 	this.highlightKnightSquare(index, index - 2 + 1 * BOARD_WIDTH, highlights);
    // 	// left 2, down 1
    // 	this.highlightKnightSquare(index, index - 2 - 1 * BOARD_WIDTH, highlights);

    // 	this.setState({
    // 	    highlights: highlights,
    // 	})

    // }

    // highlightKnightSquare(index : number, newIndex, highlights) {
    // 	if (distance(index, newIndex) > 3) {
    // 	    return;
    // 	}
    // 	if(this.isOnBoard(newIndex)){
    // 	    this.highlightFriendOrFoeOrOpen(index, newIndex, highlights);
    // 	}
    // }

    
    // highlightRook(index : number) {
    // 	const highlights = this.state.highlights.slice();
    // 	//north
    // 	for (let position = index - BOARD_WIDTH; position > 0; position -= BOARD_WIDTH) {
    // 	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
    // 		break;
    // 	    }
    // 	}
    // 	//south
    // 	for (let position = index + BOARD_WIDTH; position < BOARD_SIZE; position += BOARD_WIDTH) {
    // 	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
    // 		break;
    // 	    }
    // 	}
    // 	//east
    // 	for (let position = index + 1; column(position) !== 0; position++) {
    // 	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
    // 		break;
    // 	    }
    // 	}
    // 	//west
    // 	for (let position = index - 1; column(position) !== BOARD_WIDTH - 1; position--) {
    // 	    if(!this.highlightFriendOrFoeOrOpen(index, position, highlights)){
    // 		break;
    // 	    }
    // 	}

    // 	this.setState({
    // 	    highlights: highlights,
    // 	})
    // 	return highlights;
    // }


    // // make this fuction more efficient
    // // going to pass highlights by ref in the future
    // highlightQueen(index) {
    // 	let rookHighlights = this.highlightRook(index);
    // 	let bishopHighlights = this.highlightBishop(index);
    // 	let queenHighlights = rookHighlights.map(function (num, idx) {
    // 	    return num + bishopHighlights[idx];
    // 	});
    // 	this.setState({
    // 	    highlights: queenHighlights,
    // 	});
    // }

    // highlightKing(index) {
    // 	const highlights = this.state.highlights.slice();
    // 	//north
    // 	if(this.isOnBoard(index - 1 * BOARD_WIDTH)){
    // 	    this.highlightFriendOrFoeOrOpen(index, index - 1 * BOARD_WIDTH, highlights);
    // 	}
    // 	//northeast
    // 	if(this.isOnBoard(index - 1 * BOARD_WIDTH + 1) && column(index - 1 * BOARD_WIDTH + 1) !== 0){
    // 	    this.highlightFriendOrFoeOrOpen(index, index - 1 * BOARD_WIDTH + 1, highlights);
    // 	}
    // 	//east
    // 	if(column(index + 1) !== 0){
    // 	    this.highlightFriendOrFoeOrOpen(index, index + 1, highlights);
    // 	}
    // 	//southeast
    // 	if(this.isOnBoard(index + 1 * BOARD_WIDTH + 1) && column(index + 1 * BOARD_WIDTH + 1) !== 0){
    // 	    this.highlightFriendOrFoeOrOpen(index, index + 1 * BOARD_WIDTH + 1, highlights);
    // 	}
    // 	//south
    // 	if(this.isOnBoard(index + 1 * BOARD_WIDTH)){
    // 	    this.highlightFriendOrFoeOrOpen(index, index + 1 * BOARD_WIDTH, highlights);
    // 	}
    // 	//southwest
    // 	if(this.isOnBoard(index + 1 * BOARD_WIDTH - 1) && column(index + 1 * BOARD_WIDTH - 1) !== BOARD_WIDTH - 1){
    // 	    this.highlightFriendOrFoeOrOpen(index, index + 1 * BOARD_WIDTH - 1, highlights);
    // 	}
    // 	//west
    // 	if(column(index - 1) !== BOARD_WIDTH - 1){
    // 	    this.highlightFriendOrFoeOrOpen(index, index - 1, highlights);
    // 	}
    // 	//northwest
    // 	if(this.isOnBoard(index - 1 * BOARD_WIDTH - 1) && column(index - 1 * BOARD_WIDTH - 1) !== BOARD_WIDTH - 1){
    // 	    this.highlightFriendOrFoeOrOpen(index, index - 1 * BOARD_WIDTH - 1, highlights);
    // 	}

    // 	this.setState({
    // 	    highlights: highlights,
    // 	})

    // }

    // highlightFriendOrFoeOrOpen(index, newIndex, highlights) {
    // 	if (!this.hasPiece(newIndex)) {
    // 	    this.tryHighlight(newIndex, highlights, OPEN);
    // 	    return true;
    // 	} else if (this.hasFoePiece(index, newIndex)) {
    // 	    this.tryHighlight(newIndex, highlights, ATTACK);
    // 	    return false;
    // 	} else {
    // 	    return false;
    // 	}
    // }

    // tryHighlight(index, highlights, state) {
    // 	if(index <= 0 || index >= BOARD_SIZE) {
    // 	    return;
    // 	}
    // 	highlights[index] = state;
    // }
