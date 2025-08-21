using Microsoft.VisualBasic;
using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.Util.Contracts;

namespace Onitama.Core.SchoolAggregate;

/// <inheritdoc cref="IPawn"/>
internal class Pawn : IPawn
{
    public Guid Id { get; set; }

    public Guid OwnerId { get; set; }

    public PawnType Type { get; set;}

    public ICoordinate Position { get; set; }

    public Pawn(Guid id, Guid ownerId, PawnType type, ICoordinate position)
    {
        Id = id;
        OwnerId = ownerId;
        Type = type;
        Position = position;
    }

}
