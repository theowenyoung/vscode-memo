import vscode from 'vscode';
import fs from 'fs';
import path from 'path';

import {
  getWorkspaceCache,
  findUriByRef,
  ensureDirectoryExists,
  parseRef,
  getWorkspaceFolder,
  getRefWithExt,
  resolveShortRefFolder,
} from '../utils';

const openDocumentByReference = async ({
  reference,
  showOption = vscode.ViewColumn.Active,
}: {
  reference: string;
  showOption?: vscode.ViewColumn;
}) => {
  const { ref } = parseRef(reference);

  const uri = findUriByRef(getWorkspaceCache().allUris, ref);

  if (uri) {
    await vscode.commands.executeCommand('vscode.open', uri, showOption);
  } else {
    const workspaceFolder = getWorkspaceFolder()!;
    if (workspaceFolder) {
      const refWithExt = getRefWithExt(ref);
      const shortRefFolder = resolveShortRefFolder(ref);

      const filePath = path.join(
        workspaceFolder,
        ...(shortRefFolder ? [shortRefFolder, refWithExt] : [refWithExt]),
      );

      // don't override file content if it already exists
      if (!fs.existsSync(filePath)) {
        ensureDirectoryExists(filePath);
        fs.writeFileSync(filePath, '');
      }

      await vscode.commands.executeCommand('vscode.open', vscode.Uri.file(filePath), showOption);
    }
  }
};

export default openDocumentByReference;
