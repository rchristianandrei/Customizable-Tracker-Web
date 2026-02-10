using backend.DTOs.Tracker;
using backend.Enums;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TrackerController(ITrackerRepo trackerRepo, ITrackerComponentRepo trackerComponentRepo) : ControllerBase
{
    private readonly ITrackerRepo trackerRepo = trackerRepo;
    private readonly ITrackerComponentRepo trackerComponentRepo = trackerComponentRepo;

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(this.trackerRepo.GetAll());
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var tracker = trackerRepo.GetById(id);

        if (tracker == null) return NotFound();

        var raw = trackerComponentRepo.GetAllByTrackerId(id);
        var components = new List<TrackerBaseComponent>();
        foreach(var comp in raw){
            if (comp.Type == TrackerComponentEnums.Textbox.ToString())
                components.Add((TextboxComponent)comp);
            else
                components.Add(comp);
        }
        tracker.Components = components;

        return Ok(tracker);
    }

    [HttpPost]
    public IActionResult Post([FromBody] CreateTrackerDto value)
    {
        var tracker = new Tracker()
        {
            Name = value.Name,
            DateTimeCreated = DateTime.Now,
        };

        this.trackerRepo.Create(tracker);

        return Ok(tracker);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] UpdateTrackerDto value)
    {
        var tracker = trackerRepo.GetById(id);
        if (tracker == null) return NotFound();

        tracker.Name = value.Name;

        trackerRepo.Update(tracker);

        return Ok(tracker);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var tracker = trackerRepo.GetById(id);

        if (tracker == null) return NotFound();

        this.trackerRepo.Delete(tracker);

        return NoContent();
    }
}
