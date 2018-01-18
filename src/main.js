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
  }

  getElement() {
    return this.$el;
  }

  render() {
    const $el = document.createElement('img');
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
}

let templates = {
  VOTE: new CardTemplate({ FRONT: 'images/protect.png', BACK: 'images/punch.png'}, Flipability.FLIPPABLE),
}

let punchCard = new Card(templates.VOTE);
document.body.appendChild(punchCard.getElement());
