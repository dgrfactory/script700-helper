import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const ParameterGroup1Words = ['#', 'i', 'o', 'w', 'r', 'rb', 'rw', 'rd', 'x', 'd', 'db', 'dw', 'dd', 'l'];
  const ParameterGroup2Words = ['i', 'o', 'w', 'r', 'rb', 'rw', 'rd', 'x', 'd', 'db', 'dw', 'dd'];
  const ParameterGroup3Words = ['#', 'i', 'o', 'w', 'r', 'rb', 'rw', 'rd', 'x', 'd', 'db', 'dw', 'dd', 'l'];
  const ParameterDescriptions: {[key: string]: {title: string, description: string[], kind: vscode.CompletionItemKind}} = {
    '#': {title: 'Literal Number', description: ['#0~'], kind: vscode.CompletionItemKind.Field},
    'i': {title: 'SPC700 In Port', description: ['i0~i3'], kind: vscode.CompletionItemKind.Field},
    'o': {title: 'SPC700 Out Port', description: ['o0~o3'], kind: vscode.CompletionItemKind.Field},
    'w': {title: 'SNESAPU Working Memory', description: ['w0~w7'], kind: vscode.CompletionItemKind.Field},
    'r': {title: '64KB RAM Value (byte)', description: ['r0~r65535'], kind: vscode.CompletionItemKind.Field},
    'rb': {title: '64KB RAM Value (byte)', description: ['rb0~rb65535'], kind: vscode.CompletionItemKind.Field},
    'rw': {title: '64KB RAM Value (word)', description: ['rw0~rw65535'], kind: vscode.CompletionItemKind.Field},
    'rd': {title: '64KB RAM Value (double word)', description: ['rd0~rd65535'], kind: vscode.CompletionItemKind.Field},
    'x': {title: '64Byte XRAM Value (byte)', description: ['x0~x65535'], kind: vscode.CompletionItemKind.Field},
    'd': {title: 'SNESAPU Data Area (byte)', description: ['d0~'], kind: vscode.CompletionItemKind.Field},
    'db': {title: 'SNESAPU Data Area (byte)', description: ['db0~'], kind: vscode.CompletionItemKind.Field},
    'dw': {title: 'SNESAPU Data Area (word)', description: ['dw0~'], kind: vscode.CompletionItemKind.Field},
    'dd': {title: 'SNESAPU Data Area (double word)', description: ['dd0~'], kind: vscode.CompletionItemKind.Field},
    'l': {title: 'Label Index', description: ['l0~l1023'], kind: vscode.CompletionItemKind.Field},
  };
  const OperatorDescriptions: {[key: string]: {title: string, description: string[], kind: vscode.CompletionItemKind}} = {
    '+': {title: 'Addition', description: [], kind: vscode.CompletionItemKind.Operator},
    '-': {title: 'Subtraction', description: [], kind: vscode.CompletionItemKind.Operator},
    '*': {title: 'Multiplication', description: [], kind: vscode.CompletionItemKind.Operator},
    '/': {title: 'Division (signed)', description: [], kind: vscode.CompletionItemKind.Operator},
    '\\': {title: 'Division (unsigned)', description: [], kind: vscode.CompletionItemKind.Operator},
    '%': {title: 'Division Remainder (signed)', description: [], kind: vscode.CompletionItemKind.Operator},
    '$': {title: 'Division Remainder (unsigned)', description: [], kind: vscode.CompletionItemKind.Operator},
    '&': {title: 'Bitwise, And', description: [], kind: vscode.CompletionItemKind.Operator},
    '|': {title: 'Bitwise, Or', description: [], kind: vscode.CompletionItemKind.Operator},
    '^': {title: 'Bitwise, XOr', description: [], kind: vscode.CompletionItemKind.Operator},
    '<': {title: 'Bitwise, Left Shift', description: [], kind: vscode.CompletionItemKind.Operator},
    '_': {title: 'Bitwise, Right Shift (signed)', description: [], kind: vscode.CompletionItemKind.Operator},
    '>': {title: 'Bitwise, Right Shift (unsigned)', description: [], kind: vscode.CompletionItemKind.Operator},
    '!': {title: 'Bitwise, Not', description: [], kind: vscode.CompletionItemKind.Operator},
  };
  const FunctionDescriptions: {[key: string]: {title: string, description: string[], kind: vscode.CompletionItemKind}} = {
    ':': {title: 'Label', description: [':0~:1023'], kind: vscode.CompletionItemKind.Enum},
    'w': {title: 'Wait', description: ['w <clock>', 'clock = 2,048kHz, 2048000 = 1sec'], kind: vscode.CompletionItemKind.Function},
    'm': {title: 'Move Value', description: ['m <A> <B>', 'B <= A'], kind: vscode.CompletionItemKind.Function},
    'c': {title: 'Compare / Dynamic Pointer', description: ['c <A> <B>'], kind: vscode.CompletionItemKind.Function},
    'a': {title: 'Addition', description: ['a <A> <B>', 'B = A + B'], kind: vscode.CompletionItemKind.Function},
    's': {title: 'Subtraction', description: ['s <A> <B>', 'B = A - B'], kind: vscode.CompletionItemKind.Function},
    'u': {title: 'Multiplication', description: ['u <A> <B>', 'B = A * B'], kind: vscode.CompletionItemKind.Function},
    'd': {title: 'Division (signed)', description: ['d <A> <B>', 'B = A / B'], kind: vscode.CompletionItemKind.Function},
    'n': {title: 'Universal Arithmetic', description: ['n <A> <OP> <B>', 'B = A ? B'], kind: vscode.CompletionItemKind.Function},
    'bra': {title: 'Jump to Label (always)', description: ['bra <LABEL>'], kind: vscode.CompletionItemKind.Function},
    'beq': {title: 'Jump to Label (equals)', description: ['beq <LABEL>', 'c <A> <B>, compare A == B'], kind: vscode.CompletionItemKind.Function},
    'bne': {title: 'Jump to Label (not equals)', description: ['bne <LABEL>', 'c <A> <B>, compare A != B'], kind: vscode.CompletionItemKind.Function},
    'bge': {title: 'Jump to Label (signed, greater than or equals)', description: ['bge <LABEL>', 'c <A> <B>, compare A <= B'], kind: vscode.CompletionItemKind.Function},
    'ble': {title: 'Jump to Label (signed, lesser than or equals)', description: ['ble <LABEL>', 'c <A> <B>, compare A >= B'], kind: vscode.CompletionItemKind.Function},
    'bgt': {title: 'Jump to Label (signed, greater than)', description: ['bgt <LABEL>', 'c <A> <B>, compare A < B'], kind: vscode.CompletionItemKind.Function},
    'blt': {title: 'Jump to Label (signed, lesser than)', description: ['blt <LABEL>', 'c <A> <B>, compare A > B'], kind: vscode.CompletionItemKind.Function},
    'bcc': {title: 'Jump to Label (unsigned, greater than or equals)', description: ['bcc <LABEL>', 'c <A> <B>, compare A <= B'], kind: vscode.CompletionItemKind.Function},
    'blo': {title: 'Jump to Label (unsigned, lesser than or equals)', description: ['blo <LABEL>', 'c <A> <B>, compare A >= B'], kind: vscode.CompletionItemKind.Function},
    'bhi': {title: 'Jump to Label (unsigned, greater than)', description: ['bhi <LABEL>', 'c <A> <B>, compare A < B'], kind: vscode.CompletionItemKind.Function},
    'bcs': {title: 'Jump to Label (unsigned, lesser than)', description: ['bcs <LABEL>', 'c <A> <B>, compare A > B'], kind: vscode.CompletionItemKind.Function},
    'r': {title: 'Return to after bxx command', description: ['r'], kind: vscode.CompletionItemKind.Function},
    'r1': {title: 'Resume bxx position stacking', description: ['r1'], kind: vscode.CompletionItemKind.Function},
    'r0': {title: 'Suspend bxx position stacking', description: ['r0'], kind: vscode.CompletionItemKind.Function},
    'f': {title: 'Flush SPC700 ports', description: ['f'], kind: vscode.CompletionItemKind.Function},
    'f1': {title: 'Resume SPC700 ports writing', description: ['f1'], kind: vscode.CompletionItemKind.Function},
    'f0': {title: 'Suspend SPC700 ports writing', description: ['f0'], kind: vscode.CompletionItemKind.Function},
    'q': {title: 'Stop running script', description: ['q'], kind: vscode.CompletionItemKind.Function},
    'nop': {title: 'No Operation', description: ['nop'], kind: vscode.CompletionItemKind.Function},
    'e': {title: 'Exit from this zone', description: ['e'], kind: vscode.CompletionItemKind.Function},
    '#i': {title: 'Include Text File', description: ['#i "<FILE>"'], kind: vscode.CompletionItemKind.Interface},
    '#it': {title: 'Include Text File', description: ['#it "<FILE>"'], kind: vscode.CompletionItemKind.Interface},
    '#ib': {title: 'Include Binary File', description: ['#ib "<FILE>"'], kind: vscode.CompletionItemKind.Interface},
  };

  const getComment = (document: vscode.TextDocument, lineIndex: number): string[] => {
    const self = document.lineAt(lineIndex);
    if (/(;+|\/\/+)(.+)/.exec(self.text)) return [RegExp.$2.replace(/^\s+|\s+$/g, '')];

    const comments: string[] = [];
    for (let i = lineIndex - 1; i >= 0; i--) {
      const line = document.lineAt(i);
      if (/(;+|\/\/+)(.+)/.exec(line.text)) comments.unshift(RegExp.$2.replace(/^\s+|\s+$/g, ''));
      else break;
    }

    return comments.map((v) => v.replace(/^[\-\=\*\#]+$/, '')).filter((v) => v);
  };

  const createCompletion = (label: string, title: string, description: string[], kind: vscode.CompletionItemKind): vscode.CompletionItem => {
    const item = new vscode.CompletionItem(label, kind);
    item.detail = title;
    if (description.length) item.documentation = description.join('\r\n');
    return item;
  };

  const createCompletionWithComment = (document: vscode.TextDocument, lineIndex: number, label: string): vscode.CompletionItem => {
    return createCompletion(label, `LABEL: ${label}`, getComment(document, lineIndex), vscode.CompletionItemKind.Enum);
  };

  const scan = (document: vscode.TextDocument, regexp: RegExp, callback: (...groups: string[]) => string): vscode.CompletionItem[] => {
    // オプション指定忘れによる無限ループ防止
    if (!regexp.global) throw new Error('RegExp is not set global option.');

    const compiletions: vscode.CompletionItem[] = [];
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      let result = null;
      while (result = regexp.exec(line.text)) {
        compiletions.push(createCompletionWithComment(document, i, callback(...result)));
      }
    }

    return compiletions;
  };

  const hoverProvider = vscode.languages.registerHoverProvider('script700', {
    provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.Hover> {
      const line = document.lineAt(position).text.replace(/(;+|\/\/+)(.+)/, '');
      if (line.length < position.character) return;

      const before = /([^\s]+)$/.exec(line.substring(0, position.character)) ? RegExp.$1 : '';
      const after = /^([^\s]+)/.exec(line.substring(position.character)) ? RegExp.$1 : '';
      const word = `${before}${after}`;

      if (FunctionDescriptions[word]) {
        return new vscode.Hover([
          {language: 'script700', value: word},
          {language: 'plaintext', value: FunctionDescriptions[word].title},
          FunctionDescriptions[word].description.join('  \r\n'),
        ]);
      } else if (OperatorDescriptions[word]) {
        return new vscode.Hover([
          {language: 'script700', value: word},
          {language: 'plaintext', value: OperatorDescriptions[word].title},
          OperatorDescriptions[word].description.join('  \r\n'),
        ]);
      }

      const parameterMark = /^(.{1,2})(0x|\$)?[0-9a-f\?]/i.exec(word) ? RegExp.$1 : '';

      if (ParameterDescriptions[parameterMark]) {
        return new vscode.Hover([
          {language: 'plaintext', value: word},
          {language: 'plaintext', value: ParameterDescriptions[parameterMark].title},
          ParameterDescriptions[parameterMark].description.join('  \r\n'),
        ]);
      }
    }
  });

  const completionItemProvider = vscode.languages.registerCompletionItemProvider('script700', {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position)
    : vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
      let linePrefix = document.lineAt(position).text.substr(0, position.character);

      if (/(;+|\/\/+)/.test(linePrefix)) {
        return;
      } else if (/(^|\s)([c]\s+[^\s]+|[mcasudn])\s+$/i.test(linePrefix)) {
        return ParameterGroup1Words.map((label) => {
          const map = ParameterDescriptions[label];
          return createCompletion(label, map.title, map.description, map.kind);
        });
      } else if (/(^|\s)([n]\s+[^\s]+\s+[^\s]+|[masud]\s+[^\s]+)\s+$/i.test(linePrefix)) {
        return ParameterGroup2Words.map((label) => {
          const map = ParameterDescriptions[label];
          return createCompletion(label, map.title, map.description, map.kind);
        });
      } else if (/(^|\s)([w])\s+$/i.test(linePrefix)) {
        return ParameterGroup3Words.map((label) => {
          const map = ParameterDescriptions[label];
          return createCompletion(label, map.title, map.description, map.kind);
        });
      } else if (/(^|\s)([n]\s+[^\s]+)\s+$/i.test(linePrefix)) {
        return Object.keys(OperatorDescriptions).map((label) => {
          const map = OperatorDescriptions[label];
          return createCompletion(label, map.title, map.description, map.kind);
        });
      } else if (/(^|\s)(bra|beq|bne|bge|ble|bgt|blt|bcc|blo|bhi|bcs)\s+$/i.test(linePrefix)) {
        const compiletions = scan(document, /\:(((0x|\$)[0-9a-f]+)|[0-9]+)/ig, (m, g1) => g1);
        compiletions.push(createCompletion('w', 'SNESAPU Working Memory', ['w0~w7'], vscode.CompletionItemKind.Field));
        return compiletions;
      } else if (/(^|\s)$/.test(linePrefix)) {
        return Object.keys(FunctionDescriptions).map((label) => {
          const map = FunctionDescriptions[label];
          return createCompletion(label, map.title, map.description, map.kind);
        });
      }
    }
  }, ' ', '\t');

  context.subscriptions.push(hoverProvider, completionItemProvider);
}
