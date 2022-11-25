import Vue from "vue";

Vue.filter("summer", function (value, len) {
  if (!value) return "";
  let str = value.substring(0, len);
  if (value.length > str.length) {
    str += "...";
  }
  return str;
});
