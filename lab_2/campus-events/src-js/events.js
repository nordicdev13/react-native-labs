/**
 * Список університетських подій
 */
const events = [
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
 * @param {Array} events Масив подій
 * @returns {Array} Відфільтрований масив відкритих подій
 */
function getOpenEvents(events) {
  return events.filter((event) => event.seatsLeft > 0);
}

/**
 * Повертає масив подій певної категорії.
 * @param {Array} events Масив подій
 * @param {string} category Категорія події
 * @returns {Array} Події заданої категорії
 */
function getEventsByCategory(events, category) {
  return events.filter((event) => event.category === category);
}

/**
 * Знаходить подію за унікальним ідентифікатором.
 * @param {Array} events Масив подій
 * @param {string} id Ідентифікатор події
 * @returns {Object|undefined} Знайдена подія або undefined
 */
function findEventById(events, id) {
  return events.find((event) => event.id === id);
}

/**
 * Повертає масив назв усіх подій.
 * @param {Array} events Масив подій
 * @returns {string[]} Масив назв подій
 */
function getEventTitles(events) {
  return events.map((event) => event.title);
}

/**
 * Додаткове завдання: реєструє учасника на подію зі зменшенням кількості місць.
 * @param {Object} attendee Об'єкт учасника
 * @param {Object} event Об'єкт події
 * @returns {Object} Оновлений об'єкт події
 */
function registerForEvent(attendee, event) {
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

module.exports = {
  events,
  getOpenEvents,
  getEventsByCategory,
  findEventById,
  getEventTitles,
  registerForEvent,
};
