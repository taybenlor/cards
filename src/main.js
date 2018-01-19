let Flipability = {
  UNFLIPPABLE: 0,
  FLIPPABLE: 1,
  SECRET: 2,
};

let Faces = {
  FRONT: 'FRONT',
  BACK: 'BACK',
}

class CardTemplate {
  constructor(urls, flipability) {
    this.urls = urls;
    this.flipability = flipability;
  }
}

class Card {
  constructor(template) {
    this.template = template;
    this.face = Faces.FRONT;

    this.$el = this.render();
    this.$el.addEventListener('click', () => {
      this.flip();
    });
    this.$el.addEventListener('mousedown', (ev) => {
      this.startDragging(ev);
    })
  }

  getElement() {
    return this.$el;
  }

  render() {
    const $el = document.createElement('img');
    $el.classList.add('card');
    $el.draggable = false; // this is browser drag not our custom drag
    $el.src = this.template.urls[this.face];

    return $el;
  }

  flip() {
    if (this.template.Flipability != Flipability.UNFLIPPABLE) {
      this.face = this.face == Faces.FRONT ? Faces.BACK : Faces.FRONT;
    }

    // TODO: Do a sick flip animation

    this.$el.src = this.template.urls[this.face];
  }

  startDragging(ev) {
    let lastX = ev.clientX;
    let lastY = ev.clientY;

    let moveListener = (ev) => {
      let diffX = ev.clientX - lastX;
      let diffY = ev.clientY - lastY;
      this.$el.style.left = `${this.$el.offsetLeft + diffX}px`;
      this.$el.style.top = `${this.$el.offsetTop + diffY}px`;

      lastX = ev.clientX;
      lastY = ev.clientY;
    };
    window.addEventListener('mousemove', moveListener);

    let upListener = (ev) => {
      window.removeEventListener('mousemove', moveListener);
      window.removeEventListener('mouseup', upListener);
    }
    window.addEventListener('mouseup', upListener);
  }
}

let templates = {
  VOTE: new CardTemplate({ FRONT: 'images/protect.png', BACK: 'images/punch.png'}, Flipability.FLIPPABLE),
}

let punchCard = new Card(templates.VOTE);
document.body.appendChild(punchCard.getElement());
