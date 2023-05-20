using System;

namespace TRockApi.Handlers.Api {

    public class ProductOrderStateNotExists : Exception {
        
    }

    public static class ProductOrderStates {
        public static IState FromString(string stateName) {
            switch (stateName) {
                case "WaitingForPayment": return new WaitingForPayment();
                case "DuringFulfillment": return new DuringFulfillment();
                case "Sent": return new Sent();
                case "Done": return new Done();
                default: throw new ProductOrderStateNotExists();
            }
        }
    }

    public sealed class WaitingForPayment : IState {
        public string Name() => "WaitingForPayment";
    }

    public sealed class DuringFulfillment : IState {
        public string Name() => "DuringFulfillment";
    }

    public sealed class Sent : IState {
        public string Name() => "Sent";
    }

    public sealed class Done : IState {
        public string Name() => "Done";
    }
}