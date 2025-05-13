/**
 * 日付文字列を指定したフォーマットに変換する
 * @param dateString - ISO形式の日付文字列
 * @returns フォーマットされた日付文字列 (例: "2023年01月01日 12:30")
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}年${month}月${day}日 ${hours}:${minutes}`;
};
