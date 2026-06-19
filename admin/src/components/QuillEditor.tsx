import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasError?: boolean;
}

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['blockquote', 'code-block'],
  ['link'],
  ['clean'],
];

export default function QuillEditor({ value, onChange, placeholder, hasError }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any leftover DOM from a previous mount (Strict Mode)
    container.innerHTML = '';

    const quill = new Quill(container, {
      theme: 'snow',
      placeholder: placeholder ?? 'Write your blog content here...',
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    if (value) quill.root.innerHTML = value;

    quill.on('text-change', () => {
      onChangeRef.current(quill.root.innerHTML);
    });

    quillRef.current = quill;

    return () => {
      quill.off('text-change');
      quillRef.current = null;
      container.innerHTML = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`rounded-xl overflow-hidden border ${hasError ? 'border-red-400' : 'border-slate-200'}`}>
      <div ref={containerRef} />
    </div>
  );
}
