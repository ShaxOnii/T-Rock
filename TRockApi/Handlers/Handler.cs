using System;
using TRockApi.Utils.Errors;

namespace TRockApi.Handlers {
    public abstract class Handler {
        
        protected void Validate(bool predicate, Error error) {
            if (!predicate) {
                throw error;
            }
        }

    }
}