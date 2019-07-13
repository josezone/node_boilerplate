export class DeepClone {
  static clone(cloneObject: {}): {} {
    return JSON.parse(JSON.stringify(cloneObject));
  }
}
