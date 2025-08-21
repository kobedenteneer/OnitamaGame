using Onitama.Core.TableAggregate.Contracts;
using Onitama.Core.UserAggregate;
using System.Linq;

namespace Onitama.Core.TableAggregate;

/// <inheritdoc cref="ITableFactory"/>
internal class TableFactory : ITableFactory
{
    public ITable CreateNewForUser(User user, TablePreferences preferences)
    {
        Guid guid = Guid.NewGuid();
        Table table = new Table(guid, preferences);
        table.Join(user);

        return table;
    }
}