using System.Numerics;
using Onitama.Core.Util.Contracts;

namespace Onitama.Core.Util;

/// <inheritdoc cref="ICoordinate"/>
internal class Coordinate : ICoordinate
{
    public int Row { get; }
    public int Column { get; }

    public Coordinate(int row, int column)
    {
        Row = row;
        Column = column;
    }

    //Do not change this method
    public override bool Equals(object obj)
    {
        if (obj is null) return false;
        return obj is ICoordinate other && Equals(other);
    }

    //Do not change this method
    protected bool Equals(ICoordinate other)
    {
        return Row == other.Row && Column == other.Column;
    }

    //Do not change this method
    public override int GetHashCode()
    {
        return HashCode.Combine(Row, Column);
    }

    //Do not change this method
    public override string ToString()
    {
        return $"({Row}, {Column})";
    }

    public bool IsOutOfBounds(int playMatSize)
    {
        if(Row < 0 || Column < 0 || Row >= playMatSize || Column >= playMatSize)
        {
            return true;
        }
        return false;
    }

    public ICoordinate GetNeighbor(Direction direction)
    {
        throw new NotImplementedException();
    }

    public ICoordinate RotateTowards(Direction direction)
    {
        switch (direction.ToString())
        {
            case "North":
                return new Coordinate(Row, Column);
            case "East":
                return new Coordinate(-Column, Row);
            case "South":
                return new Coordinate(-Row, -Column);
            case "West":
                return new Coordinate(Column, -Row);
            default:
                throw new ArgumentOutOfRangeException();
        }

        throw new NotImplementedException();
    }

    public int GetDistanceTo(ICoordinate other)
    {
        int x = other.Row - Row;
        int y = other.Column - Column;
        int distance = (int)Math.Pow(x, 2) + (int)Math.Pow(y, 2);
        return (int)Math.Sqrt(distance); 
    }
}