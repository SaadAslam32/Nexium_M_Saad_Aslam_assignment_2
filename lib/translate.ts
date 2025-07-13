// lib/translate.ts

const dictionary: { [key: string]: string } = {
  'the': 'یہ',
  'blog': 'بلاگ',
  'is': 'ہے',
  'about': 'کے بارے میں',
  'and': 'اور',
  'this': 'یہ',
  'a': 'ایک',
  'summary': 'خلاصہ',
  'of': 'کا',
  'text': 'متن',
  // Apni zaroorat ke mutabiq aur words add karte jao
};

export function translateToUrdu(summary: string): string {
  return summary
    .split(' ')
    .map(word => dictionary[word.toLowerCase()] || word)
    .join(' ');
}
