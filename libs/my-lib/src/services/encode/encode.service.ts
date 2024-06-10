import { Injectable } from '@nestjs/common';

@Injectable()
export class EncodeService {
  static BASE62_CHARSET =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  toBase62(base10: string, digits?: number): string {
    let num = BigInt(base10);
    if (num === BigInt(0)) return '0'.padStart(digits ?? 0, '0');

    let result = '';
    while (num > 0) {
      const remainder = num % BigInt(62);
      result = EncodeService.BASE62_CHARSET[Number(remainder)] + result;
      num = num / BigInt(62);
    }

    return result.padStart(digits ?? 0, '0');
  }

  fromBase62(base62: string, digits?: number): string {
    let num = BigInt(0);
    for (const char of base62) {
      num =
        num * BigInt(62) + BigInt(EncodeService.BASE62_CHARSET.indexOf(char));
    }
    return num.toString().padStart(digits ?? 0, '0');
  }
}
