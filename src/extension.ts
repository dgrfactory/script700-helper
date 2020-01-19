import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const ParameterGroup1Words = ['#', 'i', 'o', 'w', 'r', 'rb', 'rw', 'rd', 'x', 'd', 'db', 'dw', 'dd', 'l'];
  const ParameterGroup2Words = ['i', 'o', 'w', 'r', 'rb', 'rw', 'rd', 'x', 'd', 'db', 'dw', 'dd'];
  const ParameterGroup3Words = ['#', 'i', 'o', 'w', 'r', 'rb', 'rw', 'rd', 'x', 'd', 'db', 'dw', 'dd', 'l'];

  const ParameterDescriptions: {[key: string]: {title: string, description: string[], kind: vscode.CompletionItemKind}} = {
    '#': {
      title: ['固定数値', 'Literal Number'].join('\r\n'),
      description: ['`#0`\\~, `#-1`\\~, `#0x00`\\~, `#$00`\\~'],
      kind: vscode.CompletionItemKind.Field,
    },
    'i': {
      title: ['SPC700 入力ポート', 'SPC700 In Port (8-bit)'].join('\r\n'),
      description: ['`i0`\\~`i3`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'o': {
      title: ['SPC700 出力ポート', 'SPC700 Out Port (8-bit)'].join('\r\n'),
      description: ['`o0`\\~`o3`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'w': {
      title: ['SNESAPU ユーザ ワーク メモリ', 'SNESAPU User Work Memory (32-bit)'].join('\r\n'),
      description: ['`w0`\\~`w7`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'r': {
      title: 'SPC700 64KB RAM (8-bit)',
      description: ['`r0`\\~`r65535`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'rb': {
      title: 'SPC700 64KB RAM (8-bit)',
      description: ['`rb0`\\~`rb65535`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'rw': {
      title: 'SPC700 64KB RAM (16-bit)',
      description: ['`rw0`\\~`rw65535`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'rd': {
      title: 'SPC700 64KB RAM (32-bit)',
      description: ['`rd0`\\~`rd65535`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'x': {
      title: 'SPC700 64Byte Extra RAM (8-bit)',
      description: ['`x0`\\~`x63`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'd': {
      title: ['SNESAPU データ領域', 'SNESAPU Data Area (8-bit)'].join('\r\n'),
      description: ['`d0`\\~'],
      kind: vscode.CompletionItemKind.Field,
    },
    'db': {
      title: ['SNESAPU データ領域', 'SNESAPU Data Area (8-bit)'].join('\r\n'),
      description: ['`db0`\\~'],
      kind: vscode.CompletionItemKind.Field,
    },
    'dw': {
      title: ['SNESAPU データ領域', 'SNESAPU Data Area (16-bit)'].join('\r\n'),
      description: ['`dw0`\\~'],
      kind: vscode.CompletionItemKind.Field,
    },
    'dd': {
      title: ['SNESAPU データ領域', 'SNESAPU Data Area (32-bit)'].join('\r\n'),
      description: ['`dd0`\\~'],
      kind: vscode.CompletionItemKind.Field,
    },
    'l': {
      title: ['ラベル番号', 'Label Index'].join('\r\n'),
      description: ['`l0`\\~`l1023`'],
      kind: vscode.CompletionItemKind.Field,
    },
  };

  const OperatorDescriptions: {[key: string]: {title: string, description: string[], kind: vscode.CompletionItemKind}} = {
    '+': {
      title: ['加算', 'Addition'].join('\r\n'),
      description: ['`n <A> + <B>`', 'B = A + B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '-': {
      title: ['減算', 'Subtraction'].join('\r\n'),
      description: ['`n <A> - <B>`', 'B = A - B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '*': {
      title: ['乗算', 'Multiplication'].join('\r\n'),
      description: ['`n <A> * <B>`', 'B = A * B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '/': {
      title: ['除算 (符号あり)', 'Division (signed)'].join('\r\n'),
      description: ['`n <A> / <B>`', 'B = A / B, like IDiv'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '\\': {
      title: ['除算 (符号なし)', 'Division (unsigned)'].join('\r\n'),
      description: ['`n <A> \\ <B>`', 'B = A / B, like Div'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '%': {
      title: ['余り (符号あり)', 'Division Remainder (signed)'].join('\r\n'),
      description: ['`n <A> % <B>`', 'B = A % B, like IDiv'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '$': {
      title: ['余り (符号なし)', 'Division Remainder (unsigned)'].join('\r\n'),
      description: ['`n <A> $ <B>`', 'B = A % B, like Div'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '&': {
      title: ['論理積', 'Bitwise, And'].join('\r\n'),
      description: ['`n <A> & <B>`', 'B = A & B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '|': {
      title: ['論理和', 'Bitwise, Or'].join('\r\n'),
      description: ['`n <A> | <B>`', 'B = A | B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '^': {
      title: ['排他的論理和', 'Bitwise, XOr'].join('\r\n'),
      description: ['`n <A> ^ <B>`', 'B = A ^ B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '<': {
      title: ['ビット左シフト', 'Bitwise, Left Shift'].join('\r\n'),
      description: ['`n <A> < <B>`', 'B = A << B, like ShL'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '_': {
      title: ['ビット右シフト', 'Bitwise, Right Shift (signed)'].join('\r\n'),
      description: ['`n <A> _ <B>`', 'B = A >> B, like SAR'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '>': {
      title: ['ビット右シフト', 'Bitwise, Right Shift (unsigned)'].join('\r\n'),
      description: ['`n <A> > <B>`', 'B = A >> B, like ShR'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '!': {
      title: ['否定', 'Bitwise, Not'].join('\r\n'),
      description: ['`n <A> ! <B>`', 'B = Not A, like B = A XOr -1'],
      kind: vscode.CompletionItemKind.Operator,
    },
  };

  const FunctionDescriptions: {[key: string]: {title: string, description: string[], kind: vscode.CompletionItemKind}} = {
    ':': {
      title: ['ラベル', 'Label'].join('\r\n'),
      description: ['`:0`\\~`:1023`'],
      kind: vscode.CompletionItemKind.EnumMember,
    },
    '::': {
      title: ['スクリプト領域を終了', 'Exit from Script Zone'].join('\r\n'),
      description: ['`::`'],
      kind: vscode.CompletionItemKind.EnumMember,
    },
    'w': {
      title: ['待機', 'Sleep'].join('\r\n'),
      description: ['`w <CLOCK>`', '`<CLOCK>` = 2,048kHz, 2048000 = 1sec'],
      kind: vscode.CompletionItemKind.Function,
    },
    'm': {
      title: ['代入', 'Move Value'].join('\r\n'),
      description: ['`m <A> <B>`', 'Copy from A to B'],
      kind: vscode.CompletionItemKind.Function,
    },
    'c': {
      title: ['比較・動的ポインタ指定', 'Compare, Dynamic Pointer'].join('\r\n'),
      description: ['`c <A> <B>`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'a': {
      title: ['加算', 'Addition'].join('\r\n'),
      description: ['`a <A> <B>`', 'B = A + B'],
      kind: vscode.CompletionItemKind.Function,
    },
    's': {
      title: ['減算', 'Subtraction'].join('\r\n'),
      description: ['`s <A> <B>`', 'B = A - B'],
      kind: vscode.CompletionItemKind.Function,
    },
    'u': {
      title: ['乗算', 'Multiplication'].join('\r\n'),
      description: ['`u <A> <B>`', 'B = A * B'],
      kind: vscode.CompletionItemKind.Function,
    },
    'd': {
      title: ['除算 (符号あり)', 'Division (signed)'].join('\r\n'),
      description: ['`d <A> <B>`', 'B = A / B, like IDiv'],
      kind: vscode.CompletionItemKind.Function,
    },
    'n': {
      title: ['演算', 'Universal Arithmetic'].join('\r\n'),
      description: ['`n <A> <OP> <B>`', 'B = A ? B'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bra': {
      title: ['ラベルへジャンプ (無条件)', 'Jump to Label (always)'].join('\r\n'),
      description: ['`bra <LABEL>`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'beq': {
      title: ['ラベルへジャンプ (一致)', 'Jump to Label (equals)'].join('\r\n'),
      description: ['`beq <LABEL>`', 'Jump if `C <A> <B>` matches "A == B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bne': {
      title: ['ラベルへジャンプ (不一致)', 'Jump to Label (not equals)'].join('\r\n'),
      description: ['`bne <LABEL>`', 'Jump if `C <A> <B>` matches "A != B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bge': {
      title: ['ラベルへジャンプ (符号あり、以上)', 'Jump to Label (signed, greater than or equals)'].join('\r\n'),
      description: ['`bge <LABEL>`', 'Jump if `C <A> <B>` matches "A <= B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'ble': {
      title: ['ラベルへジャンプ (符号あり、以下)', 'Jump to Label (signed, lesser than or equals)'].join('\r\n'),
      description: ['`ble <LABEL>`', 'Jump if `C <A> <B>` matches "A >= B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bgt': {
      title: ['ラベルへジャンプ (符号あり、超過)', 'Jump to Label (signed, greater than)'].join('\r\n'),
      description: ['`bgt <LABEL>`', 'Jump if `C <A> <B>` matches "A < B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'blt': {
      title: ['ラベルへジャンプ (符号あり、未満)', 'Jump to Label (signed, lesser than)'].join('\r\n'),
      description: ['`blt <LABEL>`', 'Jump if `C <A> <B>` matches "A > B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bcc': {
      title: ['ラベルへジャンプ (符号なし、以上)', 'Jump to Label (unsigned, greater than or equals)'].join('\r\n'),
      description: ['`bcc <LABEL>`', 'Jump if `C <A> <B>` matches "A <= B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'blo': {
      title: ['ラベルへジャンプ (符号なし、以下)', 'Jump to Label (unsigned, lesser than or equals)'].join('\r\n'),
      description: ['`blo <LABEL>`', 'Jump if `C <A> <B>` matches "A >= B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bhi': {
      title: ['ラベルへジャンプ (符号なし、超過)', 'Jump to Label (unsigned, greater than)'].join('\r\n'),
      description: ['`bhi <LABEL>`', 'Jump if `C <A> <B>` matches "A < B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bcs': {
      title: ['ラベルへジャンプ (符号なし、未満)', 'Jump to Label (unsigned, lesser than)'].join('\r\n'),
      description: ['`bcs <LABEL>`', 'Jump if `C <A> <B>` matches "A > B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'r': {
      title: ['直前のジャンプに戻る', 'Return to after bxx command'].join('\r\n'),
      description: ['`r`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'r1': {
      title: ['ジャンプの戻り先を記録する', 'Resume bxx position stacking'].join('\r\n'),
      description: ['`r1`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'r0': {
      title: ['ジャンプの戻り先を記録しない', 'Suspend bxx position stacking'].join('\r\n'),
      description: ['`r0`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'f': {
      title: ['ポート書き込みをフラッシュ', 'Flush SPC700 ports'].join('\r\n'),
      description: ['`f`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'f1': {
      title: ['ポート書き込みを即時反映する', 'Resume SPC700 ports writing'].join('\r\n'),
      description: ['`f1`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'f0': {
      title: ['ポート書き込みを即時反映しない', 'Suspend SPC700 ports writing'].join('\r\n'),
      description: ['`f0`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'q': {
      title: ['スクリプト処理を終了', 'Stop running script'].join('\r\n'),
      description: ['`q`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'nop': {
      title: ['何もしない', 'No Operation'].join('\r\n'),
      description: ['`nop`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'e': {
      title: ['スクリプト領域を終了', 'Exit from Script Zone'].join('\r\n'),
      description: ['`e`'],
      kind: vscode.CompletionItemKind.Function,
    },
    '#i': {
      title: ['テキスト ファイルを取り込む', 'Include Text File'].join('\r\n'),
      description: ['`#i "<FILE>"`', "`<FILE>` = Relative Path"],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#it': {
      title: ['テキスト ファイルを取り込む', 'Include Text File'].join('\r\n'),
      description: ['`#it "<FILE>"`', "`<FILE>` = Relative Path"],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#ib': {
      title: ['バイナリ ファイルを取り込む', 'Include Binary File'].join('\r\n'),
      description: ['`#ib "<FILE>"`', "`<FILE>` = Relative Path"],
      kind: vscode.CompletionItemKind.Interface,
    },
  };

  const DSPOptionDescriptions: {[key: string]: {title: string, description: string[], kind: vscode.CompletionItemKind}} = {
    'm': {
      title: ['ミュート', 'Mute'].join('\r\n'),
      description: ['`m <SOUND>,!`', '`<SOUND>` = Number of Sound Source (0\\~255)'],
      kind: vscode.CompletionItemKind.Function,
    },
    'c': {
      title: ['波形番号を変更', 'Note Change'].join('\r\n'),
      description: ['`c <SOUND>,! <CHANGE>`', '`<SOUND>` = Number of Sound Source (0\\~255)',
        '`<CHANGE>` = Number of Sound Source (0\\~255)'],
      kind: vscode.CompletionItemKind.Function,
    },
    'd': {
      title: ['発音周波数を変更', 'Note Detune'].join('\r\n'),
      description: ['`d <SOUND> <RATE>`', '`<SOUND>` = Number of Sound Source (0\\~255)',
        '`<RATE>` = Relative Rate'],
      kind: vscode.CompletionItemKind.Function,
    },
    'v': {
      title: ['音量を変更', 'Volume Level'].join('\r\n'),
      description: ['`v <SOUND>,!,l,r,lr,vl,vr,el,er <VOLUME>`', '`<SOUND>` = Number of Sound Source (0\\~255)',
        '`<VOLUME>` = Level base on 65536, x0.5 = 32768 / x2 = 131072'],
      kind: vscode.CompletionItemKind.Function,
    },
    'e': {
      title: ['拡張コマンド領域を終了', 'Exit from Startup Zone'].join('\r\n'),
      description: ['`e`'],
      kind: vscode.CompletionItemKind.Function,
    },
    '#i': {
      title: ['テキスト ファイルを取り込む', 'Include Text File'].join('\r\n'),
      description: ['`#i "<FILE>"`', "`<FILE>` = Relative Path"],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#it': {
      title: ['テキスト ファイルを取り込む', 'Include Text File'].join('\r\n'),
      description: ['`#it "<FILE>"`', "`<FILE>` = Relative Path"],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#ib': {
      title: ['バイナリ ファイルを取り込む', 'Include Binary File'].join('\r\n'),
      description: ['`#ib "<FILE>"`', "`<FILE>` = Relative Path"],
      kind: vscode.CompletionItemKind.Interface,
    },
  };

  const DSPTargetDescriptions: {[key: string]: {command: RegExp, title: string, description: string[], kind: vscode.CompletionItemKind}} = {
    '!': {
      command: /[mcdv]/,
      title: ['全ての波形番号', 'All Sources'].join('\r\n'),
      description: ['For all sound sources (0\\~255)'],
      kind: vscode.CompletionItemKind.Field,
    },
    'l': {
      command: /[v]/,
      title: ['マスター音量＋エコー音量 (左)', 'Left of Master Volume and Echo Level'].join('\r\n'),
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'r': {
      command: /[v]/,
      title: ['マスター音量＋エコー音量 (右)', 'Right of Master Volume and Echo Level'].join('\r\n'),
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'lr': {
      command: /[v]/,
      title: ['マスター音量＋エコー音量 (左右)', 'All of Master Volume and Echo Level'].join('\r\n'),
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'vl': {
      command: /[v]/,
      title: ['マスター音量 (左)', 'Left of Master Volume'].join('\r\n'),
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'vr': {
      command: /[v]/,
      title: ['マスター音量 (右)', 'Right of Master Volume'].join('\r\n'),
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'el': {
      command: /[v]/,
      title: ['エコー音量 (左)', 'Left of Master Echo Level'].join('\r\n'),
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'er': {
      command: /[v]/,
      title: ['エコー音量 (右)', 'Right of Master Echo Level'].join('\r\n'),
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
  };

  const DataDescriptions: {[key: string]: {title: string, description: string[], kind: vscode.CompletionItemKind}} = {
    '#i': {
      title: ['テキスト ファイルを取り込む', 'Include Text File'].join('\r\n'),
      description: ['`#i "<FILE>"`', "`<FILE>` = Relative Path"],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#it': {
      title: ['テキスト ファイルを取り込む', 'Include Text File'].join('\r\n'),
      description: ['`#it "<FILE>"`', "`<FILE>` = Relative Path"],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#ib': {
      title: ['バイナリ ファイルを取り込む', 'Include Binary File'].join('\r\n'),
      description: ['`#ib "<FILE>"`', "`<FILE>` = Relative Path"],
      kind: vscode.CompletionItemKind.Interface,
    },
  };

  type ZONES = 'script' | 'startup' | 'data';

  const getComment = (document: vscode.TextDocument, lineIndex: number): string[] => {
    const self = document.lineAt(lineIndex).text;
    if (/([;']|\/\/|\#\s)(.+)/.exec(self)) return [RegExp.$2.replace(/^\s+|\s+$/g, '')];

    const comments: string[] = [];
    let f_start: boolean = false;

    for (let i = lineIndex - 1; i >= 0; i--) {
      const line = document.lineAt(i).text;
      if (/([;']|\/\/|\#\s)(.+)/.exec(line)) {
        comments.unshift(RegExp.$2.replace(/^\s+|\s+$/g, ''));
        f_start = true;
      } else if (/^\s*$/.test(line)) {
        if (f_start) break;
      } else break;
    }

    return comments.map((v) => v.replace(/^[\-\=\*\#]+$/, '')).filter((v) => v);
  };

  const get32BitBin = (value: number): string => {
    const zero = '00000000000000000000000000000000';
    const bin = value.toString(2);
    const str = zero.substring(0, 32 - bin.length) + bin;
    return `${str.substring(0, 8)} ${str.substring(8, 16)} ${str.substring(16, 24)} ${str.substring(24)}`;
  };

  const getLiteral = (value: string): string[] => {
    if (/(\-?)(0x|\$)([0-9a-f]+)/i.exec(value)) {
      const sign = RegExp.$1;
      const hex = RegExp.$3;
      const dec = parseInt(hex, 16);
      const bin = get32BitBin((sign === '-' && dec !== 0) ? 4294967296 - dec : dec);
      return [`DEC: \`${sign}${dec}\`, HEX: \`\$${sign}${hex}\``, `BIN: \`${bin}\``];
    } else if (/(\-?)([0-9]+)/.exec(value)) {
      const sign = RegExp.$1;
      const dec = +RegExp.$2;
      const hex = dec.toString(16);
      const bin = get32BitBin((sign === '-' && dec !== 0) ? 4294967296 - dec : dec);
      return [`DEC: \`${sign}${dec}\`, HEX: \`\$${sign}${hex}\``, `BIN: \`${bin}\``];
    } else {
      return [];
    }
  };

  const createCompletion = (label: string, title: string, description: string[], kind: vscode.CompletionItemKind): vscode.CompletionItem => {
    const item = new vscode.CompletionItem(label, kind);
    item.detail = title;
    if (description.length) item.documentation = new vscode.MarkdownString(description.join('  \r\n'));
    return item;
  };

  const createCompletionWithComment = (document: vscode.TextDocument, lineIndex: number, label: string): vscode.CompletionItem => {
    return createCompletion(label, [`ラベル番号`, `Label Number`].join('\r\n'),
      getComment(document, lineIndex), vscode.CompletionItemKind.EnumMember);
  };

  const scan = (document: vscode.TextDocument, regexp: RegExp, callback: (...groups: string[]) => string): vscode.CompletionItem[] => {
    // オプション指定忘れによる無限ループ防止
    if (!regexp.global) throw new Error('RegExp is not set global option.');

    const compiletions: vscode.CompletionItem[] = [];
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i).text;
      let result = null;

      while (result = regexp.exec(line)) {
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
        {language: 'plaintext', value: [`ラベル番号`, `Label Number`].join('\r\n')},
        getComment(document, i).join('  \r\n'),
      ]);
    }

    let parameterMark = /^([^\-]{1,2})(\-?(0x|\$)?[0-9a-f]+|\?)/i.exec(word) ? RegExp.$1 : '';
    if (ParameterDescriptions[parameterMark]) {
      return new vscode.Hover([
        {language: 'plaintext', value: word},
        {language: 'plaintext', value: ParameterDescriptions[parameterMark].title},
        ParameterDescriptions[parameterMark].description.concat(getLiteral(RegExp.$2)).join('  \r\n'),
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

    if (/^\-?(0x|\$)?[0-9a-f]+$/i.test(word)) {
      return new vscode.Hover([
        {language: 'plaintext', value: word},
        {language: 'plaintext', value: ParameterDescriptions['#'].title},
        getLiteral(word).join('  \r\n'),
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
      const description = ParameterDescriptions['w'];
      compiletions.push(createCompletion('w', description.title, description.description, vscode.CompletionItemKind.Field));
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

  const createCompletionForData = (document: vscode.TextDocument, line: string)
    : vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> => {
    if (/([;']|\/\/|\#\s)/.test(line)) {
      return;
    } else if (/(^|\s)$/.test(line)) {
      return Object.keys(DataDescriptions).map((word) => {
        const map = DataDescriptions[word];
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
      else if (zone === 'data') return createCompletionForData(document, line);
    }
  }, ' ', '\t');

  context.subscriptions.push(hoverProvider, completionItemProvider);
}
