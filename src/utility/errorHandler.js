export const errorHandler = str => {
    let errorData;
    if (typeof str === "string") {
      errorData = manageError(
        str,
        undefined,
        undefined,
        undefined,
        undefined
      );
    } else {
      errorData = manageError(
        str.message,
        undefined,
        undefined,
        undefined,
        str
      );
    }
    return errorData;
  }

  const manageError = (msg, url, line, col, e) => {
    let stack;
    msg = msg.replace(/^Error: /, "");
    if (e) {
      stack = e.stack
        .replace(/^Error: /, "")
        .replace(msg + "\n", "")
        .replace(/^ +/gm, "")
        .replace(/^at /gm, "")
        .replace(/(?: \(|@)http.+\/([^/)]+)\)?(?:\n|$)/gm, "@$1\n")
        .replace(/ *\(eval code(:\d+:\d+)\)(?:\n|$)/gm, "@???$1\n");
    } else {
      line = line || "?";
      col = col || "?";
      stack = url + ":" + line + ":" + col;
    }
    return (msg + "\n" + stack).substr(0, 150);
  }
