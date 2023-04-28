namespace TRockApi.Response {
    public interface IRegistrationResponse {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }
    }
}