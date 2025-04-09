// src/components/ItemPopup.tsx
"use client"; // <-- MUST be the very first line

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter, // If needed
  DialogClose, // If needed
} from "~/components/ui/dialog"; // Use your import alias
import { Button } from "~/components/ui/button"; // Or your trigger element

// Define steps if using multi-step approach
type DialogStep = "selectItem" | "addItemForm";

export function ItemPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<DialogStep>("selectItem");

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Optional: Reset step when closing
      setTimeout(() => setStep("selectItem"), 150);
    }
  };

  return (
    // The Dialog component wraps everything
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* The Trigger is rendered where you place <ItemPopup /> */}
      <DialogTrigger asChild>
        <Button variant="outline">Change Item</Button>
      </DialogTrigger>

      {/* The Content is portalled to document.body */}
      <DialogContent className="sm:max-w-[425px]">
        {/* Conditional rendering based on step */}
        {step === "selectItem" && (
          <>
            <DialogHeader>
              <DialogTitle>Select Item</DialogTitle>
              <DialogDescription>
                Choose an item to display or add a new one.
              </DialogDescription>
            </DialogHeader>
            {/* Item list */}
            <p>List of items goes here...</p>
            <DialogFooter>
              <Button onClick={() => setStep("addItemForm")}>
                Add New Item
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "addItemForm" && (
          <>
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
              <DialogDescription>
                Enter the details for the new item.
              </DialogDescription>
            </DialogHeader>
            {/* Add item form */}
            <p>Add item form goes here...</p>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setStep("selectItem")}>
                Back
              </Button>
              <Button type="submit">Save Item</Button> {/* Add form handling */}
            </DialogFooter>
          </>
        )}
         {/* You might want a close button inside too */}
         {/* <DialogClose asChild>
           <Button type="button" variant="secondary">Close</Button>
         </DialogClose> */}
      </DialogContent>
    </Dialog>
  );
}