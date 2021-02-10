// eslint-disable-next-line import/no-unresolved
import http from 'k6/http';
// eslint-disable-next-line import/no-unresolved
import { sleep, check } from 'k6';

export const options = {
  vus: 200,
  duration: '5s',
  noConnectionReuse: true,
};

export default function () {
  const random = Math.floor(Math.random() * (25) + 1);
  const responses = http.batch([
    ['GET', 'http://localhost:3000/cities', null],
    ['GET', `http://localhost:3000/homes/${random}?page=${random}`, null],
    ['GET', 'http://localhost:3000/#/listing/2', null],
  ]);
  check(responses[1], {
    'Home page status was 200': (res) => res.status === 200,
  });
  sleep(1);
}
