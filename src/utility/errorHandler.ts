export class ErrorHandler {
  static clean(error: Error): string {
    const msg = error.message;
    const err = msg.replace(/^Error: /, '');
    const stack = error
      .stack!.replace(/^Error: /, '')
      .replace(`${err}\n`, '')
      .replace(/^ +/gm, '')
      .replace(/^at /gm, '')
      .replace(/(?: \(|@)http.+\/([^/)]+)\)?(?:\n|$)/gm, '@$1\n')
      .replace(/ *\(eval code(:\d+:\d+)\)(?:\n|$)/gm, '@???$1\n');
    return `${err}\n${stack}`.substr(0, 150);
  }
}
