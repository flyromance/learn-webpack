const loadView = (a) => {
  return (resolve) => require([`./lib/add`, `./lib/${a}`], resolve);
};
