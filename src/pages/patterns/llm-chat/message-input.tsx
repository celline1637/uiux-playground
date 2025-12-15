import { useRef, useState, useCallback, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

const MAX_LENGTH = 1000;

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const [charCount, setCharCount] = useState(0);
  const [isComposing, setIsComposing] = useState(false);

  const getTextContent = useCallback(() => {
    return inputRef.current?.textContent || "";
  }, []);

  const handleInput = useCallback(() => {
    const text = getTextContent();
    setCharCount(text.length);
  }, [getTextContent]);

  const handleSend = useCallback(() => {
    const text = getTextContent().trim();
    if (text && text.length > 0 && !disabled) {
      onSend(text);
      if (inputRef.current) {
        inputRef.current.textContent = "";
        setCharCount(0);
      }
    }
  }, [getTextContent, onSend, disabled]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" && !e.shiftKey && !isComposing) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend, isComposing]
  );

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);

  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false);
  }, []);

  const isEmpty = charCount === 0;
  const canSend = !isEmpty && charCount <= MAX_LENGTH && !disabled;

  return (
    <div className="flex flex-col gap-2 border border-gray-300 dark:border-border rounded-3xl p-4 bg-primary-foreground dark:bg-background text-foreground shadow-sm">
      {/* 텍스트 입력창 */}
      <div className="relative w-full min-h-[28px]">
        {isEmpty && (
          <div className="absolute left-0 top-0 text-sm text-gray-400 dark:text-muted-foreground pointer-events-none">
            메시지를 입력하세요...
          </div>
        )}
        <div
          ref={inputRef}
          tabIndex={0}
          contentEditable
          role="textbox"
          aria-multiline="true"
          className={cn(
            "w-full outline-none text-sm text-gray-900 dark:text-foreground",
            "min-h-[28px] max-h-[200px] overflow-y-auto",
            "break-words whitespace-pre-wrap"
          )}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
      </div>

      {/* 버튼 영역 */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-1 text-gray-700 dark:text-foreground">
          {/* 추가 도구 영역 */}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-400 dark:text-muted-foreground text-right mt-1">
            {charCount}/{MAX_LENGTH}
          </div>
          <Button
            size="icon"
            disabled={!canSend}
            onClick={handleSend}
            className={cn(
              "w-8 h-8 bg-black rounded-full flex items-center justify-center hover:cursor-pointer dark:bg-foreground disabled:bg-disabled hover:bg-gray-500",
              canSend ? "text-white" : "text-black"
            )}
          >
            <ArrowUp className="w-4 h-4 dark:text-primary-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}

