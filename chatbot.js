<div id="dm-messages" aria-live="polite"></div>

      <div id="dm-quick">
        <button class="dm-quick-btn" data-question="Show me your products">Products</button>
        <button class="dm-quick-btn" data-question="How do payments work?">Payments</button>
        <button class="dm-quick-btn" data-question="I need support">Support</button>
      </div>

      <form id="dm-form">
        <input id="dm-input" placeholder="Write your message..." autocomplete="off" aria-label="Your message">
        <button id="dm-send" type="submit">Send</button>
      </form>

      <div class="dm-footer">
        Automated assistant · Contact: codepilota@gmail.com
      </div>
    </section>
  `;

  document.body.appendChild(root);

  const panel = document.getElementById("dm-panel");
  const messages = document.getElementById("dm-messages");
  const input = document.getElementById("dm-input");

  function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = "dm-message " + type;
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function answer(message) {
    const text = message.toLowerCase();

    if (/hello|hi|hey|pershendetje|tung/.test(text)) {
      return "Welcome to DevMarket AI! How can I help you today?";
    }

    if (/product|produkte|catalog|marketplace/.test(text)) {
      return "Explore our digital products:\n\n• AI Code Review — $49\n• Website Security Audit — $59\n• API Testing Toolkit — $69\n• Python Automation — $39\n• CI/CD Automation — $79\n• Performance Analyzer — $49\n• SaaS Starter Kit — $129\n• Dashboard Templates — $39\n• Database Backup — $49\n• Business API Integration — $89\n\nVisit the Marketplace on our homepage.";
    }

    if (/price|cost|cmim|sa kushton/.test(text)) {
      return "Our listed product prices currently range from $39 to $129 USD. Product availability is shown in the marketplace.";
    }

    if (/payment|pay|pages|usdt|checkout/.test(text)) {
      return "Checkout is not yet enabled. Please do not send payment until official checkout instructions are available.";
    }

    if (/download|delivery|access|shkark/.test(text)) {
      return "Digital downloads are not enabled yet. Contact our team for product availability.";
    }

    if (/support|help|contact|email|ndihm/.test(text)) {
      return "Our support email is codepilota@gmail.com. Send us your question and our team can assist you.";
    }

    if (/security|secure|privacy|safe/.test(text)) {
      return "We take customer trust seriously. Please review our Privacy Policy and Terms pages when they are available.";
    }

    if (/thank|thanks|faleminderit/.test(text)) {
      return "You're welcome! Thank you for visiting DevMarket AI.";
    }

    return "Thanks for your message! I can help with products, prices, payments and support. For questions requiring a human response, email codepilota@gmail.com.";
  }

  function sendMessage(message) {
    const clean = message.trim();
    if (!clean) return;

    addMessage(clean, "dm-user");
    input.value = "";

    window.setTimeout(() => {
      addMessage(answer(clean), "dm-bot");
    }, 450);
  }

  document.getElementById("dm-launcher").addEventListener("click", () => {
    panel.classList.add("dm-open");
    input.focus();

    if (!messages.children.length) {
      addMessage(
        "Welcome to DevMarket AI! 👋\nI'm your automated assistant, available 24/7. Ask me about our products, prices or support.",
        "dm-bot"
      );
    }
  });

  document.getElementById("dm-close").addEventListener("click", () => {
    panel.classList.remove("dm-open");
  });

  document.getElementById("dm-form").addEventListener("submit", event => {
    event.preventDefault();
    sendMessage(input.value);
  });

  document.querySelectorAll(".dm-quick-btn").forEach(button => {
    button.addEventListener("click", () => {
      sendMessage(button.dataset.question || "");
    });
  });
})();<script src="chatbot.js"></script>
