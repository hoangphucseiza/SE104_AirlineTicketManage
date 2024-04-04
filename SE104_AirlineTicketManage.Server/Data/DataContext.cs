using Microsoft.EntityFrameworkCore;

namespace SE104_AirlineTicketManage.Server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
    }
}
