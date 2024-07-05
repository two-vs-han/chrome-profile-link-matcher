// src/app/page.tsx
"use client";

import { useState } from "react";

interface ProfileLink {
  profile: string;
  link: string;
}

// declare global {
//   interface Window {
//     electron: {
//       openLink: (url: string) => void;
//       saveProfileLinks: (links: ProfileLink[]) => void;
//     };
//   }
// }

export default function Home() {
  const [profile, setProfile] = useState("");
  const [link, setLink] = useState("");
  const [profileLinks, setProfileLinks] = useState<ProfileLink[]>([]);

  const addProfileLink = () => {
    const newProfileLink = { profile, link };
    const updatedLinks = [...profileLinks, newProfileLink];
    setProfileLinks(updatedLinks);
    setProfile("");
    setLink("");
    window.electron.saveProfileLinks(updatedLinks);
  };

  const openLink = (url: string) => {
    window.electron.openLink(url);
  };

  return (
    <div>
      <h1>Profile Link Opener</h1>
      <div>
        <input
          type="text"
          placeholder="Profile"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        />
        <input
          type="text"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button onClick={addProfileLink}>Add Profile Link</button>
      </div>
      <ul>
        {profileLinks.map((pl, index) => (
          <li key={index}>
            <button onClick={() => openLink(pl.link)}>
              {pl.link} with {pl.profile}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
