import { v2 as cloudinary } from 'cloudinary';

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return false;
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
  return true;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get('url');
    const filename = searchParams.get('filename') || 'curriculo.pdf';
    if (!fileUrl) {
      return new Response('Missing url', { status: 400 });
    }
    // Permitir apenas Cloudinary para segurança básica
    const isCloudinary = /^https:\/\/res\.cloudinary\.com\//.test(fileUrl);
    if (!isCloudinary) {
      return new Response('Invalid host', { status: 400 });
    }

    // Tenta baixar direto
    let upstream = await fetch(fileUrl, { cache: 'no-store' });
    if (!upstream.ok && upstream.status === 401) {
      // Fallback: tentar gerar URL assinada para assets 'authenticated'
      if (configureCloudinary()) {
        const match = fileUrl.match(/\/raw\/upload\/(?:v\d+\/)?(.+)$/);
        const publicId = match?.[1];
        if (publicId) {
          const signedUrl = cloudinary.url(publicId, {
            resource_type: 'raw',
            type: 'authenticated',
            sign_url: true,
          });
          upstream = await fetch(signedUrl, { cache: 'no-store' });
        }
      }
    }
    if (!upstream.ok) {
      return new Response(`Upstream error: ${upstream.status}`, { status: 502 });
    }
    const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
    const buffer = await upstream.arrayBuffer();
    return new Response(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    return new Response('Internal error', { status: 500 });
  }
}