// simple formatting for highlights to be passed to the UI

export default class Highlight {
  constructor(type, coord, id) {
    this.type = type;
    this.coord = coord;
    this.id = id;
  }
}
