using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BordingCore.Models;

namespace BordingCore.Data
{
    public class BordingCoreContext : DbContext
    {
        public BordingCoreContext (DbContextOptions<BordingCoreContext> options)
            : base(options)
        {
        }

        public DbSet<BordingCore.Models.Product> Product { get; set; }
    }
}
