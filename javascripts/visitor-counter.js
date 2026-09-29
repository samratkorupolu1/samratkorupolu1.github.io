(function () {
  const greeting = document.getElementById("visitor-greeting");
  const countText = greeting?.querySelector("span:last-child");

  if (!greeting || !countText) return;

  const storageKey = "samrat-portfolio-visitor-count";
  const counterUrl = "https://counterapi.com/api/samratkorupolu1.github.io/view/portfolio?unique=true";

  function ordinal(value) {
    const number = Number(value);
    const lastTwo = number % 100;

    if (lastTwo >= 11 && lastTwo <= 13) return `${number}th`;

    switch (number % 10) {
      case 1: return `${number}st`;
      case 2: return `${number}nd`;
      case 3: return `${number}rd`;
      default: return `${number}th`;
    }
  }

  function showCount(value) {
    const number = Number(value);
    if (!Number.isFinite(number) || number < 1) return;
    countText.textContent = `Hello—you’re the ${ordinal(number)} visitor here. Glad you stopped by.`;
  }

  const storedCount = sessionStorage.getItem(storageKey);
  if (storedCount) {
    showCount(storedCount);
    return;
  }

  fetch(counterUrl, { headers: { Accept: "application/json" } })
    .then((response) => {
      if (!response.ok) throw new Error("Visitor counter unavailable");
      return response.json();
    })
    .then((data) => {
      showCount(data.value);
      sessionStorage.setItem(storageKey, String(data.value));
    })
    .catch(() => {
      countText.textContent = "Hello—glad you found your way here.";
    });
})();
