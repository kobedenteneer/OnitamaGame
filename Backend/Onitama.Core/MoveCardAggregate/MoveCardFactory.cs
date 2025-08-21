using System.Drawing;
using Onitama.Core.MoveCardAggregate.Contracts;

namespace Onitama.Core.MoveCardAggregate;

/// <inheritdoc cref="IMoveCardFactory"/>
internal class MoveCardFactory : IMoveCardFactory
{
    private Random _colorPick = new Random();
    public IMoveCard Create(string name, MoveCardGridCellType[,] grid, Color[] possibleStampColors)
    {
        //throw new NotImplementedException("TODO: pick a random stamp color and return a MoveCard instance");
        int randomColor = _colorPick.Next(0, 2);
        MoveCard moveCard = new MoveCard(name, grid, possibleStampColors[randomColor]);
        return moveCard;
    }
}