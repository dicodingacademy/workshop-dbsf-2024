/** TODO SCHEMA
[
  {
    id: Number,
    title: String,
    isCompleted: Boolean,
  }
]
*/

(function () {
  function render() {
    console.log('rendering...');

    console.log('rendered...');

    afterRender();
  }

  function afterRender() {
    // Do some jobs after render finish...

    console.log('Do after render jobs...');
  }

  render();
})();
