using TRockApi.Handlers.Api;

namespace TRockTest.ProductOrders {
    public class StateCalculatorTest {
        
        private readonly IState _start = new Start();
        private readonly IState _doingTheThing = new DoingTheThing();
        private readonly IState _last = new Last();

        [Test]
        public void GoToNextStateWithoutTransitions() {
            EntityStateContext stateContext = CreateSimpleStateContext();

            stateContext.ChangeState(_doingTheThing);
            
            Assert.That(stateContext.CurrentState, Is.EqualTo(_doingTheThing));
        }
        
        
        [Test]
        public void CannotSkipState() {
            EntityStateContext stateContext = CreateSimpleStateContext();
            
            stateContext.ChangeState(_last);
            
            Assert.That(stateContext.CurrentState, Is.EqualTo(_start));
        }

        [Test]
        public void GoToNextStateWhenTransitionsAreValid() {
            EntityStateContext stateContext = new(_start);

            var startToDoTheThingTransition = new StateTransition(_start, _doingTheThing)
                .AddValidation(() => true)
                .AddValidation(() => true);
                
            stateContext.AddTransition(startToDoTheThingTransition);
            
                        
            stateContext.ChangeState(_doingTheThing);
            
            Assert.That(stateContext.CurrentState, Is.EqualTo(_doingTheThing));
        }

        [Test]
        public void DoNotGoToStateWhenAtLeastOneTransitionIsNotValid() {
            EntityStateContext stateContext = new(_start);

            var startToDoTheThingTransition = new StateTransition(_start, _doingTheThing)
                .AddValidation(() => true)
                .AddValidation(() => false);
                
            stateContext.AddTransition(startToDoTheThingTransition);

            stateContext.ChangeState(_doingTheThing);
            
            Assert.That(stateContext.CurrentState, Is.EqualTo(_start));
        }
        
        [Test]
        public void EntityCanGoThroughManyStates() {
            EntityStateContext stateContext = CreateSimpleStateContext();

            stateContext.ChangeState(_doingTheThing);
            Assert.That(stateContext.CurrentState, Is.EqualTo(_doingTheThing));
            
            stateContext.ChangeState(_last);
            Assert.That(stateContext.CurrentState, Is.EqualTo(_last));
        }

        private EntityStateContext CreateSimpleStateContext() {
            EntityStateContext stateContext = new(_start);

            var startToDoTheThingTransition = new StateTransition(_start, _doingTheThing);
            var doTheThingTransitionToLast = new StateTransition(_doingTheThing, _last);
            
            stateContext.AddTransition(startToDoTheThingTransition);
            stateContext.AddTransition(doTheThingTransitionToLast);

            return stateContext;
        }
    }
}