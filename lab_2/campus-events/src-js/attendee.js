/**
 * Клас учасника університетських подій.
 */
class Attendee {
  /**
   * Створює нового учасника.
   * @param {string} id Ідентифікатор учасника
   * @param {string} name Ім'я учасника
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.registeredEventIds = [];
  }

  /**
   * Реєструє учасника на подію.
   * @param {string} eventId ID події
   * @returns {boolean} true, якщо реєстрація успішна; false, якщо вже зареєстрований
   */
  register(eventId) {
    if (this.registeredEventIds.includes(eventId)) {
      return false;
    }

    this.registeredEventIds.push(eventId);
    return true;
  }

  /**
   * Скасовує реєстрацію на подію.
   * @param {string} eventId ID події
   * @returns {boolean} true, якщо скасовано; false, якщо не був зареєстрований
   */
  cancel(eventId) {
    const index = this.registeredEventIds.indexOf(eventId);
    if (index === -1) {
      return false;
    }

    this.registeredEventIds.splice(index, 1);
    return true;
  }

  /**
   * Перевіряє, чи зареєстрований учасник на подію.
   * @param {string} eventId ID події
   * @returns {boolean} true, якщо зареєстрований
   */
  isRegisteredFor(eventId) {
    return this.registeredEventIds.includes(eventId);
  }
}

module.exports = { Attendee };
