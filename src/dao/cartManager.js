class cartDBManager {
  constructor(productService) {
    this.productService = productService;
  }

  async getProductsFromCartByID(cid) {
    
    return {
      message: "Función funcionando: obtiene el carrito por ID " + cid
    };
  }
}

export default cartDBManager;