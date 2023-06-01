import {getRandomInteger} from './utils.js';
import {DESCRIPTIONS, MESSAGES, NAMES} from './data.js';

let id = 1;
let commentId = 1;

const getRandomComment = () => {
  const result = {
    id: commentId,
    avatar: `img/avatar-${commentId}.svg`,
    message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
    name: NAMES[getRandomInteger(0, NAMES.length - 1)]
  };
  commentId += 1;
  return result;
};


const getArray = () => {
  const result = {
    id: id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(3, 8)}, getRandomComment)
  };
  id += 1;
  return result;
};

const getObjects = Array.from({length: 3}, getArray);

export {getObjects};
