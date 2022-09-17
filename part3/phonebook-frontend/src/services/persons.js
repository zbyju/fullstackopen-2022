import axios from "axios";

const baseApiUrl = "http://localhost:3001/api";

const getPersons = () => {
  const res = axios.get(baseApiUrl + "/persons");
  return res.then((res) => res.data);
};

const postPersons = (person) => {
  const res = axios.post(baseApiUrl + "/persons", person);
  return res.then((res) => res.data);
};

const deletePersons = (id) => {
  const res = axios.delete(baseApiUrl + "/persons/" + id);
  return res.then((res) => res.data);
};

const putPersons = (person) => {
  const res = axios.put(baseApiUrl + "/persons/" + person.id, person);
  return res.then((res) => res.data);
};

const PersonsService = {
  getPersons,
  postPersons,
  deletePersons,
  putPersons,
};

export default PersonsService;
