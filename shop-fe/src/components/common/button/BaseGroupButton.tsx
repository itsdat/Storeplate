export default function BaseGroupButton({
  onCancel,
  cancelText = "Cancel",
  submitText = "Submit",
  onSubmit,
}: {
  cancelText?: string;
  submitText?: string;
  onCancel: () => void;
  onSubmit?: () => void;
}) {
  return (
    <div className="mt-10 w-full flex items-center justify-end">
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={onCancel}
          type="button"
          className="w-fit px-3 py-1.5 bg-(--color-hover) text-sm rounded-sm cursor-pointer"
        >
          {cancelText}
        </button>
        <button
          onClick={onSubmit ?? undefined}
          type="submit"
          className="w-fit px-3 py-1.5 bg-(--color-btn) text-(--color-text-btn) text-sm rounded-sm cursor-pointer"
        >
          {submitText}
        </button>
      </div>
    </div>
  );
}
