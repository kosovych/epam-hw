function addListenen(targterElQuery, eventType, currentElQuery, handler) {
  document.querySelector(targterElQuery)
      .addEventListener(eventType, function(event) {
        const eventTarget = event.target;
        const currentEl = document.querySelector(currentElQuery);
        if (eventTarget === currentEl) {
          return handler(event);
        }
        return;
      });
}

module.exports = addListenen;
