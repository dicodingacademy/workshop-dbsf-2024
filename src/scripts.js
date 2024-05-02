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
    // Do some render jobs...
    console.log('rendered...');

    afterRender();
  }

  function afterRender() {
    console.log('Do after render jobs...');
    // Do some jobs after render finish...
  }

  render();
})();
