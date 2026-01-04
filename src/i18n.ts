type TextInput<T extends string, D extends T> =
  | (Record<D, string> & Partial<Record<Exclude<T, D>, string>>)
  | string;

export type Text<T extends string = string> = Record<T, string>;

/**
 * ### 创建文案定义器
 * ---
 * @param languages 语言种类 需输入由[`RFC-4646`](https://www.rfc-editor.org/rfc/rfc4646)定义的字符串数组
 * @param default_language 输入默认语言 {@link languages `languages`} 中的一个
 * @returns
 */
export const createTextDefiner = <T extends string, D extends T>(
  languages: readonly T[],
  default_language: D
) => {
  return (input: TextInput<T, D>): Text<T> => {
    type K = keyof TextInput<T, D>;

    return languages.reduce((acc, lang) => {
      acc[lang] =
        typeof input === 'string' ? input : (input[lang as K] ?? input[default_language as K]);
      return acc;
    }, {} as Text<T>);
  };
};
