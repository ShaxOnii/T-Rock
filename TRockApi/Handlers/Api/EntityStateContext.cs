using System.Collections.Generic;

namespace TRockApi.Handlers.Api {
    public class EntityStateContext {
        public IState CurrentState { get; private set; }

        private readonly Dictionary<string, StateTransition> _stateTransitions = new();

        public EntityStateContext(IState currentState) {
            CurrentState = currentState;
        }

        public void ChangeState(IState state) {
            var transitionKey = createTransitionKey(CurrentState, state);
            var transition = _stateTransitions.GetValueOrDefault(transitionKey);

            if (transition != null) {
                if (transition.IsTransitionValid()) {
                    CurrentState = transition.ToState;
                }
            }
        }

        public void AddTransition(StateTransition transition) {
            var transitionKey = createTransitionKey(transition.FromState, transition.ToState);
            _stateTransitions.Add(transitionKey, transition);
        }

        private string createTransitionKey(IState from, IState to) {
            return $"{from.Name()}->{to.Name()}";
        }
    }
}