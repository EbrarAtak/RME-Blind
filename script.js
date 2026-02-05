const cart = {};
const cartList = document.getElementById("cart-items");
const totalEl = document.getElementById("total");

// LOGIN button
document.getElementById("loginBtn").addEventListener("click", () => {
    alert("Inloggen functie nog niet geïmplementeerd 😉");
});

// CHECKOUT button
document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (Object.keys(cart).length === 0) {
        alert("Je winkelmandje is leeg!");
        return;
    }
    alert("Uitchecken succesvol! Bedankt voor je aankoop ❤️");
    for (const item in cart) delete cart[item];
    renderCart();
});

// Hartjes functie
function createHeart(x, y) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1200);
}

// Cart button klik event
document.querySelectorAll(".cart-btn").forEach(btn => {
    btn.addEventListener("click", e => {
        const card = e.target.closest(".kaart");
        const name = card.querySelector("h3").textContent;
        const priceText = card.querySelector("p").textContent;
        const price = parseFloat(priceText.replace("€", "").replace(",", "."));

        if (!price) return;

        if (!cart[name]) {
            cart[name] = { price, qty: 1 };
        } else {
            cart[name].qty++;
        }
        renderCart();

        // Meerdere hartjes op willekeurige posities
        for (let i = 0; i < 5; i++) {
            const offsetX = Math.random() * 40 - 20; // kleine spreiding
            const offsetY = Math.random() * 20 - 10;
            createHeart(e.clientX + offsetX, e.clientY + offsetY);
        }
    });
});

// Render cart items
function renderCart() {
    cartList.innerHTML = "";
    let total = 0;
    let count = 0;

    for (const item in cart) {
        const { price, qty } = cart[item];
        total += price * qty;
        count += qty;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item} (€${price.toFixed(2)})
            <div>
                <button onclick="changeQty('${item}', -1)">−</button>
                ${qty}
                <button onclick="changeQty('${item}', 1)">+</button>
            </div>
        `;
        cartList.appendChild(li);
    }

    totalEl.textContent = total.toFixed(2);
}

function changeQty(item, amount) {
    cart[item].qty += amount;
    if (cart[item].qty <= 0) delete cart[item];
    renderCart();
}
