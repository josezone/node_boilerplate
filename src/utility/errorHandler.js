const errorHandler = (e) => {
stack = e.stack
  .replace(/^Error: /, '')
  .replace(msg + '\n', '')
  .replace(/^ +/gm, '')
  .replace(/^at /gm, '')
  .replace(/(?: \(|@)http.+\/([^/)]+)\)?(?:\n|$)/gm, '@$1\n')
  .replace(/ *\(eval code(:\d+:\d+)\)(?:\n|$)/gm, '@???$1\n')
}

export class errorHandler extends Error {
  constructor(str) {
    super(str);
    this.message = str;
  }
  information(info) {
    this.info = info;
    return this;
  }
}
