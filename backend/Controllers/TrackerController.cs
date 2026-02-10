using backend.DTOs.Tracker;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TrackerController : ControllerBase
{
    public static readonly List<Tracker> trackers = [];

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(trackers);
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var tracker = trackers.Find((t) => t.Id == id);

        if (tracker == null) return NotFound();

        var components = TrackerComponentController.components.FindAll(t => t.TrackerId == tracker.Id);
        tracker.Components = components;

        return Ok(tracker);
    }

    [HttpPost]
    public IActionResult Post([FromBody] CreateTrackerDto value)
    {
        var tracker = new Tracker()
        {
            Id = trackers.Count + 1,
            Name = value.Name,
            DateTimeCreated = DateTime.Now,
        };

        trackers.Add(tracker);

        return Ok(tracker);
    }

    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody] string value)
    //{
    //}

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var tracker = trackers.Find((t) => t.Id == id);

        if (tracker == null) return NotFound();

        trackers.Remove(tracker);

        return NoContent();
    }
}
