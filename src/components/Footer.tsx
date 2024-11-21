import classNames from "classnames";

import Socials from "@/components/Socials";
import { marginalBorder } from "@ryanliu6/xi/styles";

const Footer = () => {
  const currYear = new Date().getFullYear();
  const footerClass = classNames(marginalBorder, "flex flex-col items-center justify-center")

  return (
    <footer className={footerClass}>
      <section className="flex flex-row gap-6">
        <Socials />
      </section>
      <section>
        <p className="text-sm">
          &copy; {currYear} Ryan Liu.
        </p>
      </section>
    </footer>
  )
}

export default Footer;
