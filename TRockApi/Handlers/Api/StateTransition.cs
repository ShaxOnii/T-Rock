using System;
using System.Collections.Generic;
using System.Linq;

namespace TRockApi.Handlers.Api {
    public class StateTransition {

        public IState FromState { get; }

        public IState ToState { get; }

        private readonly HashSet<Func<bool>> _transitionValidations = new();
        
        public StateTransition(IState from, IState to) {
            FromState = from;
            ToState = to;
        }

        public bool IsTransitionValid() {
            foreach (var validator in _transitionValidations) {
                if (!validator()) return false;
            }

            return true;
        }

        public StateTransition AddValidation(Func<bool> validator) {
            _transitionValidations.Add(validator);

            return this;
        }
        
    }
}