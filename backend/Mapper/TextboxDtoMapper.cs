using backend.DTOs.Textbox;
using backend.Models;

namespace backend.Mapper;

public static class TextboxDtoMapper
{
    public static TextboxDto ToDto(this TextboxComponent textbox)
    {
        return new TextboxDto
        {
            Id = textbox.Id,
            Name = textbox.Name,
            Placeholder = textbox.Placeholder,
            Width = textbox.Width,
            X = textbox.X,
            Y = textbox.Y,
            MaxLength = textbox.MaxLength,
        };
    }
}
