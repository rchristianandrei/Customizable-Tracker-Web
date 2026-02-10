namespace backend.DTOs.TrackerComponent;

public class UpdateBaseDto
{
    public string Type { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public int X { get; set; }

    public int Y { get; set; }
}