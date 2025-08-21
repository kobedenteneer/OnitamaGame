using System.Drawing;
using System.Numerics;
using Onitama.Core.MoveCardAggregate.Contracts;
using Onitama.Core.PlayerAggregate;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.SchoolAggregate;
using Onitama.Core.TableAggregate.Contracts;
using Onitama.Core.UserAggregate;
using Onitama.Core.Util;
using Onitama.Core.Util.Contracts;

namespace Onitama.Core.TableAggregate;

/// <inheritdoc cref="ITable"/>
internal class Table : ITable
{
    private static readonly Color[] PossibleColors =
        new[] { Color.Red, Color.Blue, Color.Green, Color.Yellow, Color.Orange };

    private List<IPlayer> _seatedPlayers = new List<IPlayer>();
    private Random _colorPick = new Random();

    public Table(Guid id, TablePreferences preferences)
    {
        Id = id;
        GameId = Guid.Empty;
        Preferences = preferences;
        HasAvailableSeat = true;
    }

    public Guid Id { get; }

    public TablePreferences Preferences { get; }

    public Guid OwnerPlayerId { get; set; }

    public IReadOnlyList<IPlayer> SeatedPlayers => _seatedPlayers;
        
    public bool HasAvailableSeat { get; set; }

    public Guid GameId { get; set; }

    public void FillWithArtificialPlayers(IGamePlayStrategy gamePlayStrategy)
    {
        throw new NotImplementedException();
    }

    public void Join(User user)
    {
        if (_seatedPlayers.Exists(x => x.Id == user.Id))
        {
            throw new InvalidOperationException("already seated");
        }

        if (HasAvailableSeat)
        {
            if (SeatedPlayers.Count == 0)
            {
                int indexPicked = _colorPick.Next(0, 5);
                HumanPlayer player1 = new HumanPlayer(user.Id, user.WarriorName, PossibleColors[indexPicked], Direction.North);
                CreateSchool(player1);
                OwnerPlayerId = user.Id;
                _seatedPlayers.Add(player1);
            }
            else
            {
                int indexSecond = _colorPick.Next(0, 5);
                while (SeatedPlayers[0].Color == PossibleColors[indexSecond])
                {
                    indexSecond = _colorPick.Next(0, 5);
                }
                HumanPlayer player2 = new HumanPlayer(user.Id, user.WarriorName, PossibleColors[indexSecond], Direction.South);
                CreateSchool(player2);
                _seatedPlayers.Add(player2);
                HasAvailableSeat = false;
            }
        }
        else
        {
            throw new InvalidOperationException("full");
        }
    }

    public void Leave(Guid userId)
    {
        if (!_seatedPlayers.Any(user => user.Id == userId))
        {
            throw new InvalidOperationException();
        }

        if (OwnerPlayerId == userId)
        {
            if (_seatedPlayers.Count == 1)
            {
                _seatedPlayers.Remove(_seatedPlayers.Find(x => x.Id == userId));
                HasAvailableSeat = true;
                return;
            }
            Guid newOwnerId = SeatedPlayers[1].Id;
            OwnerPlayerId = newOwnerId;
            _seatedPlayers.Remove(_seatedPlayers.Find(x => x.Id == userId));
            HasAvailableSeat = true;
        }
        else
        {
            _seatedPlayers.Remove(_seatedPlayers.Find(x => x.Id == userId));
            HasAvailableSeat = true;
        }
    }

    public void CreateSchool(HumanPlayer player)
    {
        IPawn[] students = new IPawn[4];
        ICoordinate position = player.Direction == Direction.North ? new Coordinate(4, 2) : new Coordinate(0, 2);
        IPawn master = new Pawn(Guid.NewGuid(), player.Id, PawnType.Master, position);
        for (int i = 0; i < 4; i++)
        {
            students[i] = new Pawn(Guid.NewGuid(), player.Id, PawnType.Student, position);
        }
        player.AddSchool(new School(master, students));
        return;
    }
}