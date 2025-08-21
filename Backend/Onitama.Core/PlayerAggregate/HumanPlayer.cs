using System.Drawing;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.SchoolAggregate;
using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.Util;

namespace Onitama.Core.PlayerAggregate;

/// <inheritdoc cref="IPlayer"/>
internal class HumanPlayer : PlayerBase
{
    
    public HumanPlayer(Guid userId, string name, Color color, Direction direction) : base(userId, name, color, direction)
    {
    }

    public new void AddSchool(ISchool school)
    {
        base.AddSchool(school);
        return;
    }
}
