import { CampusEvent, findEventById } from './events';

/**
 * Інтерфейс результату розрахунку вартості реєстрації
 */
export interface RegistrationResult {
  subtotal: number;
  discount: number;
  total: number;
}

/**
 * Розраховує вартість групової реєстрації на обрані події.
 * @param events Масив доступних подій
 * @param selectedIds Масив ID обраних подій
 * @param groupSize Кількість осіб у групі (ціле число від 1 до 30)
 * @returns Об'єкт із розрахованою базовою вартістю, знижкою та підсумком
 */
export function calculateRegistration(
  events: CampusEvent[],
  selectedIds: string[],
  groupSize: number,
): RegistrationResult {
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
    discountRate = 0.10; // 10% для групи від 10 до 30 осіб
  } else if (groupSize >= 5) {
    discountRate = 0.05; // 5% для групи від 5 до 9 осіб
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
