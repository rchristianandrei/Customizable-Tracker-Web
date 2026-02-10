namespace backend.Models;

public abstract class TrackerBaseComponent
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Type { get; set; } = string.Empty;

    public int Width { get; set; } = 200;

    public int X { get; set; } = 0;

    public int Y { get; set; } = 0;

    public Tracker? Tracker { get; set; }

    public int TrackerId { get; set; }
}
