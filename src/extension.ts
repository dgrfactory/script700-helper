import * as vscode from 'vscode';

type DESCRIPTION = {title: string[], description: string[], kind: vscode.CompletionItemKind};
type DESCRIPTION_DSP = {command: RegExp} & DESCRIPTION;

export function activate(context: vscode.ExtensionContext) {
  const ParameterGroup1Words = ['#', 'i', 'o', 'w', 'r', 'rb', 'rw', 'rd', 'x', 'd', 'db', 'dw', 'dd', 'l'];
  const ParameterGroup2Words = ['i', 'o', 'w', 'r', 'rb', 'rw', 'rd', 'x', 'd', 'db', 'dw', 'dd'];
  const ParameterGroup3Words = ['#', 'i', 'o', 'w', 'r', 'rb', 'rw', 'rd', 'x', 'd', 'db', 'dw', 'dd', 'l'];

  const ParameterDescriptions: {[key: string]: DESCRIPTION} = {
    '#': {
      title: ['固定数値', 'Literal number'],
      description: ['`#0`\\~, `#-1`\\~, `#0x00`\\~, `#$00`\\~'],
      kind: vscode.CompletionItemKind.Field,
    },
    'i': {
      title: ['SPC700 入力ポート', 'Latest read value of SPC700 ports (8-bit)'],
      description: ['`i0`\\~`i3`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'o': {
      title: ['SPC700 出力ポート', 'Latest written value of SPC700 ports (8-bit)'],
      description: ['`o0`\\~`o3`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'w': {
      title: ['Script700 ユーザワークメモリ', 'User working memory of Script700 (32-bit)'],
      description: ['`w0`\\~`w7`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'r': {
      title: ['64KB メインメモリ', '64KB main RAM of APU (8-bit)'],
      description: ['`r0`\\~`r65535`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'rb': {
      title: ['64KB メインメモリ', '64KB main RAM of APU (8-bit)'],
      description: ['`rb0`\\~`rb65535`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'rw': {
      title: ['64KB メインメモリ', '64KB main RAM of APU (16-bit)'],
      description: ['`rw0`\\~`rw65535`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'rd': {
      title: ['64KB メインメモリ', '64KB main RAM of APU (32-bit)'],
      description: ['`rd0`\\~`rd65535`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'x': {
      title: ['IPL 用作業メモリ', 'IPL work memory (8-bit)'],
      description: ['`x0`\\~`x63`'],
      kind: vscode.CompletionItemKind.Field,
    },
    'd': {
      title: ['Script700 データ領域', 'Data area of Script700 (8-bit)'],
      description: ['`d0`\\~'],
      kind: vscode.CompletionItemKind.Field,
    },
    'db': {
      title: ['Script700 データ領域', 'Data area of Script700 (8-bit)'],
      description: ['`db0`\\~'],
      kind: vscode.CompletionItemKind.Field,
    },
    'dw': {
      title: ['Script700 データ領域', 'Data area of Script700 (16-bit)'],
      description: ['`dw0`\\~'],
      kind: vscode.CompletionItemKind.Field,
    },
    'dd': {
      title: ['Script700 データ領域', 'Data area of Script700 (32-bit)'],
      description: ['`dd0`\\~'],
      kind: vscode.CompletionItemKind.Field,
    },
    'l': {
      title: ['ラベル番号', 'Index of label'],
      description: ['`l0`\\~`l1023`'],
      kind: vscode.CompletionItemKind.Field,
    },
  };

  const OperatorDescriptions: {[key: string]: DESCRIPTION} = {
    '+': {
      title: ['加算', 'Add a variable'],
      description: ['`n <A> + <B>`', 'B = A + B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '-': {
      title: ['減算', 'Subtract a variable'],
      description: ['`n <A> - <B>`', 'B = A - B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '*': {
      title: ['乗算', 'Multiply a variable'],
      description: ['`n <A> * <B>`', 'B = A * B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '/': {
      title: ['除算 (符号あり)', 'Divide a variable (signed)'],
      description: ['`n <A> / <B>`', 'B = A / B, like IDIV'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '\\': {
      title: ['除算 (符号なし)', 'Set remainder of dividing a variable (unsigned)'],
      description: ['`n <A> \\ <B>`', 'B = A / B, like DIV'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '%': {
      title: ['余り (符号あり)', 'Set remainder of dividing a variable (signed)'],
      description: ['`n <A> % <B>`', 'B = A % B, like IDIV'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '$': {
      title: ['余り (符号なし)', 'Set remainder of dividing a variable (unsigned)'],
      description: ['`n <A> $ <B>`', 'B = A % B, like DIV'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '&': {
      title: ['論理積', 'Perform a logical AND'],
      description: ['`n <A> & <B>`', 'B = A & B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '|': {
      title: ['論理和', 'Perform a logical OR'],
      description: ['`n <A> | <B>`', 'B = A | B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '^': {
      title: ['排他的論理和', 'Perform a logical XOR'],
      description: ['`n <A> ^ <B>`', 'B = A ^ B'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '<': {
      title: ['ビット左シフト', 'Perform a logical LEFT shift'],
      description: ['`n <A> < <B>`', 'B = A << B, like SHL'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '_': {
      title: ['ビット右シフト', 'Perform a logical RIGHT shift (signed)'],
      description: ['`n <A> _ <B>`', 'B = A >> B, like SAR'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '>': {
      title: ['ビット右シフト', 'Perform a logical RIGHT shift (unsigned)'],
      description: ['`n <A> > <B>`', 'B = A >> B, like SHR'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '!': {
      title: ['否定', 'Perform a logical NOT'],
      description: ['`n <A> ! <B>`', 'B = Not A, like B = A ^ -1'],
      kind: vscode.CompletionItemKind.Operator,
    },
  };

  const FunctionDescriptions: {[key: string]: DESCRIPTION} = {
    ':': {
      title: ['ラベル', 'Label'],
      description: ['`:0`\\~`:1023`'],
      kind: vscode.CompletionItemKind.EnumMember,
    },
    '::': {
      title: ['スクリプト領域を終了', 'Exit from SCRIPT zone, change to STARTUP zone'],
      description: ['`::`'],
      kind: vscode.CompletionItemKind.EnumMember,
    },
    'w': {
      title: ['待機', 'Pauses running Script700'],
      description: ['`w <CLOCK>`', '`<CLOCK>` = 2,048kHz, 2048000 = 1sec'],
      kind: vscode.CompletionItemKind.Function,
    },
    'm': {
      title: ['代入', 'Copy a value of variable'],
      description: ['`m <A> <B>`', 'Copy from A to B'],
      kind: vscode.CompletionItemKind.Function,
    },
    'c': {
      title: ['比較・動的ポインタ指定', 'Compare variables, or set dynamic pointer'],
      description: ['`c <A> <B>`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'a': {
      title: ['加算', 'Add a variable'],
      description: ['`a <A> <B>`', 'B = A + B'],
      kind: vscode.CompletionItemKind.Function,
    },
    's': {
      title: ['減算', 'Subtract a variable'],
      description: ['`s <A> <B>`', 'B = A - B'],
      kind: vscode.CompletionItemKind.Function,
    },
    'u': {
      title: ['乗算', 'Multiply a variable'],
      description: ['`u <A> <B>`', 'B = A * B'],
      kind: vscode.CompletionItemKind.Function,
    },
    'd': {
      title: ['除算 (符号あり)', 'Divide a variable (signed)'],
      description: ['`d <A> <B>`', 'B = A / B, like IDiv'],
      kind: vscode.CompletionItemKind.Function,
    },
    'n': {
      title: ['演算', 'Performs various operations on variables'],
      description: ['`n <A> <OP> <B>`', 'B = A ? B'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bra': {
      title: ['ラベルへジャンプ (無条件)', 'Jump to label (always)'],
      description: ['`bra <LABEL>`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'beq': {
      title: ['ラベルへジャンプ (一致)', 'Jump to label (equals)'],
      description: ['`beq <LABEL>`', 'Jump if `c <A> <B>` matches "A == B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bne': {
      title: ['ラベルへジャンプ (不一致)', 'Jump to label (not equals)'],
      description: ['`bne <LABEL>`', 'Jump if `c <A> <B>` matches "A != B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bge': {
      title: ['ラベルへジャンプ (符号あり、以上)', 'Jump to label (signed, greater than or equals)'],
      description: ['`bge <LABEL>`', 'Jump if `c <A> <B>` matches "A <= B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'ble': {
      title: ['ラベルへジャンプ (符号あり、以下)', 'Jump to label (signed, lesser than or equals)'],
      description: ['`ble <LABEL>`', 'Jump if `c <A> <B>` matches "A >= B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bgt': {
      title: ['ラベルへジャンプ (符号あり、超過)', 'Jump to label (signed, greater than)'],
      description: ['`bgt <LABEL>`', 'Jump if `c <A> <B>` matches "A < B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'blt': {
      title: ['ラベルへジャンプ (符号あり、未満)', 'Jump to label (signed, lesser than)'],
      description: ['`blt <LABEL>`', 'Jump if `c <A> <B>` matches "A > B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bcc': {
      title: ['ラベルへジャンプ (符号なし、以上)', 'Jump to label (unsigned, greater than or equals)'],
      description: ['`bcc <LABEL>`', 'Jump if `c <A> <B>` matches "A <= B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'blo': {
      title: ['ラベルへジャンプ (符号なし、以下)', 'Jump to label (unsigned, lesser than or equals)'],
      description: ['`blo <LABEL>`', 'Jump if `c <A> <B>` matches "A >= B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bhi': {
      title: ['ラベルへジャンプ (符号なし、超過)', 'Jump to label (unsigned, greater than)'],
      description: ['`bhi <LABEL>`', 'Jump if `c <A> <B>` matches "A < B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bcs': {
      title: ['ラベルへジャンプ (符号なし、未満)', 'Jump to label (unsigned, lesser than)'],
      description: ['`bcs <LABEL>`', 'Jump if `c <A> <B>` matches "A > B"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'r': {
      title: ['直前のジャンプに戻る', "Return to after 'bxx' command", '@since 2.12.0'],
      description: ['`r`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'r1': {
      title: ['ジャンプの戻り先を記録する', "Resume 'bxx' position stacking", '@since 2.15.2'],
      description: ['`r1`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'r0': {
      title: ['ジャンプの戻り先を記録しない', "Suspend 'bxx' position stacking", '@since 2.15.2'],
      description: ['`r0`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'f': {
      title: ['ポート書き込みをフラッシュ後、ポート 0 が一致するまで待機', 'Flush SPC700 ports, and wait for `i0` == `o0`', '@since 2.17.2'],
      description: ['`f`', '※ 実行後、`c <A> <B>` の `<A>` に待機時間が設定されます。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'f1': {
      title: ['ポート書き込みを即時反映する', 'Resume SPC700 ports writing', '@since 2.17.2'],
      description: ['`f1`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'f0': {
      title: ['ポート書き込みを即時反映しない', 'Suspend SPC700 ports writing', '@since 2.17.2'],
      description: ['`f0`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'wi': {
      title: ['ポートの読み込みを待機', 'Wait reading SPC700 ports', '@since 2.19.0'],
      description: ['`wi <PORT>`', '※ `<PORT>` = `0`\\~`3`', '実行後、`c <A> <B>` の `<A>` に待機時間が設定されます。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'wo': {
      title: ['ポートの書き込みを待機', 'Wait writing SPC700 ports', '@since 2.19.0'],
      description: ['`wo <PORT>`', '※ `<PORT>` = `0`\\~`3`', '実行後、`c <A> <B>` の `<A>` に待機時間が設定されます。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bp': {
      title: ['ブレイクポイント設定', 'Set break-point address', '@since 2.19.0'],
      description: ['`bp <ADDR>`', '`<ADDR>` = `0`\\~`65535`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'q': {
      title: ['スクリプト処理を終了', 'Stop running script', '@since 2.12.0'],
      description: ['`q`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'nop': {
      title: ['何もしない', 'No operation', '@since 2.11.0'],
      description: ['`nop`'],
      kind: vscode.CompletionItemKind.Function,
    },
    'e': {
      title: ['スクリプト領域を終了', 'Exit from SCRIPT zone, change to STARTUP zone'],
      description: ['`e`'],
      kind: vscode.CompletionItemKind.Function,
    },
    '#i': {
      title: ['テキストファイルを取り込む', 'Include a text file', '@since 2.17.0'],
      description: ['`#i "<FILE>"`', "`<FILE>` = Relative path"],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#it': {
      title: ['テキストファイルを取り込む', 'Include a text file', '@since 2.17.0'],
      description: ['`#it "<FILE>"`', "`<FILE>` = Relative path"],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#ib': {
      title: ['バイナリファイルを取り込む', 'Include a binary file', '@since 2.17.0'],
      description: ['`#ib "<FILE>"`', "`<FILE>` = Relative path"],
      kind: vscode.CompletionItemKind.Interface,
    },
  };

  const DSPOptionDescriptions: {[key: string]: DESCRIPTION} = {
    'm': {
      title: ['特定の波形をミュート', 'Mute specific tones'],
      description: ['`m <SOUND>,!`', '`<SOUND>` = Tone number (0\\~255)'],
      kind: vscode.CompletionItemKind.Function,
    },
    'c': {
      title: ['特定の波形番号を変更', 'Change specific tones'],
      description: ['`c <SOUND>,! <CHANGE>`', '`<SOUND>` = Tone number (0\\~255)',
        '`<CHANGE>` = Tone number (0\\~255)'],
      kind: vscode.CompletionItemKind.Function,
    },
    'd': {
      title: ['発音周波数を変更', 'Detune specific tones'],
      description: ['`d <SOUND> <RATE>`', '`<SOUND>` = Tone number (0\\~255)',
        '`<RATE>` = Relative rate'],
      kind: vscode.CompletionItemKind.Function,
    },
    'v': {
      title: ['音量を変更', 'Change volume level of tone', '@since 2.11.2'],
      description: ['`v <SOUND>,!,l,r,lr,vl,vr,el,er <VOLUME>`', '`<SOUND>` = Tone number (0\\~255)',
        '`<VOLUME>` = Level base on 65536, x0.5 = 32768 / x2 = 131072'],
      kind: vscode.CompletionItemKind.Function,
    },
    'e': {
      title: ['拡張コマンド領域を終了', 'Exit from STARTUP zone, change to DATA zone'],
      description: ['`e`'],
      kind: vscode.CompletionItemKind.Function,
    },
    '#i': {
      title: ['テキストファイルを取り込む', 'Include a text file', '@since 2.17.0'],
      description: ['`#i "<FILE>"`', "`<FILE>` = Relative path"],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#it': {
      title: ['テキストファイルを取り込む', 'Include a text file', '@since 2.17.0'],
      description: ['`#it "<FILE>"`', "`<FILE>` = Relative path"],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#ib': {
      title: ['バイナリファイルを取り込む', 'Include a binary file', '@since 2.17.0'],
      description: ['`#ib "<FILE>"`', "`<FILE>` = Relative path"],
      kind: vscode.CompletionItemKind.Interface,
    },
  };

  const DSPTargetDescriptions: {[key: string]: DESCRIPTION_DSP} = {
    '!': {
      command: /[mcdv]/,
      title: ['全ての波形番号', 'All tones'],
      description: ['For all tones (0\\~255)'],
      kind: vscode.CompletionItemKind.Field,
    },
    'l': {
      command: /[v]/,
      title: ['マスター音量＋エコー音量 (左)', 'Left of MASTER and ECHO levels'],
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'r': {
      command: /[v]/,
      title: ['マスター音量＋エコー音量 (右)', 'Right of MASTER and ECHO levels'],
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'lr': {
      command: /[v]/,
      title: ['マスター音量＋エコー音量 (左右)', 'All of MASTER and ECHO levels', '@since 2.14.5'],
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'vl': {
      command: /[v]/,
      title: ['マスター音量 (左)', 'Left of MASTER level'],
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'vr': {
      command: /[v]/,
      title: ['マスター音量 (右)', 'Right of MASTER level'],
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'el': {
      command: /[v]/,
      title: ['エコー音量 (左)', 'Left of MASTER and ECHO levels'],
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
    'er': {
      command: /[v]/,
      title: ['エコー音量 (右)', 'Right of MASTER and ECHO levels'],
      description: [],
      kind: vscode.CompletionItemKind.Field,
    },
  };

  const DataDescriptions: {[key: string]: DESCRIPTION} = {
    '#i': {
      title: ['テキストファイルを取り込む', 'Include a text file', '@since 2.17.0'],
      description: ['`#i "<FILE>"`', "`<FILE>` = Relative path"],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#it': {
      title: ['テキストファイルを取り込む', 'Include a text file', '@since 2.17.0'],
      description: ['`#it "<FILE>"`', "`<FILE>` = Relative path"],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#ib': {
      title: ['バイナリファイルを取り込む', 'Include a binary file', '@since 2.17.0'],
      description: ['`#ib "<FILE>"`', "`<FILE>` = Relative path"],
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

  const createCompletion = (label: string, title: string[], description: string[], kind: vscode.CompletionItemKind): vscode.CompletionItem => {
    const item = new vscode.CompletionItem(label, kind);
    item.detail = title[0];
    if (description.length) item.documentation = new vscode.MarkdownString([
      title.slice(1).join('  \r\n'),
      '\r\n\r\n---\r\n\r\n',
      description.join('  \r\n')
    ].join(''));
    else item.documentation = new vscode.MarkdownString(title.slice(1).join('  \r\n'));
    return item;
  };

  const createCompletionWithComment = (document: vscode.TextDocument, lineIndex: number, label: string): vscode.CompletionItem => {
    return createCompletion(label, [`ラベル番号`, `Label Number`],
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
        {language: 'markdown', value: FunctionDescriptions[word].title.join('  \r\n')},
        FunctionDescriptions[word].description.join('  \r\n'),
      ]);
    } else if (OperatorDescriptions[word]) {
      return new vscode.Hover([
        {language: 'script700', value: word},
        {language: 'markdown', value: OperatorDescriptions[word].title.join('  \r\n')},
        OperatorDescriptions[word].description.join('  \r\n'),
      ]);
    } else if (/^(bra|beq|bne|bge|ble|bgt|blt|bcc|blo|bhi|bcs)$/.test(command) && /(0x|\$)?[0-9a-f]+/i.exec(word)) {
      const label = `:${word}`;
      for (let i = 0; i < document.lineCount - 1; i++) if (document.lineAt(i).text.indexOf(label) >= 0) return new vscode.Hover([
        {language: 'script700', value: word},
        {language: 'markdown', value: [`ラベル番号`, `Label Number`].join('  \r\n')},
        getComment(document, i).join('  \r\n'),
      ]);
    }

    let parameterMark = /^([^\-]{1,2})(\-?(0x|\$)?[0-9a-f]+|\?)/i.exec(word) ? RegExp.$1 : '';
    if (ParameterDescriptions[parameterMark]) {
      return new vscode.Hover([
        {language: 'plaintext', value: word},
        {language: 'markdown', value: ParameterDescriptions[parameterMark].title.join('  \r\n')},
        ParameterDescriptions[parameterMark].description.concat(getLiteral(RegExp.$2)).join('  \r\n'),
      ]);
    }

    parameterMark = parameterMark.substring(0, 1);
    if (ParameterDescriptions[parameterMark]) {
      return new vscode.Hover([
        {language: 'plaintext', value: word},
        {language: 'markdown', value: ParameterDescriptions[parameterMark].title.join('  \r\n')},
        ParameterDescriptions[parameterMark].description.join('  \r\n'),
      ]);
    }

    if (/^\-?(0x|\$)?[0-9a-f]+$/i.test(word)) {
      return new vscode.Hover([
        {language: 'plaintext', value: word},
        {language: 'markdown', value: ParameterDescriptions['#'].title.join('  \r\n')},
        getLiteral(word).join('  \r\n'),
      ]);
    }
  };

  const createHoverForStartup = (word: string): vscode.ProviderResult<vscode.Hover> => {
    if (DSPOptionDescriptions[word]) {
      return new vscode.Hover([
        {language: 'script700', value: word},
        {language: 'markdown', value: DSPOptionDescriptions[word].title.join('  \r\n')},
        DSPOptionDescriptions[word].description.join('  \r\n'),
      ]);
    }

    if (DSPTargetDescriptions[word]) {
      return new vscode.Hover([
        {language: 'plaintext', value: word},
        {language: 'markdown', value: DSPTargetDescriptions[word].title.join('  \r\n')},
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
    } else if (/(^|\s)([w][io]?|bp)\s+$/i.test(line)) {
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
