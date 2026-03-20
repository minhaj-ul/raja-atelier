import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ConfirmDialog({
  open,
  onOpenChange,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
}) {
  const confirmStyles = {
    danger:
      "rounded-none bg-red-600 hover:bg-red-700 text-stone-50 text-xs uppercase tracking-widest",
    warning:
      "rounded-none bg-amber-600 hover:bg-amber-700 text-stone-50 text-xs uppercase tracking-widest",
    default:
      "rounded-none bg-stone-950 hover:bg-stone-800 text-stone-50 text-xs uppercase tracking-widest",
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-none bg-stone-50 border-stone-300 max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display font-normal text-2xl text-stone-950">
            {title}
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription className="text-sm text-stone-500 font-light">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="rounded-none border-stone-300 text-stone-950 hover:bg-stone-200 text-xs uppercase tracking-widest">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            className={confirmStyles[variant] || confirmStyles.danger}
            onClick={onConfirm}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
