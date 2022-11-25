<template>
  <div>
    <!-- Modal -->
    <div
      :id="id"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">
              {{ title }}
            </h5>
            <button
              type="button"
              @click="closeButton"
              id="close"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              {{ description }}
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              @click="noClick"
              :class="'btn btn-xs btn-soft-' + noVariant"
              data-bs-dismiss="modal"
            >
              <i class="bi bi-x"></i> {{ noButton }}
            </button>
            <button
              type="button"
              data-bs-dismiss="modal"
              @click="yesClick"
              :class="'btn btn-xs btn-soft-' + yesVariant"
            >
              <i class="bi bi-check"></i> {{ yesButton }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String },
    title: { type: String, default: "UYARI!" },
    description: { type: String },
    noButton: { type: String, default: "NO" },
    yesButton: { type: String, default: "YES" },
    yesVariant: { type: String, default: "primary" },
    noVariant: { type: String, default: "secondary" },
  },
  methods: {
    yesClick() {
      this.$emit("yesClick");
      //document.getElementById("close").click();
    },
    noClick() {
      this.$emit("noClick");
      //document.getElementById("close").click();
    },
    closeButton() {
      this.$emit("closeButton");
    },
  },
};
</script>

<style scoped>
.modal-body {
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1.2 auto;
  padding-bottom: 0rem;
  padding-top: 1em;
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>
