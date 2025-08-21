using System.Drawing;
using Onitama.Core.GameAggregate.Contracts;
using Onitama.Core.MoveCardAggregate;
using Onitama.Core.MoveCardAggregate.Contracts;
using Onitama.Core.PlayerAggregate;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.PlayMatAggregate;
using Onitama.Core.PlayMatAggregate.Contracts;
using Onitama.Core.SchoolAggregate;
using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.TableAggregate;
using Onitama.Core.TableAggregate.Contracts;
using Onitama.Core.Util.Contracts;
using Onitama.Core.Util;
using System.Numerics;

namespace Onitama.Core.GameAggregate;

internal class GameFactory : IGameFactory
{
    private readonly IMoveCardRepository _moveCardRepository;
    public GameFactory(IMoveCardRepository moveCardRepository)
    {
       _moveCardRepository = moveCardRepository;
    }

    public IGame CreateNewForTable(ITable table)
    {
        IPlayer[] players = table.SeatedPlayers.ToArray();
        Color[] colors = table.SeatedPlayers.Select(p => p.Color).ToArray();
        Random random = new Random();

        IMoveCard[] moveCards = _moveCardRepository.LoadSet(MoveCardSet.Original, colors);
        List<IMoveCard> selectedMoveCards = [];
        int randIndex;

        while (selectedMoveCards.Count < 5)
        {
            randIndex = random.Next(0, moveCards.Length);
            if (!selectedMoveCards.Contains(moveCards[randIndex]))
            {
                selectedMoveCards.Add(moveCards[randIndex]);
            }
        }
        Guid guid = Guid.NewGuid();
        PlayMat playmat = new PlayMat(table.Preferences.PlayerMatSize);

        IGame game = new Game(guid, playmat, players, selectedMoveCards[4]);
        
        
        for (int i = 0; i < table.SeatedPlayers.Count; i++)
        {
            SetPlayerCards(table.SeatedPlayers[i], selectedMoveCards);
            playmat.PositionSchoolOfPlayer(table.SeatedPlayers[i]);
        }
        return game;
    }
    public void SetPlayerCards(IPlayer player, List<IMoveCard> moveCards)
    {
        if (player.Direction == Direction.North)
        {
            for (int i = 0; i < 2; i++)
            {
                player.MoveCards.Add(moveCards[i]);
            }
            return;
        }
        for (int i = 2; i < 4; i++)
        {
            player.MoveCards.Add(moveCards[i]);
        }
        return;
    }
}