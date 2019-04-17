// 'targer' - string -  parent node selector
// 'handler' function that run after OK pressed
// 'type' - string - 'error' || 'succes' || 'info'
// 'controls'  - string - 'alert' || 'promt' || 'none'
// 'overflowThem' - string - 'light' || 'dark'(default) || 'none'
// 'body' - string - body for modal
// bunnerMode - boolean
// delay - number(ms)

module.exports = function($) {
  class Modal {
    constructor(
        targer, handler, type, controls, overflowThem, body, mode, delay
    ) {
      this.targer = $(targer);
      this.handler = handler;
      this.type = type;
      this.controls = controls;
      this.overflowThem = overflowThem;
      this.body = body;
      this.mode = mode;
      this.delay = delay;
      if (this.mode) {
        this.timerId = setTimeout(this.createPop.bind(this), this.delay);
      } else {
        this.createPop();
      }
    }

    createPop() {
      this.modalWrapper = $('<div/>',
          // eslint-disable-next-line max-len
          {'class': `modal-wrapper modal-wrapper--${setTheme(this.overflowThem)}`});

      const modal = $('<div/>', {'class': `modal`}).appendTo(this.modalWrapper);
      $('<div/>',
          {'class': `modal__header modal__header--${setType(this.type)}`})
          .append($('<button/>', {'class': 'modal__close-btn'})
              .text('\u2716')
              .one('click', this.closePopup.bind(this)))
          .appendTo(modal);

      $('<div/>', {'class': 'modal__body'})
          .html(this.body)
          .appendTo(modal);

      if (this.controls !== 'none') {
        const modalControls = $('<div/>', {'class': 'modal__controls'});
        this.modalOK = $('<button/>', {'class': 'modal__ok'})
            .text('OK').on('click', () => this.handler())
            .appendTo(modalControls);

        if (this.controls === 'promt') {
          this.modalCancel = $('<button/>', {'class': 'modal__cancel'})
              .text('Cancel')
              .one('click', this.closePopup.bind(this))
              .appendTo(modalControls);
        }
        modalControls.appendTo(modal);
      }
      $('body').append(this.modalWrapper);
      modal.hide().fadeIn(600);
    }

    closePopup() {
      if (this.mode) {
        clearInterval(this.timerId);
      }
      this.modalWrapper.fadeOut(300, () => (
        this.modalWrapper.remove()
      ));
    }
  };

  function setTheme(color) {
    let overflowThem;
    switch (color) {
      case 'light':
        overflowThem = 'light';
        break;
      case 'none':
        overflowThem = 'none';
        break;

      case 'dark':
        overflowThem = 'dark';
        break;

      default:
        overflowThem = '';
        console.error('Incorrect theme mode');
        break;
    }
    return overflowThem;
  }

  function setType(type) {
    switch (type) {
      case 'error':
        type = 'error';
        break;

      case 'succes':
        type = 'succes';
        break;

      case 'info':
        type = 'info';
        break;

      default:
        type = '';
        console.error('Incorrect theme mode');
        break;
    }
    return type;
  }

  $.fn.jqPopup = (
      targer = null,
      handler = null,
      type = 'info',
      controls = 'promt',
      overflowThem = 'dark',
      body = 'Are you sure?',
      bunnerMode = false,
      delay = 10000
  ) => {
    return new Modal(
        targer,
        handler,
        type,
        controls,
        overflowThem,
        body,
        bunnerMode,
        delay
    );
  };
};
