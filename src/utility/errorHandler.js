function manageError(msg, url, line, col, e) {
  let stack;
  const err = msg.replace(/^Error: /, "");
  if (e) {
    stack = e.stack
      .replace(/^Error: /, "")
      .replace(`${err}\n`, "")
      .replace(/^ +/gm, "")
      .replace(/^at /gm, "")
      .replace(/(?: \(|@)http.+\/([^/)]+)\)?(?:\n|$)/gm, "@$1\n")
      .replace(/ *\(eval code(:\d+:\d+)\)(?:\n|$)/gm, "@???$1\n");
  } else {
    const lineValue = line || "?";
    const colValue = col || "?";
    stack = `${url}:${lineValue}:${colValue}`;
  }
  return `${err}\n${stack}`.substr(0, 150);
}

function errorHandler(str) {
  let errorData;
  if (typeof str === "string") {
    errorData = manageError(str, undefined, undefined, undefined, undefined);
  } else {
    errorData = manageError(str.message, undefined, undefined, undefined, str);
  }
  return errorData;
}

export default errorHandler;
