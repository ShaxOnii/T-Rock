using System.Collections.Generic;

namespace TRockApi.Response {
    public class RegistrationFailureResponse : IRegistrationResponse {
        public IEnumerable<string> Errors { get; }

        public RegistrationFailureResponse(IEnumerable<string> errors) {
            Errors = errors;
        }
    }
}