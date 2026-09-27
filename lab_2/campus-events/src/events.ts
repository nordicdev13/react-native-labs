import { Attendee } from './attendee';

/**
 * Допустимі категорії університетських подій
 */
export type EventCategory = 'lecture' | 'workshop' | 'meetup';

/**
 * Інтерфейс сутності події
 */
export interface CampusEvent {
  id: string;
  title: string;
  startsAt: Date;
  seatsLeft: number;
  category: EventCategory;
  price: number;
  capacity?: number;
}

/**
 * Масив доступних подій
 */
export const events: CampusEvent[] = [
  {
    id: 'ux-lecture',
    title: 'Відкрита лекція: Мобільний UX',
    startsAt: new Date('2026-10-01T16:00:00'),
    seatsLeft: 20,
    category: 'lecture',
    price: 0,
    capacity: 50,
  },
  {
    id: 'ts-workshop',
    title: 'Практикум: TypeScript для початківців',
    startsAt: new Date('2026-10-05T14:30:00'),
    seatsLeft: 12,
    category: 'workshop',
    price: 150,
    capacity: 25,
  },
  {
    id: 'it-career-meetup',
    title: 'Мітап: Кар’єра в IT та стажування',
    startsAt: new Date('2026-10-10T18:00:00'),
    seatsLeft: 0,
    category: 'meetup',
    price: 50,
    capacity: 40,
  },
  {
    id: 'react-native-hackathon',
    title: 'Хакатон мобільної розробки',
    startsAt: new Date('2026-10-20T10:00:00'),
    seatsLeft: 8,
    category: 'workshop',
    price: 200,
    capacity: 30,
  },
];

/**
 * Повертає масив подій, на які ще є вільні місця.
 */
export function getOpenEvents(events: CampusEvent[]): CampusEvent[] {
  return events.filter((event) => event.seatsLeft > 0);
}

/**
 * Повертає масив подій певної категорії.
 */
export function getEventsByCategory(
  events: CampusEvent[],
  category: EventCategory,
): CampusEvent[] {
  return events.filter((event) => event.category === category);
}

/**
 * Знаходить подію за унікальним ідентифікатором.
 */
export function findEventById(
  events: CampusEvent[],
  id: string,
): CampusEvent | undefined {
  return events.find((event) => event.id === id);
}

/**
 * Повертає масив назв усіх подій.
 */
export function getEventTitles(events: CampusEvent[]): string[] {
  return events.map((event) => event.title);
}

/**
 * Додаткове завдання: реєструє учасника на подію зі зменшенням кількості місць.
 */
export function registerForEvent(
  attendee: Attendee,
  event: CampusEvent,
): CampusEvent {
  if (event.seatsLeft <= 0) {
    throw new Error(`На подію "${event.title}" немає вільних місць`);
  }

  const success = attendee.register(event.id);
  if (!success) {
    throw new Error(`Учасник "${attendee.name}" вже зареєстрований на подію "${event.title}"`);
  }

  event.seatsLeft -= 1;
  return event;
}
