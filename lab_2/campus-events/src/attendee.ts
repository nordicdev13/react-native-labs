/**
 * Клас учасника університетських подій.
 */
export class Attendee {
  id: string;
  name: string;
  registeredEventIds: string[];

  /**
   * Створює нового учасника.
   * @param id Ідентифікатор учасника
   * @param name Ім'я учасника
   */
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.registeredEventIds = [];
  }

  /**
   * Реєструє учасника на подію.
   * @param eventId ID події
   * @returns true, якщо реєстрація успішна; false, якщо вже зареєстрований
   */
  register(eventId: string): boolean {
    if (this.registeredEventIds.includes(eventId)) {
      return false;
    }

    this.registeredEventIds.push(eventId);
    return true;
  }

  /**
   * Скасовує реєстрацію на подію.
   * @param eventId ID події
   * @returns true, якщо скасовано; false, якщо не був зареєстрований
   */
  cancel(eventId: string): boolean {
    const index = this.registeredEventIds.indexOf(eventId);
    if (index === -1) {
      return false;
    }

    this.registeredEventIds.splice(index, 1);
    return true;
  }

  /**
   * Перевіряє, чи зареєстрований учасник на подію.
   * @param eventId ID події
   * @returns true, якщо зареєстрований
   */
  isRegisteredFor(eventId: string): boolean {
    return this.registeredEventIds.includes(eventId);
  }
}
