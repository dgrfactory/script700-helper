import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const ParameterGroup1Words = ['#', 'i', 'o', 'w', 'r', 'rb', 'rw', 'rd', 'x', 'd', 'db', 'dw', 'dd', 'l'];
  const ParameterGroup2Words = ['i', 'o', 'w', 'r', 'rb', 'rw', 'rd', 'x', 'd', 'db', 'dw', 'dd'];
  const ParameterGroup3Words = ['#', 'i', 'o', 'w', 'r', 'rb', 'rw', 'rd', 'x', 'd', 'db', 'dw', 'dd', 'l'];

  const ParameterDescriptions: {[key: string]: {title: string, description: string[], kind: vscode.CompletionItemKind}} = {
    '#': {
      title: 'Literal Number',
      description: ['`#0` ~, `#-1` ~, `#0x00` ~, `#$00` ~'],
      kind: vscode.CompletionItemKind.Field,
    },
    'i': {
      title: 'SPC700 In Port',
      description: ['`i0` ~ `i3`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'o': {
      title: 'SPC700 Out Port',
      description: ['`o0` ~ `o3`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'w': {
      title: 'SNESAPU Working Memory',
      description: ['`w0` ~ `w7`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'r': {
      title: '64KB RAM Value (byte)',
      description: ['`r0` ~ `r65535`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'rb': {
      title: '64KB RAM Value (byte)',
      description: ['`rb0` ~ `rb65535`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'rw': {
      title: '64KB RAM Value (word)',
      description: ['`rw0` ~ `rw65535`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'rd': {
      title: '64KB RAM Value (double word)',
      description: ['`rd0` ~ `rd65535`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'x': {
      title: '64Byte XRAM Value (byte)',
      description: ['`x0` ~ `x63`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'd': {
      title: 'SNESAPU Data Area (byte)',
      description: ['`d0` ~'],
      kind: vscode.CompletionItemKind.Field,
    },
    'db': {
      title: 'SNESAPU Data Area (byte)',
      description: ['`db0` ~'],
      kind: vscode.CompletionItemKind.Field,
    },
    'dw': {
      title: 'SNESAPU Data Area (word)',
      description: ['`dw0` ~'],
      kind: vscode.CompletionItemKind.Field,
    },
    'dd': {
      title: 'SNESAPU Data Area (double word)',
      description: ['`dd0` ~'],
      kind: vscode.CompletionItemKind.Field,
    },
    'l': {
      title: 'Label Index',
      description: ['`l0` ~ `l1023`'],
      kind: vscode.CompletionItemKind.Field,
    },
  };

  const OperatorDescriptions: {[key: string]: {title: string, description: string[], kind: vscode.CompletionItemKind}} = {
    '+': {
      title: 'Addition',
      description: ['`n <A> + <B>`', 'B = A + B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '-': {
      title: 'Subtraction',
      description: ['`n <A> - <B>`', 'B = A - B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '*': {
      title: 'Multiplication',
      description: ['`n <A> * <B>`', 'B = A * B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '/': {
      title: 'Division (signed)',
      description: ['`n <A> / <B>`', 'B = A / B, like IDiv'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '\\': {
      title: 'Division (unsigned)',
      description: ['`n <A> \\ <B>`', 'B = A / B, like Div'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '%': {
      title: 'Division Remainder (signed)',
      description: ['`n <A> % <B>`', 'B = A % B, like IDiv'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '$': {
      title: 'Division Remainder (unsigned)',
      description: ['`n <A> $ <B>`', 'B = A % B, like Div'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '&': {
      title: 'Bitwise, And',
      description: ['`n <A> & <B>`', 'B = A & B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '|': {
      title: 'Bitwise, Or',
      description: ['`n <A> | <B>`', 'B = A | B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '^': {
      title: 'Bitwise, XOr',
      description: ['`n <A> ^ <B>`', 'B = A ^ B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '<': {
      title: 'Bitwise, Left Shift',
      description: ['`n <A> < <B>`', 'B = A << B, like ShL'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '_': {
      title: 'Bitwise, Right Shift (signed)',
      description: ['`n <A> _ <B>`', 'B = A >> B, like SAR'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '>': {
      title: 'Bitwise, Right Shift (unsigned)',
      description: ['`n <A> > <B>`', 'B = A >> B, like ShR'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '!': {
      title: 'Bitwise, Not',
      description: ['`n <A> ! <B>`', 'B = Not A, like B = A XOr -1'],
      kind: vscode.CompletionItemKind.Operator,
    },
  };

  const FunctionDescriptions: {[key: string]: {title: string, description: string[], kind: vscode.CompletionItemKind}} = {
    ':': {
      title: 'Label',
      description: ['`:0` ~ `:1023`'],
      kind: vscode.CompletionItemKind.Enum,
    },
    '::': {
      title: 'Exit from Script Zone',
      description: ['`::`'],
      kind: vscode.CompletionItemKind.Enum,
    },
    'w': {
      title: 'Wait',
      description: ['`w <CLOCK>`', '`<CLOCK>` = 2,048kHz, 2048000 = 1sec'],
      kind: vscode.CompletionItemKind.Function,
    },
    'm': {
      title: 'Move Value',
      description: ['`m <A> <B>`', 'Copy from A to B'],
      kind: vscode.CompletionItemKind.Function,
    },
    'c': {
      title: 'Compare / Dynamic Pointer',
      description: ['`c <A> <B>`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'a': {
      title: 'Addition',
      description: ['`a <A> <B>`', 'B = A + B'],
      kind: vscode.CompletionItemKind.Function,
    },
    's': {
      title: 'Subtraction',
      description: ['`s <A> <B>`', 'B = A - B'],
      kind: vscode.CompletionItemKind.Function,
    },
    'u': {
      title: 'Multiplication',
      description: ['`u <A> <B>`', 'B = A * B'],
      kind: vscode.CompletionItemKind.Function,
    },
    'd': {
      title: 'Division (signed)',
      description: ['`d <A> <B>`', 'B = A / B, like IDiv'],
      kind: vscode.CompletionItemKind.Function,
    },
    'n': {
      title: 'Universal Arithmetic',
      description: ['`n <A> <OP> <B>`', 'B = A ? B'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bra': {
      title: 'Jump to Label (always)',
      description: ['`bra <LABEL>`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'beq': {
      title: 'Jump to Label (equals)',
      description: ['`beq <LABEL>`', 'Jump if `C <A> <B>` matches "A == B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bne': {
      title: 'Jump to Label (not equals)',
      description: ['`bne <LABEL>`', 'Jump if `C <A> <B>` matches "A != B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bge': {
      title: 'Jump to Label (signed, greater than or equals)',
      description: ['`bge <LABEL>`', 'Jump if `C <A> <B>` matches "A <= B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'ble': {
      title: 'Jump to Label (signed, lesser than or equals)',
      description: ['`ble <LABEL>`', 'Jump if `C <A> <B>` matches "A >= B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bgt': {
      title: 'Jump to Label (signed, greater than)',
      description: ['`bgt <LABEL>`', 'Jump if `C <A> <B>` matches "A < B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'blt': {
      title: 'Jump to Label (signed, lesser than)',
      description: ['`blt <LABEL>`', 'Jump if `C <A> <B>` matches "A > B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bcc': {
      title: 'Jump to Label (unsigned, greater than or equals)',
      description: ['`bcc <LABEL>`', 'Jump if `C <A> <B>` matches "A <= B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'blo': {
      title: 'Jump to Label (unsigned, lesser than or equals)',
      description: ['`blo <LABEL>`', 'Jump if `C <A> <B>` matches "A >= B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bhi': {
      title: 'Jump to Label (unsigned, greater than)',
      description: ['`bhi <LABEL>`', 'Jump if `C <A> <B>` matches "A < B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bcs': {
      title: 'Jump to Label (unsigned, lesser than)',
      description: ['`bcs <LABEL>`', 'Jump if `C <A> <B>` matches "A > B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'r': {
      title: 'Return to after bxx command',
      description: ['`r`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'r1': {
      title: 'Resume bxx position stacking',
      description: ['`r1`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'r0': {
      title: 'Suspend bxx position stacking',
      description: ['`r0`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'f': {
      title: 'Flush SPC700 ports',
      description: ['`f`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'f1': {
      title: 'Resume SPC700 ports writing',
      description: ['`f1`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'f0': {
      title: 'Suspend SPC700 ports writing',
      description: ['`f0`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'q': {
      title: 'Stop running script',
      description: ['`q`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'nop': {
      title: 'No Operation',
      description: ['`nop`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'e': {
      title: 'Exit from Script Zone',
      description: ['`e`'],
      kind: vscode.CompletionItemKind.Function,
    },
    '#i': {
      title: 'Include Text File',
      description: ['`#i "<FILE>"`', "`<FILE>` = Relative Path"],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#it': {
      title: 'Include Text File',
      description: ['`#it "<FILE>"`', "`<FILE>` = Relative Path"],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#ib': {
      title: 'Include Binary File',
      description: ['`#ib "<FILE>"`', "`<FILE>` = Relative Path"],
      kind: vscode.CompletionItemKind.Interface,
    },
  };

  const DSPOptionDescriptions: {[key: string]: {title: string, description: string[], kind: vscode.CompletionItemKind}} = {
    'm': {
      title: 'Mute',
      description: ['`m <SOUND>,!`', '`<SOUND>` = Number of Sound Source (0 ~ 255)'],
      kind: vscode.CompletionItemKind.Function,
    },
    'c': {
      title: 'Note Change',
      description: ['`c <SOUND>,! <CHANGE>`', '`<SOUND>` = Number of Sound Source (0 ~ 255)',
        '`<CHANGE>` = Number of Sound Source (0 ~ 255)'],
      kind: vscode.CompletionItemKind.Function,
    },
    'd': {
      title: 'Note Detune',
      description: ['`d <SOUND> <RATE>`', '`<SOUND>` = Number of Sound Source (0 ~ 255)',
        '`<RATE>` = Relative Rate'],
      kind: vscode.CompletionItemKind.Function,
    },
    'v': {
      title: 'Volume Level',
      description: ['`v <SOUND>,!,l,r,lr,vl,vr,el,er <VOLUME>`', '`<SOUND>` = Number of Sound Source (0 ~ 255)',
        '`<VOLUME>` = Level base on 65536, x0.5 = 32768 / x2 = 131072'],
      kind: vscode.CompletionItemKind.Function,
    },
    'e': {
      title: 'Exit from Startup Zone',
      description: ['`e`'],
      kind: vscode.CompletionItemKind.Function,
    },
    '#i': {
      title: 'Include Text File',
      description: ['`#i "<FILE>"`', "`<FILE>` = Relative Path"],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#it': {
      title: 'Include Text File',
      description: ['`#it "<FILE>"`', "`<FILE>` = Relative Path"],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#ib': {
      title: 'Include Binary File',
      description: ['`#ib "<FILE>"`', "`<FILE>` = Relative Path"],
      kind: vscode.CompletionItemKind.Interface,
    },
  };

  const DSPTargetDescriptions: {[key: string]: {command: RegExp, title: string, description: string[], kind: vscode.CompletionItemKind}} = {
    '!': {
      command: /[mcdv]/,
      title: 'All Sources',
      description: ['For all sound sources (0 ~ 255)'],
      kind: vscode.CompletionItemKind.Field,
    },
    'l': {
      command: /[v]/,
      title: 'Left of Master Volume and Echo Level',
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'r': {
      command: /[v]/,
      title: 'Right of Master Volume and Echo Level',
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'lr': {
      command: /[v]/,
      title: 'All of Master Volume and Echo Level',
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'vl': {
      command: /[v]/,
      title: 'Left of Master Volume',
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'vr': {
      command: /[v]/,
      title: 'Right of Master Volume',
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'el': {
      command: /[v]/,
      title: 'Left of Master Echo Level',
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'er': {
      command: /[v]/,
      title: 'Right of Master Echo Level',
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
  };

  type ZONES = 'script' | 'startup' | 'data';

  const getComment = (document: vscode.TextDocument, lineIndex: number): string[] => {
    const self = document.lineAt(lineIndex);
    if (/([;']|\/\/|\#\s)(.+)/.exec(self.text)) return [RegExp.$2.replace(/^\s+|\s+$/g, '')];

    const comments: string[] = [];
    for (let i = lineIndex - 1; i >= 0; i--) {
      const line = document.lineAt(i);
      if (/([;']|\/\/|\#\s)(.+)/.exec(line.text)) comments.unshift(RegExp.$2.replace(/^\s+|\s+$/g, ''));
      else break;
    }

    return comments.map((v) => v.replace(/^[\-\=\*\#]+$/, '')).filter((v) => v);
  };

  const createCompletion = (label: string, title: string, description: string[], kind: vscode.CompletionItemKind): vscode.CompletionItem => {
    const item = new vscode.CompletionItem(label, kind);
    item.detail = title;
    if (description.length) item.documentation = new vscode.MarkdownString(description.join('  \r\n'));
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

  const getCurrentZone = (document: vscode.TextDocument, position: vscode.Position): ZONES => {
    let endTagCount: number = 0;

    for (let i = position.line; i >= 0; i--) {
      let line = document.lineAt(i).text.replace(/([;']|\/\/|\#\s)(.+)/, '');
      if (i === position.line) line = line.substring(0, position.character);
      if (/(^|\s)(e|\:\:)\s+(.*\s+)?e($|\s)/.test(line)) return 'data';
      else if (!endTagCount && /(^|\s)(e\s+(.*\s+)?)?\:\:($|\s)/.test(line)) endTagCount++;
      else if (/(^|\s)e($|\s)/.test(line)) if (++endTagCount >= 2) return 'data';
    }

    return endTagCount ? 'startup' : 'script';
  };

  const createHoverForScript = (document: vscode.TextDocument, command: string, word: string): vscode.ProviderResult<vscode.Hover> => {
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
    } else if (/^(bra|beq|bne|bge|ble|bgt|blt|bcc|blo|bhi|bcs)$/.test(command) && /(0x|\$)?[0-9a-f]+/i.exec(word)) {
      const label = `:${word}`;
      for (let i = 0; i < document.lineCount - 1; i++) if (document.lineAt(i).text.indexOf(label) >= 0) return new vscode.Hover([
        {language: 'script700', value: word},
        {language: 'plaintext', value: `LABEL: ${word}`},
        getComment(document, i).join('  \r\n'),
      ]);
    }

    let parameterMark = /^(.{1,2})(\-?(0x|\$)?[0-9a-f]|\?)/i.exec(word) ? RegExp.$1 : '';
    if (ParameterDescriptions[parameterMark]) {
      return new vscode.Hover([
        {language: 'plaintext', value: word},
        {language: 'plaintext', value: ParameterDescriptions[parameterMark].title},
        ParameterDescriptions[parameterMark].description.join('  \r\n'),
      ]);
    }

    parameterMark = parameterMark.substring(0, 1);
    if (ParameterDescriptions[parameterMark]) {
      return new vscode.Hover([
        {language: 'plaintext', value: word},
        {language: 'plaintext', value: ParameterDescriptions[parameterMark].title},
        ParameterDescriptions[parameterMark].description.join('  \r\n'),
      ]);
    }
  };

  const createHoverForStartup = (word: string): vscode.ProviderResult<vscode.Hover> => {
    if (DSPOptionDescriptions[word]) {
      return new vscode.Hover([
        {language: 'script700', value: word},
        {language: 'plaintext', value: DSPOptionDescriptions[word].title},
        DSPOptionDescriptions[word].description.join('  \r\n'),
      ]);
    }

    if (DSPTargetDescriptions[word]) {
      return new vscode.Hover([
        {language: 'plaintext', value: word},
        {language: 'plaintext', value: DSPTargetDescriptions[word].title},
        DSPTargetDescriptions[word].description.join('  \r\n'),
      ]);
    }
  };

  const hoverProvider = vscode.languages.registerHoverProvider('script700', {
    provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.Hover> {
      const line = document.lineAt(position).text.replace(/([;']|\/\/|\#\s)(.+)/, '');
      if (line.length < position.character) return;

      const command = /([^\s]+)\s+[^\s]*$/.exec(line.substring(0, position.character)) ? RegExp.$1 : '';
      const before = /([^\s]+)$/.exec(line.substring(0, position.character)) ? RegExp.$1 : '';
      const after = /^([^\s]+)/.exec(line.substring(position.character)) ? RegExp.$1 : '';
      const word = `${before}${after}`;

      const zone = getCurrentZone(document, position);
      if (zone === 'script') return createHoverForScript(document, command, word);
      else if (zone === 'startup') return createHoverForStartup(word);
    }
  });

  const createCompletionForScript = (document: vscode.TextDocument, line: string)
    : vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> => {
    if (/([;']|\/\/|\#\s)/.test(line)) {
      return;
    } else if (/(^|\s)([n](\s+[^\s]+){3}|[mcasud](\s+[^\s]+){2}|(bra|beq|bne|bge|ble|bgt|blt|bcc|blo|bhi|bcs|[w])\s+[^\s]+)\s+$/i.test(line)) {
      return Object.keys(FunctionDescriptions).map((word) => {
        const map = FunctionDescriptions[word];
        return createCompletion(word, map.title, map.description, map.kind);
      });
    } else if (/(^|\s)([c]\s+[^\s]+|[mcasudn])\s+$/i.test(line)) {
      return ParameterGroup1Words.map((word) => {
        const map = ParameterDescriptions[word];
        return createCompletion(word, map.title, map.description, map.kind);
      });
    } else if (/(^|\s)([n]\s+[^\s]+\s+[^\s]+|[masud]\s+[^\s]+)\s+$/i.test(line)) {
      return ParameterGroup2Words.map((word) => {
        const map = ParameterDescriptions[word];
        return createCompletion(word, map.title, map.description, map.kind);
      });
    } else if (/(^|\s)([w])\s+$/i.test(line)) {
      return ParameterGroup3Words.map((word) => {
        const map = ParameterDescriptions[word];
        return createCompletion(word, map.title, map.description, map.kind);
      });
    } else if (/(^|\s)([n]\s+[^\s]+)\s+$/i.test(line)) {
      return Object.keys(OperatorDescriptions).map((word) => {
        const map = OperatorDescriptions[word];
        return createCompletion(word, map.title, map.description, map.kind);
      });
    } else if (/(^|\s)(bra|beq|bne|bge|ble|bgt|blt|bcc|blo|bhi|bcs)\s+$/i.test(line)) {
      const compiletions = scan(document, /\:(((0x|\$)[0-9a-f]+)|[0-9]+)/ig, (m, g1) => g1);
      compiletions.push(createCompletion('w', 'SNESAPU Working Memory', ['w0 ~ w7'], vscode.CompletionItemKind.Field));
      return compiletions;
    } else if (/(^|\s)$/.test(line)) {
      return Object.keys(FunctionDescriptions).map((word) => {
        const map = FunctionDescriptions[word];
        return createCompletion(word, map.title, map.description, map.kind);
      });
    }
  };

  const createCompletionForStartup = (document: vscode.TextDocument, line: string)
    : vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> => {
    if (/([;']|\/\/|\#\s)/.test(line)) {
      return;
    } else if (/(^|\s)([cdv](\s+[^\s]+){2}|[m]\s+[^\s]+)\s+$/i.test(line)) {
      return Object.keys(DSPOptionDescriptions).map((word) => {
        const map = DSPOptionDescriptions[word];
        return createCompletion(word, map.title, map.description, map.kind);
      });
    } else if (/(^|\s)([cdv]\s+[^\s]+)\s+$/i.test(line)) {
      return;
    } else if (/(^|\s)([mcdv])\s+$/i.exec(line)) {
      const command = RegExp.$2;
      return Object.keys(DSPTargetDescriptions).filter((word) => {
        const map = DSPTargetDescriptions[word];
        return map.command.test(command);
      }).map((word) => {
        const map = DSPTargetDescriptions[word];
        return createCompletion(word, map.title, map.description, map.kind);
      });
    } else if (/(^|\s)$/.test(line)) {
      return Object.keys(DSPOptionDescriptions).map((word) => {
        const map = DSPOptionDescriptions[word];
        return createCompletion(word, map.title, map.description, map.kind);
      });
    }
  };

  const completionItemProvider = vscode.languages.registerCompletionItemProvider('script700', {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position)
    : vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
      const line = document.lineAt(position).text.substring(0, position.character);
      const zone = getCurrentZone(document, position);
      if (zone === 'script') return createCompletionForScript(document, line);
      else if (zone === 'startup') return createCompletionForStartup(document, line);
    }
  }, ' ', '\t');

  context.subscriptions.push(hoverProvider, completionItemProvider);
}
