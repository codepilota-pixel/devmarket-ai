
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

function toast(message) {
  const element = document.getElementById("toast");
  element.textContent = message;
  element.classList.add("show");

  setTimeout(() => {
    element.classList.remove("show");
  }, 3000);
}

function render() {
  const query = (search.value || "").toLowerCase().trim();

  const items = PRODUCTS.filter(product => {
    const categoryMatch =
      activeCategory === "All" ||
      product.category === activeCategory;

    const searchMatch =
      ${product.name} ${product.description} ${product.category}
        .toLowerCase()
        .includes(query);

    return categoryMatch && searchMatch;
  });

  if (!items.length) {
    grid.innerHTML =
      '<div class="empty">No products match your search.</div>';
    return;
  }

  grid.innerHTML = items.map(product => {
    const comingSoon = product.status === "coming_soon";

    return 
      <article class="product">
        <div class="product-top">
          <span class="pill">${esc(product.category)}</span>
          <span class="product-icon">
            ${esc(product.icon || icons[product.category] || "✦")}
          </span>
        </div>

        <h3>${esc(product.name)}</h3>

        <p>${esc(product.description)}</p>

        <div class="product-bottom">
          <div class="price">
            ${Number(product.price).toFixed(2)}
            <small>USDT</small>
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
  document.getElementById("year").textContent =
    new Date().getFullYear();

  try {
    const response = await fetch("/products.json");

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
    console.error(error);

    grid.innerHTML =
      '<div class="empty">Products could not be loaded. Please refresh.</div>';
  }
}

search.addEventListener("input", render);

document.querySelectorAll(".cat").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".cat.active")?.classList.remove("active");

    button.classList.add("active");
    activeCategory = button.dataset.cat;

    render();
  });
});

init();
