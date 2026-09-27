/**
 * Форматує назву події з категорією.
 * @param {string} title Назва події
 * @param {string} category Категорія події
 * @returns {string} Відформатований рядок
 */
function formatEventTitle(title, category) {
  return `Подія: ${title} (${category})`;
}

/**
 * Перевіряє, чи відкрита реєстрація на подію.
 * @param {number} seatsLeft Залишок місць
 * @returns {boolean} true, якщо місць більше за нуль
 */
function isRegistrationOpen(seatsLeft) {
  return seatsLeft > 0;
}

/**
 * Виводить короткий стан реєстрації на подію у консоль.
 * @param {string} title Назва події
 * @param {string} category Категорія події
 * @param {number} seatsLeft Залишок місць
 */
function printEventSummary(title, category, seatsLeft) {
  const formattedTitle = formatEventTitle(title, category);
  const status = isRegistrationOpen(seatsLeft)
    ? `відкрита (${seatsLeft} місць)`
    : 'закрита (місць немає)';

  console.log(`${formattedTitle} — Реєстрація: ${status}`);
}

module.exports = {
  formatEventTitle,
  isRegistrationOpen,
  printEventSummary,
};
