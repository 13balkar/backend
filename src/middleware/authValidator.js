const Joi = require('joi');
const HttpErrors = require('../../Errors/httpErrors');
const axios = require('axios');

const tokenSchema = Joi.object({
  token: Joi.string().required()
});

const tokenValidator = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const { error } = tokenSchema.validate({ token });
    if (error) {
      throw new HttpErrors(error.details[0].message, 400);
    }
    else {
      const verifyToken = await axios.post('http://localhost:4000/token/validate', {}, { headers: { token } });
      if (verifyToken)
        next();
      else
        throw new HttpErrors('Token is not valid.', 401);
    }
  }
  catch (err) {
    if (err instanceof HttpErrors) {
      res.status(err.code).json({ 'message': err.message });
    } else if (err instanceof axios.AxiosError) {
      res.status(401).json({ 'message': 'Token is not valid.' });
    }
    else {
      res.status(500).json({ 'message': 'Internal server error.' });
    }
  }
};

module.exports = tokenValidator;