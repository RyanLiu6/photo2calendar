import { type ReactNode } from "react";
import classNames from "classnames";
import { textStyle } from "@ryanliu6/xi/styles";
import { Button } from "@/components/Button";
import DataPrivacyNotice from "./DataPrivacyNotice";

interface ImagePreviewProps {
  imageUrl: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const ImagePreview = ({ imageUrl, onCancel, onConfirm, isLoading }: ImagePreviewProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Image Preview */}
      <div className="flex flex-col gap-4">
        <img
          src={imageUrl}
          alt="Schedule Preview"
          className={classNames(
            "max-h-96 object-contain rounded-lg",
            "bg-white dark:bg-slate-700",
            "shadow-md"
          )}
        />
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Confirm"}
          </Button>
        </div>
      </div>

      <DataPrivacyNotice />
    </div>
  );
};

export default ImagePreview;
