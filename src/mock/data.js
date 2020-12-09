import { nanoid } from 'nanoid';

// HEAD DATA
export const headData = {
  title: 'Yash Punia', // e.g: 'Name | Developer'
  lang: 'en', // e.g: en, es, fr, jp
  description: 'Welcome to my website', // e.g: Welcome to my website
};

// HERO DATA
export const heroData = {
  title: '',
  name: 'Yash Punia',
  subtitle: 'Game Developer | XR Developer',
  cta: '',
};

// ABOUT DATA
export const aboutData = {
  img: 'profile-pic.png',
  paragraphOne: 'I\'m a budding Video Game Developer and an XR Enthusiast',
  paragraphTwo: 'Studying Computer Science Engineering in NIT Hamirpur. An avid learner and passion for implementing current methadologies in new and improvised manner. I am a diligent person and a huge believer of teamwork.',
  paragraphThree: 'I have a lot of experience in XR Development including Augmented Reality and Virtual Reality. I also excel in Game Development, Web Development and Graphic Designing',
  resume: 'Resume.pdf', // if no resume, the button will not show up
};

// PROJECTS DATA
export const projectsData = [
  {
    id: nanoid(),
    img: 'ardraw.jpg',
    title: 'AR Draw',
    info: 'Augmented Reality Draw is an app to draw realtime 3D objects in the surroundings and convey ideas in the most efficint way possible. Developed using ARCore and Unity3D',
    info2: '',
    url: 'https://www.youtube.com/watch?v=Lp21WnJ3kwg',
    repo: 'https://github.com/Yash-Punia/AR-Draw', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'vrmaze1.png',
    title: 'VR Maze',
    info: 'Virtual Reality immerses the user in a very different experience. I developed a VR Maze app which has a horror atmosphere to give the player an amazing experience altogether ',
    info2: '',
    url: '',
    repo: '', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'iris.png',
    title: 'Project IRIS',
    info: 'A smart AR Assistant which responds to our voice. We can search anything we like and it shows results in AR.',
    info2: 'Integrated with Poly API (by Google) which can augment any 3D object that we speak',
    url: '',
    repo: '', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'dbms-ss.png',
    title: 'Hospital DBMS',
    info: 'A Database Management System project developed in WinForm and SQL (in C#)',
    info2: 'Add patients, staff and rooms as per your need in the windows application',
    url: '',
    repo: '', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'pandemonium.png',
    title: 'Pandemonium',
    info: 'A 3D game developed in Unity3D for GameDev Competition Game of Codes conducted by CodeCops IIIT Una',
    info2: 'Based on controlling population as there is a spread of a virus. Game features which spread awareness about minimizing the COVID spread.',
    url: '',
    repo: 'https://github.com/Yash-Punia/game-of-codes/', // if no repo, the button will not show up
  },
];

// CONTACT DATA
export const contactData = {
  cta: 'Wanna make something together?',
  btn: 'Let\'s Discuss',
  email: 'puniayash@gmail.com',
};

// FOOTER DATA
export const footerData = {
  networks: [
    {
      id: nanoid(),
      name: 'twitter',
      url: 'https://twitter.com/zeldariomon',
    },
    {
      id: nanoid(),
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/yash-punia/',
    },
    {
      id: nanoid(),
      name: 'github',
      url: 'https://github.com/Yash-Punia',
    },
  ],
};

// Github start/fork buttons
export const githubButtons = {
  isEnabled: false, // set to false to disable the GitHub stars/fork buttons
};
