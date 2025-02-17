namespace TRockApi.Repositories.Models {
    public class CartItem {
        public int Id { get; set; }

        public Product Product { get; set; }

        public int Quantity { get; set; }

        public float TotalPrice() {
            return Product.Price * Quantity;
        }
    }

}