using System.ComponentModel.DataAnnotations;

namespace API.DTOs {
    public class RegisterDTO {
        [Required]
        [MaxLength(100)]
        public string Username {  get; set; } = string.Empty;
        
        [Required]
        [StringLength(15, MinimumLength = 3)]
        public string Password { get; set; } = string.Empty;
    }
}
