using Onitama.Core.MoveCardAggregate.Contracts;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.Util;
using Onitama.Core.Util.Contracts;
using System.Drawing;

namespace Onitama.Core.SchoolAggregate;

/// <inheritdoc cref="ISchool"/>
internal class School : ISchool
{
    /// <summary>
    /// Creates a school that is a copy of another school.
    /// </summary>
    /// <remarks>
    /// This is an EXTRA. Not needed to implement the minimal requirements.
    /// To make the mini-max algorithm for an AI game play strategy work, this constructor should be implemented.
    /// </remarks>
    public School(ISchool otherSchool)
    {
        throw new NotImplementedException("TODO: copy properties of other school. Make sure to copy the pawns, not just reference them");
    }

    public School(IPawn master, IPawn[] students)
    {
        Master = master;
        Students = students;
        AllPawns = new IPawn[students.Length + 1];
        AllPawns[0] = master;
        for (int i = 0; i < students.Length; i++)
        {
            AllPawns[i + 1] = students[i];
        }
    }
    
    public IPawn Master { get; }

    public IPawn[] Students { get; }

    public IPawn[] AllPawns { get; }

    public ICoordinate TempleArchPosition { get; set; }

    public IPawn GetPawn(Guid pawnId)
    {
        return AllPawns.FirstOrDefault(p => p.Id == pawnId);
    }

}