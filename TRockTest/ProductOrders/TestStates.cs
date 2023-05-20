using System.Collections.Generic;
using TRockApi.Handlers.Api;

namespace TRockTest.ProductOrders {
    sealed class Start : IState {
        private IEnumerable<IState> NextStates() => new List<IState> {new DoingTheThing()};

        public string Name() => "Start";
    }

    sealed class DoingTheThing : IState {
        private IEnumerable<IState> NextStates() => new List<IState> {new Last()};

        public string Name() => "DoingTheThing";
    }

    sealed class Last : IState {
        private IEnumerable<IState> NextStates() => new List<IState>();

        public string Name() => "Last";
    }
}