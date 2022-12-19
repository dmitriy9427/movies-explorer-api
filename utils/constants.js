const BAD_REQUEST = 'Неверно переданы данные';
const AN_ERROR_OCCURRED_ON_THE_SERVER = 'На сервере произошла ошибка';
const FILM_INVALID_DATA = 'Переданы некорректные данные при создании фильма.';
const BAD_URL = 'Не является URL адресом';
const USER_FORBIDDEN_DATA = 'Нельзя изменить даннные другого пользователя.';
const USER_NOT_FOUND = 'Пользователь по указанному id не найден.';
const THERE_IS_NO_MOVIE_WITH_THIS_ID = 'Нет фильма с таким id';
const VALIDATION_ERROR_NAME = 'ValidationError';
const CAST_ERR_NAME = 'CastError';
const ERROR_KIND_OBJECT_ID = 'ObjectId';
const FORBIDDEN_DELETE_MOVIE_MESSAGE = 'Нет доступа к удалению фильма';
const NOT_FOUND_ERROR_MESSAGE = 'Запрашиваемый ресурс не найден';
const NOT_AUTH_ERROR = 'Необходима авторизация';
const INVALID_EMAIL_FORMAT = 'Неправильный формат почты';
const NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD = 'Неправильные почта или пароль';
const USER_CONFLICT_EMAIL = 'Пользователь с таким email уже зарегистрирован.';
const INVALID_LINK = 'Невалидная ссылка';
const FILM_DELETE_SUCCESS = 'Фильм удалён.';
const REQUEST_LOG_FILENAME = 'request.log';
const ERROR_LOG_FILENAME = 'error.log';

const PORT_NUMBER = 3000;
const DB_ADRESS = 'mongodb://127.0.0.1:27017/moviesdb';
const ALLOWED_CORS = [
  'http://localhost:3000',
  'https://bac.domainname.diplomryb.nomoredomains.club',
  'http://bac.domainname.diplomryb.nomoredomains.club',
  'https://domainname.diplomryabov.nomoredomains.club',
];

const USER_SCHEMA_REQUIRED_MESSAGES = {
  NAME: 'Поле-строка "name - имя пользователя" является обязательным',
  EMAIL: 'Поле-строка "email - электронная почта" является обязательным',
  PASSWORD: 'Поле-строка "password - пароль" является обязательным',
};
const USER_SCHEMA_VALIDATE_MESSAGES = {
  NAME: 'Не соответсвует диапазону длины строки - от 2 до 30 символов',
  EMAIL: 'Не является email',
  PASSWORD: 'Пароль не надежен',
};

const MOVIE_SCHEMA_REQUIRED_MESSAGES = {
  COUNTRY: 'Поле-строка "country - страна" является обязательным',
  DIRECTOR: 'Поле-строка "director - режиссёр" является обязательным',
  DURATION: 'Поле-число "duration - хронометраж" является обязательным',
  YEAR: 'Поле-строка "year - год" является обязательным',
  DESCRIPTION: 'Поле-строка "description - описание" является обязательным',
  IMAGE:
    'Поле-строка "image - ссылка на постер к фильму" является обязательным',
  TRAILER_LINK:
    'Поле-строка "trailerLink - ссылка на трейлер фильма" является обязательным',
  THUMBNAIL:
    'Поле-строка "thumbnail - миниатюрное изображение постера к фильму" является обязательным',
  OWNER:
    'Поле-строка "owner - _id пользователя, который сохранил статью" является обязательным',
  MOVIE_ID:
    'Поле-число "movieId - id фильма, который содержится в ответе сервиса MoviesExplorer" является обязательным',
  NAME_RU:
    'Поле-строка "nameRU - название фильма на русском языке" является обязательным',
  NAME_EN:
    'Поле-строка "nameEN - название фильма на английском языке" является обязательным',
};
const MOVIE_SCHEMA_VALIDATE_MESSAGES = {
  IMAGE: 'Не является URL адресом для постера к фильму',
  TRAILER_LINK: 'Не является URL адресом для трейлера к фильму',
  THUMBNAIL:
    'Не является URL адресом для миниатюрного изображения постера к фильму',
};

module.exports = {
  BAD_REQUEST,
  AN_ERROR_OCCURRED_ON_THE_SERVER,
  BAD_URL,
  USER_NOT_FOUND,
  THERE_IS_NO_MOVIE_WITH_THIS_ID,
  VALIDATION_ERROR_NAME,
  CAST_ERR_NAME,
  FILM_INVALID_DATA,
  USER_FORBIDDEN_DATA,
  ERROR_KIND_OBJECT_ID,
  FORBIDDEN_DELETE_MOVIE_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  NOT_AUTH_ERROR,
  USER_CONFLICT_EMAIL,
  NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD,
  FILM_DELETE_SUCCESS,
  INVALID_EMAIL_FORMAT,
  REQUEST_LOG_FILENAME,
  ERROR_LOG_FILENAME,
  PORT_NUMBER,
  DB_ADRESS,
  INVALID_LINK,
  ALLOWED_CORS,
  USER_SCHEMA_REQUIRED_MESSAGES,
  USER_SCHEMA_VALIDATE_MESSAGES,
  MOVIE_SCHEMA_REQUIRED_MESSAGES,
  MOVIE_SCHEMA_VALIDATE_MESSAGES,
};
