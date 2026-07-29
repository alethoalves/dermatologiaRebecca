// Stub — implementar quando o destino de deploy for definido (ex.: @vercel/blob ou um cliente
// compatível com S3/R2). Deve expor o mesmo contrato de local.js: uploadImage/deleteImage
// retornando/recebendo { url, key }, para que a troca de driver não exija mudanças nos call sites.

export async function uploadImage() {
  throw new Error('Driver de storage "blob" ainda não implementado. Defina o destino de deploy e implemente este driver.');
}

export async function deleteImage() {
  throw new Error('Driver de storage "blob" ainda não implementado. Defina o destino de deploy e implemente este driver.');
}
