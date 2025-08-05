import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface EducationalPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EducationalPopup = ({ isOpen, onClose }: EducationalPopupProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-gradient-to-br from-white to-blue-50 border-green-700 border-2">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-green-800 text-center">
            <span className="text-3xl block mb-2">💨☀️💧</span>
            What is Photosynthesis?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-green-800 text-left pt-4">
            Photosynthesis is how plants make their own food. They use sunlight, water, and carbon dioxide from the air. With the help of their green leaves, they turn these into sugary food for energy and release oxygen, which we need to breathe. It's like plants cooking their own meal using sunlight as their stove!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose} className="w-full bg-green-600 hover:bg-green-700">
            Got it!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};