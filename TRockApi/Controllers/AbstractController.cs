using System;
using Microsoft.AspNetCore.Mvc;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;

namespace TRockApi.Controllers {

    public abstract class AbstractController : ControllerBase {
        private readonly IUserRepository _userRepository;

        protected AbstractController(IUserRepository userRepository) {
            _userRepository = userRepository;
        }

        protected User GetAuthorizedUser() {
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