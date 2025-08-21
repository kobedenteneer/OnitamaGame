using System.Drawing;
using Onitama.Core.MoveCardAggregate.Contracts;
using Onitama.Core.SchoolAggregate;
using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.Util;
using Onitama.Core.Util.Contracts;

namespace Onitama.Core.MoveCardAggregate;

/// <inheritdoc cref="IMoveCard"/>
internal class MoveCard : IMoveCard
{
    private MoveCardGridCellType[,] _possibleMove;
    public string Name { get; }

    public MoveCardGridCellType[,] Grid { get; }

    public Color StampColor { get; }

    public MoveCard(string name, MoveCardGridCellType[,] grid, Color stampColor)
    {
        Name = name;
        Grid = grid;
        StampColor = stampColor;
        _possibleMove = grid;
    }

    public MoveCard()
    {
    }

    //Do not change this method, it makes sure that two MoveCard instances are equal if their names are equal
    public override bool Equals(object obj)
    {
        if (obj is null) return false;
        return obj is IMoveCard other && Equals(other);
    }

    //Do not change this method
    protected bool Equals(IMoveCard other)
    {
        return Name == other.Name;
    }

    //Do not change this method
    public override int GetHashCode()
    {
        return (Name != null ? Name.GetHashCode() : 0);
    }

    IReadOnlyList<ICoordinate> IMoveCard.GetPossibleTargetCoordinates(ICoordinate startCoordinate, Direction playDirection, int matSize)
    {
        List<ICoordinate> targetCoordinates = new List<ICoordinate>();
        for (int i = 0; i < _possibleMove.GetLength(0); i++)
        {
            for (int j = 0; j < _possibleMove.GetLength(1); j++)
            {
                if (_possibleMove[i, j] == MoveCardGridCellType.Target)
                {
                    ICoordinate coordinate = new Coordinate(i, j);
                    int x = startCoordinate.Row;
                    int y = startCoordinate.Column;
                    coordinate = (Coordinate) coordinate.RotateTowards(playDirection);
                    x += coordinate.Row - 2;
                    y += coordinate.Column - 2;
                    switch (playDirection.ToString())
                    {
                        case "East":
                            x += 4;
                            break;
                        case "South":
                            x += 4;
                            y += 4;
                            break;
                        case "West":
                            y += 4;
                            break;
                    }
                    coordinate = new Coordinate(x, y);
                    if (!coordinate.IsOutOfBounds(matSize))
                    {
                        targetCoordinates.Add(coordinate);
                    }
                }
            }
        }
        return targetCoordinates;
    }
}