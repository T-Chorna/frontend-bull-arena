// Вказуємо шляхи до аудіофайлів для кожного виду оплесків
const applauseSounds = [
  "src/assets/sounds/aspose_00.mp3", 
  "src/assets/sounds/aspose_01.mp3",  
  "src/assets/sounds/aspose_02.mp3",  
  "src/assets/sounds/aspose_03.mp3",  
];

// Функція для відтворення звуку
export const playApplauseSound = (applauseValue: number) => {
  const audio = new Audio(applauseSounds[applauseValue]);
  audio.play();
};