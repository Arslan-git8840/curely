
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });


export function ConsultantForm() {
  return (
    <form className={`space-y-4 ${poppins.className}`}>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Dr. Maya Rao" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="specialty">Specialty</Label>
        <Input id="specialty" name="specialty" placeholder="Cardiologist" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input id="description" name="description" placeholder="Short bio" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="avatar">Avatar URL</Label>
        <Input id="avatar" name="avatar" placeholder="/path-to-image.jpg" />
      </div>

      <Button type="submit" className="w-full bg-[#019c6f] text-white hover:bg-[#017a59]">
        Create Consultant
      </Button>
    </form>
  );
}
