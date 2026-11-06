"use strict";

let PRODUCTS = [];
let activeCategory = "All";

const grid = document.getElementById("product-grid");
const search = document.getElementById("search");

const icons = {
  Development: "⌘",
  Security: "🔐",
  Automation: "⚡",
  Business: "▦",
  Analytics: "◉",
  Design: "◫"
};

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function render() {
  if (!grid || !search) return;

  const query = (search.value || "").toLowerCase().trim();

  const items = PRODUCTS.filter(product => {
    const categoryMatch =
      activeCategory === "All" ||
      product.category === activeCategory;

    const searchableText = [
      product.name,
      product.description,
      product.category,
      ...(Array.isArray(product.features) ? product.features : [])
    ].join(" ").toLowerCase();

    return categoryMatch && searchableText.includes(query);
  });

  if (!items.length) {
    grid.innerHTML =
      '<div class="empty">No products match your search.</div>';
    return;
  }

  grid.innerHTML = items.map(product => {
    const comingSoon = product.status === "coming_soon";
    const icon = product.icon  icons[product.category]  "✦";
    const price = Number(product.price);
    const formattedPrice = Number.isFinite(price)
      ? price.toFixed(2)
      : "Contact us";

    return 
      <article class="product">
        <div class="product-top">
          <span class="pill">${esc(product.category)}</span>
          <span class="product-icon">${esc(icon)}</span>
        </div>

        <h3>${esc(product.name)}</h3>

        <p>${esc(product.description)}</p>

        <div class="product-bottom">
          <div class="price">
            ${formattedPrice}
            <small>${esc(product.currency || "USD")}</small>
          </div>

          <button
            class="buy"
            type="button"
            disabled
            title="This product is not available yet"
          >
            ${comingSoon ? "Coming Soon" : "Checkout unavailable"}
          </button>
        </div>
      </article>
    ;
  }).join("");
}

async function init() {
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  try {
    const response = await fetch("products.json", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Could not load products.");
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid product catalog.");
    }

    PRODUCTS = data;
    render();

  } catch (error) {
    console.error("DevMarket catalog error:", error);

    if (grid) {
      grid.innerHTML =
        '<div class="empty">Products could not be loaded. Please refresh.</div>';
    }
  }
}

if (search) {
  search.addEventListener("input", render);
}

document.querySelectorAll(".cat").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".cat.active")?.classList.remove("active");

    button.classList.add("active");
    activeCategory = button.dataset.cat || "All";

    render();
  });
});

init();
