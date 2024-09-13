using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers {

    public class AccountController(UserManager<AppUser> userManager, 
        ITokenService tokenService,
        IMapper mapper
        ) : BaseApiController {
        
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO) {
            if (await UserExists(registerDTO.Username)) {
                return BadRequest("Username is taken");
            }

            AppUser user = mapper.Map<AppUser>(registerDTO);
            user.UserName = registerDTO.Username.ToLower();

            var result = await userManager.CreateAsync(user, registerDTO.Password);
            if (!result.Succeeded) {
                return BadRequest(result.Errors);
            }

            UserDTO userDto = new UserDTO {
                Username = user.UserName,
                KnownAs = user.KnownAs,
                Gender = user.Gender,
                Token = await tokenService.CreateToken(user)
            };

            return userDto;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto) {
            AppUser? user = await userManager.Users
                .Include(user => user.Photos)
                .FirstOrDefaultAsync(user => user.NormalizedUserName == loginDto.Username.ToUpper());
            
            if(user == null || user.UserName == null) {
                return Unauthorized("Invalid Username");
            }

            var result = await userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!result) {
                return Unauthorized("Invalid Password");
            }
               
            UserDTO userDto = new UserDTO {
                Username = user.UserName,
                Token = await tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender,
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url
            };

            return userDto;
        }

        private async Task<bool> UserExists(string username) {
            return await userManager.Users.AnyAsync(user => user.NormalizedUserName == username.ToUpper());
        }
    }
}
