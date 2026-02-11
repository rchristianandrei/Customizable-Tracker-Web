using backend.Data;
using backend.Interfaces;
using backend.Models;

namespace backend.Repositories;

public class TrackerRepo(AppDbContext context) : BaseRepo<Tracker>(context), ITrackerRepo
{
    
}
