import * as vscode from 'vscode';

type DESCRIPTION = {title: string[], description: string[], kind: vscode.CompletionItemKind};
type DESCRIPTION_DSP = {command: RegExp} & DESCRIPTION;

export function activate(context: vscode.ExtensionContext) {
  const ParameterGroup1Words = ['#', 'i', 'o', 'w', 'r', 'rb', 'rw', 'rd', 'x', 'd', 'db', 'dw', 'dd', 'l'];
  const ParameterGroup2Words = ['i', 'o', 'w', 'r', 'rb', 'rw', 'rd', 'x', 'd', 'db', 'dw', 'dd'];
  const ParameterGroup3Words = ['#', 'i', 'o', 'w', 'r', 'rb', 'rw', 'rd', 'x', 'd', 'db', 'dw', 'dd', 'l'];
  const LiteralPortDescription = ['Syntax: `0`\\~`3`, `?`'];

  const ParameterDescriptions: {[key: string]: DESCRIPTION} = {
    '#': {
      title: ['固定数値', 'Literal number'],
      description: ['Syntax: `#0`\\~, `#-1`\\~, `#0x00`\\~, `#$00`\\~, `#?`',
        '変化しない固定の数値を指定します。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'i': {
      title: ['SPC700 入力ポート', 'SPC700 port values written from outside APU (8-bit)'],
      description: ['Syntax: `i0`\\~`i3`, `i?`',
        'SPC700 の入力ポートの値を操作します。 ここに書き込んだ値は、ドライバから読み取ることができます。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'o': {
      title: ['SPC700 出力ポート', 'SPC700 port value written by APU itself (8-bit)'],
      description: ['Syntax: `o0`\\~`o3`, `o?`',
        'SPC700 の出力ポートの値を操作します。 ここに値を書き込んでも、ドライバの動作には影響ありません。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'w': {
      title: ['Script700 ユーザワークメモリ', 'User working memory of Script700 (32-bit)'],
      description: ['Syntax: `w0`\\~`w7`, `w?`',
        'Script700 の実行のために用意された、作業用メモリを操作します。 ここに値を書き込んでも、ドライバの動作には影響ありません。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'r': {
      title: ['64KB メインメモリ (8bit)', '64KB main memory (8-bit)'],
      description: ['Syntax: `r0`\\~`r65535`, `r?`',
        'SPC700 と DSP が使用するメインメモリを直接操作します。 指定アドレスから 8bit 分読み書きできます。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'rb': {
      title: ['64KB メインメモリ (8bit)', '64KB main memory (8-bit)'],
      description: ['Syntax: `rb0`\\~`rb65535`, `rb?`',
        'SPC700 と DSP が使用するメインメモリを直接操作します。 指定アドレスから 8bit 分読み書きできます。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'rw': {
      title: ['64KB メインメモリ (16bit)', '64KB main memory (16-bit)'],
      description: ['Syntax: `rw0`\\~`rw65535`, `rw?`',
        'SPC700 と DSP が使用するメインメモリを直接操作します。 指定アドレスから 16bit 分読み書きできます。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'rd': {
      title: ['64KB メインメモリ (32bit)', '64KB main memory (32-bit)'],
      description: ['Syntax: `rd0`\\~`rd65535`, `rd?`',
        'SPC700 と DSP が使用するメインメモリを直接操作します。 指定アドレスから 32bit 分読み書きできます。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'x': {
      title: ['IPL 退避用メモリ', 'IPL working memory (8-bit)'],
      description: ['Syntax: `x0`\\~`x63`, `x?`',
        'エミュレータで IPL と実際のメモリを入れ替える際に、退避された元データを操作します。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'd': {
      title: ['Script700 データ領域 (8bit)', 'Data area for Script700 (8-bit)'],
      description: ['Syntax: `d0`\\~, `d?`',
        'Script700 の実行のために用意された、巨大なデータ格納用メモリを参照します。 指定アドレスから 8bit 分読み取れます。 書き込みは可能ですが、非推奨です。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'db': {
      title: ['Script700 データ領域 (8bit)', 'Data area for Script700 (8-bit)'],
      description: ['Syntax: `db0`\\~, `db?`',
        'Script700 の実行のために用意された、巨大なデータ格納用メモリを参照します。 指定アドレスから 8bit 分読み取れます。 書き込みは可能ですが、非推奨です。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'dw': {
      title: ['Script700 データ領域 (16bit)', 'Data area for Script700 (16-bit)'],
      description: ['Syntax: `dw0`\\~, `dw?`',
        'Script700 の実行のために用意された、巨大なデータ格納用メモリを参照します。 指定アドレスから 16bit 分読み取れます。 書き込みは可能ですが、非推奨です。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'dd': {
      title: ['Script700 データ領域 (32bit)', 'Data area for Script700 (32-bit)'],
      description: ['Syntax: `dd0`\\~, `dd?`',
        'Script700 の実行のために用意された、巨大なデータ格納用メモリを参照します。 指定アドレスから 32bit 分読み取れます。 書き込みは可能ですが、非推奨です。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'l': {
      title: ['ラベル番号', 'Label number'],
      description: ['Syntax: `l0`\\~`l1023`, `l?`',
        'Script700 のラベルがある場所を示すアドレスを取得します。 Script700 データ領域の初期位置を取得する際に使用できます。'],
      kind: vscode.CompletionItemKind.Field,
    },
  };

  const LiteralDescriptions: {[key: string]: DESCRIPTION} = {
    'i': {
      title: ['SPC700 入力ポート', 'SPC700 port values written from outside APU'],
      description: ['Syntax: `0`\\~`3`',
        'SPC700 の入力ポートのアドレスを指定します。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'o': {
      title: ['SPC700 出力ポート', 'SPC700 port value written by APU itself'],
      description: ['Syntax: `0`\\~`3`',
        'SPC700 の出力ポートのアドレスを指定します。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'r': {
      title: ['64KB メインメモリのアドレス', '64KB main memory'],
      description: ['Syntax: `0`\\~`65535`',
        'SPC700 と DSP が使用するメインメモリのアドレスを指定します。'],
      kind: vscode.CompletionItemKind.Field,
    },
    's': {
      title: ['波形番号', 'Source number of tone'],
      description: ['Syntax: `0`\\~`255`',
        'DSP の波形番号を指定します。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'd': {
      title: ['発音周波数', 'Detune rate'],
      description: ['Syntax: `0`\\~, `-1`\\~',
        '`0` を基準とした値で指定し、DSP の発音周波数を変更します。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'v': {
      title: ['音量', 'Volume level'],
      description: ['Syntax: `0`\\~',
        '分母を 65536 とした分子の数で指定し、DSP の基準音量から乗算で変更します。 `32768` で通常の半分、`131072` で通常の倍で出力されます。'],
      kind: vscode.CompletionItemKind.Field,
    },
  };

  const OperatorDescriptions: {[key: string]: DESCRIPTION} = {
    '+': {
      title: ['加算', 'Add a variable'],
      description: ['Syntax: `n <A> + <B>`',
        'B＋A を計算し、B に代入します。 B は破壊的変更が行われます。',
        'B = B + A'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '-': {
      title: ['減算', 'Subtract a variable'],
      description: ['Syntax: `n <A> - <B>`',
        'B－A を計算し、B に代入します。 B は破壊的変更が行われます。',
        'B = B - A'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '*': {
      title: ['乗算', 'Multiply a variable'],
      description: ['Syntax: `n <A> * <B>`',
        'B×A を計算し、B に代入します。 B は破壊的変更が行われます。',
        'B = B * A'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '/': {
      title: ['除算 (符号あり)', 'Divide a variable (signed)'],
      description: ['Syntax: `n <B> / <A>`',
        '符号を考慮して B÷A を計算し、商を B に代入します。 B は破壊的変更が行われます。',
        'B = B / A, like IDIV'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '\\': {
      title: ['除算 (符号なし)', 'Set remainder of dividing a variable (unsigned)'],
      description: ['Syntax: `n <A> \\ <B>`',
        '符号を考慮せずに B÷A を計算し、商を B に代入します。 B は破壊的変更が行われます。',
        'B = B / A, like DIV'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '%': {
      title: ['余り (符号あり)', 'Set remainder of dividing a variable (signed)'],
      description: ['Syntax: `n <A> % <B>`',
        '符号を考慮して B÷A を計算し、余りを B に代入します。 B は破壊的変更が行われます。',
        'B = B % A, like IDIV'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '$': {
      title: ['余り (符号なし)', 'Set remainder of dividing a variable (unsigned)'],
      description: ['Syntax: `n <A> $ <B>`',
        '符号を考慮せずに B÷A を計算し、余りを B に代入します。 B は破壊的変更が行われます。',
        'B = B % A, like DIV'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '&': {
      title: ['論理積', 'Perform a logical AND'],
      description: ['Syntax: `n <A> & <B>`',
        'A と B の論理積を計算し、B に代入します。 B は破壊的変更が行われます。',
        'B = B & A'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '|': {
      title: ['論理和', 'Perform a logical OR'],
      description: ['Syntax: `n <A> | <B>`',
        'A と B の論理和を計算し、B に代入します。 B は破壊的変更が行われます。',
        'B = B | A'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '^': {
      title: ['排他的論理和', 'Perform a logical XOR'],
      description: ['Syntax: `n <A> ^ <B>`',
        'A と B の排他的論理和を計算し、B に代入します。 B は破壊的変更が行われます。',
        'B = B ^ A'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '<': {
      title: ['左ビットシフト', 'Perform a logical LEFT shift'],
      description: ['Syntax: `n <A> < <B>`',
        'B の値を A の分だけ左にビットシフトを行い、結果を B に代入します。 B は破壊的変更が行われます。',
        'B = B << A, like SHL'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '_': {
      title: ['右ビットシフト (符号あり)', 'Perform a logical RIGHT shift (signed)'],
      description: ['Syntax: `n <A> _ <B>`',
        '符号を保持したまま B の値を A の分だけ右にビットシフトを行い、結果を B に代入します。 B は破壊的変更が行われます。',
        'B = B >> A, like SAR'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '>': {
      title: ['右ビットシフト (符号なし)', 'Perform a logical RIGHT shift (unsigned)'],
      description: ['Syntax: `n <A> > <B>`',
        '符号を保持せずに B の値を A の分だけ右にビットシフトを行い、結果を B に代入します。 B は破壊的変更が行われます。',
        'B = B >> A, like SHR'],
      kind: vscode.CompletionItemKind.Operator,
    },
    '!': {
      title: ['否定', 'Perform a logical NOT'],
      description: ['Syntax: `n <A> ! <B>`',
        'A の否定値 (全ビットを排他的論理和で反転した結果) を B に代入します。 B は破壊的変更が行われます。',
        'B = Not A, like B = A ^ -1'],
      kind: vscode.CompletionItemKind.Operator,
    },
  };

  const FunctionDescriptions: {[key: string]: DESCRIPTION} = {
    ':': {
      title: ['ラベル', 'Label'],
      description: ['Syntax: `:0`\\~`:1023`',
        '`bxx` 系コマンドのジャンプ先となる場所や、データ格納用メモリの初期位置を指定します。'],
      kind: vscode.CompletionItemKind.EnumMember,
    },
    '::': {
      title: ['スクリプト領域を終了', 'Exit from SCRIPT zone, change to STARTUP zone'],
      description: ['Syntax: `::`',
        'スクリプト領域を終了し、拡張コマンド領域へ移行します。'],
      kind: vscode.CompletionItemKind.EnumMember,
    },
    'w': {
      title: ['待機', 'Pauses running Script700'],
      description: ['Syntax: `w <CLOCK>`', '`<CLOCK>` = 2,048kHz, 2048000 = 1sec',
        '指定したクロック数 (2,048 kHz) だけ Script700 の動作を停止させます。'
          + ' Script700 実行中は SPC700 と DSP の処理が停止するため、`w` コマンドで SPC700 と DSP の処理を再開します。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'm': {
      title: ['代入', 'Copy a value of variable'],
      description: ['Syntax: `m <A> <B>`',
        'A の値を B に代入します。 B は破壊的変更が行われます。',
        'Copy from A to B'],
      kind: vscode.CompletionItemKind.Function,
    },
    'c': {
      title: ['比較・動的ポインタ指定', 'Compare variables, or set dynamic pointer'],
      description: ['Syntax: `c <A> <B>`',
        'A と B の値を記憶しておき、`bxx` 系コマンドの条件分岐指定・動的ポインタで使用します。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'a': {
      title: ['加算', 'Add a variable'],
      description: ['Syntax: `a <A> <B>`',
        'B＋A を計算し、B に代入します。 B は破壊的変更が行われます。',
        'B = B + A'],
      kind: vscode.CompletionItemKind.Function,
    },
    's': {
      title: ['減算', 'Subtract a variable'],
      description: ['Syntax: `s <A> <B>`',
        'B－A を計算し、B に代入します。 B は破壊的変更が行われます。',
        'B = B - A'],
      kind: vscode.CompletionItemKind.Function,
    },
    'u': {
      title: ['乗算', 'Multiply a variable'],
      description: ['Syntax: `u <A> <B>`',
        'B×A を計算し、B に代入します。 B は破壊的変更が行われます。',
        'B = B * A'],
      kind: vscode.CompletionItemKind.Function,
    },
    'd': {
      title: ['除算 (符号あり)', 'Divide a variable (signed)'],
      description: ['Syntax: `d <A> <B>`',
        '符号を考慮して B÷A を計算し、商を B に代入します。 B は破壊的変更が行われます。',
        'B = B / A, like IDiv'],
      kind: vscode.CompletionItemKind.Function,
    },
    'n': {
      title: ['演算', 'Performs various operations on variables'],
      description: ['Syntax: `n <A> <OP> <B>`',
        'A と B の値を使用して、各種演算を行います。 演算子は第2パラメータで指定します。 B は破壊的変更が行われます。',
        'B = B ? A'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bra': {
      title: ['ラベルへジャンプ (無条件)', 'Jump to label (always)'],
      description: ['Syntax: `bra <LABEL>`',
        '無条件で、指定したラベルの場所へジャンプします。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'beq': {
      title: ['ラベルへジャンプ (一致)', 'Jump to label (equals)'],
      description: ['Syntax: `beq <LABEL>`',
        '直前の `c` コマンドで指定した B と A の値が一致する場合、指定したラベルの場所へジャンプします。',
        'Jump if `c <A> <B>` matches "B == A"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bne': {
      title: ['ラベルへジャンプ (不一致)', 'Jump to label (not equals)'],
      description: ['Syntax: `bne <LABEL>`',
        '直前の `c` コマンドで指定した B と A の値が一致しない場合、指定したラベルの場所へジャンプします。',
        'Jump if `c <A> <B>` matches "B != A"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bge': {
      title: ['ラベルへジャンプ (符号あり、以上)', 'Jump to label (signed, greater than or equals)'],
      description: ['Syntax: `bge <LABEL>`',
        '直前の `c` コマンドで指定した B と A の値を比較し、符号を考慮して B が A 以上の場合、指定したラベルの場所へジャンプします。',
        'Jump if `c <A> <B>` matches "B >= A"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'ble': {
      title: ['ラベルへジャンプ (符号あり、以下)', 'Jump to label (signed, lesser than or equals)'],
      description: ['Syntax: `ble <LABEL>`',
        '直前の `c` コマンドで指定した B と A の値を比較し、符号を考慮して B が A 以下の場合、指定したラベルの場所へジャンプします。',
        'Jump if `c <A> <B>` matches "B <= A"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bgt': {
      title: ['ラベルへジャンプ (符号あり、超過)', 'Jump to label (signed, greater than)'],
      description: ['Syntax: `bgt <LABEL>`',
        '直前の `c` コマンドで指定した B と A の値を比較し、符号を考慮して B が A より大きい場合、指定したラベルの場所へジャンプします。',
        'Jump if `c <A> <B>` matches "B > A"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'blt': {
      title: ['ラベルへジャンプ (符号あり、未満)', 'Jump to label (signed, lesser than)'],
      description: ['Syntax: `blt <LABEL>`',
        '直前の `c` コマンドで指定した B と A の値を比較し、符号を考慮して B が A より小さい場合、指定したラベルの場所へジャンプします。',
        'Jump if `c <A> <B>` matches "B < A"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bcc': {
      title: ['ラベルへジャンプ (符号なし、以上)', 'Jump to label (unsigned, greater than or equals)'],
      description: ['Syntax: `bcc <LABEL>`',
        '直前の `c` コマンドで指定した B と A の値を比較し、符号を考慮せずに B が A 以上の場合、指定したラベルの場所へジャンプします。',
        'Jump if `c <A> <B>` matches "B >= A"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'blo': {
      title: ['ラベルへジャンプ (符号なし、以下)', 'Jump to label (unsigned, lesser than or equals)'],
      description: ['Syntax: `blo <LABEL>`',
        '直前の `c` コマンドで指定した B と A の値を比較し、符号を考慮せずに B が A 以下の場合、指定したラベルの場所へジャンプします。',
        'Jump if `c <A> <B>` matches "B <= A"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bhi': {
      title: ['ラベルへジャンプ (符号なし、超過)', 'Jump to label (unsigned, greater than)'],
      description: ['Syntax: `bhi <LABEL>`',
        '直前の `c` コマンドで指定した B と A の値を比較し、符号を考慮せずに B が A より大きい場合、指定したラベルの場所へジャンプします。',
        'Jump if `c <A> <B>` matches "B > A"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bcs': {
      title: ['ラベルへジャンプ (符号なし、未満)', 'Jump to label (unsigned, lesser than)'],
      description: ['Syntax: `bcs <LABEL>`',
        '直前の `c` コマンドで指定した B と A の値を比較し、符号を考慮せずに B が A より小さい場合、指定したラベルの場所へジャンプします。',
        'Jump if `c <A> <B>` matches "B < A"'],
      kind: vscode.CompletionItemKind.Function,
    },
    'r': {
      title: ['直前のジャンプに戻る', "Return to after `bxx` command", '@since 2.12.0'],
      description: ['Syntax: `r`',
        '最後に実行された `bxx` コマンドへジャンプして、その次のコマンドから再開します。 `bxx` コマンドと組み合わせることで、サブルーチンを実装できます。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'r1': {
      title: ['ジャンプの戻り先を記録する', "Resume `bxx` position stacking", '@since 2.15.2'],
      description: ['Syntax: `r1`',
        '`r` コマンドを実行するための戻り先を記録します。 `r` コマンドを実行すると、自動的に `r1` コマンドが実行されます。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'r0': {
      title: ['ジャンプの戻り先を記録しない', "Suspend `bxx` position stacking", '@since 2.15.2'],
      description: ['Syntax: `r0`',
        '`r` コマンドを実行するための戻り先を記録しません。 記録を再開する場合は `r1` コマンドを実行します。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'f': {
      title: ['ポート書き込みをフラッシュ', 'Flush SPC700 ports, and wait for `i0` == `o0`', '@since 2.17.2'],
      description: ['Syntax: `f`',
        'SPC700 入力ポートへの書き込みを `i1`->`i2`->`i3`->`i0` の順で行い、最後に出力ポート `o0` と入力ポート `i0` が一致するまで待機します。',
        '実行後、`c <A> <B>` の `<A>` に待機時間 (2,048kHz) が設定されます。 `#?` パラメータで待機時間を取り出すことができます。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'f1': {
      title: ['ポート書き込みを即時反映する', 'Resume SPC700 ports writing', '@since 2.17.2'],
      description: ['Syntax: `f1`',
        'SPC700 入力ポートへの書き込みを即時に行います。 `f` コマンドを実行すると、自動的に `f1` コマンドが実行されます。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'f0': {
      title: ['ポート書き込みを即時反映しない', 'Suspend SPC700 ports writing', '@since 2.17.2'],
      description: ['Syntax: `f0`',
        'SPC700 入力ポートへの書き込みを即時に行いません。 `f` コマンドが実行されるまで、入力ポートへの書き込みは保留されます。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'wi': {
      title: ['ポートの読み込みを待機', 'Wait reading SPC700 ports', '@since 2.19.0'],
      description: ['Syntax: `wi <PORT>`', '`<PORT>` = `0`\\~`3`',
        'ドライバが SPC700 入力ポートから値の読み取りを行うまで待機します。',
        '実行後、`c <A> <B>` の `<A>` に待機時間 (2,048kHz) が設定されます。 `#?` パラメータで待機時間を取り出すことができます。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'wo': {
      title: ['ポートの書き込みを待機', 'Wait writing SPC700 ports', '@since 2.19.0'],
      description: ['Syntax: `wo <PORT>`', '`<PORT>` = `0`\\~`3`',
        'ドライバが SPC700 出力ポートへ値の書き込みを行うまで待機します。',
        '実行後、`c <A> <B>` の `<A>` に待機時間 (2,048kHz) が設定されます。 `#?` パラメータで待機時間を取り出すことができます。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'bp': {
      title: ['ブレイクポイント設定', 'Set break-point address', '@since 2.19.0'],
      description: ['Syntax: `bp <ADDR>`', '`<ADDR>` = `0`\\~`65535`',
        'SPC700 の処理が、指定したプログラムカウンタに到達した場合、SPC700 と DSP の処理を停止します。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'q': {
      title: ['スクリプト処理を終了', 'Stop running script', '@since 2.12.0'],
      description: ['Syntax: `q`',
        'スクリプトの実行を中止して、処理を終了します。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'nop': {
      title: ['何もしない', 'No operation', '@since 2.11.0'],
      description: ['Syntax: `nop`',
        '何も行いません (ウェイトもかかりません) が、コマンドとして認識します。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'e': {
      title: ['スクリプト領域を終了', 'Exit from SCRIPT zone, change to STARTUP zone'],
      description: ['Syntax: `e`',
        'スクリプト領域を終了し、拡張コマンド領域へ移行します。'],
      kind: vscode.CompletionItemKind.Function,
    },
    '#i': {
      title: ['テキストファイルを取り込む', 'Include a text file', '@since 2.17.0'],
      description: ['Syntax: `#i "<FILE>"`', "`<FILE>` = Relative path",
        '他の Script700 が書き込まれたテキストファイルを読み込み、この場所に差し込みます。'],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#it': {
      title: ['テキストファイルを取り込む', 'Include a text file', '@since 2.17.0'],
      description: ['Syntax: `#it "<FILE>"`', "`<FILE>` = Relative path",
        '他の Script700 が書き込まれたテキストファイルを読み込み、この場所に差し込みます。'],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#ib': {
      title: ['バイナリファイルを取り込む', 'Include a binary file', '@since 2.17.0'],
      description: ['Syntax: `#ib "<FILE>"`', "`<FILE>` = Relative path",
        'ファイルをバイナリモードで読み込み、この場所に差し込みます。 Script700 データ領域をバイナリで指定する際に使用できます。'],
      kind: vscode.CompletionItemKind.Interface,
    },
  };

  const DSPOptionDescriptions: {[key: string]: DESCRIPTION} = {
    '::': {
      title: ['スクリプト領域を終了', 'Exit from SCRIPT zone, change to STARTUP zone'],
      description: ['Syntax: `::`',
        'スクリプト領域を終了し、拡張コマンド領域へ移行します。'],
      kind: vscode.CompletionItemKind.EnumMember,
    },
    'm': {
      title: ['特定の波形をミュート', 'Mute specific tones'],
      description: ['Syntax: `m <SOUND>,!`', '`<SOUND>` = Tone number (0\\~255)',
        '指定した波形番号だけ音を消してミュート状態にします。 同じ波形番号を再度指定すると、ミュートを解除します。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'c': {
      title: ['特定の波形番号を変更', 'Change specific tones'],
      description: ['Syntax: `c <SOUND>,! <CHANGE>`', '`<SOUND>` = Tone number (0\\~255)',
        '`<CHANGE>` = Tone number (0\\~255)',
        '指定した波形番号の音を、別の波形番号の音に置き換えます。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'd': {
      title: ['発音周波数を変更', 'Detune specific tones'],
      description: ['Syntax: `d <SOUND> <RATE>`', '`<SOUND>` = Tone number (0\\~255)',
        '`<RATE>` = Relative rate',
        '指定した波形番号の発音周波数を、指定した分だけ上下にずらします。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'v': {
      title: ['音量を変更', 'Change volume level of tone', '@since 2.11.2'],
      description: ['Syntax: `v <SOUND>,!,l,r,lr,vl,vr,el,er <VOLUME>`', '`<SOUND>` = Tone number (0\\~255)',
        '`<VOLUME>` = Level base on 65536, x0.5 = 32768 / x2 = 131072',
        '指定した波形番号の音量を、指定した分だけ増減します。'],
      kind: vscode.CompletionItemKind.Function,
    },
    'e': {
      title: ['拡張コマンド領域を終了', 'Exit from STARTUP zone, change to DATA zone'],
      description: ['Syntax: `e`',
        '拡張コマンド領域を終了し、データ領域へ移行します。'],
      kind: vscode.CompletionItemKind.Function,
    },
    '#i': {
      title: ['テキストファイルを取り込む', 'Include a text file', '@since 2.17.0'],
      description: ['Syntax: `#i "<FILE>"`', "`<FILE>` = Relative path",
        '他の Script700 が書き込まれたテキストファイルを読み込み、この場所に差し込みます。'],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#it': {
      title: ['テキストファイルを取り込む', 'Include a text file', '@since 2.17.0'],
      description: ['Syntax: `#it "<FILE>"`', "`<FILE>` = Relative path",
        '他の Script700 が書き込まれたテキストファイルを読み込み、この場所に差し込みます。'],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#ib': {
      title: ['バイナリファイルを取り込む', 'Include a binary file', '@since 2.17.0'],
      description: ['Syntax: `#ib "<FILE>"`', "`<FILE>` = Relative path",
        'ファイルをバイナリモードで読み込み、この場所に差し込みます。 Script700 データ領域をバイナリで指定する際に使用できます。'],
      kind: vscode.CompletionItemKind.Interface,
    },
  };

  const DSPTargetDescriptions: {[key: string]: DESCRIPTION_DSP} = {
    '!': {
      command: /[mcdv]/,
      title: ['すべての波形番号', 'All tones'],
      description: ['For all tones (0\\~255)',
        'すべての波形番号に影響します。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'l': {
      command: /[v]/,
      title: ['マスター音量＋エコー音量 (左)', 'Left of MASTER and ECHO levels'],
      description: ['左側のマスター音量とエコー音量に影響します。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'r': {
      command: /[v]/,
      title: ['マスター音量＋エコー音量 (右)', 'Right of MASTER and ECHO levels'],
      description: ['右側のマスター音量とエコー音量に影響します。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'lr': {
      command: /[v]/,
      title: ['マスター音量＋エコー音量 (左右)', 'All of MASTER and ECHO levels', '@since 2.14.5'],
      description: ['すべてのマスター音量とエコー音量に影響します。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'vl': {
      command: /[v]/,
      title: ['マスター音量 (左)', 'Left of MASTER level'],
      description: ['左側のマスター音量に影響します。 エコー音量には影響しません。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'vr': {
      command: /[v]/,
      title: ['マスター音量 (右)', 'Right of MASTER level'],
      description: ['右側のマスター音量に影響します。 エコー音量には影響しません。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'el': {
      command: /[v]/,
      title: ['エコー音量 (左)', 'Left of MASTER and ECHO levels'],
      description: ['左側のエコー音量に影響します。 マスター音量には影響しません。'],
      kind: vscode.CompletionItemKind.Field,
    },
    'er': {
      command: /[v]/,
      title: ['エコー音量 (右)', 'Right of MASTER and ECHO levels'],
      description: ['右側のエコー音量に影響します。 マスター音量には影響しません。'],
      kind: vscode.CompletionItemKind.Field,
    },
  };

  const DataDescriptions: {[key: string]: DESCRIPTION} = {
    '#i': {
      title: ['テキストファイルを取り込む', 'Include a text file', '@since 2.17.0'],
      description: ['Syntax: `#i "<FILE>"`', "`<FILE>` = Relative path",
        '他の Script700 が書き込まれたテキストファイルを読み込み、この場所に差し込みます。'],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#it': {
      title: ['テキストファイルを取り込む', 'Include a text file', '@since 2.17.0'],
      description: ['Syntax: `#it "<FILE>"`', "`<FILE>` = Relative path",
        '他の Script700 が書き込まれたテキストファイルを読み込み、この場所に差し込みます。'],
      kind: vscode.CompletionItemKind.Interface,
    },
    '#ib': {
      title: ['バイナリファイルを取り込む', 'Include a binary file', '@since 2.17.0'],
      description: ['Syntax: `#ib "<FILE>"`', "`<FILE>` = Relative path",
        'ファイルをバイナリモードで読み込み、この場所に差し込みます。 Script700 データ領域をバイナリで指定する際に使用できます。'],
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
      return [`DEC: \`${sign}${dec}\`&nbsp;&nbsp;&nbsp;HEX: \`\$${sign}${hex}\``, `BIN: \`${bin}\``];
    } else if (/(\-?)([0-9]+)/.exec(value)) {
      const sign = RegExp.$1;
      const dec = +RegExp.$2;
      const hex = dec.toString(16);
      const bin = get32BitBin((sign === '-' && dec !== 0) ? 4294967296 - dec : dec);
      return [`DEC: \`${sign}${dec}\`&nbsp;&nbsp;&nbsp;HEX: \`\$${sign}${hex}\``, `BIN: \`${bin}\``];
    } else {
      return [];
    }
  };

  const createDirectCompletion = (value: string): vscode.CompletionItem => {
    const item = new vscode.CompletionItem(value, vscode.CompletionItemKind.EnumMember);
    item.detail = 'パラメータ値を直接指定';
    return item;
  };

  const createCompletion = (label: string, title: string[], description: string[], kind: vscode.CompletionItemKind)
      : vscode.CompletionItem => {
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

  const createCompletionWithComment = (document: vscode.TextDocument, lineIndex: number, label: string)
      : vscode.CompletionItem => {
    return createCompletion(label, ParameterDescriptions['l'].title,
      getComment(document, lineIndex), vscode.CompletionItemKind.EnumMember);
  };

  const scanForCompletion = (document: vscode.TextDocument, regexp: RegExp, callback: (...groups: string[]) => string)
      : vscode.CompletionItem[] => {
    // オプション指定忘れによる無限ループ防止
    if (!regexp.global) throw new Error('RegExp is not set global option.');

    const completions: vscode.CompletionItem[] = [];
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i).text;
      let result = null;

      while (result = regexp.exec(line)) {
        completions.push(createCompletionWithComment(document, i, callback(...result)));
      }
    }

    return completions;
  };

  const getCurrentZone = (document: vscode.TextDocument, position: vscode.Position): ZONES => {
    let endTagCount: number = 0;
    let doubleTag: boolean = false;

    for (let i = 0; i <= position.line; i++) {
      let line = document.lineAt(i).text.replace(/([;']|\/\/|\#\s)(.+)/, '');
      if (i === position.line) line = line.substring(0, position.character).replace(/\s*[^\s]+$/, '');

      if (/(^|\s)(e|\:\:)\s+(.*\s+)?e($|\s)/i.test(line)) {
        return 'data';
      } else if (!doubleTag && /(^|\s)(e\s+(.*\s+)?)?\:\:($|\s)/i.exec(line)) {
        if (/^e/i.test(RegExp.$2) || !endTagCount) endTagCount++;
        doubleTag = true;
      } else if (/(^|\s)e($|\s)/i.test(line)) {
        endTagCount++;
      }

      if (endTagCount >= 2) return 'data';
    }

    return endTagCount ? 'startup' : 'script';
  };

  const isParameter = (before: string, p2: string): boolean => {
    const params = before.split(/\s+/);
    params.pop();
    params.pop();
    const p1 = params.pop() || '';
    const parameterMark1 = /^([^\-]{1,2})(\-?(0x|\$)?[0-9a-f]+|\?)/i.exec(p1) ? RegExp.$1.toLowerCase() : '';
    const parameterMark2 = /^([^\-]{1,2})(\-?(0x|\$)?[0-9a-f]+|\?)/i.exec(p2) ? RegExp.$1.toLowerCase() : '';

    if (!ParameterDescriptions[parameterMark1] && /^([wmcasudn]|w[io]|bp)$/i.test(p2)) return true;
    if (/^[mcasud]$/i.test(p1) && ParameterDescriptions[parameterMark2]) return true;
    if (ParameterDescriptions[parameterMark1] && OperatorDescriptions[p2]) return true;
    return false;
  };

  const createCommandHTML = (word: string): vscode.MarkdownString => {
    const markdown = new vscode.MarkdownString(`<span style="color:var(--vscode-charts-purple);">\`${word}\`</span>`);
    markdown.isTrusted = true;
    return markdown;
  };

  const createMarkdown = (values: string[]): vscode.MarkdownString => {
    const markdown = new vscode.MarkdownString(values.map((value) => {
      if (value.startsWith('Syntax:')) {
        return `<span style="color:var(--vscode-charts-green);">${value}</span>`;
      } else if (value.startsWith('HEX:') || value.startsWith('DEC:') || value.startsWith('BIN:')) {
        return `<span style="color:var(--vscode-charts-blue);">${value}</span>`;
      } else if (value.startsWith('@since')) {
        return `*${value}*`;
      } else {
        return value;
      }
    }).join('  \r\n'), true);
    markdown.isTrusted = true;
    return markdown;
  };

  const createHTML = (values: string[]): vscode.MarkdownString => {
    const markdown = new vscode.MarkdownString(values.map((value) => {
      const line = value.replace(/\&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');
      return `<span style="color:var(--vscode-charts-green);">${line}</span>`;
    }).join('  \r\n'), true);
    markdown.isTrusted = true;
    return markdown;
  };

  const createHoverForScript = (document: vscode.TextDocument, before: string, command: string, word: string)
      : vscode.ProviderResult<vscode.Hover> => {
    const lword = word.toLowerCase();

    if (/^[fr][01]$/i.test(word) && isParameter(before, command)) {
      // DO NOTHING
    } else if (FunctionDescriptions[lword]) {
      const map = FunctionDescriptions[lword];
      return new vscode.Hover([
        createCommandHTML(word),
        createMarkdown(map.title),
        createMarkdown(map.description),
      ]);
    } else if (OperatorDescriptions[word]) {
      const map = OperatorDescriptions[word];
      return new vscode.Hover([
        createCommandHTML(word),
        createMarkdown(map.title),
        createMarkdown(map.description),
      ]);
    } else if (/^(bra|beq|bne|bge|ble|bgt|blt|bcc|blo|bhi|bcs)$/i.test(command) && /(0x|\$)?[0-9a-f]+/i.exec(word)) {
      const label = `:${word}`;
      for (let i = 0; i < document.lineCount - 1; i++)
      if (document.lineAt(i).text.indexOf(label) >= 0) return new vscode.Hover([
        createCommandHTML(word),
        createMarkdown(ParameterDescriptions['l'].title),
        createHTML(getComment(document, i)),
      ]);
    } else if (/^(\:(((0x|\$)[0-9a-f]+)|[0-9]+)$)/i.test(word)) {
      const map = FunctionDescriptions[':'];
      return new vscode.Hover([
        createCommandHTML(word),
        createMarkdown(map.title),
        createMarkdown(map.description),
      ]);
    }

    let parameterMark = /^([^\-]{1,2})(\-?(0x|\$)?[0-9a-f]+|\?)/i.exec(word) ? RegExp.$1.toLowerCase() : '';
    if (ParameterDescriptions[parameterMark]) {
      const map = ParameterDescriptions[parameterMark];
      return new vscode.Hover([
        createCommandHTML(word),
        createMarkdown(map.title),
        createMarkdown(map.description.concat(getLiteral(RegExp.$2))),
      ]);
    }

    parameterMark = parameterMark.substring(0, 1).toLowerCase();
    if (ParameterDescriptions[parameterMark]) {
      const map = ParameterDescriptions[parameterMark];
      return new vscode.Hover([
        createCommandHTML(word),
        createMarkdown(map.title),
        createMarkdown(map.description),
      ]);
    }

    if (/^\-?(0x|\$)?[0-9a-f]+$|^\?$/i.test(word)) {
      if (/(^|\s)[masud]\s+[^\s]+\s*$/i.test(before)) parameterMark = 'i';
      else if (/(^|\s)[n](\s+[^\s]+){2}\s*$/i.test(before)) parameterMark = 'i';
      else if (/(^|\s)[c]\s+[^\s]+\s*$/i.test(before)) parameterMark = 'o';
      else if (/^[mcasudn]$/i.test(command)) parameterMark = 'o';
      else if (/^wi$/i.test(command)) parameterMark = 'i';
      else if (/^wo$/i.test(command)) parameterMark = 'o';
      else if (/^bp$/i.test(command)) parameterMark = 'r';
      else parameterMark = '#';

      const literal = /^(w[io]|bp)$/i.test(command);
      const map = literal ? LiteralDescriptions[parameterMark] : ParameterDescriptions[parameterMark];
      const description = map.description.concat([]);
      if (!literal && parameterMark !== '#') description.splice(0, 1, ...LiteralPortDescription);

      return new vscode.Hover([
        createCommandHTML(word),
        createMarkdown(map.title),
        createMarkdown(description.concat(getLiteral(word))),
      ]);
    }
  };

  const createHoverForStartup = (before: string, command: string, word: string): vscode.ProviderResult<vscode.Hover> => {
    const lword = word.toLowerCase();

    if (DSPOptionDescriptions[lword]) {
      const map = DSPOptionDescriptions[lword];
      return new vscode.Hover([
        createCommandHTML(word),
        createMarkdown(map.title),
        createMarkdown(map.description),
      ]);
    }

    if (DSPTargetDescriptions[lword]) {
      const map = DSPTargetDescriptions[lword];
      if (!map.command.test(command)) return;

      return new vscode.Hover([
        createCommandHTML(word),
        createMarkdown(map.title),
        createMarkdown(map.description),
      ]);
    }

    if (/^\-?(0x|\$)?[0-9a-f]+$|^\?$/i.test(word)) {
      let parameterMark = '';
      if (/(^|\s)[c]\s+[^\s]+\s*$/i.test(before)) parameterMark = 's';
      else if (/(^|\s)[d]\s+[^\s]+\s*$/i.test(before)) parameterMark = 'd';
      else if (/(^|\s)[v]\s+[^\s]+\s*$/i.test(before)) parameterMark = 'v';
      else if (/^[mcdv]$/i.test(command)) parameterMark = 's';
      else return;

      const map = LiteralDescriptions[parameterMark];
      const description = map.description.concat([]);
      return new vscode.Hover([
        createCommandHTML(word),
        createMarkdown(map.title),
        createMarkdown(description.concat(getLiteral(word))),
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
      const newBefore = line.substring(0, position.character - before.length);
      const word = `${before}${after}`;

      const zone = getCurrentZone(document, position);
      if (zone === 'script') return createHoverForScript(document, newBefore, command, word);
      else if (zone === 'startup') return createHoverForStartup(newBefore, command, word);
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
      return [createDirectCompletion('0')].concat(ParameterGroup1Words.map((word) => {
        const map = ParameterDescriptions[word.toLowerCase()];
        return createCompletion(word, map.title, map.description, map.kind);
      }));
    } else if (/(^|\s)([n]\s+[^\s]+\s+[^\s]+|[masud]\s+[^\s]+)\s+$/i.test(line)) {
      return [createDirectCompletion('0')].concat(ParameterGroup2Words.map((word) => {
        const map = ParameterDescriptions[word.toLowerCase()];
        return createCompletion(word, map.title, map.description, map.kind);
      }));
    } else if (/(^|\s)([w][io]?|bp)\s+$/i.test(line)) {
      return [createDirectCompletion('0')].concat(ParameterGroup3Words.map((word) => {
        const map = ParameterDescriptions[word.toLowerCase()];
        return createCompletion(word, map.title, map.description, map.kind);
      }));
    } else if (/(^|\s)([n]\s+[^\s]+)\s+$/i.test(line)) {
      return Object.keys(OperatorDescriptions).map((word) => {
        const map = OperatorDescriptions[word];
        return createCompletion(word, map.title, map.description, map.kind);
      });
    } else if (/(^|\s)(bra|beq|bne|bge|ble|bgt|blt|bcc|blo|bhi|bcs)\s+$/i.test(line)) {
      const compiletions = scanForCompletion(document, /\:(((0x|\$)[0-9a-f]+)|[0-9]+)/ig, (m, g1) => g1);
      const description = ParameterDescriptions['w'];
      compiletions.push(createCompletion('w', description.title, description.description, vscode.CompletionItemKind.Field));
      return compiletions;
    } else if (/(^|\s)(\#i[tb]?)\s+$/i.test(line)) {
      return [createDirectCompletion('"filename"')];
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
    } else if (/(^|\s)([c]\s+[^\s]+)\s+$/i.test(line)) {
      return [createDirectCompletion('0')];
    } else if (/(^|\s)([d]\s+[^\s]+)\s+$/i.test(line)) {
      return [createDirectCompletion('-1024'), createDirectCompletion('0'), createDirectCompletion('1024')];
    } else if (/(^|\s)([v]\s+[^\s]+)\s+$/i.test(line)) {
      return [createDirectCompletion('32768'), createDirectCompletion('65536'), createDirectCompletion('131072')];
    } else if (/(^|\s)([mcdv])\s+$/i.exec(line)) {
      const command = RegExp.$2;
      return [createDirectCompletion('0')].concat(Object.keys(DSPTargetDescriptions).filter((word) => {
        const map = DSPTargetDescriptions[word];
        return map.command.test(command);
      }).map((word) => {
        const map = DSPTargetDescriptions[word];
        return createCompletion(word, map.title, map.description, map.kind);
      }));
    } else if (/(^|\s)(\#i[tb]?)\s+$/i.test(line)) {
      return [createDirectCompletion('"filename"')];
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
    } else if (/(^|\s)(\#i[tb]?)\s+$/i.test(line)) {
      return [createDirectCompletion('"filename"')];
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

  const foo = vscode.languages.registerDefinitionProvider('script700', {
    provideDefinition(document, position, token) {
      const cursorLine = document.lineAt(position).text.replace(/([;']|\/\/|\#\s)(.+)/, '');
      if (cursorLine.length < position.character) return;

      const word = document.getText(document.getWordRangeAtPosition(position));
      if (!/(0x|\$)?[0-9a-f]+/i.test(word)) return;

      const command = /([^\s]+)\s+[^\s]*$/.exec(cursorLine.substring(0, position.character)) ? RegExp.$1 : '';
      if (!/^(bra|beq|bne|bge|ble|bgt|blt|bcc|blo|bhi|bcs)$/i.test(command)) return;

      const label = `:${word}`;
      const regexp = /\:(((0x|\$)[0-9a-f]+)|[0-9]+)/ig;
      for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i).text;
        let result = null;

        while (result = regexp.exec(line)) {
          if (result[0] !== label) continue;

          const uri = vscode.Uri.file(document.fileName);
          const targetPosition = new vscode.Position(i, result.index);
          const location = new vscode.Location(uri, targetPosition);
          return Promise.resolve(location);
        }
      }
    }
  });

  context.subscriptions.push(hoverProvider, completionItemProvider);
}
