export type Video = {
  id: string;
  title: string;
  description: string;
  uri: string;
  group: string;
  uploader: string;
  thumbnail?: string;
};

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  VideoDetail: { video: Video };
};

export type TabParamList = {
  Home: undefined;
  Upload: undefined;
  Profile: undefined;
};

export type VideoContextType = {
  videos: Video[];
  addVideo: (video: Video) => void;
};