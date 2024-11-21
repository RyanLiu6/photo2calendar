import classNames from "classnames";

import { ThemeIcon } from "@ryanliu6/xi";
import { marginalBorder } from "@ryanliu6/xi/styles";

const Header = () => {
  const headerClass = classNames(marginalBorder, "flex flex-row-reverse w-full relative justify-between")

  return (
    <header className={headerClass}>
      <ThemeIcon />
    </header>
  )
}

export default Header;
