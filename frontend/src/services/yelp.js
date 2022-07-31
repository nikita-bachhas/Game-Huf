import Axios from 'axios';

export default Axios.create({
  baseURL: "https://cz3003-huf.herokuapp.com/",
  //baseURL: "http://localhost:8000/",
  headers: {},
});
