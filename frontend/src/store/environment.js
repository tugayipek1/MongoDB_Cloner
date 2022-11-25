import axios from "axios";

const actions = {
  list({ commit, state }) {
    return axios.get("/environment");
  },
  create({ commit, state }, entity) {
    return axios.post("/environment", entity);
  },
  update({ commit, state }, entity) {
    return axios.put("/environment", entity);
  },
  delete({ commit, state }, id) {
    return axios.delete("/environment/" + id);
  },
};

export default {
  namespaced: true,
  actions,
};
