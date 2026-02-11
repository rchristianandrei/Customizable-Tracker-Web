using backend.Data;
using backend.DTOs.TrackerComponent;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TextboxController(ITrackerRepo trackerRepo, ITextboxRepo textboxRepo) : ControllerBase
{
    private readonly ITrackerRepo trackerRepo = trackerRepo;
    private readonly ITextboxRepo textboxRepo = textboxRepo;

    [HttpGet("{trackerId}")]
    public async Task<IActionResult> GetAllByTrackerId(int trackerId)
    {
        var textboxes = await this.textboxRepo.GetAllByTrackerId(trackerId);

        return Ok(textboxes);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateTextboxDto value)
    {
        var tracker = await this.trackerRepo.GetById(value.TrackerId);
        if (tracker == null) return NotFound("Tracker not found");

        var textbox = new TextboxComponent()
        {
            Name = "Textbox",
            DateTimeCreated = DateTime.Now,
            TrackerId = value.TrackerId,
        };

        await this.textboxRepo.Create(textbox);

        return Ok();
    }

    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }
}
