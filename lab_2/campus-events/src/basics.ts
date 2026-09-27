/**
 * Форматує назву події з категорією.
 * @param title Назва події
 * @param category Категорія події
 * @returns Відформатований рядок
 */
export function formatEventTitle(title: string, category: string): string {
  return `Подія: ${title} (${category})`;
}

/**
 * Перевіряє, чи відкрита реєстрація на подію.
 * @param seatsLeft Залишок місць
 * @returns true, якщо місць більше за нуль
 */
export function isRegistrationOpen(seatsLeft: number): boolean {
  return seatsLeft > 0;
}

/**
 * Виводить короткий стан реєстрації на подію у консоль.
 * @param title Назва події
 * @param category Категорія події
 * @param seatsLeft Залишок місць
 */
export function printEventSummary(
  title: string,
  category: string,
  seatsLeft: number,
): void {
  const formattedTitle = formatEventTitle(title, category);
  const status = isRegistrationOpen(seatsLeft)
    ? `відкрита (${seatsLeft} місць)`
    : 'закрита (місць немає)';

  console.log(`${formattedTitle} — Реєстрація: ${status}`);
}
