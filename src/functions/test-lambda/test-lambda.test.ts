import { test } from './handler';

describe('Lambda Handler', () => {
  let consoleLogSpy: jest.SpyInstance;
  
  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should return successful response with status code 200', async () => {
    const event = { key: 'test-value' };
    const response = await test(event, null, null);

    expect(response.statusCode).toBe(200);
  });

  it('should include correct message in response body', async () => {
    const event = { key: 'test-value' };
    const response = await test(event, null, null);
    const body = JSON.parse(response.body);

    expect(body.message).toBe('Go Serverless v1.0! Your function executed successfully!');
  });

  it('should include input event in response body', async () => {
    const event = { key: 'test-value' };
    const response = await test(event, null, null);
    const body = JSON.parse(response.body);

    expect(body.input).toEqual(event);
  });

  it('should log the event to console', async () => {
    const event = { key: 'test-value' };
    await test(event, null, null);

    expect(consoleLogSpy).toHaveBeenCalledWith('event', event);
  });

  it('should return response as a Promise', () => {
    const event = { key: 'test-value' };
    const result = test(event, null, null);

    expect(result).toBeInstanceOf(Promise);
  });
});
