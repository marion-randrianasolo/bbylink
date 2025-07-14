import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface AvatarPickerDialogProps {
  open: boolean;
  onClose: () => void;
  currentAvatar: string;
  onAvatarSelected: (avatarUrl: string) => void;
}

function generateAvatarOptions(baseSeed: string) {
  const seeds = [
    baseSeed,
    baseSeed + "1",
    baseSeed + "2",
    baseSeed + "3",
    baseSeed + "4",
    baseSeed + "5",
    `avatar${Math.random()}`,
    `player${Date.now()}`,
    `bigsmile${baseSeed}`,
    `champion${baseSeed}`,
    `foosball${baseSeed}`,
    `epsi${baseSeed}`,
  ];
  return seeds.map(
    (seed) =>
      `https://api.dicebear.com/9.x/big-smile/svg?seed=${encodeURIComponent(
        seed
      )}&backgroundColor=transparent`
  );
}

export const AvatarPickerDialog: React.FC<AvatarPickerDialogProps> = ({
  open,
  onClose,
  currentAvatar,
  onAvatarSelected,
}) => {
  // Déduire le seed de base à partir de l’avatar actuel ou fallback
  const baseSeed = "bbylink";
  const avatarOptions = generateAvatarOptions(baseSeed);
  const initialIndex = Math.max(
    0,
    avatarOptions.findIndex((url) => url === currentAvatar)
  );
  const [avatarIndex, setAvatarIndex] = useState(initialIndex);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePrev = () => {
    setAvatarIndex((i) => (i - 1 + avatarOptions.length) % avatarOptions.length);
  };
  const handleNext = () => {
    setAvatarIndex((i) => (i + 1) % avatarOptions.length);
  };
  const handleValidate = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await onAvatarSelected(avatarOptions[avatarIndex]);
      onClose();
    } catch (e: any) {
      setError(e.message || "Erreur lors de la modification de l’avatar");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choisir un nouvel avatar</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center space-x-4 my-4">
          <Button type="button" variant="ghost" size="sm" onClick={handlePrev}>
            <ChevronLeft className="h-6 w-6 text-[#EA1846]" />
          </Button>
          <div className="flex-1 max-w-32 aspect-square flex items-center justify-center border-2 rounded-lg border-[#EA1846] bg-[#EA1846]/5">
            <img
              src={avatarOptions[avatarIndex]}
              alt="Avatar sélectionné"
              className="w-24 h-24"
            />
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={handleNext}>
            <ChevronRight className="h-6 w-6 text-[#EA1846]" />
          </Button>
        </div>
        {error && <div className="text-red-500 text-sm text-center mb-2">{error}</div>}
        <DialogFooter>
          <Button
            type="button"
            className="w-full bg-[#EA1846] text-white font-bold"
            onClick={handleValidate}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Modification..." : "Valider"}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full">Annuler</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 