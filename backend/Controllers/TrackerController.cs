using backend.DTOs;
using backend.DTOs.Tracker;
using backend.Interfaces;
using backend.Mapper;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TrackerController(ITrackerRepo trackerRepo, ITextboxRepo textboxRepo) : ControllerBase
{
    private readonly ITrackerRepo trackerRepo = trackerRepo;
    private readonly ITextboxRepo textboxRepo = textboxRepo;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var trackers = await this.trackerRepo.GetAll();
        return Ok(trackers);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var tracker = await this.trackerRepo.GetById(id);

        if (tracker == null) return NotFound();

        var textboxes = await this.textboxRepo.GetAllByTrackerId(tracker.Id);

        var components = new List<BaseComponentDto>();
        components.AddRange([.. textboxes.Select(t => t.ToDto())]);

        var dto = new TrackerDto
        {
            Id = tracker.Id,
            Name = tracker.Name,
            DateTimeCreated = tracker.DateTimeCreated,
            Components = components
        };

        return Ok(dto);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateTrackerDto value)
    {
        var tracker = new Tracker()
        {
            Name = value.Name,
            DateTimeCreated = DateTime.Now,
        };

        await this.trackerRepo.Create(tracker);

        return Ok(tracker);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] UpdateTrackerDto value)
    {
        var tracker = await this.trackerRepo.GetById(id);
        if (tracker == null) return NotFound();

        tracker.Name = value.Name;

        await this.trackerRepo.Save();

        return Ok(tracker);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var tracker = await this.trackerRepo.GetById(id);

        if (tracker == null) return NotFound();

        await this.trackerRepo.Delete(tracker);

        return NoContent();
    }
}
