using backend.DTOs.TrackerComponent;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TrackerComponentController(ITrackerRepo trackerRepo, ITrackerComponentRepo trackerComponentRepo) : ControllerBase
{
    private readonly ITrackerRepo trackerRepo = trackerRepo;
    private readonly ITrackerComponentRepo trackerComponentRepo = trackerComponentRepo;

    [HttpGet("tracker/{trackerId}")]
    public IActionResult GetByTracker(int trackerId)
    {
        return Ok(trackerComponentRepo.GetAllByTrackerId(trackerId));
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        return Ok(trackerComponentRepo.GetById(id));
    }

    [HttpPost("textbox")]
    public IActionResult PostTextbox([FromBody] CreateTextboxDto value)
    {
        var tracker = this.trackerRepo.GetById(value.TrackerId);
        if (tracker == null) return NotFound("Tracker not found");

        var textbox = new TextboxComponent()
        {
            Name = "Textbox",
            DateTimeCreated = DateTime.Now,
            TrackerId = value.TrackerId,    
        };

        trackerComponentRepo.Create(textbox);

        return Ok(textbox);
    }

    [HttpPut("textbox/{id}")]
    public IActionResult PutTextbox(int id, [FromBody] UpdateTextboxDto value)
    {
        var component = trackerComponentRepo.GetById(id);
        if(component == null) return NotFound();

        component.Name = value.Name;

        return Ok();
    }

    [HttpPost("dropdownbox")]
    public IActionResult PostDropdownbox([FromBody] CreateDropdownboxDto value)
    {
        var tracker = this.trackerRepo.GetById(value.TrackerId);
        if (tracker == null) return NotFound("Tracker not found");

        var dropdownbox = new DropdownboxComponent()
        {
            Name = "Dropdownbox",
            DateTimeCreated = DateTime.Now,
            TrackerId = value.TrackerId,
        };

        trackerComponentRepo.Create(dropdownbox);

        return Ok(dropdownbox);
    }

    [HttpPut("dropdownbox/{id}")]
    public IActionResult PutDropdownbox(int id, [FromBody] UpdateTextboxDto value)
    {
        var component = trackerComponentRepo.GetById(id);
        if (component == null) return NotFound();

        component.Name = value.Name;

        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var component = trackerComponentRepo.GetById(id);

        if (component == null) return NotFound();

        trackerComponentRepo.Delete(component);

        return NoContent();
    }
}
