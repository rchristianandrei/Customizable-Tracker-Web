using backend.Data;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public abstract class BaseRepo<T>(AppDbContext context) : IBaseRepo<T> where T : class
{
    protected readonly AppDbContext context = context;
    protected readonly DbSet<T> collection = context.Set<T>();

    public async Task<List<T>> GetAll()
    {
        return await this.collection.ToListAsync();
    }

    public async Task<T?> GetById(int id)
    {
        return await this.collection.FindAsync(id);
    }

    public async Task Create(T item)
    {
        await this.collection.AddAsync(item);
        await this.context.SaveChangesAsync();
    }

    public async Task Save()
    {
        await this.context.SaveChangesAsync();
    }

    public async Task Delete(T item)
    {
        this.collection.Remove(item);
        await this.context.SaveChangesAsync();
    }
}
