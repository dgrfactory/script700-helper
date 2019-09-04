import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const getComment = (document: vscode.TextDocument, lineIndex: number): string | undefined => {
    const self = document.lineAt(lineIndex);
    if (/(;+|\/\/+)(.+)/.exec(self.text)) return RegExp.$2.replace(/^\s+|\s+$/g, '');

    const comments: string[] = [];
    for (let i = lineIndex - 1; i >= 0; i--) {
      const line = document.lineAt(i);
      if (/(;+|\/\/+)(.+)/.exec(line.text)) comments.push(RegExp.$2.replace(/^\s+|\s+$/g, ''));
      else break;
    }

    return comments.length
      ? comments.map((v) => v.replace(/^[\-\=\*\#]+$/, '')).filter((v) => v).join('\r\n')
      : undefined;
  };

  const createCompletionForProperty = (label: string, title: string, description: string[]): vscode.CompletionItem => {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Field);
    item.detail = title;
    item.documentation = description.join('\r\n');
    return item;
  };

  const createCompletionForOperator = (label: string, title: string, description: string[]): vscode.CompletionItem => {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Operator);
    item.detail = title;
    item.documentation = description.join('\r\n');
    return item;
  };

  const createCompletionForLabel = (label: string, title: string, description: string[]): vscode.CompletionItem => {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Enum);
    item.detail = title;
    item.documentation = description.join('\r\n');
    return item;
  };

  const createCompletionForFunction = (label: string, title: string, description: string[]): vscode.CompletionItem => {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Function);
    item.detail = title;
    item.documentation = description.join('\r\n');
    return item;
  };

  const createCompletionForInclude = (label: string, title: string, description: string[]): vscode.CompletionItem => {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Interface);
    item.detail = title;
    item.documentation = description.join('\r\n');
    return item;
  };

  const createCompletionWithComment = (document: vscode.TextDocument, lineIndex: number, label: string): vscode.CompletionItem => {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Enum);
    item.detail = `LABEL: ${label}`;
    item.documentation = getComment(document, lineIndex);
    return item;
  };

  const parameterGroup1 = (): vscode.CompletionItem[] => {
    return [
      createCompletionForProperty('#', 'Literal Number', ['#0~']),
      createCompletionForProperty('i', 'SPC700 In Port', ['i0~i3']),
      createCompletionForProperty('o', 'SPC700 Out Port', ['o0~o3']),
      createCompletionForProperty('w', 'SNESAPU Working Memory', ['w0~w7']),
      createCompletionForProperty('r', '64KB RAM Value (byte)', ['r0~r65535']),
      createCompletionForProperty('rb', '64KB RAM Value (byte)', ['rb0~rb65535']),
      createCompletionForProperty('rw', '64KB RAM Value (word)', ['rw0~rw65535']),
      createCompletionForProperty('rd', '64KB RAM Value (double word)', ['rd0~rd65535']),
      createCompletionForProperty('rd', '64Byte XRAM Value (byte)', ['x0~x65535']),
      createCompletionForProperty('d', 'SNESAPU Data Area (byte)', ['d0~']),
      createCompletionForProperty('db', 'SNESAPU Data Area (byte)', ['db0~']),
      createCompletionForProperty('dw', 'SNESAPU Data Area (word)', ['dw0~']),
      createCompletionForProperty('dd', 'SNESAPU Data Area (double word)', ['dd0~']),
      createCompletionForProperty('l', 'Label Index', ['l0~l1023']),
    ];
  };

  const parameterGroup2 = (): vscode.CompletionItem[] => {
    return [
      createCompletionForProperty('i', 'SPC700 In Port', ['i0~i3']),
      createCompletionForProperty('o', 'SPC700 Out Port', ['o0~o3']),
      createCompletionForProperty('w', 'SNESAPU Working Memory', ['w0~w7']),
      createCompletionForProperty('r', '64KB RAM Value (byte)', ['r0~r65535']),
      createCompletionForProperty('rb', '64KB RAM Value (byte)', ['rb0~rb65535']),
      createCompletionForProperty('rw', '64KB RAM Value (word)', ['rw0~rw65535']),
      createCompletionForProperty('rd', '64KB RAM Value (double word)', ['rd0~rd65535']),
      createCompletionForProperty('rd', '64Byte XRAM Value (byte)', ['x0~x65535']),
      createCompletionForProperty('d', 'SNESAPU Data Area (byte)', ['d0~']),
      createCompletionForProperty('db', 'SNESAPU Data Area (byte)', ['db0~']),
      createCompletionForProperty('dw', 'SNESAPU Data Area (word)', ['dw0~']),
      createCompletionForProperty('dd', 'SNESAPU Data Area (double word)', ['dd0~']),
    ];
  };

  const parameterGroup3 = (): vscode.CompletionItem[] => {
    return [
      createCompletionForProperty('#', 'Literal Number', ['#0~']),
      createCompletionForProperty('i', 'SPC700 In Port', ['i0~i3']),
      createCompletionForProperty('o', 'SPC700 Out Port', ['o0~o3']),
      createCompletionForProperty('w', 'SNESAPU Working Memory', ['w0~w7']),
      createCompletionForProperty('r', '64KB RAM Value (byte)', ['r0~r65535']),
      createCompletionForProperty('rb', '64KB RAM Value (byte)', ['rb0~rb65535']),
      createCompletionForProperty('rw', '64KB RAM Value (word)', ['rw0~rw65535']),
      createCompletionForProperty('rd', '64KB RAM Value (double word)', ['rd0~rd65535']),
      createCompletionForProperty('rd', '64Byte XRAM Value (byte)', ['x0~x65535']),
      createCompletionForProperty('d', 'SNESAPU Data Area (byte)', ['d0~']),
      createCompletionForProperty('db', 'SNESAPU Data Area (byte)', ['db0~']),
      createCompletionForProperty('dw', 'SNESAPU Data Area (word)', ['dw0~']),
      createCompletionForProperty('dd', 'SNESAPU Data Area (double word)', ['dd0~']),
      createCompletionForProperty('l', 'Label Index', ['l0~l1023']),
    ];
  };

  const operatorGroup = (): vscode.CompletionItem[] => {
    return [
      createCompletionForOperator('+', 'Addition', []),
      createCompletionForOperator('-', 'Subtraction', []),
      createCompletionForOperator('*', 'Multiplication', []),
      createCompletionForOperator('/', 'Division (signed)', []),
      createCompletionForOperator('\\', 'Division (unsigned)', []),
      createCompletionForOperator('%', 'Division Remainder (signed)', []),
      createCompletionForOperator('$', 'Division Remainder (unsigned)', []),
      createCompletionForOperator('&', 'Bitwise, And', []),
      createCompletionForOperator('|', 'Bitwise, Or', []),
      createCompletionForOperator('^', 'Bitwise, XOr', []),
      createCompletionForOperator('<', 'Bitwise, Left Shift', []),
      createCompletionForOperator('_', 'Bitwise, Right Shift (signed)', []),
      createCompletionForOperator('>', 'Bitwise, Right Shift (unsigned)', []),
      createCompletionForOperator('!', 'Bitwise, Not', []),
    ];
  };

  const functionGroup = (): vscode.CompletionItem[] => {
    return [
      createCompletionForLabel(':', 'Label', [':0~:1023']),
      createCompletionForFunction('w', 'Wait', ['w <clock>', 'clock = 2,048kHz, 2048000 = 1sec']),
      createCompletionForFunction('m', 'Move Value', ['m <A> <B>', 'B <= A']),
      createCompletionForFunction('c', 'Compare / Dynamic Pointer', ['c <A> <B>']),
      createCompletionForFunction('a', 'Addition', ['a <A> <B>', 'B = A + B']),
      createCompletionForFunction('s', 'Subtraction', ['s <A> <B>', 'B = A - B']),
      createCompletionForFunction('u', 'Multiplication', ['u <A> <B>', 'B = A * B']),
      createCompletionForFunction('d', 'Division (signed)', ['d <A> <B>', 'B = A / B']),
      createCompletionForFunction('n', 'Universal Arithmetic', ['n <A> <OP> <B>', 'B = A ? B']),
      createCompletionForFunction('bra', 'Jump to Label (always)', ['bra <LABEL>']),
      createCompletionForFunction('beq', 'Jump to Label (equals)', ['beq <LABEL>', 'c <A> <B>, compare A == B']),
      createCompletionForFunction('bne', 'Jump to Label (not equals)', ['bne <LABEL>', 'c <A> <B>, compare A != B']),
      createCompletionForFunction('bge', 'Jump to Label (signed, greater than or equals)', ['bge <LABEL>', 'c <A> <B>, compare A <= B']),
      createCompletionForFunction('ble', 'Jump to Label (signed, lesser than or equals)', ['ble <LABEL>', 'c <A> <B>, compare A >= B']),
      createCompletionForFunction('bgt', 'Jump to Label (signed, greater than)', ['bgt <LABEL>', 'c <A> <B>, compare A < B']),
      createCompletionForFunction('blt', 'Jump to Label (signed, lesser than)', ['blt <LABEL>', 'c <A> <B>, compare A > B']),
      createCompletionForFunction('bcc', 'Jump to Label (unsigned, greater than or equals)', ['bcc <LABEL>', 'c <A> <B>, compare A <= B']),
      createCompletionForFunction('blo', 'Jump to Label (unsigned, lesser than or equals)', ['blo <LABEL>', 'c <A> <B>, compare A >= B']),
      createCompletionForFunction('bhi', 'Jump to Label (unsigned, greater than)', ['bhi <LABEL>', 'c <A> <B>, compare A < B']),
      createCompletionForFunction('bcs', 'Jump to Label (unsigned, lesser than)', ['bcs <LABEL>', 'c <A> <B>, compare A > B']),
      createCompletionForFunction('r', 'Return to after bxx command', ['r']),
      createCompletionForFunction('r1', 'Resume bxx position stacking', ['r1']),
      createCompletionForFunction('r0', 'Suspend bxx position stacking', ['r0']),
      createCompletionForFunction('f', 'Flush SPC700 ports', ['f']),
      createCompletionForFunction('f1', 'Resume SPC700 ports writing', ['f1']),
      createCompletionForFunction('f0', 'Suspend SPC700 ports writing', ['f0']),
      createCompletionForFunction('q', 'Stop running script', ['q']),
      createCompletionForFunction('nop', 'No Operation', ['nop']),
      createCompletionForFunction('e', 'Exit from this zone', ['e']),
      createCompletionForInclude('#i', 'Include Text File', ['#i "<FILE>"']),
      createCompletionForInclude('#it', 'Include Text File', ['#it "<FILE>"']),
      createCompletionForInclude('#ib', 'Include Binary File', ['#ib "<FILE>"']),
    ];
  };

  const scan = (document: vscode.TextDocument, regexp: RegExp, callback: (...groups: string[]) => string): vscode.CompletionItem[] => {
    // オプション指定忘れによる無限ループ防止
    if (!regexp.global) throw new Error('RegExp is not set global option.');

    const compiletions: vscode.CompletionItem[] = [];
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      let result = null;
      while (result = regexp.exec(line.text)) compiletions.push(createCompletionWithComment(document, i, callback(...result)));
    }

    return compiletions;
  };

  const provider = vscode.languages.registerCompletionItemProvider('script700', {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
      let linePrefix = document.lineAt(position).text.substr(0, position.character);
      if (/(^|\s)([c]\s+[^\s]+|[mcasudn])\s$/i.test(linePrefix)) {
        return parameterGroup1();
      } else if (/(^|\s)([n]\s+[^\s]+\s+[^\s]+|[masud]\s+[^\s]+)\s$/i.test(linePrefix)) {
        return parameterGroup2();
      } else if (/(^|\s)([w])\s$/i.test(linePrefix)) {
        return parameterGroup3();
      } else if (/(^|\s)([n]\s+[^\s]+)\s$/i.test(linePrefix)) {
        return operatorGroup();
      } else if (/(^|\s)(bra|beq|bne|bge|ble|bgt|blt|bcc|blo|bhi|bcs)\s$/i.test(linePrefix)) {
        const compiletions = scan(document, /\:(((0x|\$)[0-9a-f]+)|[0-9]+)/ig, (m, g1) => g1);
        compiletions.push(createCompletionForProperty('w', 'SNESAPU Working Memory', ['w0~w7']));
        return compiletions;
      } else if (/(;+|\/\/+)/.test(linePrefix)) {
        return undefined;
      } else if (/\s$/.test(linePrefix)) {
        return functionGroup();
      } else {
        return undefined;
      }
    }
  }, ' ', '\t');

  context.subscriptions.push(provider);
}
