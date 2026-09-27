import { describe, expect, test } from '@jest/globals';
import { calculateRegistration } from '../src/pricing';
import { CampusEvent } from '../src/events';

describe('Модуль pricing: розрахунок вартості групової реєстрації', () => {
  const mockEvents: CampusEvent[] = [
    {
      id: 'free-lecture',
      title: 'Безкоштовна лекція',
      startsAt: new Date(),
      seatsLeft: 20,
      category: 'lecture',
      price: 0,
    },
    {
      id: 'paid-workshop-1',
      title: 'Воркшоп 1',
      startsAt: new Date(),
      seatsLeft: 15,
      category: 'workshop',
      price: 100,
    },
    {
      id: 'paid-workshop-2',
      title: 'Воркшоп 2',
      startsAt: new Date(),
      seatsLeft: 10,
      category: 'workshop',
      price: 150,
    },
    {
      id: 'full-event',
      title: 'Заповнена подія',
      startsAt: new Date(),
      seatsLeft: 0,
      category: 'meetup',
      price: 50,
    },
  ];

  test('правильно обчислює вартість без знижки для групи менше 5 осіб (знижка 0%)', () => {
    // 3 особи, 1 подія по 100 грн = 300 грн
    const result = calculateRegistration(mockEvents, ['paid-workshop-1'], 3);

    expect(result.subtotal).toBe(300);
    expect(result.discount).toBe(0);
    expect(result.total).toBe(300);
  });

  test('застосовує 5% знижку для групи від 5 до 9 осіб', () => {
    // 6 осіб, подія по 100 грн = subtotal 600, discount 30, total 570
    const result = calculateRegistration(mockEvents, ['paid-workshop-1'], 6);

    expect(result.subtotal).toBe(600);
    expect(result.discount).toBe(30);
    expect(result.total).toBe(570);
  });

  test('застосовує 10% знижку для групи від 10 до 30 осіб', () => {
    // 10 осіб, подія 1 (100) + подія 2 (150) = 250 * 10 = 2500, discount 250, total 2250
    const result = calculateRegistration(
      mockEvents,
      ['paid-workshop-1', 'paid-workshop-2'],
      10,
    );

    expect(result.subtotal).toBe(2500);
    expect(result.discount).toBe(250);
    expect(result.total).toBe(2250);
  });

  test('правильно рахує безкоштовні події', () => {
    const result = calculateRegistration(mockEvents, ['free-lecture'], 10);

    expect(result.subtotal).toBe(0);
    expect(result.discount).toBe(0);
    expect(result.total).toBe(0);
  });

  test('кидає помилку, якщо groupSize менше 1 або більше 30', () => {
    expect(() =>
      calculateRegistration(mockEvents, ['paid-workshop-1'], 0),
    ).toThrow('Кількість учасників має бути цілим числом від 1 до 30');

    expect(() =>
      calculateRegistration(mockEvents, ['paid-workshop-1'], 31),
    ).toThrow('Кількість учасників має бути цілим числом від 1 до 30');

    expect(() =>
      calculateRegistration(mockEvents, ['paid-workshop-1'], -5),
    ).toThrow('Кількість учасників має бути цілим числом від 1 до 30');
  });

  test('кидає помилку, якщо groupSize не є цілим числом', () => {
    expect(() =>
      calculateRegistration(mockEvents, ['paid-workshop-1'], 3.5),
    ).toThrow('Кількість учасників має бути цілим числом від 1 до 30');
  });

  test('кидає помилку, якщо передано невідомий ID події', () => {
    expect(() =>
      calculateRegistration(mockEvents, ['unknown-id'], 2),
    ).toThrow('Подію з ID unknown-id не знайдено');
  });

  test('кидає помилку, якщо на обрану подію немає вільних місць (seatsLeft = 0)', () => {
    expect(() =>
      calculateRegistration(mockEvents, ['full-event'], 2),
    ).toThrow('На подію "Заповнена подія" немає вільних місць');
  });
});
