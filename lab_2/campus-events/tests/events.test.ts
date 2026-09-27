import { describe, expect, test, beforeEach } from '@jest/globals';
import {
  CampusEvent,
  events,
  findEventById,
  getEventsByCategory,
  getEventTitles,
  getOpenEvents,
  registerForEvent,
} from '../src/events';
import { Attendee } from '../src/attendee';

describe('Модуль events та робота з подіями', () => {
  test('getOpenEvents не повертає подію з нульовою кількістю місць', () => {
    const openList = getOpenEvents(events);

    expect(openList.length).toBeGreaterThan(0);
    expect(openList.every((event) => event.seatsLeft > 0)).toBe(true);
    expect(openList.some((event) => event.id === 'it-career-meetup')).toBe(false);
  });

  test('getEventsByCategory повертає лише події потрібної категорії', () => {
    const workshops = getEventsByCategory(events, 'workshop');

    expect(workshops.length).toBe(2);
    expect(workshops.every((event) => event.category === 'workshop')).toBe(true);
  });

  test('findEventById повертає правильну подію за її ID', () => {
    const event = findEventById(events, 'ux-lecture');

    expect(event).toBeDefined();
    expect(event?.title).toBe('Відкрита лекція: Мобільний UX');
  });

  test('findEventById повертає undefined для невідомого ID', () => {
    const event = findEventById(events, 'non-existing-id');

    expect(event).toBeUndefined();
  });

  test('getEventTitles повертає масив рядків із назвами всіх подій', () => {
    const titles = getEventTitles(events);

    expect(titles).toHaveLength(events.length);
    expect(titles).toContain('Відкрита лекція: Мобільний UX');
    expect(titles).toContain('Практикум: TypeScript для початківців');
  });
});

describe('Клас Attendee', () => {
  let attendee: Attendee;

  beforeEach(() => {
    attendee = new Attendee('st-01', 'Іван Франко');
  });

  test('register додає новий eventId та повертає true', () => {
    const result = attendee.register('ux-lecture');

    expect(result).toBe(true);
    expect(attendee.registeredEventIds).toContain('ux-lecture');
    expect(attendee.isRegisteredFor('ux-lecture')).toBe(true);
  });

  test('register не додає той самий eventId двічі та повертає false', () => {
    attendee.register('ux-lecture');
    const duplicateResult = attendee.register('ux-lecture');

    expect(duplicateResult).toBe(false);
    expect(attendee.registeredEventIds).toHaveLength(1);
  });

  test('cancel видаляє eventId та повертає true, якщо подія була в списку', () => {
    attendee.register('ux-lecture');
    const cancelResult = attendee.cancel('ux-lecture');

    expect(cancelResult).toBe(true);
    expect(attendee.registeredEventIds).not.toContain('ux-lecture');
    expect(attendee.isRegisteredFor('ux-lecture')).toBe(false);
  });

  test('cancel повертає false для події, якої не було в списку', () => {
    const cancelResult = attendee.cancel('non-existing-event');

    expect(cancelResult).toBe(false);
  });
});

describe('Додаткове завдання: функція registerForEvent', () => {
  let testAttendee: Attendee;
  let sampleEvent: CampusEvent;

  beforeEach(() => {
    testAttendee = new Attendee('st-99', 'Марія');
    sampleEvent = {
      id: 'test-ev',
      title: 'Тестова подія',
      startsAt: new Date(),
      seatsLeft: 5,
      category: 'workshop',
      price: 100,
    };
  });

  test('успішна реєстрація зменшує seatsLeft на 1 та додає подію учаснику', () => {
    const updated = registerForEvent(testAttendee, sampleEvent);

    expect(updated.seatsLeft).toBe(4);
    expect(testAttendee.isRegisteredFor('test-ev')).toBe(true);
  });

  test('кидає помилку при спробі реєстрації на заповнену подію (seatsLeft = 0)', () => {
    sampleEvent.seatsLeft = 0;

    expect(() => registerForEvent(testAttendee, sampleEvent)).toThrow(
      'На подію "Тестова подія" немає вільних місць',
    );
  });

  test('кидає помилку при повторній реєстрації того самого учасника', () => {
    registerForEvent(testAttendee, sampleEvent);

    expect(() => registerForEvent(testAttendee, sampleEvent)).toThrow(
      'Учасник "Марія" вже зареєстрований на подію "Тестова подія"',
    );
  });
});
