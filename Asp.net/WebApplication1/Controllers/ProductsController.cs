using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BordingCore.Data;
using BordingCore.Models;
using BordingCore.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace BordingCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly BordingCoreContext _context;
        public IHubContext<ProductHub> HubContext { get; set; }

        public ProductsController(BordingCoreContext context, IHubContext<ProductHub> hub)
        {
            _context = context;
            HubContext = hub;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProduct()
        {
            return await _context.Product.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(string id)
        {
            var product = await _context.Product.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(string id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<IActionResult> PostProduct([FromBody] IList<Product> products)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            foreach (Product p in products)
            {

                p.Id = p.CreateId();
                _context.Product.Add(p);
                await HubContext.Clients.All.SendAsync("ReceiveProduct", p);
            }

            await _context.SaveChangesAsync();
            return CreatedAtAction("GetProduct", new { id = products[0].Id }, products[0]);
        }

        // DELETE: api/Products/5
        [HttpDelete]
        public async void DeleteProduct()
        {

            _context.Database.ExecuteSqlCommand("TRUNCATE TABLE [Product]");
           // await _context.SaveChangesAsync();
        }

        private bool ProductExists(string id)
        {
            return _context.Product.Any(e => e.Id == id);
        }
    }
}
