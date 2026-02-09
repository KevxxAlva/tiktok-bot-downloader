export interface DownloadOption {
    type: 'hd' | 'normal' | 'music' | 'watermark';
    label: string;
    url: string;
    size?: number | string;
  }
  
  export interface DownloadResult {
    result: {
      downloads: DownloadOption[];
      video: string[];
      images?: string[];
      music: string;
      cover: string;
      desc: string;
      author: {
        nickname: string;
        avatar: string;
      }
    }
  }
  
