import { moduleForModel, test } from 'ember-qunit';

moduleForModel('config', 'Unit | Model | config', {
  // Specify the other units that are required for this test.
  needs: ['model:history']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
