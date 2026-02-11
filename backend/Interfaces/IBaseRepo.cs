using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IBaseRepo<T> where T : class
    {
        Task Create(T item);

        Task Save();

        Task Delete(T item);

        Task<List<T>> GetAll();

        Task<T?> GetById(int id);
    }
}