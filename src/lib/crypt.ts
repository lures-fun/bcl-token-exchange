export const encryptText = async (text: string): Promise<string> => {
  const publicKey = await importPublicKey();
  const encryptedText = await encrypt(text, publicKey);
  return encryptedText;
};

const encrypt: (text: string, publicKey: CryptoKey) => Promise<string> = async (
  text,
  publicKey
) => {
  const encoded = new TextEncoder().encode(text);
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    publicKey,
    encoded
  );
  const str = String.fromCharCode.apply(
    null,
    new Uint8Array(encryptedBuffer) as unknown as number[]
  );
  return window.btoa(str);
};

const importPublicKey = async (): Promise<CryptoKey> => {
  const publicKeyPem = Buffer.from(process.env.NEXT_PUBLIC_KEY || '', 'base64').toString();
  const pemContents = publicKeyPem
    .replace('-----BEGIN PUBLIC KEY-----', '')
    .replace('-----END PUBLIC KEY-----', '')
    .replace(/\s/g, ''); // 改行を削除
  const publicKeyData = atob(pemContents);
  // Uint8Arrayに変換
  const publicKeyArray = new Uint8Array(publicKeyData.length);
  for (let i = 0; i < publicKeyData.length; i++) {
    publicKeyArray[i] = publicKeyData.charCodeAt(i);
  }
  try {
    const publicKey = await window.crypto.subtle.importKey(
      'spki',
      publicKeyArray,
      {
        name: 'RSA-OAEP',
        hash: { name: 'SHA-256' },
      },
      true,
      ['encrypt']
    );
    return publicKey;
  } catch (error) {
    console.error('import error:', error);
    throw error;
  }
};
