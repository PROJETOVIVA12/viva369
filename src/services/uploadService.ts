import { supabase } from '@/lib/supabase';

export interface UploadOptions {
  bucket: string;
  folder: string;
  fileName?: string;
  file: File;
  userId: string;
}

export async function uploadImage({
  bucket,
  folder,
  fileName,
  file,
  userId
}: UploadOptions): Promise<{ url: string | null; error: Error | null }> {
  try {
    // Validar arquivo
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { url: null, error: new Error('Arquivo deve ter no máximo 5MB') };
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return { url: null, error: new Error('Formato inválido. Use JPG, PNG, WEBP ou GIF') };
    }

    // Gerar nome único
    const ext = file.name.split('.').pop();
    const uniqueName = fileName 
      ? `${fileName}-${Date.now()}.${ext}`
      : `${folder}-${userId}-${Date.now()}.${ext}`;
    
    const filePath = `${folder}/${userId}/${uniqueName}`;

    // Fazer upload
    const { data, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error('Erro no upload:', uploadError);
      return { url: null, error: uploadError };
    }

    // Obter URL pública
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return { url: urlData.publicUrl, error: null };
  } catch (error) {
    console.error('Erro no serviço de upload:', error);
    return { url: null, error: error as Error };
  }
}

export async function deleteImage(bucket: string, filePath: string): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('Erro ao deletar imagem:', error);
      return { error };
    }

    return { error: null };
  } catch (error) {
    console.error('Erro ao deletar imagem:', error);
    return { error: error as Error };
  }
}

export function extractFilePathFromUrl(url: string): string | null {
  try {
    const parts = url.split('/storage/v1/object/public/');
    if (parts.length > 1) {
      const pathParts = parts[1].split('/');
      pathParts.shift();
      return pathParts.join('/');
    }
    return null;
  } catch {
    return null;
  }
}
