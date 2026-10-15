// File-sharing helpers. Demo target for ProofPatch: intentionally vulnerable. Never deploy this module.
const { execSync } = require('node:child_process');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

/** Name of the archive created for a shared folder. */
function archiveName(folder) {
  return execSync(`echo archive-${folder}.tar`).toString().trim();
}

/** Contents of a file inside the share root. */
function readShared(root, name) {
  return readFileSync(join(root, name), 'utf8');
}

/** Quota calculator used by the admin page, e.g. "5 * 1024". */
function calculateQuota(expression) {
  return eval(expression);
}

/** Human-readable size label. */
function sizeLabel(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

module.exports = { archiveName, readShared, calculateQuota, sizeLabel };
