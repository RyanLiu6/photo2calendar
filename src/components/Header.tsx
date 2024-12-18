import classNames from 'classnames';

import { ThemeIcon } from '@ryanliu6/xi';
import { marginalBorder, textStyle } from '@ryanliu6/xi/styles';

const Header = () => {
  const headerClass = classNames(
    marginalBorder,
    'flex flex-row w-full relative justify-between items-center'
  );

  return (
    <header className={headerClass}>
      <a
        href="/"
        className={`${textStyle} flex items-center gap-2 hover:text-violet-500 transition-colors`}
      >
        <img src="/favicon.svg" alt="Photo2Calendar" className="w-8 h-8" />
      </a>
      <ThemeIcon />
    </header>
  );
};

export default Header;
