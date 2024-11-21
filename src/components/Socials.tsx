import { RedirectButton } from "@ryanliu6/xi";


const Socials = () => {
  return (
    <>
      <RedirectButton
        href="https://www.linkedin.com/in/ryanliu6/"
        title="View my LinkedIn Profile"
      >
        <img height="24" width="24" alt="LinkedIn Icon" src="https://cdn.simpleicons.org/linkedin/475569" className="flex dark:hidden" />
        <img height="24" width="24" alt="LinkedIn Icon" src="https://cdn.simpleicons.org/linkedin/d4d4d8" className="hidden dark:flex" />
      </RedirectButton>

      <RedirectButton
        href="https://www.github.com/ryanliu6"
        title="View my GitHub Profile"
      >
        <img height="24" width="24" alt="GitHub Icon" src="https://cdn.simpleicons.org/github/475569" className="flex dark:hidden" />
        <img height="24" width="24" alt="GitHub Icon" src="https://cdn.simpleicons.org/github/d4d4d8" className="hidden dark:flex" />
      </RedirectButton>

      <RedirectButton
        href="mailto:ryan@ryanliu6.xyz"
        title="Email me!"
      >
        <img height="24" width="24" alt="Mail Icon" src="https://cdn.simpleicons.org/protonmail/475569" className="flex dark:hidden" />
        <img height="24" width="24" alt="Mail Icon" src="https://cdn.simpleicons.org/protonmail/d4d4d8" className="hidden dark:flex" />
      </RedirectButton>
    </>
  )
}

export default Socials;
