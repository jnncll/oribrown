import React, { useState } from 'react';
import { ImagePlusIcon, Loader2Icon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { compressImage } from '../../utils/image';

interface PhotoUploaderProps {
  photos: string[];
  onChange: (photos: string[]) => void;
  max?: number;
}

export function PhotoUploader({ photos, onChange, max = 3 }: PhotoUploaderProps) {
  const [loading, setLoading] = useState(false);
  const remaining = max - photos.length;

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const picked = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (picked.length < files.length) toast.error('Hanya file gambar yang bisa diunggah.');
    if (picked.length > remaining) toast.message(`Maksimal ${max} foto, sisanya dilewati.`);
    setLoading(true);
    try {
      const results = await Promise.all(picked.slice(0, remaining).map((f) => compressImage(f)));
      onChange([...photos, ...results]);
    } catch {
      toast.error('Ada foto yang gagal diproses. Coba foto lain.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {photos.map((src, i) =>
        <div key={i} className="relative h-20 w-20 overflow-hidden rounded-2xl border-[3px] border-cocoa bg-white">
            <img src={src} alt={`Foto unggahan ${i + 1}`} className="h-full w-full object-cover" />
            <button
            type="button"
            onClick={() => onChange(photos.filter((_, idx) => idx !== i))}
            aria-label={`Hapus foto ${i + 1}`}
            className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full border-2 border-cocoa bg-vanilla">
            
              <XIcon className="h-3 w-3" strokeWidth={3} />
            </button>
          </div>
        )}
        {remaining > 0 &&
        <label className="grid h-20 w-20 cursor-pointer place-items-center rounded-2xl border-[3px] border-dashed border-cocoa/60 bg-white text-cocoa/70 transition-colors duration-150 hover:border-cocoa hover:bg-cream focus-within:ring-4 focus-within:ring-zest/30">
            {loading ? <Loader2Icon className="h-6 w-6 animate-spin" /> : <ImagePlusIcon className="h-6 w-6" />}
            <span className="sr-only">Tambah foto</span>
            <input
            type="file"
            accept="image/*"
            multiple
            disabled={loading}
            className="sr-only"
            onChange={(e) => {
              handleFiles(e.target.files);
              e.target.value = '';
            }} />
          
          </label>
        }
      </div>
      <p className="mt-2 text-xs font-semibold text-cocoa/60">Opsional · maks. {max} foto</p>
    </div>);

}