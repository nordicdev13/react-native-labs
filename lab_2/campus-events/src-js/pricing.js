const { findEventById } = require('./events');

/**
 * Розраховує вартість групової реєстрації на обрані події.
 * @param {Array} events Масив доступних подій
 * @param {string[]} selectedIds Масив ID обраних подій
 * @param {number} groupSize Кількість осіб у групі (від 1 до 30)
 * @returns {{ subtotal: number, discount: number, total: number }}
 */
function calculateRegistration(events, selectedIds, groupSize) {
  if (!Number.isInteger(groupSize) || groupSize < 1 || groupSize > 30) {
    throw new Error('Кількість учасників має бути цілим числом від 1 до 30');
  }

  let priceSum = 0;

  for (const id of selectedIds) {
    const event = findEventById(events, id);

    if (!event) {
      throw new Error(`Подію з ID ${id} не знайдено`);
    }

    if (event.seatsLeft <= 0) {
      throw new Error(`На подію "${event.title}" немає вільних місць`);
    }

    priceSum += event.price;
  }

  const subtotal = priceSum * groupSize;

  // Визначення ставки знижки залежно від розміру групи
  let discountRate = 0;
  if (groupSize >= 10) {
    discountRate = 0.10; // 10% знижка для групи 10–30 осіб
  } else if (groupSize >= 5) {
    discountRate = 0.05; // 5% знижка для групи 5–9 осіб
  }

  const discount = Number((subtotal * discountRate).toFixed(2));
  const total = Number((subtotal - discount).toFixed(2));
  const roundedSubtotal = Number(subtotal.toFixed(2));

  return {
    subtotal: roundedSubtotal,
    discount,
    total,
  };
}

module.exports = { calculateRegistration };
