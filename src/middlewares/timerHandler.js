import onHeaders from "on-headers";

function recordStartTime() {
  this.startAt = Date.now();
}

function timerHandler(req, res, next) {
  req.startAt = undefined;
  recordStartTime.call(req);
  onHeaders(res, recordStartTime);
  next();
}

export default timerHandler;
