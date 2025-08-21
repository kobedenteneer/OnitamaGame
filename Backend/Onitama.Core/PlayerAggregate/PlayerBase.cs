using System.Drawing;
using Onitama.Core.MoveCardAggregate.Contracts;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.SchoolAggregate;
using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.Util;
using Onitama.Core.Util.Contracts;

namespace Onitama.Core.PlayerAggregate;

/// <inheritdoc cref="IPlayer"/>
internal class PlayerBase : IPlayer
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public Color Color { get; set; }

    public Direction Direction { get; set; }

    public ISchool School { get; set; }

    public IList<IMoveCard> MoveCards { get; set; }

    protected PlayerBase(Guid id, string name, Color color, Direction direction)
    {
        Id = id;
        Name = name;
        Color = color;
        Direction = direction;
        MoveCards = new List<IMoveCard>();
    }

    public ISchool AddSchool(ISchool school)
    {
        School = school;
        return school;
    }

    /// <summary>
    /// Creates a player that is a copy of an other player.
    /// </summary>
    /// <remarks>
    /// This is an EXTRA. Not needed to implement the minimal requirements.
    /// To make the mini-max algorithm for an AI game play strategy work, this constructor should be implemented.
    /// </remarks>
    public PlayerBase(IPlayer otherPlayer)
    {
        throw new NotImplementedException("TODO: copy properties of other player");
    }
}