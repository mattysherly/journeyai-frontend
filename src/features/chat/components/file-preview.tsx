import {
  X,
  FileText,
  File,
  FileCode2,
  FileJson,
  FileTerminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

import CircularProgress from "./circular-progress";

interface FileThumbnailProps {
  file: File;
  onClose?: () => void;
  onClick?: () => void;
  className?: string;
  isUploading?: boolean;
  uploadProgress?: number;
}

const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  // if (fileType.startsWith("image/")) {
  //   return <ImageIcon size={24} />;
  // }

  // if (fileType.startsWith("audio/")) {
  //   return <Music size={24} />;
  // }

  // if (fileType.startsWith("video/")) {
  //   return <Video size={24} />;
  // }

  switch (extension) {
    case "pdf":
      return <FileText size={24} />;
    case "txt":
    case "tex":
    case "doc":
    case "docx":
    case "md":
      return <FileText size={24} />;
    case "js":
    case "ts":
    case "html":
    case "css":
    case "c":
    case "cpp":
    case "cs":
    case "java":
    case "php":
    case "py":
    case "rb":
      return <FileCode2 size={24} />;
    case "sh":
      return <FileTerminal size={24} />;
    case "json":
      return <FileJson size={24} />;
    default:
      return <File size={24} />;
  }
};

const getFileTypeLabel = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toUpperCase();
  return extension || "FILE";
};

const getIconColor = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "pdf":
    case "txt":
    case "tex":
    case "doc":
    case "docx":
    case "md":
      return "bg-red-500";
    case "js":
    case "ts":
    case "html":
    case "css":
    case "c":
    case "cpp":
    case "cs":
    case "java":
    case "php":
    case "py":
    case "rb":
      return "bg-blue-500";
    case "sh":
      return "bg-purple-500";
    case "json":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

export const FilePreview = ({
  file,
  onClose,
  onClick,
  className,
  isUploading = false,
  uploadProgress = 0,
}: FileThumbnailProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div
      className={cn(
        "relative flex items-center border gap-3 bg-transparent rounded-xl p-2 pr-10 cursor-pointer transition-colors duration-200 min-w-0",
        className
      )}
      onClick={onClick}
    >
      {/* File Icon */}
      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-lg text-white",
          getIconColor(file.name)
        )}
      >
        {isUploading ? (
          <div className="flex items-center justify-center rounded-lg">
            <CircularProgress
              progress={uploadProgress}
              size={32}
              strokeWidth={2}
            />
          </div>
        ) : (
          getFileIcon(file.name)
        )}

        {/* Uploading overlay on icon */}
        {/* {isUploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <CircularProgress
              progress={uploadProgress}
              size={32}
              strokeWidth={2}
            />
          </div>
        )} */}
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{file.name}</p>
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <span>{getFileTypeLabel(file.name)}</span>
          <span>•</span>
          <span>{formatFileSize(file.size)}</span>
        </div>
      </div>

      {/* Close Button */}
      {onClose && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          size="icon"
          // className="w-5 h-5 absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          className="w-5 h-5 absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-all duration-200"
          aria-label="Remove image"
        >
          <X size={14} />
        </Button>
      )}
    </div>
  );
};
