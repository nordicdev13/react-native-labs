const { events, getOpenEvents, registerForEvent } = require('./events');
const { Attendee } = require('./attendee');
const { calculateRegistration } = require('./pricing');
const { printEventSummary } = require('./basics');

console.log('=== Campus Events (JavaScript версія) ===\n');

// 1. Виведення списку відкритих подій через for...of
console.log('--- 1. Відкриті події для реєстрації ---');
const openEvents = getOpenEvents(events);
for (const event of openEvents) {
  printEventSummary(event.title, event.category, event.seatsLeft);
}

// 2. Створення учасника та реєстрація на події
console.log('\n--- 2. Робота з учасником ---');
const student = new Attendee('st-101', 'Олександр Коваленко');
console.log(`Створено учасника: ${student.name} (ID: ${student.id})`);

console.log('Реєстрація на "ux-lecture":', student.register('ux-lecture')); // true
console.log('Реєстрація на "ts-workshop":', student.register('ts-workshop')); // true
console.log('Повторна реєстрація на "ux-lecture":', student.register('ux-lecture')); // false (дублікат)
console.log('Зареєстровані ID подій:', student.registeredEventIds);

// 3. Розрахунок групової реєстрації зі знижкою (10 осіб -> 10% знижка)
console.log('\n--- 3. Розрахунок вартості групової реєстрації ---');
const groupSize = 10;
const selectedEvents = ['ts-workshop', 'react-native-hackathon'];
const pricing = calculateRegistration(events, selectedEvents, groupSize);

console.log(`Обрані події: ${selectedEvents.join(', ')}`);
console.log(`Розмір групи: ${groupSize} осіб`);
console.log(`Базова вартість (subtotal): ${pricing.subtotal} грн`);
console.log(`Знижка (10%): ${pricing.discount} грн`);
console.log(`Разом до сплати (total): ${pricing.total} грн`);

// 4. Демонстрація додаткового завдання: registerForEvent
console.log('\n--- 4. Додаткове завдання: registerForEvent ---');
const targetEvent = events.find((e) => e.id === 'react-native-hackathon');
console.log(`Місць до реєстрації на "${targetEvent.title}": ${targetEvent.seatsLeft}`);
registerForEvent(student, targetEvent);
console.log(`Місць після реєстрації: ${targetEvent.seatsLeft}`);
console.log(`Чи зареєстрований студент:`, student.isRegisteredFor('react-native-hackathon'));
