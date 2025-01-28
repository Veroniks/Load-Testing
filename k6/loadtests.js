import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export const options = {
  scenarios: {
    login: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
      exec: 'testLogin',
    },
    search: {
      executor: 'constant-vus',
      vus: 5,
      duration: '30s',
      exec: 'testSearch',
    },
    createPet: {
      executor: 'constant-vus',
      vus: 2,
      duration: '30s',
      exec: 'testCreatePet',
    },
    visitScheduling: {
      executor: 'constant-vus',
      vus: 5,
      duration: '1m',
      exec: 'testConcurrentVisitScheduling',
    }
  },
};

// Login Test [Validate the login page's ability to handle concurrent users]
export function testLogin(){
  const res = http.get('http://localhost:8080/');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is below 500ms': (r) => r.timings.duration < 500,
  });
}


// Search Functionality Test [Simulate multiple users searching for an owner by last name]
export function testSearch() {
  const res = http.get('http://localhost:8080/owners?lastName=Smith');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is below 800ms': (r) => r.timings.duration < 800,
  });
}

// Create New Pet Test [Test the performance of creating a new pet record by several users at the same time with valid data]
export function testCreatePet() {
  const payload = JSON.stringify({
    name: 'Buddy',
    birthDate: '2020-05-05',
    typeId: 1,
  });
  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('http://localhost:8080/owners/1/pets', payload, { headers });
  check(res, {
    'status is 201': (r) => r.status === 201,
    'response contains pet name': (r) => r.body.includes('Buddy'),
  });
}

// Concurrent Visit Scheduling Test
export function testConcurrentVisitScheduling() {
  const payload = JSON.stringify({
    date: '2025-02-01',
    description: 'Annual Checkup',
  });
  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('http://localhost:8080/owners/1/pets/1/visits', payload, { headers });
  check(res, {
    'status is 201': (r) => r.status === 201,
    'response contains visit date': (r) => r.body.includes('2025-02-01'),
  });
}

export default function() {
  testLogin();
  testHomepage();
  testSearch();
  testCreatePet();
  testConcurrentVisitScheduling();
  sleep(1);
}