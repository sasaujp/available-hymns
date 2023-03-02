export const zenkaku2Hankaku = (text: string) => {
  return text.replace(/[A-Za-z0-9]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
  });
};
