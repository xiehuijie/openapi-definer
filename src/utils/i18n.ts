type TextInput<T extends string, D extends T> = (Record<D, string> & Partial<Record<Exclude<T, D>, string>>) | string;

export type Text<T extends string = string> = Readonly<Record<T, string>>;

/**
 * ### 创建文案定义器
 * ---
 * @param languages 语言种类 需输入由[`RFC-4646`](https://www.rfc-editor.org/rfc/rfc4646)定义的字符串数组
 * @param default_language 输入默认语言 {@link languages `languages`} 中的一个
 * @returns
 */
export const createTextDefiner = <T extends string, D extends T>(languages: readonly T[], default_language: D) => {
  return (input: TextInput<T, D>): Text<T> => {
    if (typeof input === 'string') {
      return createDefaultText(input);
    } else {
      return new Proxy<Text<T>>(input as Text<T>, { get: (_, p: keyof TextInput<T, D>) => _[p] ?? _[default_language] });
    }
  };
};

export const createDefaultText = (text: string) => new Proxy<Text>({}, { get: () => text });
