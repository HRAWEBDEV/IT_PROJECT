const persianNumbers = [
 /۰/g,
 /۱/g,
 /۲/g,
 /۳/g,
 /۴/g,
 /۵/g,
 /۶/g,
 /۷/g,
 /۸/g,
 /۹/g,
];
const arabicNumbers = [
 /٠/g,
 /١/g,
 /٢/g,
 /٣/g,
 /٤/g,
 /٥/g,
 /٦/g,
 /٧/g,
 /٨/g,
 /٩/g,
];

export function numberReplacer(str: string) {
 if (typeof str === 'string') {
  for (let i = 0; i < 10; i++) {
   str = str
    .replace(persianNumbers[i], i.toString())
    .replace(arabicNumbers[i], i.toString());
  }
 }
 return str;
}
