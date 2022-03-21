// 如果这个路径 被同步import，这种情况就不会被认为是split chunk
// import(/* WebpackChunkName "import" */ './lib/import.js');


const loadView = (a) => {
  return () => import(`./lib/${a}`);
};
