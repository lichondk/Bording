using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BordingCore.Models
{
    public class Product
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public int startNumber { get; set; }
        public int endNumber { get; set; }
        public int rowNumber { get; set; }


        public string CreateId()
        {
            Guid temp = Guid.NewGuid();
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array  
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(temp.ToString()));

                string hash = BitConverter.ToString(bytes);
                return hash;
            }
        }
    }
}
