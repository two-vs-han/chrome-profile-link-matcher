interface ElectronAPI {
  openLink: (url: string) => void;
  saveProfileLinks: (links: ProfileLink[]) => void;
}

interface ProfileLink {
  profile: string;
  link: string;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export {};
