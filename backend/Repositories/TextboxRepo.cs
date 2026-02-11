using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class TextboxRepo(AppDbContext context) : BaseRepo<TextboxComponent>(context), ITextboxRepo
{
    public async Task<List<TextboxComponent>> GetAllByTrackerId(int trackerId)
    {
        return await this.collection.Where(c => c.TrackerId == trackerId).ToListAsync();
    }
}
