import { NavLink } from "react-router-dom";
import logo from "@/assets/vtl_logo.png";
import logoExt from "@/assets/vtl_logo_ext.png";
import { cn } from "@/lib/utils";

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
        src={ext ? logoExt : logo}
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
