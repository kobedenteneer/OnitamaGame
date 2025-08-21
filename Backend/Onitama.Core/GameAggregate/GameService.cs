using Onitama.Core.GameAggregate.Contracts;
using Onitama.Core.PlayerAggregate;
using Onitama.Core.PlayerAggregate.Contracts;
using Onitama.Core.SchoolAggregate.Contracts;
using Onitama.Core.Util;
using Onitama.Core.Util.Contracts;

namespace Onitama.Core.GameAggregate;

internal class GameService : IGameService
{
    private IGameRepository _gameRepository;

    public GameService(IGameRepository gameRepository)
    {
        _gameRepository = gameRepository;
    }

    public IGame GetGame(Guid gameId)
    {
       return _gameRepository.GetById(gameId);
    }

    public IReadOnlyList<IMove> GetPossibleMovesForPawn(Guid gameId, Guid playerId, Guid pawnId, string moveCardName)
    {
        return GetGame(gameId).GetPossibleMovesForPawn(playerId, pawnId, moveCardName);
    }
    
    public IReadOnlyList<IMove> GetAllPossibleMovesFor(Guid gameId, Guid playerId)
    {
        return GetGame(gameId).GetAllPossibleMovesFor(playerId);
    }

    public void MovePawn(Guid gameId, Guid playerId, Guid pawnId, string moveCardName, ICoordinate to)
    {
        GetGame(gameId).MovePawn(playerId, pawnId, moveCardName, to);
    }

    public void SkipMovementAndExchangeCard(Guid gameId, Guid playerId, string moveCardName)
    {
        throw new NotImplementedException(
            "TODO: use the constructor-injected repository to retrieve the game and skip a movement for that game");
    }
}