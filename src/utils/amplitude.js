import amplitude from 'amplitude-js';
import config from './config';

export const initAmplitude = () => {
  amplitude.getInstance().init(config.amplitude.API_KEY);
};

export const setAmplitudeUserDevice = (installationToken) => {
  amplitude.getInstance().setDeviceId(installationToken);
};

export const setAmplitudeUserId = (userId) => {
  amplitude.getInstance().setUserId(userId);
};

export const setAmplitudeUserProperties = (properties) => {
  amplitude.getInstance().setUserProperties(properties);
};

export const sendAmplitudeEvent = (eventType, eventProperties) => {
  amplitude.getInstance().logEvent(eventType, eventProperties);
};
