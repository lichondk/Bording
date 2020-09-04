using BordingCore.Models;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BordingCore.Hubs
{
    public class ProductHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", "test", "m");
        }

        //public async Task sendProduct(Product product)
        //{
        //    var json = JsonConvert.SerializeObject(product);
        //    await Clients.All.SendAsync("ReceiveProduct", "test");
        //}
    }
}
