import axios from 'axios';

axios.defaults.withCredentials = true;	// < -- 추가

export default axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true	// < -- 추가
});


// upload.ts

http.post(
	"/test",
    data,
    {withCredentials: true} // < -- 추가
);