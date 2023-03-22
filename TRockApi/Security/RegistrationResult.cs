using System;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;
using TRockApi.Models;
using TRockApi.Security.Errors;

namespace TRockApi.Security {
    public class RegistrationResult {

        public List<ILogicError> Errors { get; } = new();

        public User? RegisteredUser { get; set; }
        
        public void Validate(Func<bool> predicate, ILogicError error) {
            if (!predicate()) {
                AddValidationError(error);
            }
        }
        
        public void AddValidationError(ILogicError error) {
            Errors.Add(error);
        }
        
        public bool IsSuccess() {
            return Errors.IsNullOrEmpty();
        }

        public bool IsFailure() {
            return !IsSuccess();
        }
    }
}