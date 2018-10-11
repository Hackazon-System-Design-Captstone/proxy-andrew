import http from 'k6/http';
import { check } from "k6";

export let options = {
  vus: 130,
  duration: "10s",
  rps: 1000,
};

let random = Math.random();

export default function() {
  if (random > 0.2) {
    let res = http.get(`http://localhost:3003/checkout/${Math.floor(Math.random() * 2000000) + 8000001}`);
    check(res, {
      "status was 200": (r) => r.status == 200,
      "transaction time OK": (r) => r.timings.duration < 1000
    });
  } else {
    let res = http.get(`http://localhost:3003/checkout/${Math.floor(Math.random() * 8000000) + 2000001}`);
    check(res, {
      "status was 200": (r) => r.status == 200,
      "transaction time OK": (r) => r.timings.duration < 1000
    });
  }
}
