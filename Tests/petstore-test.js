import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100,          // Número de usuários virtuais
  duration: '20s',  // Duração do teste
};

export default function () {
  // 🔹 GET request: listar pets por status
  let res = http.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available');

  check(res, {
    'GET status is 200': (r) => r.status === 200,
    'GET response is not empty': (r) => r.body.length > 0,
  });

  sleep(1);

  // 🔹 POST request: criar um novo pet
  let payload = JSON.stringify({
    id: Math.floor(Math.random() * 1000000),
    name: 'dog-teste',
    status: 'available',
  });

  let headers = { 'Content-Type': 'application/json' };

  let postRes = http.post('https://petstore.swagger.io/v2/pet', payload, { headers });
  console.log('Status POST:', postRes.status);
  console.log('Resposta do POST:', postRes.body);

  check(postRes, {
    'POST status is 200': (r) => r.status === 200,
    'POST returned ID': (r) => JSON.parse(r.body).id !== undefined,
  });

  sleep(1);
}
