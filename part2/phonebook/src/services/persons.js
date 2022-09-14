import axios from "axios";

const baseApiUrl = "http://localhost:3001";

const getPersons = () => {
  const res = axios.get(baseApiUrl + "/persons");
  return res.then((res) => res.data);
};

const postPersons = (person) => {
  const res = axios.post(baseApiUrl + "/persons", person);
  return res.then((res) => res.data);
};

const PersonsService = {
  getPersons,
  postPersons,
};

export default PersonsService;
