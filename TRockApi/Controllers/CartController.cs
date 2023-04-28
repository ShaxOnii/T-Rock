using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;
using TRockApi.Response;

namespace TRockApi.Controllers {
    
    [Authorize]
    [ApiController]
    [Route("/api/[controller]")]
    public class CartController : ControllerBase {

        private readonly ICartRepository _cartRepository;
        private readonly IUserRepository _userRepository;

        public CartController(ICartRepository cartRepository, IUserRepository userRepository) {
            _cartRepository = cartRepository;
            _userRepository = userRepository;
        }

        
        [HttpGet, Authorize]
        public async Task<CartResponse> GetCart() {
            var user = GetAuthorizedUser();

            var cartForUser = _cartRepository.FindCartByUser(user.Id);

            if (cartForUser == null) {
                return new CartResponse();
            }

            return CartResponse.FromModel(cartForUser);
        }

        
        [HttpPost("change")]
        public async Task<CartResponse> ChangeCart() {
            
            
            return new CartResponse();
        }

        private User GetAuthorizedUser() {
          var username =  User.Identity!.Name;

          if (username == null) {
              throw new Exception("User identity not exits.");
          }
          
          var authorizedUser = _userRepository.FindByLogin(username).Result;
          
          if (authorizedUser == null) {
              throw new Exception($"User with name '{username}' not found.");
          }
          
          return authorizedUser;
        }
    }
}