import test from 'node:test';
import assert from 'node:assert/strict';
import { reviewHardware } from './hardware-review';
import { validateHardwareCompatibility } from './src/utils/hardwareCompatibility';

test('planning selections never issue an assembly approval or certification', () => {
  for (const doorType of ['steel', 'wood', 'unknown']) {
    for (const fireRating of ['none', '20', '90', '180']) {
      const input = { doorType, fireRating, lockset: 'mortise', hinges: 'ball-bearing' };
      const review = reviewHardware(input);
      assert.equal(review.status, 'warning');
      assert.equal(review.isCompatible, false);
      assert.deepEqual(review.codeReferences, []);
      assert.match(review.testedAssemblies, /No assembly testing/);
      assert.deepEqual(validateHardwareCompatibility(input), review);
    }
  }
});
