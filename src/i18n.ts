type I18nTextInput<T extends string, D extends T> =
  | (Record<D, string> & Partial<Record<Exclude<T, D>, string>>)
  | string;
type I18nText<T extends string> = Record<T, string>;

export const createTextDefiner = <T extends string, D extends T>(
  languages: readonly T[],
  default_language: D
) => {
  return (input: I18nTextInput<T, D>): I18nText<T> => {
    type K = keyof I18nTextInput<T, D>;

    return languages.reduce((acc, lang) => {
      acc[lang] =
        typeof input === 'string' ? input : (input[lang as K] ?? lang[default_language as K]);
      return acc;
    }, {} as I18nText<T>);
  };
};
