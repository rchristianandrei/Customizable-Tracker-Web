using backend.DTOs.TrackerComponent;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TrackerComponentController : ControllerBase
{
    public readonly static List<TrackerBaseComponent> components = [];

    [HttpGet("tracker/{trackerId}")]
    public IActionResult GetByTracker(int trackerId)
    {
        return Ok(components.FindAll(c => c.TrackerId == trackerId));
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        return Ok(components.Find(c => c.Id == id));
    }

    [HttpPost("textbox")]
    public IActionResult PostTextBox([FromBody] CreateTextboxDto value)
    {
        var tracker = TrackerController.trackers.Find(t => t.Id == value.TrackerId);
        if (tracker == null) return NotFound("Tracker not found");

        var textbox = new TextboxComponent()
        {
            Id = components.Count + 1,
            Name = "Textbox",
            DateTimeCreated = DateTime.Now,
            TrackerId = value.TrackerId,    
        };

        components.Add(textbox);

        return Ok(textbox);
    }

    [HttpPost("dropdownbox")]
    public IActionResult PostDropdownbox([FromBody] CreateDropdownboxDto value)
    {
        var tracker = TrackerController.trackers.Find(t => t.Id == value.TrackerId);
        if (tracker == null) return NotFound("Tracker not found");

        var dropdownbox = new DropdownboxComponent()
        {
            Id = components.Count + 1,
            Name = "Dropdownbox",
            DateTimeCreated = DateTime.Now,
            TrackerId = value.TrackerId,
        };

        components.Add(dropdownbox);

        return Ok(dropdownbox);
    }

    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody] string value)
    //{
    //}

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var component = components.Find((t) => t.Id == id);

        if (component == null) return NotFound();

        components.Remove(component);

        return NoContent();
    }
}
