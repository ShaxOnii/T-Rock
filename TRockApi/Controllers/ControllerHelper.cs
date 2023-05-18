using System;
using Microsoft.AspNetCore.Authorization;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;

namespace TRockApi.Controllers {

    [Authorize]
    public abstract class ControllerHelper {
        private readonly IUserRepository _userRepository;


        protected ControllerHelper(IUserRepository userRepository) {
            _userRepository = userRepository;
        }

        private User GetAuthorizedUser() {
            var username = User.Identity!.Name;

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