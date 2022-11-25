import axios from "axios";

const actions = {
  clone({ commit, state }, payload) {
    return axios.post("/cloner", payload);
  },
  get({ commit, state }, jobId) {
    return axios.get("/cloner/get/" + jobId);
  },
  getJob({ commit, state }, jobId) {
    return axios.get("/job-item/" + jobId);
  },
};

export default {
  namespaced: true,
  actions,
};
