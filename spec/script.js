// eslint-disable-next-line import/no-unresolved
import http from 'k6/http';
// eslint-disable-next-line import/no-unresolved
import { sleep } from 'k6';

export const options = {
  vus: 10000,
  duration: '1m',
};

export default function () {
  http.get('http://localhost:3000/#/listing/2');
  sleep(1);
}
