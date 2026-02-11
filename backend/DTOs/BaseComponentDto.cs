using backend.DTOs.Textbox;
using System.Text.Json.Serialization;

namespace backend.DTOs;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(TextboxDto), "Textbox")]
[JsonDerivedType(typeof(DropdownDto), "Dropdown")]
public class BaseComponentDto
{
    public required int Id { get; set; }

    public required string Name { get; set; } = string.Empty;

    public required string Placeholder { get; set; } = string.Empty;

    public required int Width { get; set; }

    public required int X { get; set; }

    public required int Y { get; set; }
}
