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
            <div class="row mb-4">
              <label class="col-sm-2 col-form-label form-label">Name : </label>
              <div class="col-sm-9">
                <input
                  v-model="entity.name"
                  type="text"
                  class="form-control"
                  placeholder="Name"
                />
              </div>
            </div>
            <div class="row mb-4">
              <label class="col-sm-2 col-form-label form-label">
                Connection :
              </label>

              <div class="col-sm-9">
                <input
                  v-model="entity.connection"
                  type="text"
                  class="form-control"
                  placeholder="Connection String"
                />
              </div>
            </div>

            <div class="row mb-4">
              <label class="col-sm-2 col-form-label form-label">
                Db Name :
              </label>

              <div class="col-sm-9">
                <input
                  v-model="entity.dbName"
                  type="text"
                  class="form-control"
                  placeholder="Database Name"
                />
              </div>
            </div>

            <div class="row mb-4">
              <label class="col-sm-2 col-form-label form-label">
                Description :
              </label>

              <div class="col-sm-9">
                <textarea
                  v-model="entity.description"
                  type="text"
                  class="form-control"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-4">
                <a
                  class="btn btn-primary"
                  href="javascript:;"
                  data-bs-toggle="modal"
                  data-bs-target="#confirmSave"
                >
                  Save
                </a>
              </div>
            </div>
            <!-- End Form -->
          </div>
        </div>
        <!-- End Body -->
      </div>
      <!-- End Card -->

      <!-- Card -->
      <div
        v-for="environment in environments"
        :key="environment._id"
        class="card mt-3 shadow-lg p-3 bg-white rounded"
      >
        <!-- Body -->
        <div class="card-body">
          <h5>
            {{ environment.name }}
          </h5>
          <div><b>Connection:</b> {{ environment.connection }}</div>
          <div><b>Db Name: </b>{{ environment.dbName }}</div>
          <div>{{ environment.connection }}</div>
          <hr />
          <a
            class="btn btn-danger btn-xs"
            href="javascript:;"
            @click="setDeletedEntity(environment)"
            data-bs-toggle="modal"
            data-bs-target="#confirmRemove"
          >
            Delete
          </a>

          <a
            class="btn btn-warning btn-xs ml-2 mr-2"
            href="javascript:;"
            @click="setSelectedEntity(environment)"
          >
            Update
          </a>
        </div>
        <!-- End Body -->
      </div>
      <!-- End Card -->

      <!-- End Col -->
      <!-- End Row -->
    </div>
    <ConfirmModal
      id="confirmSave"
      @yesClick="save"
      title="Are you sure to save?"
      noButton="No"
      yesButton="Yes"
    />
    <ConfirmModal
      id="confirmRemove"
      @yesClick="remove"
      title="Are you sure to delete?"
      noButton="No"
      yesButton="Yes"
    />
  </div>
</template>

<script>
import ConfirmModal from "../components/ConfirmModal.vue";
import { mapActions } from "vuex";
import MenuNavBar from "../components/menu-navbar.vue";

const schema = {
  connection: undefined,
  name: undefined,
  dbName: undefined,
  description: undefined,
};

export default {
  components: {
    ConfirmModal,
    MenuNavBar,
  },

  data() {
    return {
      environments: [],
      deleteEntity: null,

      entity: { ...schema },
    };
  },
  async mounted() {
    this.$vToastify.setSettings({ position: "top-right", theme: "light" });
    this.reset();
  },
  methods: {
    ...mapActions({
      create: "Environment/create",
      update: "Environment/update",
      delete: "Environment/delete",
      list: "Environment/list",
    }),
    async save() {
      if (this.entity._id) {
        await this.update(this.entity);
      } else {
        await this.create(this.entity);
      }

      this.$vToastify.success("Environment Created.", "Success!");
      this.reset();
    },
    async remove() {
      await this.delete(this.deleteEntity._id);

      this.$vToastify.success("Environment Deleted.", "Success!");
      this.reset();
    },
    async reset() {
      this.entity = { ...schema };
      const { data } = await this.list();
      this.environments = data;
    },
    setDeletedEntity(item) {
      this.deleteEntity = item;
    },
    setSelectedEntity(item) {
      this.entity = { ...item };
    },
  },
};
</script>

<style scoped></style>
