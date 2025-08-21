using Onitama.Core.GameAggregate;
using Onitama.Core.GameAggregate.Contracts;
using Onitama.Core.MoveCardAggregate.Contracts;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.TableAggregate.Contracts;
using Onitama.Core.UserAggregate;

namespace Onitama.Core.TableAggregate;

/// <inheritdoc cref="ITableManager"/>
internal class TableManager : ITableManager
{
    private ITableFactory _factory;
    private ITableRepository _repository;
    private IGameFactory _gamefactory;
    private IGameRepository _gamerepository;
    private IGamePlayStrategy _gamePlayStrategy;
    public TableManager(
        ITableRepository tableRepository, 
        ITableFactory tableFactory, 
        IGameRepository gameRepository,
        IGameFactory gameFactory,
        IGamePlayStrategy gamePlayStrategy)
    {
        _factory = tableFactory;
        _repository = tableRepository;
        _gamefactory = gameFactory;
        _gamerepository = gameRepository;
        _gamePlayStrategy = gamePlayStrategy;
    }

    public ITable AddNewTableForUser(User user, TablePreferences preferences)
    {
        ITable table = _factory.CreateNewForUser(user, preferences);
        _repository.Add(table);
        return table;        
    }

    public void JoinTable(Guid tableId, User user)
    {
        _repository.Get(tableId).Join(user);
    }

    public void LeaveTable(Guid tableId, User user)
    {
        var table = _repository.Get(tableId);
        var owner = table.OwnerPlayerId;
        if (table.SeatedPlayers.Count == 2)
        {
            table.Leave(user.Id);
        }
        else
        {
            table.Leave(user.Id);
            _repository.Remove(tableId);
        }
    }

    public void FillWithArtificialPlayers(Guid tableId, User user)
    {
        throw new NotImplementedException();
    }

    public IGame StartGameForTable(Guid tableId, User user)
    {
        var table = _repository.Get(tableId);
        if (table.OwnerPlayerId != user.Id)
        {
            throw new InvalidOperationException("Only the owner of the table can start the game.");
        }
        if (table.SeatedPlayers.Count != 2)
        {
            throw new InvalidOperationException("The table has not enough players seated to start the game.");
        };
        IGame createdGame = _gamefactory.CreateNewForTable(table);
        _gamerepository.Add(createdGame);
        table.GameId = createdGame.Id;
        _repository.Remove(table.Id);
        _repository.Add(table);

        return createdGame;
    }
}