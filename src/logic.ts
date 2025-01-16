type Product = {
    name: string;
    price: number;
};

function filterAndSortProducts(products: Product[]): Product[] {
    const uniqueProducts = Array.from(new Map(products.map(product => [product.name, product])).values());
    return uniqueProducts.sort((a, b) => a.price - b.price);
}

module.exports = { filterAndSortProducts };
