using backend.Models;

namespace backend.Interfaces;

public interface ITextboxRepo : IBaseRepo<TextboxComponent>
{
    Task<List<TextboxComponent>> GetAllByTrackerId(int trackerId);
}