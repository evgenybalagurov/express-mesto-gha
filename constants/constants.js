const ERROR_SERVER_CODE = 500;
const ERROR_NOT_FOUND_CODE = 404;
const ERROR_UNAUTHORIZED_CODE = 401;
const ERROR_DATA_CODE = 400;
const ERROR_CONFLICT_CODE = 409;
const ERROR_FORBIDDEN_CODE = 403;

const LINK_REGEX = /^(https?\/{2})?([w]{3}\.)?([\w-.~:/?#[\]@!$&')(*+,;=]+\.)+[\w]{2,8}(\/([\w-.~:/?#[\]@!$&')(*+,;=])*)?#?$/;

module.exports = {
  ERROR_SERVER_CODE,
  ERROR_NOT_FOUND_CODE,
  ERROR_UNAUTHORIZED_CODE,
  ERROR_DATA_CODE,
  ERROR_CONFLICT_CODE,
  ERROR_FORBIDDEN_CODE,
  LINK_REGEX,
};
