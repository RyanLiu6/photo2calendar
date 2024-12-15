import classNames from "classnames";
import { textStyle } from "@ryanliu6/xi/styles";

const DataPrivacyNotice = () => {
  return (
    <div className={classNames(
      "p-4 rounded-lg text-center",
      "bg-slate-50 dark:bg-slate-800",
      "border border-slate-200 dark:border-slate-700"
    )}>
      <h3 className={`${textStyle} font-semibold mb-2`}>Data Protection - Your privacy matters!</h3>
      <p className={`${textStyle} text-sm text-slate-500 dark:text-slate-400`}>
        We use OCR.space for text extraction, and the processed schedule is stored securely on our server.
        <br />
        <br />
        For your convenience, it's available for 1 hour, then automatically deleted from our system.
        <br />
        <br />
        No data is sent or kept on any server past that point. If you wish to keep your schedule, please download the generated file.
      </p>
    </div>
  );
};

export default DataPrivacyNotice;
