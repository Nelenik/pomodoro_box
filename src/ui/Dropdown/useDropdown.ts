import { useState, useRef, useCallback, useEffect } from "react";

export const useDropdown = (isActiveDropdown: boolean) => {
  const [isOpen, setIsOpen] = useState(false);
  const nextIndex = useRef(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleTriggerClick = () => {
    isOpen ? closeMenu() : setIsOpen(true);
  };

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    nextIndex.current = -1;
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isOpen && !isActiveDropdown) {
      closeMenu();
    }
  }, [isActiveDropdown, closeMenu, isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (
        // !menuRef.current?.contains(e.target as Node) &&
        // !triggerRef.current?.contains(e.target as Node) &&
        isOpen &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeMenu]);

  useEffect(() => {
    const dropdownEl = dropdownRef.current;
    const keys = {
      DOWN: "ArrowDown",
      UP: "ArrowUp",
      TAB: "Tab",
      ESC: "Escape",
    };
    const handleFocus = (e: KeyboardEvent) => {
      const listItems = menuRef.current?.querySelectorAll(
        ".Dropdown__MenuItem"
      ) as unknown as HTMLElement[];
      if (!listItems || !listItems.length) return;

      if (isOpen) {
        switch (true) {
          case e.key === keys.TAB: {
            e.preventDefault();
            closeMenu();
            break;
          }
          case e.key === keys.ESC: {
            closeMenu();
            break;
          }
          case e.key === keys.DOWN: {
            e.preventDefault();
            nextIndex.current = (nextIndex.current + 1) % listItems.length;
            listItems[nextIndex.current].focus();
            break;
          }
          case e.key === keys.UP: {
            e.preventDefault();
            nextIndex.current =
              (nextIndex.current - 1 + listItems.length) % listItems.length;
            listItems[nextIndex.current].focus();
            break;
          }
        }
      }
    };
    dropdownEl?.addEventListener("keydown", handleFocus);

    return () => {
      dropdownEl?.removeEventListener("keydown", handleFocus);
    };
  }, [nextIndex, isOpen, closeMenu]);

  return {
    isOpen,
    triggerRef,
    dropdownRef,
    menuRef,
    handleTriggerClick,
    closeMenu,
  };
};
