import Link from "next/link";

import { ExternalLink } from "../components/ExternalLink";

export default function About() {
  return (
    <div>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1>
        <div className="mb-8 prose dark:prose-dark leading-6">
          <h2>Links</h2>
          <ul>
            <li>
              Twitter:{" "}
              <ExternalLink href="https://twitter.com/me_manikanta">
                @me_manikanta
              </ExternalLink>
            </li>
            <li>
              GitHub:{" "}
              <ExternalLink href="https://github.com/me-manikanta">
                @me-manikanta
              </ExternalLink>
            </li>
            <li>
              Website:{" "}
              <ExternalLink href="https://me-manikanta.github.io">
                https://me-manikanta.github.io
              </ExternalLink>
            </li>
            <li>
              LinkedIn:{" "}
              <ExternalLink href="https://www.linkedin.com/in/manikantainugurthi/">
                https://www.linkedin.com/in/manikantainugurthi
              </ExternalLink>
            </li>
          </ul>
          <h2>Bio</h2>
          <h3>Job Title</h3>
          <p>
            Manikanta Inugurthi, Software Engineer II at{" "}
            <Link href="https://www.microsoft.com/">Microsoft</Link>.
          </p>
          <h3>Education</h3>
          <p>
            Graduated from Birla Institute of Technology, Mesra with a B.E. in
            Information Technology.
          </p>
          <h3>Short Description</h3>
          <p>
            Hey I am Mani. I work as a Software Engineer at{" "}
            <Link href="https://www.microsoft.com/">Microsoft</Link>, where I
            and my team help in building translation models.
          </p>
        </div>
      </div>
    </div>
  );
}
