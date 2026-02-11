using backend.Data;
using backend.Interfaces;
using backend.Models;

namespace backend.Repositories;

public class TrackerComponentRepo(AppDbContext context) : BaseRepo<BaseComponent>(context), ITrackerComponentRepo
{

}
