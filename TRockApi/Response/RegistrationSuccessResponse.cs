namespace TRockApi.Response {
    public class RegistrationSuccessResponse : IRegistrationResponse {
        public int Id { get; set; }
        
        public string Username { get; set; }
     
        public string Email { get; set; }
    }
}