import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import vpl_logo from "@/assets/vpl_logo.png";
import vpl_logo_ext from "@/assets/vpl_logo_ext.png";

export const AppLogo = ({
  onNavigate,
  ext = false,
}: {
  ext?: boolean;
  onNavigate?: () => void;
}) => {
  return (
    <NavLink
      to="/"
      end
      className={cn(
        "flex gap-4 items-center justify-between",
        ext ? "max-w-[14ch]" : "w-full",
      )}
      onClick={onNavigate}
    >
      <img
        src={ext ? vpl_logo_ext : vpl_logo}
        alt="App Logo"
        className="object-contain w-20 h-20"
      />

      {!ext && (
        <h1 className="max-w-[12ch] text-xl leading-tight text-sidebar-foreground uppercase font-bold">
          Vault Practice Lab
        </h1>
      )}
    </NavLink>
  );
};
