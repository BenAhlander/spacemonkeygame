import init from "./init";

export default function reducer(state, action) {
  switch (action.type) {
    case "setTheme":
      return { ...state, theme: action.value };
    case "reset":
      return init();

    default:
      throw new Error(`WTF is ${action.type}?`);
  }
}
