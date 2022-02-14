export function encodeBase64(text: string) {
  const buff = Buffer.from(text, 'utf-8');
  return buff.toString('base64');
}

export function decodeBase64(data: string) {
  const buff = Buffer.from(data, 'base64');
  return buff.toString('utf-8');
}
