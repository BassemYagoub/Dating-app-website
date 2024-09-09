using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace API.Data {
    public class Seed {
        public static async Task SeedUsers(UserManager<AppUser> userManager) {
            if (await userManager.Users.AnyAsync()) {
                return;
            }
            string userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
            JsonSerializerOptions options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            List<AppUser>? users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);
            
            if(users == null) {
                return;
            }

            foreach (AppUser user in users) {
                user.UserName = user.UserName!.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}
