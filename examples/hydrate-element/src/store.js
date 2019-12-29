import Store from "../../../core/store.js";

const store = new Store({
  comments: [
    {
      id: 1,
      message: "Hello world",
      created: new Date().toLocaleString()
    },
    {
      id: 2,
      message: "JayZ",
      created: new Date().toLocaleString()
    },
    {
      id: 3,
      message: ":3",
      created: new Date().toLocaleString()
    },
    {
      id: 4,
      message: "The brown quick fox.",
      created: new Date().toLocaleString()
    }
  ],
  lastId: 4
});

export default store;
