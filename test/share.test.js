const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { archiveName, readShared, calculateQuota, sizeLabel } = require('../src/share.js');

test('archive name for a folder', () => {
  assert.equal(archiveName('docs'), 'archive-docs.tar');
});

test('reads a shared file', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'share-'));
  fs.writeFileSync(path.join(root, 'notes.txt'), 'hello');
  assert.equal(readShared(root, 'notes.txt'), 'hello');
});

test('calculates a quota', () => {
  assert.equal(calculateQuota('5 * 1024'), 5120);
});

test('size labels', () => {
  assert.equal(sizeLabel(512), '512 B');
  assert.equal(sizeLabel(2048), '2.0 KB');
  assert.equal(sizeLabel(3 * 1024 * 1024), '3.0 MB');
});
