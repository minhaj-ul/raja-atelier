import { useState } from "react";
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

export default function CartPanel({
  cart,
  isMobile,
  onClose,
  onUpdateQty,
  onRemove,
}) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  // Track which item is pending deletion
  const [pendingDelete, setPendingDelete] = useState(null);

  const handleDeleteConfirm = () => {
    onRemove(pendingDelete.id);
    setPendingDelete(null);
  };

  const navigate = useNavigate();

  return (
    <>
      <Sheet open onOpenChange={onClose}>
        x
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className={`
            flex flex-col p-0 bg-stone-50 border-stone-300
            ${isMobile ? "h-[88vh] rounded-t-2xl" : "w-full max-w-md"}
          `}
        >
          {/* Header */}
          <SheetHeader className="px-5 md:px-7 pt-5 pb-4 border-b border-stone-300 shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="font-display font-normal text-2xl text-stone-950">
                  Your Bag
                </SheetTitle>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
          </SheetHeader>

          {/* Items */}
          <ScrollArea className="flex-1">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 gap-3 text-stone-500">
                <ShoppingBag size={38} strokeWidth={1} />
                <p className="font-display text-lg italic">Your bag is empty</p>
                <p className="text-xs tracking-wide">
                  Discover something beautiful
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id}>
                  <div className="flex gap-3 px-5 md:px-7 py-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 md:w-18 md:h-24 object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] tracking-[0.15em] text-amber-600 uppercase mb-1">
                        {item.category}
                      </p>
                      <p className="font-display text-base font-normal leading-snug">
                        {item.name}
                      </p>
                      <p className="text-lg font-medium mt-1">৳{item.price}</p>
                      <div className="flex items-center gap-2.5 mt-2.5">
                        {/* Qty control */}
                        <div className="flex items-center border border-stone-300">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-8 rounded-none hover:bg-stone-200"
                            onClick={() => onUpdateQty(item.id, item.qty - 1)}
                          >
                            <Minus size={13} />
                          </Button>
                          <span className="text-sm px-1.5 min-w-6 text-center">
                            {item.qty}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-8 rounded-none hover:bg-stone-200"
                            onClick={() => onUpdateQty(item.id, item.qty + 1)}
                          >
                            <Plus size={13} />
                          </Button>
                        </div>

                        {/* Delete button — opens confirmation */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-none hover:bg-red-50 hover:text-red-500 text-stone-500 transition-colors"
                          onClick={() => setPendingDelete(item)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Separator className="bg-stone-200" />
                </div>
              ))
            )}
          </ScrollArea>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="px-5 md:px-7 py-5 border-t border-stone-300 shrink-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] tracking-widest uppercase text-stone-500">
                  Subtotal
                </span>
                <span className="text-xl font-medium">৳{total.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-stone-500 mb-4">
                Shipping & taxes at checkout
              </p>
              <Button
                className="w-full rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs py-5 gap-2"
                onClick={() => {
                  onClose();
                  navigate("/checkout");
                }}
              >
                Checkout
                <ArrowRight size={14} />
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete confirmation modal */}
      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      >
        <AlertDialogContent className="rounded-none bg-stone-50 border-stone-300 max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display font-normal text-2xl text-stone-950">
              Remove item?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-stone-500 font-light">
              Are you sure you want to remove{" "}
              <span className="text-stone-950 font-normal">
                {pendingDelete?.name}
              </span>{" "}
              from your bag?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="rounded-none border-stone-300 text-stone-950 hover:bg-stone-200 text-xs uppercase tracking-widest">
              Keep it
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-none bg-red-600 hover:bg-red-700 text-stone-50 text-xs uppercase tracking-widest"
              onClick={handleDeleteConfirm}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
