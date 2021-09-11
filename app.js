// all  html Collection 
const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');
const ProductQty = document.getElementById('product-qty');
const tableId = document.getElementById('show');
const addItem = () => {
    const productField = productName.value;
    const priceFiled = productPrice.value;
    const qtyField = ProductQty.value;
    productName.value = "";
    productPrice.value = "";
    ProductQty.value = "";
    // error handling
    if (!(productField && priceFiled && qtyField)) {
        alert('Please Input Field Not Empty');
        return;
    }
    // call set localStorage function 
    addToCart(productField, priceFiled, qtyField);
    // show data localStorage
    displayLocalstorage();
}
// check localStorage item 
const getCart = () => {
    const cart = localStorage.getItem('cart');
    let cartobject;
    if (cart) {
        cartobject = JSON.parse(cart);
    } else {
        cartobject = [];
    }
    return cartobject;
}
// set product localStorage
const addToCart = (name, price, qty) => {
    const cart = getCart();
    const existProduct = cart.find(p => p.name == name);
    if (existProduct) {
        const product = {
            name,
            price,
            qty: parseInt(existProduct.qty) + parseInt(qty)
        }
        const cartStringified = cart.filter(p => p.name != name);
        const newProducts = [...cartStringified, product];
        localStorage.setItem('cart', JSON.stringify(newProducts))
    } else {
        const product = {
            name,
            price,
            qty
        }
        const cartStringified = cart;
        const newProducts = [...cartStringified, product];
        localStorage.setItem('cart', JSON.stringify(newProducts))
    }

    displayLocalstorage();
}
// show data localStorage
const displayLocalstorage = () => {
    const cart = getCart();
    tableId.textContent = "";
    cart.forEach(product => {
        const tableCreate = document.createElement('tr');
        tableCreate.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.qty}</td>
                    `;
        tableId.appendChild(tableCreate);
    })
}
// remove all data localStorage
const placeOrder = () => {
    tableId.textContent = "";
    localStorage.removeItem('cart');
}
displayLocalstorage();
// console.log('%c This is my Console style' , 'background: hotpink; color: white; font-size: 45px; transform: skew(245deg); padding: 5px; border-radius: 5px 75px 28px')