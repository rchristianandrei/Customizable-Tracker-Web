using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TrackerComponentController(ITrackerComponentRepo compRepo) : ControllerBase
{
    private readonly ITrackerComponentRepo compRepo = compRepo;

    //[HttpPost("dropdownbox")]
    //public IActionResult PostDropdownbox([FromBody] CreateDropdownboxDto value)
    //{
    //    var tracker = this.trackerRepo.GetById(value.TrackerId);
    //    if (tracker == null) return NotFound("Tracker not found");

    //    var dropdownbox = new DropdownboxComponent()
    //    {
    //        Name = "Dropdownbox",
    //        DateTimeCreated = DateTime.Now,
    //        TrackerId = value.TrackerId,
    //    };

    //    trackerComponentRepo.Create(dropdownbox);

    //    return Ok(dropdownbox);
    //}

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var component = await this.compRepo.GetById(id);

        if (component == null) return NotFound();

        await this.compRepo.Delete(component);

        return NoContent();
    }
}
