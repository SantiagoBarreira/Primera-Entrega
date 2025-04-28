class Product {
 id = 0;
    constructor({ title, description, code, price, status, stock, category, thumbnails }) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status !== undefined ? false : status;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    }

}

export default Product;