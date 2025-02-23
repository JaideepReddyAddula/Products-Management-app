async function getProductsList() {
    try {
        const response = await fetch('https://products-management-app.onrender.com/products', { method: 'GET' });
        const products = await response.json();

        displayProductsList(products);
    } catch (error) {
        console.log('Error fetching products:', error);
    }
}

getProductsList();

function displayProductsList(products) {
    var productsview = document.getElementById('products-list');
    var str = '';

    for (var i = 0; i < products.length; i++) {
        str += `
            <div class="productdetails">

                <div class="productimage">
                    <img src= ${products[i].imgSrc}>
                </div>

                <div class="productcontent">
                    <p><span>Name:</span> ${products[i].name}</p>
                    <p><span>Specifications:</span> ${products[i].specifications}</p>
                    <p><span>Price: ₹</span>${products[i].price}</p>
                    <p><span>Discount:</span> ${products[i].discount}%</p>
                    <p><span>Category:</span> ${products[i].category}</p>
                    <p><span>In Stock:</span> ${products[i].inStock ? 'Yes':'No'}</p>

                    <i id="edit" onclick="editProduct('${products[i].id}')" class="fa-solid fa-pen-to-square"></i>
                    <i id="delete" onclick="deleteProduct('${products[i].id}')" class="fa-solid fa-trash-can"></i>
                </div>
            </div>
        `;
    }
    productsview.innerHTML = str;
}

async function deleteProduct(productId) {
    try {
        await fetch('https://products-management-app.onrender.com/products/' + productId, { method: 'DELETE' });
        getProductsList();
        
    } catch (error) {
        console.log('Error deleting product:', error);
    }
}

function editProduct(productId) {
    window.location.href = `Edit Products.html?productId=${productId}`;
}
