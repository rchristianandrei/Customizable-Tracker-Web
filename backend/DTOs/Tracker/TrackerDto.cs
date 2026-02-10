using backend.Models;

namespace backend.DTOs.Tracker;

public class TrackerDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public List<TrackerBaseComponent> Components { get; set; } = [];

    public DateTime DateTimeCreated { get; set; }
}
