 cart = [];
let total = 0;

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
    });
    cartTotal.textContent = total;
}

function checkout() {
    // You can add code here to process the order, such as sending data to a server.
    alert('Order placed! Total: $' + total);
}

// You can also implement functions to remove items from the cart and handle other cart-related actions.
// Replace 'yourUserId' with the actual user ID of the logged-in user
const userId = 'yourUserId';

// Reference the Firestore collection that contains the orders
const ordersCollection = firebase.firestore().collection('orders');

// Query orders for the specific user
ordersCollection.where('userId', '==', userId).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // For each order document, display the ordered items
            const orderData = doc.data();
            const orderedItems = orderData.items; // 'items' is an array of ordered items
            
            orderedItems.forEach((item) => {
                // Render the ordered item on the cart page
                const orderedItemDiv = document.createElement('div');
                orderedItemDiv.textContent = `${item.productName} - Quantity: ${item.quantity} - Price: $${item.price}`;
                // Append 'orderedItemDiv' to your cart page's display area
            });
        });
    })
    .catch((error) => {
        console.error('Error retrieving orders:', error);
    });
