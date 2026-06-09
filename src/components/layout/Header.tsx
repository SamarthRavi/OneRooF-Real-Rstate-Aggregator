import React from "react";
import { Link } from "react-router-dom";
import { Search, Map, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {
    user,
    signOut,
    loading
  } = useAuth();
  return <header className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="font-bold text-2xl text-primary">
            One<span className="text-accent">RooF</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/properties" className="text-sm font-medium transition-colors hover:text-primary">
            Properties
          </Link>
          <Link to="/map" className="text-sm font-medium transition-colors hover:text-primary">
            <div className="flex items-center gap-1">
              <Map className="w-4 h-4" />
              <span>Map View</span>
            </div>
          </Link>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {user ? <>
              <div className="text-sm font-medium">
                Hello, {user.user_metadata.full_name || user.email}
              </div>
              <Button variant="outline" size="sm" onClick={() => signOut()} disabled={loading}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </> : <>
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </>}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem asChild>
                <Link to="/" className="w-full">
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/properties" className="w-full">
                  Properties
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/map" className="w-full">
                  Map View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {user ? <>
                  <DropdownMenuItem className="font-medium">
                    {user.user_metadata.full_name || user.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} disabled={loading}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </> : <>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="w-full">
                      Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/register" className="w-full">
                      Sign Up
                    </Link>
                  </DropdownMenuItem>
                </>}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>;
};
export default Header;