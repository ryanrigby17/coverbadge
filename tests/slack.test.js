import fetch from 'isomorphic-fetch';
import {
  formatMessage,
  sendSlackWebhook,
} from '../services/slack';

jest.mock('isomorphic-fetch');

describe('formatMessage', () => {
  it('should display correct info when decreased', () => {
    expect(formatMessage(66, 55)).toMatchSnapshot();
  });

  it('should display correct info when increased', () => {
    expect(formatMessage(55, 66)).toMatchSnapshot();
  });

  it('should display correct info when hit 100%', () => {
    expect(formatMessage(55, 100)).toMatchSnapshot();
  });

  it('should display correct info when remained', () => {
    expect(formatMessage(55, 55)).toMatchSnapshot();
  });

  it('should display correct info when remained and hit 100%', () => {
    expect(formatMessage(100, 100)).toMatchSnapshot();
  });
});

describe('sendSlackWebhook', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  it('should call fetch with parameters', async () => {
    await sendSlackWebhook('slack', 50, 100);

    expect(fetch.mock.calls).toMatchSnapshot();
  });

  it('should format the text if have other options', async () => {
    await sendSlackWebhook('slack', 50, 100, {
      username: 'usernmame',
      project: 'project',
      vcs: 'github',
    });

    expect(fetch.mock.calls).toMatchSnapshot();
  });

  it('should further format the text if have branch', async () => {
    await sendSlackWebhook('slack', 50, 100, {
      username: 'usernmame',
      project: 'project',
      vcs: 'github',
      branch: 'branch',
    });

    expect(fetch.mock.calls).toMatchSnapshot();
  });

  it('should ignore and resolve if remained the same and have that option', async () => {
    const result = await sendSlackWebhook('slack', 87, 87, {
      ignoreSame: true,
    });

    expect(fetch).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });
});

describe('PR', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  it('should process one pr', async () => {
    await sendSlackWebhook('slack', 50, 100, {
      prs: 'https://github.com/kevin940726/coverbadge/pull/2',
    });

    expect(fetch.mock.calls).toMatchSnapshot();
  });

  it('should process multiple prs', async () => {
    await sendSlackWebhook('slack', 50, 100, {
      prs: 'https://github.com/kevin940726/coverbadge/pull/1, https://github.com/kevin940726/coverbadge/pull/2',
    });

    expect(fetch.mock.calls).toMatchSnapshot();
  });

  it('should handle link error', async () => {
    await sendSlackWebhook('slack', 50, 100, {
      prs: 'https://github.com/kevin940726/coverbadge/pull/1,',
    });

    expect(fetch.mock.calls).toMatchSnapshot();
  });

  it('should handle regex error', async () => {
    await sendSlackWebhook('slack', 50, 100, {
      prs: 'https://github.com/kevin940726/coverbadge/pull/1x,https://github.com/kevin940726/coverbadge/pull/2',
    });

    expect(fetch.mock.calls).toMatchSnapshot();
  });

  it('should handle empty space prs', async () => {
    await sendSlackWebhook('slack', 50, 100, {
      prs: ' ',
    });

    expect(fetch.mock.calls).toMatchSnapshot();
  });
});
