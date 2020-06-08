import vscode from 'vscode';

import openTextDocument from './openTextDocument';
import openTodayNote from './openTodayNote';
import openRandomNote from './openRandomNote';

const commands = [
  vscode.commands.registerCommand('_memo.openTextDocument', openTextDocument),
  vscode.commands.registerCommand('memo.openRandomNote', openRandomNote),
  vscode.commands.registerCommand('memo.openTodayNote', openTodayNote),
];

export default commands;
