const axios = require('axios');
const httpErrors = require('../../errors/httpErrors');
const validator = require('../../src/middleware/authValidator');

jest.mock('axios');
describe('authValidator', () => {
  it('should call next if the request is valid', async () => {
    const req = { headers: { token: 'test' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    axios.post.mockResolvedValue(true);
    await validator(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
  it('should return 400 when the token is not provided', async () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    await validator(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ 'message': '"token" is required' });
  });
  it('should return 401 when the token is invalid', async () => {
    const req = { headers: { token: 'test' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    axios.post.mockResolvedValue(false);
    await validator(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ 'message': 'Token is not valid.' });
  });
  it('should return 500 when the token validation fails', async () => {
    const req = { headers: { token: 'test' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    axios.post.mockRejectedValue(new Error('test'));
    await validator(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ 'message': 'Internal server error.' });
  });
});