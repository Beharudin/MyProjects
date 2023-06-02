// import logger from "../utils/logger.js";

const errHandler = (err, req, res, next) => {
  let status = 500;
  const badErrorTypes = [
    "BadUserRequestException",
    "InvalidRequestException",
    "NullValueException",
  ];
  if (err.status && err.msg) {
    return res.status(err.status).send(err.msg);
  }
  let error = err?.response?.data?.message
    ? err?.response?.data?.message
    : err?.response?.data ? JSON.stringify(err.response.data) : err;

  if (
    err?.response?.data?.type &&
    badErrorTypes.includes(err?.response?.data.type)
  )
    status = 400;
  if (error.err?.msg) error = error.err?.msg
  logger("error", `smth went wrong \n${error}`);
  if (process.env.NODE_ENV !== "production") console.log('err to log', error)
  return res.status(status).send(error);
};
export default errHandler;
