import githubCard from "./projects/github-card-generator.png";
import movieRecommendation from "./projects/movie-recommendation-system.png";
import blogWritingAgent from "./projects/blogWritingAgent.png";

import profilePhoto from "./profile/profile.png";
import aboutImage from "./profile/about.png";

export const images = {
  profile: {
    photo: profilePhoto,
    about: aboutImage,
  },

  projects: {
    githubCard,
    movieRecommendation,
    blogWritingAgent,
  },
} as const;