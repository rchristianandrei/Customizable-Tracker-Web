using backend.Enums;

namespace backend.Models;

public abstract class BaseComponent
{
    public int Id { get; set; }

    public int TrackerId { get; set; }
    public Tracker Tracker { get; set; } = null!;

    public abstract TrackerComponentEnums Type { get; }

    public string Name { get; set; } = string.Empty;

    public string Placeholder { get; set; } = string.Empty;

    public int Width { get; set; } = 200;

    public int X { get; set; } = 0;

    public int Y { get; set; } = 0;

    public bool IsRequired { get; set; } = false;

    public DateTime DateTimeCreated { get; set; }
}
