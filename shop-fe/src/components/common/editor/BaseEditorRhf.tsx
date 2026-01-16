import { useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import BaseModal from "../modal/BaseModal";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import BaseInput from "../input/BaseInput";
import BaseGroupButton from "../button/BaseGroupButton";

export interface BaseEditorRhfProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  label?: string;
}

export default function BaseEditorRhf<T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
}: BaseEditorRhfProps<T>) {
  const editor = useRef(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string>("");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typings...",
      appendTo: document.body,
      popup: { zIndex: 99999 },
      toolbarAdaptive: false,
      toolbarSticky: false,
      height: 400,
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "|",
        "align",
        "|",
        "link",
        "image",
        "|",
        "undo",
        "redo",
      ],
      buttonsXS: ["bold", "italic", "ul", "ol", "link", "image"],
    }),
    [placeholder]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="w-full">
          <BaseInput
            label={label}
            readOnly
            value={field.value || ""}
            placeholder={placeholder}
            onClick={() => {
              setDraft(field.value || ""); // 🔥 clone dữ liệu
              setOpen(true);
            }}
          />

          <BaseModal
            title="Editor"
            width="3xl"
            open={open}
            onClose={() => setOpen(false)}
          >
            <JoditEditor
              ref={editor}
              value={draft}
              config={config}
              onChange={(value) => setDraft(value)}
            />

            <BaseGroupButton
              submitText="Save"
              onSubmit={() => {
                field.onChange(draft); // ✅ commit
                setOpen(false);
              }}
              onCancel={() => {
                setDraft(""); // ❌ discard
                setOpen(false);
              }}
            />
          </BaseModal>

          {fieldState.error && (
            <p className="text-sm text-red-500 mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
