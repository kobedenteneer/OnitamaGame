using Onitama.Core.GameAggregate;
using Onitama.Core.GameAggregate.Contracts;
using Onitama.Core.MoveCardAggregate.Contracts;
using Onitama.Core.PlayerAggregate;
using Onitama.Core.PlayMatAggregate.Contracts;
using Onitama.Core.SchoolAggregate;
using Onitama.Core.SchoolAggregate.Contracts;
using System.Data.Common;
using Onitama.Core.Util;
using Onitama.Core.Util.Contracts;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.MoveCardAggregate;

namespace Onitama.Core.PlayMatAggregate;

/// <inheritdoc cref="IPlayMat"/>
internal class PlayMat : IPlayMat
{
    private IPawn[,] _grid;

    /// <summary>
    /// Creates a play mat that is a copy of another play mat
    /// </summary>
    /// <param name="otherPlayMat">The play mat to copy</param>
    /// <param name="copiedPlayers">
    /// Copies of the players (with their school)
    /// that should be used to position pawn on the copy of the <paramref name="otherPlayMat"/>.</param>
    /// <remarks>
    /// This is an EXTRA. Not needed to implement the minimal requirements.
    /// To make the mini-max algorithm for an AI game play strategy work, this constructor should be implemented.
    /// </remarks>
    public PlayMat(IPlayMat otherPlayMat, IPlayer[] copiedPlayers)
    {
        throw new NotImplementedException("TODO: copy properties of other playmat");
    }

    public PlayMat(int size)
    {
        Size = size;
        Grid = new IPawn[Size, Size];
        _grid = Grid;
    }

    public IPawn[,] Grid { get; }

    public int Size { get;}

    public void ExecuteMove(IMove move, out IPawn capturedPawn)
    {
        ICoordinate oldCoordinate = move.Pawn.Position;
        Grid[oldCoordinate.Row, oldCoordinate.Column] = null;
        if (Grid[move.To.Row, move.To.Column] != null)
        {
            capturedPawn = Grid[move.To.Row, move.To.Column];
        }
        else
        {
            capturedPawn = null;
        }
        move.Pawn.Position = move.To;
        Grid[move.To.Row, move.To.Column] = move.Pawn;
    }

    public IReadOnlyList<IMove> GetValidMoves(IPawn pawn, IMoveCard card, Direction playerDirection)
    {
        IReadOnlyList<ICoordinate> targetCoordinates = card.GetPossibleTargetCoordinates(pawn.Position, playerDirection, Size);
        List<IMove> validMoves = new List<IMove>();
        foreach (ICoordinate targetCoordinate in targetCoordinates)
        {
            if (Grid[targetCoordinate.Row, targetCoordinate.Column] == null)
            {
                validMoves.Add(new Move(card, pawn, playerDirection, targetCoordinate));
            }
            else
            {
                if (Grid[targetCoordinate.Row, targetCoordinate.Column].OwnerId != pawn.OwnerId)
                {
                    validMoves.Add(new Move(card, pawn, playerDirection, targetCoordinate));
                }
            }
        }
        return validMoves;
    }

    public void PositionSchoolOfPlayer(IPlayer player)
    {
        Direction direction = player.Direction;
        int row = direction == Direction.North ? 0 : 4;
        Grid[row, 2] = player.School.Master;
        player.School.Master.Position = new Coordinate(row, 2);
        int pos = 0;
        for (int i = 0; i < player.School.Students.Length; i++)
        {
            if (i == 2)
            {
                pos = 3;
            }
            player.School.Students[i].Position = new Coordinate(row, pos);
            Grid[row, pos] = player.School.Students[i];
            pos++;
        }
    }
}