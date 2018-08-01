import moment from "moment";

export default (value) => {
   const date = new Date(value);
   return moment(date).format("MMMM Do YYYY, h:mma");
};
