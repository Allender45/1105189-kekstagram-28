import {getRandomInteger} from './utils.js';
import {DESCRIPTION, MESSAGES, NAMES} from './data.js';

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
    description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(1, 3)}, getRandomComment)
  };
  id += 1;
  return result;
};

const getObjects = Array.from({length: 3}, getArray);

export {getObjects};
