<template>
  <div>
    <MenuNavBar />
    <div class="container">
      <!-- Card -->
      <div class="card mt-3 shadow-lg p-3 bg-white rounded">
        <div class="card-header border-bottom">
          <h4 class="card-header-title">MONGO DATABASE CLONER</h4>
        </div>

        <!-- Body -->
        <div class="card-body">
          <div>
            <!-- Form -->

            <div class="row mb-2">
              <label
                for="firstNameLabel"
                class="col-sm-2 col-form-label form-label"
                >Source :
              </label>

              <div class="col-sm-9">
                <div class="input-group">
                  <select
                    v-model="selectedSource"
                    @change="changeSource"
                    class="form-control"
                  >
                    <option
                      v-for="environment in environments"
                      :value="environment"
                      :key="environment._id"
                    >
                      {{ environment.name }}
                    </option>
                  </select>

                  <input
                    v-model="form.source.connection"
                    type="text"
                    class="form-control"
                    name="firstName"
                    id="firstNameLabel"
                    placeholder="Source connection"
                  />
                  <input
                    v-model="form.source.dbName"
                    type="text"
                    class="form-control"
                    name="lastName"
                    id="lastNameLabel"
                    placeholder="Database name"
                  />
                </div>
                <div class="text-center mt-1">
                  <i class="bi bi-arrow-down"></i>
                </div>
              </div>
            </div>
            <!-- End Form -->
            <!-- Form -->

            <div class="row mb-4">
              <label
                for="firstNameLabel"
                class="col-sm-2 col-form-label form-label"
                >Target :
              </label>

              <div class="col-sm-9">
                <div class="input-group">
                  <select
                    v-model="selectedTarget"
                    @change="changeTarget"
                    class="form-control"
                  >
                    <option
                      v-for="environment in environments"
                      :value="environment"
                      :key="environment._id"
                    >
                      {{ environment.name }}
                    </option>
                  </select>

                  <input
                    v-model="form.target.connection"
                    type="text"
                    class="form-control"
                    name="firstName"
                    id="firstNameLabel"
                    placeholder="Target connection"
                    aria-label="Clarice"
                    value="Natalie"
                  />
                  <input
                    v-model="form.target.dbName"
                    type="text"
                    class="form-control"
                    name="lastName"
                    id="lastNameLabel"
                    placeholder="Database name"
                    aria-label="Boone"
                    value="Curtis"
                  />
                </div>
                <div class="form-check mt-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="checkbox"
                    v-model="form.target.reCreate"
                  />
                  <label class="form-check-label" for="checkbox">
                    Recreate if database exists in target environment
                  </label>
                </div>
              </div>
            </div>
            <!-- End Form -->
            <div class="row mb-4">
              <label
                for="firstNameLabel"
                class="col-sm-2 col-form-label form-label"
                >Ignore :
              </label>

              <div class="col-sm-9">
                <div class="input-group">
                  <input
                    v-model="ignore"
                    type="text"
                    id="exampleFormControlInput2"
                    class="form-control"
                    placeholder="Press enter to add"
                    @keyup.enter="addIgnoreList"
                  />
                </div>
                <div class="input-group">
                  <span
                    v-for="(item, index) in form.ignoreList"
                    :title="item"
                    :key="item"
                    class="text-truncate badge bg-soft-secondary text-secondary mt-5"
                    style="margin-right: 10px; cursor: pointer"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    aria-describedby
                  >
                    <i
                      @click="removeIgnore(index)"
                      style="color: red"
                      class="bi bi-x"
                    ></i>
                    {{ item | summer(30) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Body -->

        <!-- Footer -->
        <div class="card-footer pt-0" style="margin-right: 6em">
          <div class="d-flex justify-content-end gap-3">
            <div
              class="spinner-border text-primary"
              role="status"
              v-if="job && job.status == 'running'"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            <a
              class="btn btn-danger"
              href="javascript:;"
              data-bs-toggle="modal"
              data-bs-target="#clearAllConfirm"
              >Clear All</a
            >
            <a
              class="btn btn-primary"
              href="javascript:;"
              data-bs-toggle="modal"
              data-bs-target="#startClonerConfirm"
              >Start Cloner</a
            >
          </div>
        </div>
        <!-- End Footer -->
      </div>
      <!-- End Card -->

      <!-- End Col -->
      <!-- End Row -->

      <div class="card mt-3 shadow-lg p-3 mb-5 bg-white rounded" id="results">
        <div class="card-header border-bottom">
          <h4 class="card-header-title">
            RESULTS
            <span v-if="job && job.status == 'done'">
              <i v-if="job.anyError" class="text-danger">Error</i>
              <i v-else class="text-success">Success</i>
            </span>
          </h4>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <div class="text-center mb-4">&#x2705;</div>
              <div
                class="form-group"
                id="info"
                style="max-height: 250px; overflow-y: scroll"
              >
                <div v-for="item in jobItem" :key="item.id">
                  <div data-spy="scroll" v-if="item.type == 'info'">
                    <div>
                      {{ item.message }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="text-center mb-4">&#x274C;</div>

              <div
                class="form-group"
                id="error"
                style="max-height: 250px; overflow-y: scroll"
              >
                <div v-for="item in jobItem" :key="item.id">
                  <div data-spy="scroll" v-if="item.type == 'error'">
                    <div>
                      <strong> {{ item.message }}</strong>
                    </div>
                    <div>
                      {{ item.error }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ConfirmModal
      id="startClonerConfirm"
      @yesClick="cloner"
      title="Are you sure to clone?"
      noButton="No"
      yesButton="Yes"
    />
    <ConfirmModal
      id="clearAllConfirm"
      @yesClick="clearAll"
      title="Are you sure to clear?"
      noButton="No"
      yesButton="Yes"
    />
  </div>
</template>

<script>
import ConfirmModal from "../components/ConfirmModal.vue";
import { mapActions } from "vuex";
import MenuNavBar from "../components/menu-navbar.vue";

export default {
  components: {
    ConfirmModal,
    MenuNavBar,
  },

  data() {
    return {
      collections: [],
      completedStatus: false,
      ignore: null,
      job: null,
      ignore: null,
      jobItem: [],
      environments: [],
      selectedSource: null,
      selectedTarget: null,
      form: {
        source: { connection: "mongodb://127.0.0.1:27017", dbName: null },
        target: {
          connection: "mongodb://127.0.0.1:27017",
          dbName: null,
          reCreate: false,
        },
        ignoreList: ["log", "client*"],
      },
    };
  },
  async mounted() {
    this.$vToastify.setSettings({ position: "top-right", theme: "light" });
    const { data } = await this.getEnvironments();
    this.environments = data;
  },
  watch: {
    jobItem() {
      setTimeout(() => this.scrollToBottom(), 100);
    },
  },
  methods: {
    ...mapActions({
      clone: "Clone/clone",
      get: "Clone/get",
      getEnvironments: "Environment/list",

      getjobItem: "Clone/getJob",
    }),

    changeTarget() {
      this.form.target = { ...this.selectedTarget };
    },
    changeSource() {
      this.form.source = { ...this.selectedSource };
    },
    async cloner() {
      this.clearJob();
      const { data } = await this.clone(this.form);
      this.job = data.job;
      //this.clearAll();
      this.getData();
      this.getDataItem();
    },
    clearJob() {
      this.job = null;
      this.jobItem = [];
    },
    clearAll() {
      this.form.source.connection = null;
      this.form.source.dbname = null;
      this.form.target.connection = null;
      this.form.target.dbname = null;
      this.form.target.reCreate = false;
      this.form.ignoreList = [];
      this.form.ignore = null;
      this.job = null;
      this.jobItem = [];
    },
    clearCheckbox() {
      this.form.target.reCreate = false;
    },
    addIgnoreList() {
      if (!this.form.ignoreList.includes(this.ignore)) {
        this.form.ignoreList.push(this.ignore);
      }
      this.ignore = null;
    },
    async removeIgnore(index) {
      this.form.ignoreList.splice(index, 1);
    },
    getData() {
      setTimeout(async () => {
        if (this.job) {
          const { data } = await this.get(this.job.id);
          this.job = data;
          if (this.job.status == "done") {
            if (this.job.anyError) {
              this.$vToastify.warning(
                "Kopyalama İşlemi Tamamlandı Fakat Hatalar Mevcut",
                "Uyarı"
              );
            } else {
              this.$vToastify.success(
                "Kopyalama işlemi tamamlandı.",
                "Başarılı!"
              );
            }
            this.clearCheckbox();
          }
        }

        if (this.job.status == "running") {
          this.getData();
        }
      }, 1000);
    },
    getDataItem() {
      setTimeout(async () => {
        if (this.job) {
          const { data } = await this.getjobItem(this.job._id);
          this.jobItem = data;
          if (this.job.status == "running") {
            this.getDataItem();
          }
        }
      }, 1000);
    },
    scrollToBottom() {
      var error = this.$el.querySelector("#error");
      var info = this.$el.querySelector("#info");

      window.scrollTo(0, document.body.scrollHeight);
      info.scrollTop = info.scrollHeight;
      error.scrollTop = error.scrollHeight;
    },
  },
};
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
