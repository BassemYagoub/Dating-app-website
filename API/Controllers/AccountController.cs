using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers {

    public class AccountController(DataContext context, 
        ITokenService tokenService,
        IMapper mapper
        ) : BaseApiController {
        
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO) {
            if (await UserExists(registerDTO.Username)) {
                return BadRequest("Username is taken");
            }

            using HMACSHA512 hmac = new HMACSHA512();

            AppUser user = mapper.Map<AppUser>(registerDTO);
            user.UserName = registerDTO.Username.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password));
            user.PasswordSalt = hmac.Key;

            context.Users.Add(user);
            await context.SaveChangesAsync();

            UserDTO userDto = new UserDTO {
                Username = user.UserName,
                KnownAs = user.KnownAs,
                Gender = user.Gender,
                Token = tokenService.CreateToken(user)
            };

            return userDto;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto) {
            AppUser? user = await context.Users
                .Include(user => user.Photos)
                .FirstOrDefaultAsync(user => user.UserName == loginDto.Username.ToLower());
            
            if(user == null) {
                return Unauthorized("Invalid Username");
            }

            using HMACSHA512 hmac = new HMACSHA512(user.PasswordSalt);
            byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computedHash.Length; i++) { 
                if (computedHash[i] != user.PasswordHash[i]) {
                    return Unauthorized("Invalid Password");
                }
            }
               
            UserDTO userDto = new UserDTO {
                Username = user.UserName,
                Token = tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender,
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
            };

            return userDto;
        }

        private async Task<bool> UserExists(string username) {
            return await context.Users.AnyAsync(user => user.UserName.ToLower() == username.ToLower());
        }
    }
}
