using System;
using System.Collections.Generic;

namespace TRockApi.Utils.Errors {
    public class MultipleErrors : Exception {
        public IEnumerable<Error> Errors { get; set; }

        public MultipleErrors(IEnumerable<Error> errors) {
            Errors = errors;
        }

    }
}