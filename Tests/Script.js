import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 200, // usuários virtuais
  duration: '100s', // duração do teste
};

export default function () {
  const res = http.get('https://g1.globo.com/');
  check(res, {
    'status é 200': (r) => r.status === 200,
  });
  sleep(1);
}
