require.ensure(['./lib/add.js', './lib/age.js'], (r) => {
    const m = r('./lib/add.js');
});