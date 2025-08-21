using Onitama.Core.GameAggregate.Contracts;
using Onitama.Core.MoveCardAggregate;
using Onitama.Core.MoveCardAggregate.Contracts;
using Onitama.Core.PlayerAggregate;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.PlayMatAggregate;
using Onitama.Core.PlayMatAggregate.Contracts;
using Onitama.Core.SchoolAggregate;
using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.Util;
using Onitama.Core.Util.Contracts;
using System.ComponentModel;
using System.Linq;
using System.Numerics;

namespace Onitama.Core.GameAggregate;

/// <inheritdoc cref="IGame"/>
internal class Game : IGame
{
    public Guid Id { get; set; }

    public IPlayMat PlayMat { get; set; }

    public IMoveCard ExtraMoveCard { get; set; }

    public IPlayer[] Players { get; set; }

    public Guid PlayerToPlayId { get; set; }

    public Guid WinnerPlayerId { get; set; }

    public string WinnerMethod { get; set; }

    /// <summary>
    /// Creates a new game and determines the player to play first.
    /// </summary>
    /// <param name="id">The unique identifier of the game</param>
    /// <param name="playMat">
    /// The play mat
    /// (with the schools of the player already positioned on it)
    /// </param>
    /// <param name="players">
    /// The 2 players that will play the game
    /// (with 2 move cards each)
    /// </param>
    /// <param name="extraMoveCard">
    /// The fifth card used to exchange cards after the first move
    /// </param>
    public Game(Guid id, IPlayMat playMat, IPlayer[] players, IMoveCard extraMoveCard)
    {
        Id = id;
        PlayMat = playMat;
        Players = players;
        ExtraMoveCard = extraMoveCard;
        for (int i = 0; i < players.Length; i++)
        {
            if (players[i].Color == extraMoveCard.StampColor)
            {
                PlayerToPlayId = players[i].Id;
            }
        }
    }

    /// <summary> 
    /// Creates a game that is a copy of another game.
    /// </summary>
    /// <remarks>
    /// This is an EXTRA. Not needed to implement the minimal requirements.
    /// To make the mini-max algorithm for an AI game play strategy work, this constructor should be implemented.
    /// </remarks>
    public Game(IGame otherGame)
    {
        throw new NotImplementedException("TODO: copy the properties of the other game");
        //Attention: the players should be copied, not just referenced
    }

    public IReadOnlyList<IMove> GetPossibleMovesForPawn(Guid playerId, Guid pawnId, string moveCardName)
    {
        Direction playerDirection;
        IPawn playerPawn;
        IMoveCard moveCard = Players.SelectMany(x => x.MoveCards).FirstOrDefault(x => x.Name == moveCardName);
        if (playerId == Players[0].Id) 
        {
            playerDirection = Players[0].Direction;
            playerPawn = Players[0].School.GetPawn(pawnId);
            if (!Players[0].MoveCards.Contains(moveCard))
            {
                throw new ApplicationException("Player does not have the move card");
            }
        }
        else if (playerId == Players[1].Id)
        {
            playerDirection = Players[1].Direction;
            playerPawn = Players[1].School.GetPawn(pawnId);
            if (!Players[1].MoveCards.Contains(moveCard))
            {
                throw new ApplicationException("Player does not have the move card");
            }
        }
        else
        {
            throw new InvalidOperationException("player not found");
        }
        
        return PlayMat.GetValidMoves(playerPawn, moveCard, playerDirection);

        throw new NotImplementedException();
    }
    
    public IReadOnlyList<IMove> GetAllPossibleMovesFor(Guid playerId)
    {
        List<IMove> possibleMoves = new List<IMove>();
        Direction playerDirection;
        for (int i = 0; i < Players.Length; i++)
        {
            if (Players[i].Id == playerId)
            {
                playerDirection = Players[i].Direction;
                for (int j = 0; j < Players[i].School.AllPawns.Length; j++)
                {
                    for (int k = 0; k < Players[i].MoveCards.Count; k++)
                    { 
                        var playmatlist = PlayMat.GetValidMoves(Players[i].School.AllPawns[j], Players[i].MoveCards[k], playerDirection);
                        foreach (var item in playmatlist)
                        {
                            possibleMoves.Add(item);
                        }
                    }
                }
            }
        }
        return possibleMoves;

        //if (playerId == Players[0].Id)
        //{
        //    playerDirection = Players[0].Direction;
        //    for (int i = 0; i < Players[0].School.AllPawns.Length; i++)
        //    {
        //        possiobleMoves.Add((IMove)PlayMat.GetValidMoves(Players[0].School.AllPawns[i], Players[0].MoveCards[0], playerDirection));
        //        possiobleMoves.Add((IMove)PlayMat.GetValidMoves(Players[0].School.AllPawns[i], Players[0].MoveCards[1], playerDirection));
        //    }
        //}
        //else if (playerId == Players[1].Id)
        //{
        //    playerDirection = Players[1].Direction;
        //    for (int i = 0; i < Players[0].School.AllPawns.Length; i++)
        //    {
        //        possiobleMoves.Add((IMove)PlayMat.GetValidMoves(Players[0].School.AllPawns[i], Players[0].MoveCards[0], playerDirection));
        //        possiobleMoves.Add((IMove)PlayMat.GetValidMoves(Players[0].School.AllPawns[i], Players[0].MoveCards[1], playerDirection));
        //    }
        //}
        //else
        //{
        //    throw new InvalidOperationException("player not found");
        //}

        //return possiobleMoves;

        //throw new NotImplementedException();
    }

    public void MovePawn(Guid playerId, Guid pawnId, string moveCardName, ICoordinate to)
    {
        var opponent = Players[0];
        var player = Players[1];
        IMoveCard moveCard = Players.SelectMany(x => x.MoveCards).FirstOrDefault(x => x.Name == moveCardName);
        if (playerId == Players[0].Id)
        {
            player = Players[0];
            opponent = Players[1];
        }
        if (PlayerToPlayId != playerId)
        {
            throw new ApplicationException("Not the turn of the player");
        }
        if (PlayerToPlayId == player.Id)
        {
            PlayMat.ExecuteMove(new Move(moveCard, player.School.GetPawn(pawnId), player.Direction, to), out var capturedPawn);
            if (opponent.School.Master == capturedPawn)
            {
                WinnerMethod = "Way of the Stone";
                WinnerPlayerId = playerId;
            }
            if (player.School.Master.Position == to)
            {
                ICoordinate masterStartCoordinate = new Coordinate(4, 2);
                ICoordinate SmasterStartCoordinate = new Coordinate(0, 2);
                if (player.Direction == Direction.North && to.Row == masterStartCoordinate.Row && to.Column == masterStartCoordinate.Column)
                {
                    WinnerMethod = "Way of the Stream";
                    WinnerPlayerId = playerId;
                }
                else if (player.Direction == Direction.South && to.Row == SmasterStartCoordinate.Row && to.Column == SmasterStartCoordinate.Column)
                {
                    WinnerMethod = "Way of the Stream";
                    WinnerPlayerId = playerId;
                }
            }
            
        }
        var playedcard = moveCard;
        player.MoveCards.Remove(moveCard);
        player.MoveCards.Add(ExtraMoveCard);
        ExtraMoveCard = playedcard;
        PlayerToPlayId = opponent.Id;
    }

    public void SkipMovementAndExchangeCard(Guid playerId, string moveCardName)
    {
        var opponent = Players[0];
        var player = Players[1];
        if (playerId == Players[0].Id)
        {
            player = Players[0];
            opponent = Players[1];
        }
        if (PlayerToPlayId != playerId)
        {
            throw new ApplicationException("Not the turn of the player");
        }

        List<IMove> possibleMoves = new List<IMove>();
        Direction playerDirection;
        IMoveCard moveCard = Players.SelectMany(x => x.MoveCards).FirstOrDefault(x => x.Name == moveCardName);
        for (int i = 0; i < Players.Length; i++)
        {
            if (Players[i].Id == playerId)
            {
                for (int x = 0; x < Players[i].MoveCards.Count; x++)
                {
                    playerDirection = Players[i].Direction;
                    for (int j = 0; j < Players[i].School.AllPawns.Length; j++)
                    {
                        var playmatlist = PlayMat.GetValidMoves(Players[i].School.AllPawns[j], moveCard, playerDirection);
                        foreach (var item in playmatlist)
                        {
                            possibleMoves.Add(item);
                        }
                    }
                }
            }
        }
        if (possibleMoves.Count != 0)
        {
            throw new ApplicationException("Player has valid moves");
        }
        var playedcard = moveCard;
        player.MoveCards.Remove(moveCard);
        player.MoveCards.Add(ExtraMoveCard);
        ExtraMoveCard = playedcard;
        PlayerToPlayId = opponent.Id;
    }

    public IPlayer GetNextOpponent(Guid playerId)
    {
        throw new NotImplementedException();
    }
}