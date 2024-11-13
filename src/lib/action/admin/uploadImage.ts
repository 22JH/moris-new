import { createClient } from '../../utils/supabase/client';

export async function uploadImage(image: File) {
  const supabase = await createClient();
  const storage = supabase.storage;
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET!;
  const endpoint = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_ENDPOINT!;
  const { data, error } = await storage
    .from(bucket)
    .upload(image.name + Date.now().toString(), image);
  if (error)
    throw new Error(`이미지 업로드에 실패하였습니다. ${JSON.stringify(error)}`);
  return endpoint + '/storage/v1/object/public/' + data.fullPath;
}
