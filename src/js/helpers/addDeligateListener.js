function addListenen(targterElQuery, eventType, currentElQuery, handler) {
  document.querySelector(targterElQuery)
      .addEventListener(eventType, function(event) {
        const eventTarget = event.target;
        if (currentElQuery[0] === '.') {
          if (eventTarget.className.includes(currentElQuery.slice(1))) {
            return handler(event);
          } else {
            return false;
          }
        }
        if (eventTarget.id === currentElQuery.slice(1)) {
          return handler(event);
        } else {
          return false;
        }
      }, true);
}

module.exports = addListenen;
